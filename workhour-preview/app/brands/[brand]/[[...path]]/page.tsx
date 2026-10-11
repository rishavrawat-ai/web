import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BrandPreview from '../../../../components/BrandPreview'
import { brandSites, getBrand, serviceSlug } from '../../../../data/brand-sites'

export function generateStaticParams() {
  return brandSites.flatMap((brand) => [
    { brand: brand.slug },
    { brand: brand.slug, path: ['about'] },
    { brand: brand.slug, path: ['contact'] },
    { brand: brand.slug, path: [brand.menuLabel.toLowerCase()] },
    ...(brand.includeReach ? [{ brand: brand.slug, path: ['our-global-reach'] }] : []),
    ...brand.services.map((title) => ({
      brand: brand.slug,
      path: [brand.menuLabel.toLowerCase(), serviceSlug(title)],
    })),
  ])
}

export async function generateMetadata({ params }: { params: Promise<{ brand: string; path?: string[] }> }): Promise<Metadata> {
  const { brand: slug, path = [] } = await params
  const brand = getBrand(slug)
  if (!brand) return { title: 'Brand preview' }
  return { title: `${path.at(-1)?.replaceAll('-', ' ') ?? brand.name} | ${brand.name}`, description: `${brand.name} brand-site design preview.` }
}

export default async function BrandPage({ params }: { params: Promise<{ brand: string; path?: string[] }> }) {
  const { brand, path = [] } = await params
  if (!getBrand(brand)) notFound()
  return <BrandPreview brandSlug={brand} path={path} />
}
