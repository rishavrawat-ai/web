import 'dotenv/config'
import { Pool } from 'pg'

const sourceURL = process.env.DATABASE_URL
if (!sourceURL) throw new Error('DATABASE_URL is required')
const sourceName = decodeURIComponent(new URL(sourceURL).pathname.slice(1))
const targetName = 'workhour_employaa_upgrade_20261009'
if (!/^workhour_employaa_upgrade_20261009$/.test(targetName) || targetName === sourceName) throw new Error('Unsafe clone target')
const source = new Pool({ connectionString: sourceURL })
const sourceCounts = await source.query(`
  SELECT
    (SELECT count(*) FROM businesses) AS businesses,
    (SELECT count(*) FROM payload_migrations) AS migration_rows
`)
await source.end()

const adminURL = new URL(sourceURL)
adminURL.pathname = '/postgres'
const admin = new Pool({ connectionString: adminURL.toString() })
try {
  const existing = await admin.query('SELECT 1 FROM pg_database WHERE datname = $1', [targetName])
  if (!existing.rowCount) {
    const sessions = await admin.query('SELECT count(*)::int AS count FROM pg_stat_activity WHERE datname = $1', [sourceName])
    if (sessions.rows[0].count > 0) throw new Error(`Source has ${sessions.rows[0].count} active database sessions; use a logical dump clone to avoid interrupting them.`)
    await admin.query(`CREATE DATABASE "${targetName}" TEMPLATE "${sourceName}"`)
  }
} finally {
  await admin.end()
}

const cloneURL = new URL(sourceURL)
cloneURL.pathname = `/${targetName}`
process.env.DATABASE_URL = cloneURL.toString()
Reflect.set(process.env, 'NODE_ENV', 'production')
process.env.PAYLOAD_MIGRATING = 'true'
const { default: config } = await import('../src/payload.config')
const { getPayload } = await import('payload')
console.log(`target NODE_ENV=${process.env.NODE_ENV}`)
console.log('initializing Payload against the disposable clone')
const payload = await getPayload({ config })
try {
  console.log('comparing the configured schema to the development clone; generating only the incremental diff')
  await payload.db.createMigration({ migrationName: 'brand_site_foundation', payload, forceAcceptWarning: true })
  console.log(JSON.stringify({ sourceDatabase: sourceName, disposableClone: targetName, sourceCounts: sourceCounts.rows[0], cloneMigrationsAndIncrementalGenerated: true }))
} finally {
  await payload.destroy()
}
process.exit(0)
