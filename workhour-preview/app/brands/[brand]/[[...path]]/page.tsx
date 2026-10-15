import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BrandPreview from '../../../../components/BrandPreview'
import { brandSites, getBrand, getBrandService, serviceSlug } from '../../../../data/brand-sites'
import { getBrandServiceCopy } from '../../../../data/brand-service-content'
import { businesses } from '../../../../data/content'

export const dynamicParams = false

export function generateStaticParams() {
  return brandSites.flatMap((brand) => [
    { brand: brand.slug, path: [] },
    { brand: brand.slug, path: ['about'] },
    { brand: brand.slug, path: ['contact'] },
    { brand: brand.slug, path: [brand.menuLabel.toLowerCase()] },
    ...(brand.includeReach ? [{ brand: brand.slug, path: ['our-global-reach'] }] : []),
    ...brand.services.map((title) => ({ brand: brand.slug, path: [brand.menuLabel.toLowerCase(), serviceSlug(title)] })),
  ])
}

export async function generateMetadata({ params }: { params: Promise<{ brand: string; path?: string[] }> }): Promise<Metadata> {
  const { brand: slug, path = [] } = await params
  const brand = getBrand(slug)
  if (!brand) return { title: 'Business' }
  const business = businesses.find((item) => item.slug === slug)
  const serviceTitle = path.length === 2 ? getBrandService(brand, path[1]) : undefined
  const description = serviceTitle ? getBrandServiceCopy(brand, serviceTitle)?.overview : business?.intro
  const title = serviceTitle ?? path.at(-1)?.replaceAll('-', ' ') ?? brand.name
  return { title: `${title} | ${brand.name}`, description }
}

export default async function BrandPage({ params }: { params: Promise<{ brand: string; path?: string[] }> }) {
  const { brand, path = [] } = await params
  if (!getBrand(brand)) notFound()
  return <BrandPreview brandSlug={brand} path={path} />
}
