import type { Access, Where } from 'payload'
import { resolveBrandSlug } from '../lib/brandHosts'

export const authenticated: Access = ({ req }) => Boolean(req.user)

export const publishedOrAuthenticated: Access = ({ req }) => {
  if (req.user) {
    return true
  }

  return {
    _status: {
      equals: 'published',
    },
  }
}

function requestBrandSlug(req: { headers?: Headers | null }): string | null {
  const hostBrand = resolveBrandSlug(req.headers?.get('host'))
  if (!hostBrand) return null
  const forwardedBrand = resolveBrandSlug(req.headers?.get('x-brand-site-host'))
  if (forwardedBrand && forwardedBrand !== hostBrand) return null
  return hostBrand
}

export const publishedBusinessesByHost: Access = ({ req }) => {
  if (req.user) return true
  const brandSlug = requestBrandSlug(req)
  if (!brandSlug) return { _status: { equals: 'published' } } satisfies Where
  const where: Where = {
    and: [
      { slug: { equals: brandSlug } },
      { _status: { equals: 'published' } },
    ],
  }
  return where
}

export const publishedBrandPagesByHost: Access = async ({ req }) => {
  if (req.user) return true
  const brandSlug = requestBrandSlug(req)
  if (!brandSlug) return false
  const businesses = await req.payload.find({
    collection: 'businesses',
    depth: 0,
    draft: false,
    limit: 1,
    overrideAccess: false,
    pagination: false,
    req,
    user: null,
    where: { and: [{ slug: { equals: brandSlug } }, { _status: { equals: 'published' } }] },
  })
  const business = businesses.docs.find((item) => item.slug === brandSlug && item._status === 'published')
  if (!business) return false
  const where: Where = {
    and: [
      { business: { equals: business.id } },
      { _status: { equals: 'published' } },
    ],
  }
  return where
}
