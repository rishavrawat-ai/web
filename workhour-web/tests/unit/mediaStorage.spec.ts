import { describe, expect, it } from 'vitest'

import { resolveMediaStorage } from '../../src/storage/mediaStorage'
import { assertMediaFileSize, MAX_MEDIA_FILE_SIZE, Media } from '../../src/collections/Media'

describe('media storage configuration', () => {
  it('keeps local filesystem storage as the development default', () => {
    expect(resolveMediaStorage({ NODE_ENV: 'development' })).toEqual({
      enabled: false,
      bucket: 'local-storage-disabled',
      config: { region: 'us-east-1' },
    })
  })

  it('fails production startup clearly when S3 settings are missing', () => {
    expect(() => resolveMediaStorage({ NODE_ENV: 'production' })).toThrow(/S3_BUCKET, S3_REGION/)
    expect(() => resolveMediaStorage({ NODE_ENV: 'production', MEDIA_STORAGE_PROVIDER: 'local' })).toThrow(/cannot use ephemeral local storage/)
  })

  it('supports S3-compatible endpoints and static credentials without printing them', () => {
    const config = resolveMediaStorage({
      NODE_ENV: 'production',
      MEDIA_STORAGE_PROVIDER: 's3',
      S3_BUCKET: 'workhour-media-test',
      S3_REGION: 'us-east-1',
      S3_ENDPOINT: 'http://127.0.0.1:9000',
      S3_ACCESS_KEY_ID: 'local-test-key',
      S3_SECRET_ACCESS_KEY: 'local-test-secret',
    })

    expect(config).toMatchObject({
      enabled: true,
      bucket: 'workhour-media-test',
      config: {
        region: 'us-east-1',
        endpoint: 'http://127.0.0.1:9000',
        forcePathStyle: true,
        credentials: { accessKeyId: 'local-test-key', secretAccessKey: 'local-test-secret' },
      },
    })
  })

  it('requires a complete credential pair and validates endpoint options', () => {
    expect(() => resolveMediaStorage({ MEDIA_STORAGE_PROVIDER: 's3', S3_BUCKET: 'bucket', S3_REGION: 'region', S3_ACCESS_KEY_ID: 'only-one' })).toThrow(/provided together/)
    expect(() => resolveMediaStorage({ MEDIA_STORAGE_PROVIDER: 's3', S3_BUCKET: 'bucket', S3_REGION: 'region', S3_ENDPOINT: 'ftp://storage.example' })).toThrow(/HTTP or HTTPS/)
    expect(() => resolveMediaStorage({ MEDIA_STORAGE_PROVIDER: 's3', S3_BUCKET: 'bucket', S3_REGION: 'region', S3_FORCE_PATH_STYLE: 'yes' })).toThrow(/must be "true" or "false"/)
  })

  it('keeps media writes authenticated and limits uploads to supported images and 4 MiB', () => {
    expect(Media.access?.create).toBeDefined()
    expect(Media.access?.update).toBeDefined()
    expect(Media.access?.delete).toBeDefined()
    expect(Media.fields.find((field) => 'name' in field && field.name === 'alt')).toMatchObject({ name: 'alt', required: true })
    expect(Media.upload).toMatchObject({
      mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'],
    })
    expect(MAX_MEDIA_FILE_SIZE).toBe(4 * 1024 * 1024)
    expect(() => assertMediaFileSize(MAX_MEDIA_FILE_SIZE)).not.toThrow()
    expect(() => assertMediaFileSize(MAX_MEDIA_FILE_SIZE + 1)).toThrow(/4 MiB or smaller/)
  })
})
