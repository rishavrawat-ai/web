import { s3Storage } from '@payloadcms/storage-s3'
import type { S3StorageOptions } from '@payloadcms/storage-s3'

type MediaStorageEnvironment = Record<string, string | undefined>

type ResolvedMediaStorage = {
  enabled: boolean
  bucket: string
  config: S3StorageOptions['config']
}

export function resolveMediaStorage(environment: MediaStorageEnvironment = process.env): ResolvedMediaStorage {
  const production = environment.NODE_ENV === 'production'
  const requestedProvider = environment.MEDIA_STORAGE_PROVIDER?.trim().toLowerCase()
  const provider = requestedProvider || (production ? 's3' : 'local')

  if (provider !== 'local' && provider !== 's3') {
    throw new Error('MEDIA_STORAGE_PROVIDER must be either "local" or "s3".')
  }
  if (production && provider !== 's3') {
    throw new Error('Production media uploads cannot use ephemeral local storage. Set MEDIA_STORAGE_PROVIDER=s3 and configure S3_BUCKET and S3_REGION.')
  }

  if (provider === 'local') {
    return { enabled: false, bucket: 'local-storage-disabled', config: { region: 'us-east-1' } }
  }

  const bucket = environment.S3_BUCKET?.trim()
  const region = environment.S3_REGION?.trim()
  const endpoint = environment.S3_ENDPOINT?.trim()
  const accessKeyId = environment.S3_ACCESS_KEY_ID?.trim()
  const secretAccessKey = environment.S3_SECRET_ACCESS_KEY?.trim()
  const missing = [!bucket && 'S3_BUCKET', !region && 'S3_REGION'].filter(Boolean)

  if (missing.length) {
    throw new Error(`S3 media storage is enabled but required environment variable(s) are missing: ${missing.join(', ')}.`)
  }
  if (Boolean(accessKeyId) !== Boolean(secretAccessKey)) {
    throw new Error('S3_ACCESS_KEY_ID and S3_SECRET_ACCESS_KEY must be provided together, or both omitted to use the AWS credential provider chain.')
  }
  if (endpoint) {
    let parsedEndpoint: URL
    try {
      parsedEndpoint = new URL(endpoint)
    } catch {
      throw new Error('S3_ENDPOINT must be a valid HTTP or HTTPS URL.')
    }
    if (!['http:', 'https:'].includes(parsedEndpoint.protocol) || parsedEndpoint.username || parsedEndpoint.password) {
      throw new Error('S3_ENDPOINT must be a valid HTTP or HTTPS URL without embedded credentials.')
    }
  }

  const pathStyleSetting = environment.S3_FORCE_PATH_STYLE?.trim().toLowerCase()
  if (pathStyleSetting && !['true', 'false'].includes(pathStyleSetting)) {
    throw new Error('S3_FORCE_PATH_STYLE must be "true" or "false" when set.')
  }

  return {
    enabled: true,
    bucket: bucket!,
    config: {
      region: region!,
      ...(endpoint ? { endpoint } : {}),
      ...(endpoint ? { forcePathStyle: pathStyleSetting ? pathStyleSetting === 'true' : true } : {}),
      ...(accessKeyId && secretAccessKey ? { credentials: { accessKeyId, secretAccessKey } } : {}),
    },
  }
}

/** Keep adapter-added database fields stable while local development uses Payload's filesystem. */
export function createMediaStoragePlugin(environment: MediaStorageEnvironment = process.env) {
  const storage = resolveMediaStorage(environment)
  return s3Storage({
    enabled: storage.enabled,
    alwaysInsertFields: true,
    bucket: storage.bucket,
    config: storage.config,
    collections: { media: true },
  })
}
