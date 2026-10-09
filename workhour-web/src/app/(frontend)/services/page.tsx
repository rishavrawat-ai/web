import { notFound } from 'next/navigation'

import { InnerPageShell } from '../../../components/inner/InnerPageShell'
import { PageContent } from '../../../components/inner/PageContent'
import { getPublishedInnerContent } from '../../../lib/innerPages'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function ServicesIndexPage() {
  const { pages, services } = await getPublishedInnerContent()
  const page = pages.find((item) => item.slug === 'services')
  if (!page) notFound()
  const searchPages = pages.map((item) => ({ title: item.title, body: `${item.introduction} ${item.body ?? ''}`, href: `/${item.slug}`, type: 'Page' }))
  return <InnerPageShell services={services} pages={searchPages}>
    <div className="service-index-page"><PageContent page={page} />
      <section className="review-page services-listing" aria-labelledby="published-services-heading"><div className="review-inner">
        <h2 id="published-services-heading">Our services</h2>
        {services.length ? <div className="services-index">{services.map((service, index) => <article key={service.id}>
          <span>0{index + 1}</span><h3>{service.title}</h3>{service.summary ? <p>{service.summary}</p> : <p>{service.introduction}</p>}
          <Link className="text-link" href={`/services/${service.slug}`}>Explore service <span aria-hidden="true">↗</span></Link>
        </article>)}</div> : <p className="empty-state">No services have been published yet.</p>}
        <section className="services-contact"><p className="eyebrow teal">Start a conversation</p><h2>Tell us what your business needs.</h2><p>Share your goals with the Workhour Business team.</p><Link className="button button-dark" href="/contact">Enquire about a service <span aria-hidden="true">↗</span></Link></section>
      </div></section>
    </div>
  </InnerPageShell>
}
