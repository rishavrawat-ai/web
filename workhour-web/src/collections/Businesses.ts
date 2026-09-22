import type { CollectionConfig } from 'payload'

import { authenticated, publishedOrAuthenticated } from '../access/contentAccess'

export const Businesses: CollectionConfig = {
  slug: 'businesses',
  access: {
    create: authenticated,
    delete: authenticated,
    read: publishedOrAuthenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'slug', 'displayOrder', '_status'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'homepageIntroduction',
      type: 'textarea',
      required: true,
    },
    {
      name: 'detailedIntroduction',
      type: 'textarea',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'websiteUrl',
      type: 'text',
    },
    {
      name: 'displayOrder',
      type: 'number',
      required: true,
      defaultValue: 0,
    },
  ],
  versions: {
    drafts: true,
  },
}
