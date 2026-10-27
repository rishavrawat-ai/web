import { describe, expect, it, vi } from 'vitest'

import { authenticated, publishedBrandPagesByHost, publishedBusinessesByHost, publishedOrAuthenticated } from '../../src/access/contentAccess'
import { readPublishedHomepageContent } from '../../src/lib/homepage'
import type { Business, Homepage } from '../../src/payload-types'

describe('public CMS access rules', () => {
  it('limits anonymous reads to published records', () => {
    expect(publishedOrAuthenticated({ req: { user: null } } as never)).toEqual({
      _status: { equals: 'published' },
    })
  })

  it('does not limit authenticated reads to published records', () => {
    expect(publishedOrAuthenticated({ req: { user: { id: 1 } } } as never)).toBe(true)
  })

  it('denies anonymous CMS writes', () => {
    expect(authenticated({ req: { user: null } } as never)).toBe(false)
  })

  it('allows authenticated CMS writes', () => {
    expect(authenticated({ req: { user: { id: 1 } } } as never)).toBe(true)
  })

  it('does not let a forged forwarded brand header override the actual host', async () => {
    const req = { user: null, headers: new Headers({ host: 'inceptura.localhost', 'x-brand-site-host': 'remunerax.localhost' }) }
    expect(publishedBusinessesByHost({ req } as never)).toEqual({ _status: { equals: 'published' } })
    expect(await publishedBrandPagesByHost({ req } as never)).toBe(false)
  })

  it('uses anonymous Local API access and excludes draft content', async () => {
    const homepage = {
      id: 1,
      _status: 'published',
      businesses: [{ business: 11 }, { business: 12 }],
    } as Homepage
    const publishedBusiness = {
      id: 11,
      name: 'Published business',
      slug: 'published-business',
      homepageIntroduction: 'Published introduction',
      displayOrder: 1,
      _status: 'published',
    } as Business
    const draftBusiness = {
      ...publishedBusiness,
      id: 12,
      name: 'Draft business',
      slug: 'draft-business',
      _status: 'draft',
    } as Business
    const findGlobal = vi.fn().mockResolvedValue(homepage)
    const find = vi.fn().mockResolvedValue({ docs: [publishedBusiness, draftBusiness] })

    const content = await readPublishedHomepageContent({ findGlobal, find } as never)

    expect(findGlobal).toHaveBeenCalledWith(expect.objectContaining({
      slug: 'homepage',
      draft: false,
      overrideAccess: false,
      user: null,
    }))
    expect(find).toHaveBeenCalledWith(expect.objectContaining({
      collection: 'businesses',
      draft: false,
      overrideAccess: false,
      user: null,
      where: { _status: { equals: 'published' } },
    }))
    expect(content.homepage?._status).toBe('published')
    expect(content.businesses.map(({ slug }) => slug)).toEqual(['published-business'])
  })

  it('returns no homepage when the Local API supplies a draft global', async () => {
    const findGlobal = vi.fn().mockResolvedValue({ id: 1, _status: 'draft' })
    const find = vi.fn().mockResolvedValue({ docs: [] })

    const content = await readPublishedHomepageContent({ findGlobal, find } as never)

    expect(content.homepage).toBeNull()
    expect(content.businesses).toEqual([])
  })
})
