import 'dotenv/config'
import { Pool } from 'pg'

const configuredURL = process.env.DATABASE_URL
const targetName = process.argv[2]
if (!configuredURL) throw new Error('DATABASE_URL is required')
if (!targetName || !/^[a-z0-9_]+$/i.test(targetName)) {
  throw new Error('Pass the exact existing database name to adopt, for example: npm run db:adopt-dev-pushed-schema -- workhour_dev_clone')
}
const configured = new URL(configuredURL)
const configuredName = decodeURIComponent(configured.pathname.slice(1))
if (targetName === configuredName) throw new Error('Refusing to adopt the database currently named in .env. Use a disposable or separately selected database.')
const targetURL = new URL(configured)
targetURL.pathname = `/${targetName}`

process.env.DATABASE_URL = targetURL.toString()
Reflect.set(process.env, 'NODE_ENV', 'development')
process.env.PAYLOAD_MIGRATING = 'true'
const { default: config } = await import(`../src/payload.config?database=${encodeURIComponent(targetURL.toString())}`)
const { getPayload } = await import('payload')
const { assertExistingSchema } = await import('../src/lib/baselineSchemaGuard')
const payload = await getPayload({ config })
const pool = new Pool({ connectionString: targetURL.toString() })
try {
  await assertExistingSchema(
    { execute: (query: unknown) => payload.db.drizzle.execute(query as import('drizzle-orm').SQLWrapper) } as Parameters<typeof assertExistingSchema>[0],
    '20261009_012208_pages_services.json',
  )
  const history = await pool.query('SELECT name, batch FROM payload_migrations ORDER BY id')
  const byName = new Map(history.rows.map(({ name, batch }) => [name, Number(batch)]))
  if (!byName.has('dev') || !byName.has('20260922_045859_homepage_content')) {
    throw new Error('Expected a dev-pushed Pages/Services database with the homepage migration in its history.')
  }
  const adoptedNames = ['20260921_000000_payload_core_baseline', '20261009_012208_pages_services']
  const adoptedCount = adoptedNames.filter((name) => byName.has(name)).length
  if (adoptedCount === 1) throw new Error('Partial adoption markers found; inspect migration history and schema manually.')
  if (['20261009_032107_posts', '20261009_042723_brand_site_foundation'].some((name) => byName.has(name))) {
    throw new Error('This database already has later migration history; refusing the Pages/Services adoption path.')
  }

  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    await client.query("UPDATE payload_migrations SET batch = 0 WHERE name = 'dev' AND batch = -1")
    if (!adoptedCount) {
      const maxBatch = Math.max(0, ...history.rows.map(({ batch }) => Number(batch)).filter((batch) => batch > 0))
      const batch = maxBatch + 1
      await client.query('INSERT INTO payload_migrations (name, batch) VALUES ($1, $3), ($2, $3)', [...adoptedNames, batch])
    }
    await client.query('COMMIT')
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
  }
  console.log(JSON.stringify({ database: targetName, schemaSnapshot: '20261009_012208_pages_services.json', adoption: 'schema equivalence verified; baseline and Pages/Services recorded; dev push prompt disabled for this database', idempotent: true }))
} finally {
  await pool.end()
  await payload.destroy()
}
process.exit(0)
