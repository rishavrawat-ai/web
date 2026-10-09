import Image from 'next/image'
import Link from 'next/link'
import SearchButton from '../../../components/SearchButton'
import { notFound } from 'next/navigation'
import { businesses, businessSupplements, services } from '../../../data/content'
import { businessContent, homepageBusinessIntros } from '../../../data/business-content'

export function generateStaticParams() {
  return businesses.map(({ slug }) => ({ slug }))
}

export default async function BusinessPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const business = businesses.find(item => item.slug === slug)
  if (!business) notFound()
  const structuredCopy = businessContent[slug]

  return <>
    <header className="site-header"><Link href="/" className="brand"><Image src="/workhour-business-logo.jpeg" alt="Workhour Business" width={267} height={56} /></Link><nav className="nav review-nav" aria-label="Main navigation"><Link href="/about">About Us</Link><Link href="/businesses">Businesses</Link><Link href="/announcements">Announcement</Link><Link href="/careers">Careers</Link><Link href="/news-media">News &amp; Media</Link><Link href="/global-presence">Global Presence</Link><details className="nav-dropdown services-dropdown"><summary className="nav-link">Services <span aria-hidden="true">⌄</span></summary><div className="dropdown"><Link href="/services">All services</Link>{services.map(s => <Link key={s.slug} href={`/services/${s.slug}`}>{s.title}</Link>)}</div></details><SearchButton /><Link className="contact-button" href="/contact">Contact Us</Link></nav></header>
    <main className="review-page"><div className="review-inner">
      <p className="eyebrow teal">Workhour Business / Our businesses</p>
      <section className="brand-page-hero"><Image src={business.image} alt={`${business.name} illustrative business scene`} fill sizes="100vw" priority /><div className="hero-overlay" aria-hidden="true" /><div className="brand-page-hero-copy"><p className="eyebrow">Business {String(businesses.indexOf(business) + 1).padStart(2, '0')} / 07</p><h1>{business.name}</h1><p>{homepageBusinessIntros[slug] ?? business.intro}</p></div></section>
      {structuredCopy ? structuredCopy.map(section => <section className="about-content business-copy-section" key={section.title}><h2>{section.title}</h2>{section.paragraphs?.map((paragraph, index) => <p key={index}>{paragraph}</p>)}{section.bullets && <ul className="brand-bullets">{section.bullets.map(item => <li key={item}>{item}</li>)}</ul>}</section>) : <><section className="about-content"><h2>{business.name}</h2><p>{business.detail}</p></section>{[...(business.sections ?? []), ...(businessSupplements[slug]?.sections ?? [])].map((section, index) => <section className="about-content" key={index}><p>{section}</p></section>)}{[...(business.bullets ?? []), ...(businessSupplements[slug]?.bullets ?? [])].length > 0 && <section className="about-content"><h2>Key capabilities</h2><ul className="brand-bullets">{[...(business.bullets ?? []), ...(businessSupplements[slug]?.bullets ?? [])].map((item, index) => <li key={index}>{item}</li>)}</ul></section>}</>}
      <section className="about-content"><h2>Explore the group</h2><div className="brand-switcher">{businesses.filter(item => item.slug !== slug).map(item => <Link href={`/businesses/${item.slug}`} key={item.slug}>{item.name} ↗</Link>)}</div></section>
      <section className="about-content brand-contact-cta"><h2>Let’s move your business forward.</h2><p>Connect with Workhour Business to explore how {business.name} can support your requirements.</p><Link className="button button-dark" href="/contact">Contact Us ↗</Link></section><Link className="text-link" href="/businesses">All businesses ↗</Link>
    </div></main>
  </>
}
