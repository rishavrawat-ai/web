import 'dotenv/config'

import { Pool } from 'pg'

const sourceURL = process.env.DATABASE_URL
if (!sourceURL) throw new Error('DATABASE_URL is required')
const source = new URL(sourceURL)
const sourceName = decodeURIComponent(source.pathname.slice(1))
const freshName = 'workhour_brand_fresh_20261009_e'
const upgradeName = 'workhour_brand_upgrade_20261009_e'
const names = [freshName, upgradeName]
if (names.includes(sourceName)) throw new Error('Refusing to use the configured database as a disposable target')

const adminURL = new URL(source)
adminURL.pathname = '/postgres'
const admin = new Pool({ connectionString: adminURL.toString() })
try {
  const exists = await admin.query('SELECT datname FROM pg_database WHERE datname = ANY($1::text[])', [names])
  if (exists.rowCount) throw new Error(`Disposable test database already exists: ${exists.rows[0].datname}`)
  await admin.query(`CREATE DATABASE "${freshName}" TEMPLATE template0`)
  const activeSessions = await admin.query('SELECT count(*)::int AS n FROM pg_stat_activity WHERE datname = $1', [sourceName])
  if (activeSessions.rows[0].n) throw new Error('Source has active sessions; refusing to clone it as a template')
  await admin.query(`CREATE DATABASE "${upgradeName}" TEMPLATE "${sourceName}"`)
} finally {
  await admin.end()
}

function targetURL(name: string): string {
  const target = new URL(source)
  target.pathname = `/${name}`
  return target.toString()
}

async function withPayload<T>(url: string, mode: 'production' | 'development', run: (payload: any) => Promise<T>): Promise<T> {
  process.env.DATABASE_URL = url
  process.env.NODE_ENV = mode
  process.env.PAYLOAD_MIGRATING = 'true'
  const { default: config } = await import(`../src/payload.config?database=${encodeURIComponent(url)}`)
  const { getPayload } = await import('payload')
  const payload = await getPayload({ config })
  try { return await run(payload) } finally { await payload.destroy() }
}

async function migrationNames(url: string) {
  const pool = new Pool({ connectionString: url })
  try {
    const result = await pool.query('SELECT name FROM payload_migrations ORDER BY id')
    return result.rows.map(({ name }) => name as string)
  } finally { await pool.end() }
}

const freshURL = targetURL(freshName)
for (let run = 1; run <= 2; run++) {
  await withPayload(freshURL, 'production', async () => {})
  const namesNow = await migrationNames(freshURL)
  const required = ['20260921_000000_payload_core_baseline', '20260922_045859_homepage_content', '20261009_012208_pages_services', '20261009_032107_posts', '20261009_042723_brand_site_foundation']
  if (!required.every((name) => namesNow.includes(name))) throw new Error(`Fresh schema is missing migrations after run ${run}`)
}
console.log(JSON.stringify({ check: 'empty database', database: freshName, migrationRuns: 2, migrationHistory: await migrationNames(freshURL) }))

const upgradeURL = targetURL(upgradeName)
const beforePool = new Pool({ connectionString: upgradeURL })
const sourcePool = new Pool({ connectionString: sourceURL })
const preservedTables = ['users', 'businesses', 'pages', 'pages_sections', 'pages_sections_items', 'pages_sections_paragraphs', '_pages_v', '_pages_v_version_sections', 'services', 'services_sections', '_services_v', 'media', 'homepage', 'homepage_businesses', 'homepage_hero_slides', 'homepage_value_panels', 'homepage_media_cards']
async function digest(pool: Pool): Promise<Record<string, string>> {
  const out: Record<string, string> = {}
  const found = await pool.query(`SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE'`)
  for (const name of preservedTables.filter((table) => found.rows.some((row) => row.table_name === table))) {
    const excluded = name === 'businesses' ? ` - 'brand_site_url' - 'brand_primary_color' - 'brand_accent_color' - 'brand_background_color'` : ''
    const query = `SELECT count(*)::int AS n, md5(coalesce(string_agg(row_data, E'\\n' ORDER BY row_data), '')) AS hash FROM (SELECT (to_jsonb(t)${excluded})::text AS row_data FROM "${name}" t) rows`
    const result = await pool.query(query)
    out[name] = `${result.rows[0].n}:${result.rows[0].hash}`
  }
  return out
}
const sourceDigest = await digest(sourcePool)
const beforeDigest = await digest(beforePool)
if (JSON.stringify(sourceDigest) !== JSON.stringify(beforeDigest)) throw new Error('Clone data differs from source before migration')
await beforePool.end()

await withPayload(upgradeURL, 'development', async (payload) => {
  const { assertExistingSchema } = await import('../src/lib/baselineSchemaGuard')
  await assertExistingSchema({
    execute: (query: unknown) => payload.db.drizzle.execute(query),
  } as Parameters<typeof assertExistingSchema>[0])
  const history = await migrationNames(upgradeURL)
  if (!history.includes('dev') || !history.includes('20260922_045859_homepage_content')) throw new Error('Development clone history changed from the expected pre-adoption state')
})
const adoptionPool = new Pool({ connectionString: upgradeURL })
try {
  const batchResult = await adoptionPool.query('SELECT COALESCE(MAX(batch), 0) AS batch FROM payload_migrations')
  const nextBatch = Number(batchResult.rows[0].batch) + 1
  await adoptionPool.query('INSERT INTO payload_migrations (name, batch) VALUES ($1, $3), ($2, $3)', ['20260921_000000_payload_core_baseline', '20261009_012208_pages_services', nextBatch])
} finally { await adoptionPool.end() }

for (let run = 1; run <= 2; run++) {
  await withPayload(upgradeURL, 'production', async () => {})
}
const afterPool = new Pool({ connectionString: upgradeURL })
const afterDigest = await digest(afterPool)
const finalTables = await afterPool.query(`SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE'`)
const finalHistory = await migrationNames(upgradeURL)
await afterPool.end()
await sourcePool.end()
if (JSON.stringify(sourceDigest) !== JSON.stringify(afterDigest)) throw new Error('Existing clone records changed during schema upgrade')
for (const table of ['brand_pages', '_brand_pages_v', 'posts']) if (!finalTables.rows.some((row) => row.table_name === table)) throw new Error(`Expected new schema table is absent: ${table}`)
if (!finalHistory.includes('20261009_032107_posts') || !finalHistory.includes('20261009_042723_brand_site_foundation')) throw new Error('Upgrade migration history is incomplete')
console.log(JSON.stringify({ check: 'development clone upgrade', database: upgradeName, schemaComparison: 'exact pre-upgrade snapshot verified before adopting pre-existing Pages/Services tables', migrationRuns: 2, sourceAndCloneContentDigestsMatch: true, migrationHistory: finalHistory }))
process.exit(0)
