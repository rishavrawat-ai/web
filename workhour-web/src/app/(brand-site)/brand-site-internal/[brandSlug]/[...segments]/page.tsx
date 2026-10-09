import { notFound } from 'next/navigation'

import { BrandPageContent } from '../../../../../components/brand/BrandPageContent'
import { BrandSiteFrame } from '../../../../../components/brand/BrandSiteFrame'
import { configuredHostForBrand } from '../../../../../lib/brandHosts'
import { getPublishedBrandPage, getResolvedBrandSite } from '../../../../../lib/brandSites'

export const dynamic = 'force-dynamic'

export default async function BrandRoutedPage({ params }: { params: Promise<{ brandSlug: string; segments: string[] }> }) {
  const { brandSlug, segments } = await params
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(brandSlug) || !configuredHostForBrand(brandSlug)) notFound()
  const site = await getResolvedBrandSite(brandSlug)
  if (!site) notFound()

  let slug: string
  let pageType: 'page' | 'service'
  if (segments.length === 1) {
    slug = segments[0]
    pageType = 'page'
  } else if (segments.length === 2 && segments[0] === 'services') {
    slug = segments[1]
    pageType = 'service'
  } else {
    notFound()
  }

  const page = await getPublishedBrandPage(site.business, brandSlug, slug, pageType)
  if (!page) notFound()

  const services = site.services.map((service) => ({ title: service.title, slug: service.slug }))
  return <BrandSiteFrame business={site.business} services={services}>
    <BrandPageContent page={page} brandName={site.business.name} services={services} />
  </BrandSiteFrame>
}
