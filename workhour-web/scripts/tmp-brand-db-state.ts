import 'dotenv/config'
import { Pool } from 'pg'

const sourceURL = process.env.DATABASE_URL!
const sourceName = decodeURIComponent(new URL(sourceURL).pathname.slice(1))
const targetName = 'workhour_employaa_upgrade_20261009'
for (const name of [sourceName, targetName]) {
  const url = new URL(sourceURL)
  url.pathname = `/${name}`
  const pool = new Pool({ connectionString: url.toString() })
  try {
    const exists = await pool.query('SELECT current_database()')
    const businesses = await pool.query('SELECT count(*)::int AS count FROM businesses')
    const migrations = await pool.query('SELECT name FROM payload_migrations ORDER BY id')
    const tables = await pool.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE' ORDER BY table_name")
    console.log(JSON.stringify({ db: exists.rows[0].current_database, businessCount: businesses.rows[0].count, migrationNames: migrations.rows.map((row) => row.name), tableNames: tables.rows.map((row) => row.table_name) }))
  } catch (error) { console.log(JSON.stringify({ db: name, error: error instanceof Error ? error.message.split('\n')[0] : 'database check failed' })) }
  finally { await pool.end() }
}
process.exit(0)
