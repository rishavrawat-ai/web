import type { CollectionConfig } from 'payload'

import { authenticated, publishedBrandPagesByHost } from '../access/contentAccess'

export const BrandPages: CollectionConfig = {
  slug: 'brand-pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: publishedBrandPagesByHost,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['business', 'title', 'slug', 'pageType', 'displayOrder', 'updatedAt', '_status'],
    useAsTitle: 'title',
  },
  fields: [
    { name: 'business', type: 'relationship', relationTo: 'businesses', required: true, index: true },
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true },
    {
      name: 'pageType', label: 'Content type', type: 'select', required: true, defaultValue: 'page',
      options: [
        { label: 'Page', value: 'page' },
        { label: 'Service', value: 'service' },
      ],
    },
    { name: 'displayOrder', type: 'number', required: true, defaultValue: 0 },
    { name: 'eyebrow', type: 'text' },
    { name: 'summary', type: 'textarea' },
    { name: 'introduction', type: 'textarea' },
    {
      name: 'sections', type: 'array',
      fields: [
        { name: 'heading', type: 'text', required: true },
        { name: 'body', type: 'textarea' },
        { name: 'paragraphs', type: 'array', fields: [{ name: 'text', type: 'textarea', required: true }] },
        { name: 'items', type: 'array', fields: [
          { name: 'title', type: 'text', required: true },
          { name: 'text', type: 'textarea' },
        ] },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'cta', type: 'group', fields: [
          { name: 'label', type: 'text' },
          { name: 'url', type: 'text' },
        ] },
      ],
    },
  ],
  indexes: [{ unique: true, fields: ['business', 'slug'] }],
  versions: { drafts: true },
}
