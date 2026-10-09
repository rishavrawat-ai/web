import { headers } from 'next/headers'
import { createLocalReq, getPayload } from 'payload'

import config from '@payload-config'
import type { BrandPage, Business } from '../payload-types'
import { resolveBrandSlug } from './brandHosts'

function relationID(value: number | Business | null | undefined): number | null {
  return typeof value === 'number' ? value : value && typeof value === 'object' ? Number(value.id) : null
}

async function makePublicRequest(payload: Awaited<ReturnType<typeof getPayload>>) {
  const incomingHeaders = await headers()
  return createLocalReq({ req: { headers: new Headers(incomingHeaders), user: null } }, payload)
}

export async function getResolvedBrandSite(): Promise<{ business: Business; services: BrandPage[] } | null> {
  const requestHeaders = await headers()
  const brandSlug = resolveBrandSlug(requestHeaders.get('x-brand-site-host') ?? requestHeaders.get('host'))
  console.log('[brand-host-check]', requestHeaders.get('host'), requestHeaders.get('x-brand-site-host'), brandSlug)
  if (!brandSlug) return null

  const payload = await getPayload({ config })
  const reqHeaders = new Headers(requestHeaders)
  reqHeaders.set('x-brand-site-host', requestHeaders.get('x-brand-site-host') ?? requestHeaders.get('host') ?? '')
  const req = await createLocalReq({ req: { headers: reqHeaders, user: null } }, payload)
  const businesses = await payload.find({
    collection: 'businesses',
    depth: 2,
    draft: false,
    limit: 1,
    pagination: false,
    overrideAccess: false,
    req,
    user: null,
    where: { and: [{ slug: { equals: brandSlug } }, { _status: { equals: 'published' } }] },
  })
  const business = businesses.docs.find((item) => item._status === 'published' && item.slug === brandSlug)
  console.log('[brand-business-check]', businesses.docs.map(({ slug, _status }) => [slug, _status]))
  if (!business) return null

  const result = await payload.find({
    collection: 'brand-pages',
    depth: 2,
    draft: false,
    limit: 200,
    pagination: false,
    overrideAccess: false,
    req,
    user: null,
    where: { and: [
      { business: { equals: business.id } },
      { pageType: { equals: 'service' } },
      { _status: { equals: 'published' } },
    ] },
    sort: 'displayOrder',
  })
  console.log('[brand-service-check]', result.totalDocs)
  const services = result.docs.filter((page) => page._status === 'published'
    && page.pageType === 'service'
    && relationID(page.business) === Number(business.id))

  return { business, services }
}

export async function getPublishedBrandPage(business: Business, slug: string, pageType: 'page' | 'service'): Promise<BrandPage | null> {
  const payload = await getPayload({ config })
  const req = await makePublicRequest(payload)
  const result = await payload.find({
    collection: 'brand-pages',
    depth: 2,
    draft: false,
    limit: 1,
    pagination: false,
    overrideAccess: false,
    req,
    user: null,
    where: { and: [
      { business: { equals: business.id } },
      { slug: { equals: slug } },
      { pageType: { equals: pageType } },
      { _status: { equals: 'published' } },
    ] },
  })
  console.log('[brand-page-check]', slug, pageType, result.docs.map(({ slug: pageSlug, _status }) => [pageSlug, _status]))
  return result.docs.find((page) => page._status === 'published'
    && page.pageType === pageType
    && page.slug === slug
    && relationID(page.business) === Number(business.id)) ?? null
}
