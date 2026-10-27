type TestDatabaseRuntime = typeof globalThis & {
  __workhourExplicitTestDatabaseURL?: string
}

function connectionIdentity(connectionString: string): { host: string; port: string; database: string } {
  let url: URL
  try {
    url = new URL(connectionString)
  } catch {
    throw new Error('TEST_DATABASE_URL must be a valid PostgreSQL connection URL.')
  }

  if (!['postgres:', 'postgresql:'].includes(url.protocol)) {
    throw new Error('TEST_DATABASE_URL must use PostgreSQL.')
  }

  return {
    host: url.hostname.toLowerCase(),
    port: url.port || '5432',
    database: decodeURIComponent(url.pathname.replace(/^\//, '')).toLowerCase(),
  }
}

/** Require an explicitly supplied, disposable integration-test database before importing Payload config. */
export function requireDisposableTestDatabase(): string {
  const explicitURL = (globalThis as TestDatabaseRuntime).__workhourExplicitTestDatabaseURL?.trim()
  if (!explicitURL) {
    throw new Error('Integration tests require TEST_DATABASE_URL set explicitly in the test process. Do not use .env DATABASE_URL.')
  }

  const target = connectionIdentity(explicitURL)
  const configuredURL = process.env.DATABASE_URL
  if (configuredURL) {
    const configured = connectionIdentity(configuredURL)
    if (target.host === configured.host && target.port === configured.port && target.database === configured.database) {
      throw new Error('TEST_DATABASE_URL resolves to the normal DATABASE_URL database. Choose a separate disposable database.')
    }
  }

  if (!target.database || !/(?:^|[_-])(?:test|tests|testing|disposable|clone)(?:[_-]|$)/i.test(target.database)) {
    throw new Error('TEST_DATABASE_URL must target a disposable database whose name contains test, disposable, or clone.')
  }

  // Payload config uses DATABASE_URL; set it only after proving the explicit target is isolated.
  process.env.DATABASE_URL = explicitURL
  return explicitURL
}
