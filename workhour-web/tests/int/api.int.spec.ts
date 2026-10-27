import { getPayload, type Payload } from 'payload'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { requireDisposableTestDatabase } from '../helpers/requireDisposableTestDatabase'

let payload: Payload

// Run the guard before dynamically importing Payload config, which binds the DB adapter.
const testDatabaseURL = requireDisposableTestDatabase()

describe('API', () => {
  beforeAll(async () => {
    process.env.DATABASE_URL = testDatabaseURL
    const { default: config } = await import('@/payload.config')
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })
  })

  afterAll(async () => {
    await payload?.destroy()
  })

  it('fetches users', async () => {
    const users = await payload.find({
      collection: 'users',
    })
    expect(users).toBeDefined()
  })
})
