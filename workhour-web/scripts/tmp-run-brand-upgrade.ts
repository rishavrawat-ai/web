import 'dotenv/config'
import { Pool } from 'pg'
const sourceURL = process.env.DATABASE_URL!
const source = new URL(sourceURL)
const targetName = process.argv[2]
if (!targetName) throw new Error('Target db required')
const target = new URL(source)
target.pathname = `/${targetName}`
process.env.DATABASE_URL = target.toString()
process.env.NODE_ENV = 'production'
process.env.PAYLOAD_MIGRATING = 'true'
const { default: config } = await import(`../src/payload.config?database=${encodeURIComponent(target.toString())}`)
const { getPayload } = await import('payload')
const payload = await getPayload({ config })
await payload.destroy()
const origin = new Pool({ connectionString: sourceURL })
const clone = new Pool({ connectionString: target.toString() })
const tables = ['users', 'businesses', 'pages', 'pages_sections', 'pages_sections_items', 'pages_sections_paragraphs', '_pages_v', '_pages_v_version_sections', 'services', 'services_sections', '_services_v', 'media', 'homepage', 'homepage_businesses', 'homepage_hero_slides', 'homepage_value_panels', 'homepage_media_cards']
async function digest(pool: Pool) {
  const found = await pool.query(`SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE'`)
  const out: Record<string, string> = {}
  for (const name of tables.filter((value) => found.rows.some((row) => row.table_name === value))) {
    const excluded = name === 'businesses' ? ` - 'brand_site_url' - 'brand_primary_color' - 'brand_accent_color' - 'brand_background_color'` : ''
    const result = await pool.query(`SELECT count(*)::int AS n, md5(coalesce(string_agg(row_data, E'\\n' ORDER BY row_data), '')) AS hash FROM (SELECT (to_jsonb(t)${excluded})::text AS row_data FROM "${name}" t) rows`)
    out[name] = `${result.rows[0].n}:${result.rows[0].hash}`
  }
  return out
}
const history = await clone.query('SELECT name FROM payload_migrations ORDER BY id')
const sourceData = await digest(origin)
const cloneData = await digest(clone)
await origin.end()
await clone.end()
if (JSON.stringify(sourceData) !== JSON.stringify(cloneData)) throw new Error('Source data and upgraded clone records differ')
if (!history.rows.some((row) => row.name === '20261009_032107_posts') || !history.rows.some((row) => row.name === '20261009_042723_brand_site_foundation')) throw new Error('Migrations did not complete')
console.log(JSON.stringify({ disposableDatabase: targetName, appliedAndRepeated: true, dataPreserved: true, history: history.rows.map(({ name }) => name) }))
process.exit(0)
