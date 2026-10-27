import { APIError, type CollectionConfig } from 'payload'

import { authenticated, publishedOrAuthenticated } from '../access/contentAccess'

export const MAX_MEDIA_FILE_SIZE = 4 * 1024 * 1024

export function assertMediaFileSize(fileSize: number | undefined): void {
  if (typeof fileSize === 'number' && fileSize > MAX_MEDIA_FILE_SIZE) {
    throw new APIError('Media uploads must be 4 MiB or smaller.', 413)
  }
}

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: authenticated,
    delete: authenticated,
    read: publishedOrAuthenticated,
    update: authenticated,
  },
  hooks: {
    beforeOperation: [({ args, operation, req }) => {
      if (operation !== 'create') return

      const argsFile = (args as { file?: { size?: number } }).file
      const fileSize = req.file?.size ?? argsFile?.size
      assertMediaFileSize(fileSize)
    }],
  },
  admin: {
    defaultColumns: ['alt', 'updatedAt', '_status'],
    useAsTitle: 'alt',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'],
  },
  versions: {
    drafts: true,
  },
}
