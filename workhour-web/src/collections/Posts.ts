import { ValidationError, type CollectionBeforeValidateHook, type CollectionConfig } from 'payload'

import { authenticated, publishedOrAuthenticated } from '../access/contentAccess'

function isHTTPURL(value: unknown): boolean {
  if (typeof value !== 'string' || !value.trim()) return false
  try {
    const parsed = new URL(value)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

export const Posts: CollectionConfig = {
  slug: 'posts',
  access: {
    create: authenticated,
    delete: authenticated,
    read: publishedOrAuthenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'type', 'entryKind', 'publicationDate', 'updatedAt', '_status'],
    useAsTitle: 'title',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'type', type: 'select', required: true, options: [
      { label: 'Announcement', value: 'announcement' },
      { label: 'News & Media', value: 'news-media' },
    ] },
    { name: 'entryKind', label: 'Entry kind', type: 'select', required: true, defaultValue: 'internal', options: [
      { label: 'Internal article', value: 'internal' },
      { label: 'External link', value: 'external' },
    ] },
    { name: 'excerpt', type: 'textarea', required: true },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'body', type: 'textarea' },
    { name: 'publicationDate', type: 'date', required: true, admin: { date: { pickerAppearance: 'dayOnly' } } },
    { name: 'externalUrl', type: 'text' },
  ],
  hooks: {
    beforeValidate: [
      (({ data, req }) => {
        if (!data) return data
        const errors: Array<{ path: string; message: string }> = []
        if (data.entryKind === 'internal' && !(typeof data.body === 'string' && data.body.trim())) {
          errors.push({ path: 'body', message: 'Internal articles require body content.' })
        }
        if (data.entryKind === 'external' && !isHTTPURL(data.externalUrl)) {
          errors.push({ path: 'externalUrl', message: 'External-link entries require a valid HTTP or HTTPS URL.' })
        } else if (data.externalUrl && !isHTTPURL(data.externalUrl)) {
          errors.push({ path: 'externalUrl', message: 'Enter a valid HTTP or HTTPS URL.' })
        }
        if (errors.length) throw new ValidationError({ collection: 'posts', errors, req })
        return data
      }) satisfies CollectionBeforeValidateHook,
    ],
  },
  versions: { drafts: true },
}
