import type { CollectionConfig } from 'payload'

import { authenticated, publishedOrAuthenticated } from '../access/contentAccess'

export const Services: CollectionConfig = {
  slug: 'services',
  access: {
    create: authenticated,
    delete: authenticated,
    read: publishedOrAuthenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'displayOrder', 'updatedAt', '_status'],
    useAsTitle: 'title',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'displayOrder', type: 'number', required: true, defaultValue: 0 },
    { name: 'summary', type: 'textarea' },
    { name: 'introduction', type: 'textarea', required: true },
    {
      name: 'sections',
      type: 'array',
      fields: [
        {
          name: 'sectionGroup',
          type: 'select',
          defaultValue: 'general',
          options: [
            { label: 'General', value: 'general' },
            { label: 'Enterprise', value: 'enterprise' },
            { label: 'Education', value: 'education' },
            { label: 'Process', value: 'process' },
          ],
        },
        { name: 'heading', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
        {
          name: 'cta',
          type: 'group',
          fields: [
            { name: 'label', type: 'text' },
            { name: 'url', type: 'text' },
          ],
        },
      ],
    },
    { name: 'image', type: 'upload', relationTo: 'media' },
    {
      name: 'cta',
      type: 'group',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'url', type: 'text' },
      ],
    },
  ],
  versions: { drafts: true },
}
