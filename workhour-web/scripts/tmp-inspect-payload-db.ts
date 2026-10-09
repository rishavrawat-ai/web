import 'dotenv/config'
process.env.PAYLOAD_MIGRATING = 'true'
const { default: config } = await import('../src/payload.config')
const { getPayload } = await import('payload')
const payload = await getPayload({ config })
console.log(JSON.stringify({ keys: Object.keys(payload.db), drizzle: typeof payload.db.drizzle, pool: typeof payload.db.pool, migrations: typeof payload.db.migrate }))
await payload.destroy()
process.exit(0)
