import type { GlobalConfig } from 'payload'

import { authenticated, publishedOrAuthenticated } from '../access/contentAccess'

const linkFields = [
  {
    name: 'label',
    type: 'text' as const,
  },
  {
    name: 'url',
    type: 'text' as const,
  },
]

const optionalImageFields = [
  {
    name: 'image',
    type: 'upload' as const,
    relationTo: 'media' as const,
  },
  ...linkFields,
]

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  access: {
    read: publishedOrAuthenticated,
    update: authenticated,
  },
  fields: [
    {
      name: 'heroSlides',
      type: 'array',
      fields: [
        {
          name: 'headline',
          type: 'text',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'ctaLabel',
          type: 'text',
          defaultValue: 'About Us',
        },
        {
          name: 'ctaUrl',
          type: 'text',
        },
      ],
    },
    {
      name: 'intro',
      type: 'group',
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'businesses',
      type: 'array',
      fields: [
        {
          name: 'business',
          type: 'relationship',
          relationTo: 'businesses',
          required: true,
        },
      ],
    },
    {
      name: 'valuePanels',
      type: 'array',
      maxRows: 3,
      minRows: 3,
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'featuredAnnouncement',
      type: 'group',
      fields: [
        {
          name: 'heading',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        ...optionalImageFields,
      ],
    },
    {
      name: 'mediaCards',
      type: 'array',
      maxRows: 3,
      minRows: 3,
      fields: [
        {
          name: 'heading',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        ...optionalImageFields,
      ],
    },
  ],
  versions: {
    drafts: true,
  },
}
