import { getPayload, type Payload } from 'payload'

import config from '@payload-config'
import type { Business, Homepage } from '../payload-types'

function relationID(value: number | Business): number | null {
  return typeof value === 'number' ? value : value?.id ?? null
}

/**
 * Read only the public, published homepage and business content.
 * Keep Local API access checks enabled and explicitly use an anonymous user;
 * this matters because Local API operations otherwise bypass access by default.
 */
export async function readPublishedHomepageContent(
  payload: Pick<Payload, 'findGlobal' | 'find'>,
): Promise<{
  homepage: Homepage | null
  businesses: Business[]
}> {
  const [homepage, publishedBusinesses] = await Promise.all([
    payload.findGlobal({
      slug: 'homepage',
      depth: 2,
      draft: false,
      overrideAccess: false,
      user: null,
    }),
    payload.find({
      collection: 'businesses',
      depth: 1,
      draft: false,
      limit: 100,
      pagination: false,
      overrideAccess: false,
      sort: 'displayOrder',
      user: null,
      where: { _status: { equals: 'published' } },
    }),
  ])

  // The global access rule also filters to published. Keep this guard as a
  // second explicit boundary before handing content to the public page.
  const publishedHomepage = homepage?._status === 'published' ? homepage : null
  const businessesByID = new Map(
    publishedBusinesses.docs
      .filter((business) => business._status === 'published')
      .map((business) => [business.id, business]),
  )

  const selectedIDs = (publishedHomepage?.businesses ?? [])
    .map(({ business }) => relationID(business))
    .filter((id): id is number => id !== null)
  const selectedBusinesses = selectedIDs
    .map((id) => businessesByID.get(id))
    .filter((business): business is Business => Boolean(business))

  return {
    homepage: publishedHomepage,
    // The homepage relation controls the order when populated. If an editor
    // has not selected businesses yet, show the published collection order.
    businesses: selectedIDs.length ? selectedBusinesses : [...businessesByID.values()],
  }
}

export async function getPublishedHomepageData() {
  const payload = await getPayload({ config })
  return readPublishedHomepageContent(payload)
}
