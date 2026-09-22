import type { CollectionConfig } from 'payload'

import { authenticated, publishedOrAuthenticated } from '../access/contentAccess'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: authenticated,
    delete: authenticated,
    read: publishedOrAuthenticated,
    update: authenticated,
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
    mimeTypes: ['image/*'],
  },
  versions: {
    drafts: true,
  },
}
