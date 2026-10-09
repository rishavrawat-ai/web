import 'dotenv/config'
import { Pool } from 'pg'

const sourceURL = process.env.DATABASE_URL
if (!sourceURL) throw new Error('DATABASE_URL is required')
const source = new URL(sourceURL)
const sourceName = decodeURIComponent(source.pathname.slice(1))
const targetName = 'workhour_brand_upgrade_20261009_f'
if (targetName === sourceName) throw new Error('Refusing to target the configured database')
const adminURL = new URL(source)
adminURL.pathname = '/postgres'
const admin = new Pool({ connectionString: adminURL.toString() })
try {
  const exists = await admin.query('SELECT 1 FROM pg_database WHERE datname=$1', [targetName])
  if (exists.rowCount) throw new Error('Disposable clone already exists')
  const active = await admin.query('SELECT count(*)::int AS n FROM pg_stat_activity WHERE datname=$1', [sourceName])
  if (active.rows[0].n) throw new Error('Source has active sessions; refusing template clone')
  await admin.query(`CREATE DATABASE "${targetName}" TEMPLATE "${sourceName}"`)
} finally { await admin.end() }
const cloneURL = new URL(source)
cloneURL.pathname = `/${targetName}`
const clone = new Pool({ connectionString: cloneURL.toString() })
const origin = new Pool({ connectionString: sourceURL })
const tables = ['users', 'businesses', 'pages', 'pages_sections', 'pages_sections_items', 'pages_sections_paragraphs', '_pages_v', '_pages_v_version_sections', 'services', 'services_sections', '_services_v', 'media', 'homepage', 'homepage_businesses', 'homepage_hero_slides', 'homepage_value_panels', 'homepage_media_cards']
async function digest(pool: Pool): Promise<Record<string, string>> {
  const found = await pool.query(`SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE'`)
  const result: Record<string, string> = {}
  for (const name of tables.filter((table) => found.rows.some((row) => row.table_name === table))) {
    const excluded = name === 'businesses' ? ` - 'brand_site_url' - 'brand_primary_color' - 'brand_accent_color' - 'brand_background_color'` : ''
    const value = await pool.query(`SELECT count(*)::int AS n, md5(coalesce(string_agg(row_data, E'\\n' ORDER BY row_data), '')) AS hash FROM (SELECT (to_jsonb(t)${excluded})::text AS row_data FROM "${name}" t) rows`)
    result[name] = `${value.rows[0].n}:${value.rows[0].hash}`
  }
  return result
}
const before = await digest(origin)
const cloneBefore = await digest(clone)
if (JSON.stringify(before) !== JSON.stringify(cloneBefore)) throw new Error('Initial clone content differs from source')
const originHistory = await origin.query('SELECT name,batch FROM payload_migrations ORDER BY id')
if (!originHistory.rows.some((row) => row.name === 'dev') || !originHistory.rows.some((row) => row.name === '20260922_045859_homepage_content')) throw new Error('Unexpected source migration history')
await clone.end()

process.env.DATABASE_URL = cloneURL.toString()
process.env.NODE_ENV = 'development'
process.env.PAYLOAD_MIGRATING = 'true'
const { default: config } = await import(`../src/payload.config?database=${encodeURIComponent(cloneURL.toString())}`)
const { getPayload } = await import('payload')
const { assertExistingSchema } = await import('../src/lib/baselineSchemaGuard')
const { migrations } = await import('../src/migrations')
const payload = await getPayload({ config })
try {
  await assertExistingSchema({ execute: (query: unknown) => payload.db.drizzle.execute(query) } as Parameters<typeof assertExistingSchema>[0])
  const migrationsPool = new Pool({ connectionString: cloneURL.toString() })
  await migrationsPool.query("UPDATE payload_migrations SET batch=0 WHERE name='dev' AND batch=-1")
  await migrationsPool.end()
  const baseline = migrations.find((item) => item.name === '20260921_000000_payload_core_baseline')!
  await payload.db.migrate({ migrations: [baseline] })
  const baselineRow = await payload.find({ collection: 'payload-migrations', overrideAccess: true, where: { name: { equals: baseline.name } }, limit: 1 })
  if (!baselineRow.docs[0]) throw new Error('Verified baseline migration was not recorded')
  await payload.create({ collection: 'payload-migrations', overrideAccess: true, data: { name: '20261009_012208_pages_services', batch: baselineRow.docs[0].batch } })
  const pending = migrations.filter((item) => ['20261009_032107_posts', '20261009_042723_brand_site_foundation'].includes(item.name))
  await payload.db.migrate({ migrations: pending })
  await payload.db.migrate({ migrations })
} finally {
  await payload.destroy()
}
const after = await digest(origin)
const finalPool = new Pool({ connectionString: cloneURL.toString() })
const afterClone = await digest(finalPool)
const history = await finalPool.query('SELECT name FROM payload_migrations ORDER BY id')
const schema = await finalPool.query(`SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE'`)
await finalPool.end()
await origin.end()
if (JSON.stringify(before) !== JSON.stringify(after) || JSON.stringify(before) !== JSON.stringify(afterClone)) throw new Error('Normal database or clone data changed during migration checks')
if (!['posts', '_posts_v', 'brand_pages', '_brand_pages_v'].every((name) => schema.rows.some((row) => row.table_name === name))) throw new Error('Incremental schema tables are missing')
console.log(JSON.stringify({ check: 'development clone upgrade', disposableDatabase: targetName, schemaComparisonBeforeAdoption: 'passed exact checked-in snapshot', dataPreservation: 'source and clone table digests match', finalMigrationHistory: history.rows.map((row) => row.name), rerun: 'no pending migrations or errors' }))
process.exit(0)
