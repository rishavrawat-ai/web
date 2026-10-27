# Media storage

## Current behavior

`Media` remains the upload collection and keeps required alt text. Uploads accept JPEG, PNG, WebP, GIF, and AVIF up to 4 MiB. Create, update, and delete remain authenticated-only; anonymous reads are limited to published records.

Payload 3.90.1 uses its matching `@payloadcms/storage-s3` 3.90.1 adapter. Local development defaults to Payload's filesystem storage. Production defaults to S3 and fails during startup/build configuration if `S3_BUCKET` or `S3_REGION` is missing, or if `MEDIA_STORAGE_PROVIDER=local` is set. The adapter's metadata fields are present in both local and S3 configurations so the database schema stays consistent.

## Environment variables

Set these in the deployment environment, not in source control:

| Variable | Required | Purpose |
| --- | --- | --- |
| `MEDIA_STORAGE_PROVIDER` | Production: `s3` | Optional in development (defaults to `local`); production cannot use local disk. |
| `S3_BUCKET` | S3 | Existing bucket name. |
| `S3_REGION` | S3 | AWS region, or the provider's required value such as `auto`. |
| `S3_ENDPOINT` | S3-compatible providers | S3 API endpoint. Omit for standard AWS S3. |
| `S3_ACCESS_KEY_ID` | Optional pair | Static access key. Omit both credentials on AWS when the runtime has an IAM role. |
| `S3_SECRET_ACCESS_KEY` | Optional pair | Static secret; must be supplied with the access key. |
| `S3_FORCE_PATH_STYLE` | Optional | `true` or `false`; defaults to `true` when a custom endpoint is set and `false` for AWS S3. |

For AWS S3, provide the bucket and region and either a paired access key/secret or a runtime IAM role. For an S3-compatible service, also provide its endpoint and credentials, and follow that provider's region and path-style requirements. The adapter supports AWS S3 and S3-compatible services such as MinIO, Cloudflare R2, and Spaces.

The checked-in `.env.example` shows variable names only. Do not put real credentials there or in Git. On Vercel, configure the variables separately for every environment that will run the site (Preview and Production as applicable). No bucket, account, or credentials are provisioned by this change.

## Bucket access, URLs, and CORS

Keep the bucket private. The adapter leaves Payload access control enabled: the website continues to use the existing same-origin Payload media URL, and Payload serves the stored object through its media route after applying the collection's read access (`published` or authenticated). Public images therefore require a published Media record. Do not set `disablePayloadAccessControl` or make the bucket public as part of this setup.

Uploads are currently server-to-server; the browser sends the file to the Payload API, and the app writes it to S3. Bucket CORS is not required for this flow or for same-origin image rendering. If direct browser-to-bucket uploads are enabled in a future change, configure bucket CORS for the exact website origins, `PUT` (and preflight `OPTIONS`), and the `If-None-Match` request header as required by Payload's S3 adapter.

The server identity needs object read/write/delete access for this bucket (including `HeadObject` for media delivery). Keep credentials in the deployment's secret store.

## Existing local uploads

This change does not rewrite Media records, replace URLs, copy files, or delete files. Existing Media rows and their URL paths remain in place. The S3 adapter will look for requested objects in the bucket, so existing local binaries must be copied manually to the bucket with their stored filenames and image-size variants before switching a deployment with existing uploads to S3. Preserve the matching object keys. Until that operator-managed copy is complete, old files that exist only on local disk will not be found by the S3 handler. No automatic migration or overwrite is performed.

The incremental migration `20261009_080237_media_storage` adds the adapter's `prefix` and `_objectKey` metadata columns to Media and its versions. Apply the checked-in migrations before deploying this configuration. The migration preserves existing records; their new storage metadata columns use the generated defaults/null values.

## Local verification

Use a disposable PostgreSQL database and a disposable S3-compatible service such as MinIO. For local MinIO, use its API endpoint, a test-only bucket and credentials, `S3_REGION=us-east-1`, and `S3_FORCE_PATH_STYLE=true`; keep the MinIO port bound to localhost. Verify an authenticated upload, publish it, render the image through the Payload URL, restart the app, and render it again. Also verify an anonymous upload is rejected. Do not run this test against the normal development database or a production bucket.

Payload references: [Storage Adapters](https://payloadcms.com/docs/upload/storage-adapters) and [Uploads](https://payloadcms.com/docs/upload/overview).
