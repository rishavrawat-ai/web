import type { CollectionConfig } from 'payload'

import { authenticated, publishedBusinessesByHost } from '../access/contentAccess'

export const Businesses: CollectionConfig = {
  slug: 'businesses',
  access: {
    create: authenticated,
    delete: authenticated,
    read: publishedBusinessesByHost,
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
      name: 'brandSiteUrl',
      type: 'text',
      admin: { description: 'Configured destination for this brand site. Leave blank until its public host is confirmed.' },
    },
    { name: 'brandPrimaryColor', type: 'text', defaultValue: '#071a31', validate: (value: unknown) => !value || (typeof value === 'string' && /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i.test(value)) || 'Enter a valid 3 or 6 digit hex color.' },
    { name: 'brandAccentColor', type: 'text', defaultValue: '#2baaa3', validate: (value: unknown) => !value || (typeof value === 'string' && /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i.test(value)) || 'Enter a valid 3 or 6 digit hex color.' },
    { name: 'brandBackgroundColor', type: 'text', defaultValue: '#f8faf9', validate: (value: unknown) => !value || (typeof value === 'string' && /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i.test(value)) || 'Enter a valid 3 or 6 digit hex color.' },
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
