import 'dotenv/config'
import { Pool } from 'pg'
const url = new URL(process.env.DATABASE_URL!)
url.pathname = '/workhour_brand_upgrade_20261009_f'
const pool = new Pool({ connectionString: url.toString() })
const result = await pool.query('SELECT slug, _status FROM businesses ORDER BY slug')
console.log(JSON.stringify(result.rows))
await pool.end()
process.exit(0)
