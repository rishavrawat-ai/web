import Image from 'next/image'
import Link from 'next/link'

import type { BrandPage, Media } from '../../payload-types'
import type { BrandNavService } from './BrandSiteHeader'

function publishedImage(value: number | Media | null | undefined): value is Media {
  return Boolean(value && typeof value === 'object' && value._status === 'published' && value.url)
}

export function BrandPageContent({ page, brandName, services = [] }: { page: BrandPage; brandName: string; services?: BrandNavService[] }) {
  const hasDetails = Boolean(page.summary || page.introduction || page.sections?.length)
  const servicePage = page.pageType === 'service'

  return <main className={`brand-content-page${page.slug === 'home' ? ' brand-home-page' : ''}`}>
    <div className="brand-content-inner">
      <p className="brand-content-eyebrow">{page.eyebrow || brandName}</p>
      <h1>{page.title}</h1>
      {page.summary ? <p className="brand-content-summary">{page.summary}</p> : null}
      {page.introduction ? <p className="brand-content-introduction">{page.introduction}</p> : null}
      {page.slug === 'services' ? <ServicesListing services={services} label={page.title} /> : null}
      {page.sections?.length ? <div className="brand-content-sections">
        {page.sections.map((section, index) => <section key={section.id ?? `${section.heading}-${index}`}>
          <h2>{section.heading}</h2>
          {section.body ? <p>{section.body}</p> : null}
          {(section.paragraphs ?? []).map((paragraph, paragraphIndex) => <p key={paragraph.id ?? paragraphIndex}>{paragraph.text}</p>)}
          {section.items?.length ? <ul>{section.items.map((item, itemIndex) => <li key={item.id ?? `${item.title}-${itemIndex}`}><strong>{item.title}</strong>{item.text ? <span>{item.text}</span> : null}</li>)}</ul> : null}
          {publishedImage(section.image) ? <Image className="brand-page-image" src={section.image.url!} alt={section.image.alt || section.heading} width={section.image.width || 1200} height={section.image.height || 800} sizes="(max-width: 700px) 100vw, 70vw" /> : null}
          {section.cta?.label && section.cta.url ? <p><Link className="brand-text-link" href={section.cta.url}>{section.cta.label} <span aria-hidden="true">↗</span></Link></p> : null}
        </section>)}
      </div> : null}
      {!hasDetails && page.slug === 'global-reach' ? <p className="brand-empty-state">{brandName}-specific location information has not been supplied.</p> : null}
      {!hasDetails && page.slug === 'contact' ? <p className="brand-empty-state">{brandName} contact details have not been supplied.</p> : null}
      {!hasDetails && servicePage ? <p className="brand-empty-state">A description for this service has not been supplied.</p> : null}
      {!hasDetails && !['global-reach', 'contact', 'services'].includes(page.slug) && !servicePage ? <p className="brand-empty-state">Details to be supplied.</p> : null}
    </div>
  </main>
}

function ServicesListing({ services, label }: { services: BrandNavService[]; label: string }) {
  return services.length ? <section className="brand-service-listing" aria-labelledby="brand-service-list-heading">
    <h2 id="brand-service-list-heading">{label}</h2>
    <div className="brand-service-grid">{services.map((service) => <article key={service.slug}>
      <h3>{service.title}</h3><Link className="brand-text-link" href={`/services/${service.slug}`}>Explore service <span aria-hidden="true">↗</span></Link>
    </article>)}</div>
  </section> : <p className="brand-empty-state">No service descriptions have been published yet.</p>
}
