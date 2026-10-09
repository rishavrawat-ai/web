import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

import config from '@payload-config'
import type { Business, Media } from '../../../../payload-types'

export const dynamic = 'force-dynamic'

const fallbackImages: Record<string, string> = {
  'go-travel-global': '/business-gotravel.webp',
  inceptura: '/business-inceptura.webp',
  employaa: '/business-employaa.webp',
  remunerax: '/business-remunerax.webp',
  thinkrunspace: '/business-thinkrunspace.webp',
  'leaders-pinnacle': '/business-leaders-pinnacle.webp',
  elevatrain: '/business-elevatrain.webp',
}

function mediaURL(value: number | Media | null | undefined) {
  return typeof value === 'object' && value ? value.url : null
}

export default async function BusinessDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'businesses',
    depth: 1,
    draft: false,
    limit: 100,
    overrideAccess: false,
    pagination: false,
    sort: 'displayOrder',
    user: null,
    where: { _status: { equals: 'published' } },
  })
  const businesses = result.docs.filter((business) => business._status === 'published') as Business[]
  const business = businesses.find((item) => item.slug === slug)

  if (!business) notFound()

  const image = mediaURL(business.image) ?? fallbackImages[business.slug] ?? null
  const paragraphs = (business.detailedIntroduction || business.homepageIntroduction)
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)

  return (
    <>
      <header className="brand-detail-header">
        <Link href="/" aria-label="Workhour Business home">
          <Image src="/workhour-business-logo.jpeg" alt="Workhour Business" width={534} height={111} priority />
        </Link>
        <Link className="text-link" href="/#businesses">All businesses <span aria-hidden="true">↗</span></Link>
      </header>
      <main className="review-page brand-detail-page">
        <div className="review-inner">
          <Link className="brand-back-link" href="/#businesses">← Back to all businesses</Link>
          <p className="eyebrow teal">Workhour Business / Our businesses</p>
          <h1>{business.name}</h1>
          <p className="review-intro">{business.homepageIntroduction}</p>
          {image ? (
            <div className="brand-page-image">
              <Image src={image} alt={`${business.name} business`} fill sizes="(max-width: 700px) 100vw, 70vw" priority />
            </div>
          ) : null}
          <section className="about-content brand-detail-copy" aria-labelledby="business-detail-heading">
            <p className="eyebrow teal">Business overview</p>
            <h2 id="business-detail-heading">{business.name}</h2>
            {paragraphs.map((paragraph, index) => <p key={`${index}-${paragraph.slice(0, 30)}`}>{paragraph}</p>)}
          </section>
          {business.brandSiteUrl ? <p><a className="button button-dark" href={business.brandSiteUrl}>Visit {business.name} site <span aria-hidden="true">↗</span></a></p> : null}
          <nav className="brand-switcher" aria-label="Other published businesses">
            {businesses.map((item) => (
              <Link key={item.id} href={`/businesses/${item.slug}`} aria-current={item.id === business.id ? 'page' : undefined}>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </main>
    </>
  )
}
