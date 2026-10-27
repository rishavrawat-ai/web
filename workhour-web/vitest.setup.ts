// Any setup scripts you might need go here

import dotenv from 'dotenv'

const testRuntime = globalThis as typeof globalThis & {
  __workhourExplicitTestDatabaseURL?: string
}

// Capture this before dotenv loads .env: an integration database must be supplied
// explicitly by the test runner and can never be inherited from local config.
testRuntime.__workhourExplicitTestDatabaseURL = process.env.TEST_DATABASE_URL
dotenv.config()

;(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true
