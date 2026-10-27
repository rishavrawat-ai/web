import { afterEach, describe, expect, it } from 'vitest'

import { requireDisposableTestDatabase } from '../helpers/requireDisposableTestDatabase'

type TestDatabaseRuntime = typeof globalThis & { __workhourExplicitTestDatabaseURL?: string }
const runtime = globalThis as TestDatabaseRuntime
const originalExplicitURL = runtime.__workhourExplicitTestDatabaseURL
const originalDatabaseURL = process.env.DATABASE_URL

afterEach(() => {
  runtime.__workhourExplicitTestDatabaseURL = originalExplicitURL
  if (originalDatabaseURL === undefined) delete process.env.DATABASE_URL
  else process.env.DATABASE_URL = originalDatabaseURL
})

describe('integration database isolation guard', () => {
  it('requires a test URL provided before dotenv loads', () => {
    runtime.__workhourExplicitTestDatabaseURL = undefined
    expect(() => requireDisposableTestDatabase()).toThrow(/set explicitly/i)
  })

  it('rejects the configured normal database', () => {
    const normalDatabase = process.env.DATABASE_URL || 'postgres://user:password@localhost:5432/workhour'
    runtime.__workhourExplicitTestDatabaseURL = normalDatabase
    process.env.DATABASE_URL = normalDatabase
    expect(() => requireDisposableTestDatabase()).toThrow(/normal DATABASE_URL database/i)
  })

  it('requires an isolated database name and binds Payload to that target', () => {
    runtime.__workhourExplicitTestDatabaseURL = 'postgres://tester:secret@127.0.0.1:5432/workhour_brand_test_clone'
    expect(requireDisposableTestDatabase()).toBe(runtime.__workhourExplicitTestDatabaseURL)
    expect(process.env.DATABASE_URL).toBe(runtime.__workhourExplicitTestDatabaseURL)
  })
})
