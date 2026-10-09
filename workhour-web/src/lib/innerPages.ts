import { getPayload } from 'payload'

import config from '@payload-config'
import type { Page, Post, Service } from '../payload-types'

/** Public Local API reads must run collection access as an anonymous published visitor. */
export async function getPublishedInnerContent(): Promise<{ pages: Page[]; services: Service[]; posts: Post[] }> {
  const payload = await getPayload({ config })
  const [pageResult, serviceResult, postResult] = await Promise.all([
    payload.find({
      collection: 'pages',
      depth: 2,
      draft: false,
      limit: 200,
      pagination: false,
      overrideAccess: false,
      user: null,
      where: { _status: { equals: 'published' } },
      sort: 'displayOrder',
    }),
    payload.find({
      collection: 'services',
      depth: 2,
      draft: false,
      limit: 200,
      pagination: false,
      overrideAccess: false,
      user: null,
      where: { _status: { equals: 'published' } },
      sort: 'title',
    }),
    payload.find({
      collection: 'posts',
      depth: 2,
      draft: false,
      limit: 1000,
      pagination: false,
      overrideAccess: false,
      user: null,
      where: { _status: { equals: 'published' } },
      sort: '-publicationDate',
    }),
  ])
  return {
    pages: pageResult.docs.filter((page) => page._status === 'published'),
    services: serviceResult.docs.filter((service) => service._status === 'published'),
    posts: postResult.docs.filter((post) => post._status === 'published'),
  }
}
