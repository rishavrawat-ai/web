import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import SearchButton from '../../../components/SearchButton'
import { services } from '../../../data/content'
import { ServicesFooter } from '../page'
import { brandSites, brandHref } from '../../../data/brand-sites'

const serviceIllustrations: Record<string, string> = {
  'website-designing': '/service-web-design.webp',
  'content-animation': '/service-content-motion.webp',
  'seo-marketing': '/service-search-growth.webp',
}

export function generateStaticParams() { return services.map(service => ({ slug: service.slug })) }
export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => { const service = services.find(item => item.slug === slug); return { title: service ? `${service.title} | Workhour Business` : 'Service | Workhour Business', description: service?.intro } })
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = services.find(item => item.slug === slug)
  if (!service) notFound()
  return <>
    <header className="site-header"><Link href="/" className="brand" aria-label="Workhour Business home"><Image src="/workhour-business-logo.jpeg" alt="Workhour Business" width={267} height={56} /></Link><nav className="nav review-nav" aria-label="Main navigation"><Link href="/about">About Us</Link><Link href="/businesses">Businesses</Link><details className="nav-dropdown"><summary className="nav-link">Brand sites⌄</summary><div className="dropdown">{brandSites.map(brand => <Link href={brandHref(brand)} key={brand.slug}>{brand.name}</Link>)}</div></details><Link href="/announcements">Announcement</Link><Link href="/careers">Careers</Link><Link href="/news-media">News &amp; Media</Link><Link href="/global-presence">Global Presence</Link><details className="nav-dropdown services-dropdown"><summary className="nav-link">Services <span aria-hidden="true">⌄</span></summary><div className="dropdown"><Link href="/services">All services</Link>{services.map(s => <Link key={s.slug} href={`/services/${s.slug}`}>{s.title}</Link>)}</div></details><SearchButton /><Link className="contact-button" href="/contact">Contact Us</Link></nav></header>
    <main className="review-page service-detail-page"><div className="review-inner">
      <p className="eyebrow teal"><Link href="/services">Services</Link> / Workhour Business</p><h1>{service.title}</h1><p className="review-intro">{service.description}</p><p className="service-lead">{service.intro}</p>
      <div className="service-detail-illustration"><Image src={serviceIllustrations[service.slug]} alt={`${service.title} abstract navy and teal illustration`} fill sizes="(max-width: 800px) 100vw, 75vw" priority /></div>
      <nav className="about-jumps" aria-label={`${service.title} sections`}>{service.sections.map((section, i) => <a href={`#service-section-${i}`} key={section.title}>{section.title}</a>)}</nav>
      <div className="service-detail-sections">{service.sections.map((section, i) => <section className="about-content service-content" id={`service-section-${i}`} key={section.title}><p className="eyebrow teal">{String(i + 1).padStart(2, '0')} / {service.title}</p><h2>{section.title}</h2><p>{section.text}</p></section>)}</div>
      <section className="services-contact"><p className="eyebrow teal">Next step</p><h2>Let’s talk about your goals.</h2><p>Contact the Workhour Business team to discuss this service.</p><Link className="button button-dark" href="/contact">Enquire about {service.title} <span aria-hidden="true">↗</span></Link></section>
      <nav className="service-switcher" aria-label="Other services"><Link href="/services">All services</Link>{services.filter(s => s.slug !== service.slug).map(s => <Link href={`/services/${s.slug}`} key={s.slug}>{s.title} <span aria-hidden="true">↗</span></Link>)}</nav>
    </div></main><ServicesFooter />
  </>
}
