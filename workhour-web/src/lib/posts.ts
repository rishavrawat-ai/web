import { getPayload } from 'payload'

import config from '@payload-config'
import type { Post } from '../payload-types'

export type PostType = 'announcement' | 'news-media'
const pageSize = 10

function publishedOnly(docs: Post[]): Post[] {
  return docs.filter((post) => post._status === 'published')
}

/** Public Local API reads are anonymous, published-only, and uncached. */
export async function getPublishedPostListing(type: PostType, requestedPage: number) {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'posts',
    depth: 2,
    draft: false,
    limit: pageSize,
    page: requestedPage,
    pagination: true,
    overrideAccess: false,
    user: null,
    where: { and: [{ type: { equals: type } }, { _status: { equals: 'published' } }] },
    sort: '-publicationDate',
  })
  return { ...result, docs: publishedOnly(result.docs) }
}

export async function getPublishedPost(type: PostType, slug: string): Promise<Post | null> {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'posts',
    depth: 2,
    draft: false,
    limit: 1,
    pagination: false,
    overrideAccess: false,
    user: null,
    where: { and: [{ type: { equals: type } }, { slug: { equals: slug } }, { entryKind: { equals: 'internal' } }, { _status: { equals: 'published' } }] },
  })
  return publishedOnly(result.docs)[0] ?? null
}
