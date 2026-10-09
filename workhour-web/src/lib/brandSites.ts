import { createLocalReq, getPayload } from 'payload'

import config from '@payload-config'
import type { BrandPage, Business } from '../payload-types'
import { configuredHostForBrand } from './brandHosts'

function relationID(value: number | Business | null | undefined): number | null {
  return typeof value === 'number' ? value : value && typeof value === 'object' ? Number(value.id) : null
}

async function makePublicRequest(payload: Awaited<ReturnType<typeof getPayload>>, brandSlug: string) {
  const host = configuredHostForBrand(brandSlug)
  if (!host) return null
  const reqHeaders = new Headers({ host, 'x-brand-site-host': host })
  return createLocalReq({ req: { headers: reqHeaders, user: null } }, payload)
}

export async function getResolvedBrandSite(brandSlug: string): Promise<{ business: Business; services: BrandPage[] } | null> {
  const payload = await getPayload({ config })
  const req = await makePublicRequest(payload, brandSlug)
  if (!req) return null
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
  const services = result.docs.filter((page) => page._status === 'published'
    && page.pageType === 'service'
    && relationID(page.business) === Number(business.id))

  return { business, services }
}

export async function getPublishedBrandPage(business: Business, brandSlug: string, slug: string, pageType: 'page' | 'service'): Promise<BrandPage | null> {
  const payload = await getPayload({ config })
  const req = await makePublicRequest(payload, brandSlug)
  if (!req) return null
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
  return result.docs.find((page) => page._status === 'published'
    && page.pageType === pageType
    && page.slug === slug
    && relationID(page.business) === Number(business.id)) ?? null
}
