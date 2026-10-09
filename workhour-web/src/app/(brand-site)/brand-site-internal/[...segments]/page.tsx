import { notFound } from 'next/navigation'

import { BrandPageContent } from '../../../../components/brand/BrandPageContent'
import { BrandSiteFrame } from '../../../../components/brand/BrandSiteFrame'
import { getPublishedBrandPage, getResolvedBrandSite } from '../../../../lib/brandSites'

export const dynamic = 'force-dynamic'

export default async function BrandRoutedPage({ params }: { params: Promise<{ segments: string[] }> }) {
  const [{ segments }, site] = await Promise.all([params, getResolvedBrandSite()])
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

  const page = await getPublishedBrandPage(site.business, slug, pageType)
  if (!page) notFound()

  const services = site.services.map((service) => ({ title: service.title, slug: service.slug }))
  return <BrandSiteFrame business={site.business} services={services}>
    <BrandPageContent page={page} brandName={site.business.name} services={services} />
  </BrandSiteFrame>
}
