import Image from 'next/image'
import Link from 'next/link'
import SearchButton from '../../components/SearchButton'
import { services } from '../../data/content'

export const metadata = { title: 'Services | Workhour Business', description: 'Website design, content animation, and SEO and marketing services.' }

export default function ServicesPage() {
  return <>
    <header className="site-header"><Link href="/" className="brand" aria-label="Workhour Business home"><Image src="/workhour-business-logo.jpeg" alt="Workhour Business" width={267} height={56} /></Link><nav className="nav review-nav" aria-label="Main navigation"><Link href="/about">About Us</Link><Link href="/businesses">Businesses</Link><Link href="/announcements">Announcement</Link><Link href="/careers">Careers</Link><Link href="/news-media">News &amp; Media</Link><Link href="/global-presence">Global Presence</Link><details className="nav-dropdown services-dropdown"><summary className="nav-link">Services <span aria-hidden="true">⌄</span></summary><div className="dropdown"><Link href="/services">All services</Link>{services.map(s => <Link key={s.slug} href={`/services/${s.slug}`}>{s.title}</Link>)}</div></details><SearchButton /><Link className="contact-button" href="/contact">Contact Us</Link></nav></header>
    <main className="review-page services-page"><div className="review-inner">
      <p className="eyebrow teal">Workhour Business / Services</p><h1>Make your next move work harder.</h1><p className="review-intro">Digital services shaped around your customers, content, and growth goals.</p>
      <div className="services-index">{services.map((service, i) => <article key={service.slug}><span>0{i + 1}</span><h2>{service.title}</h2><p>{service.intro}</p><Link className="text-link" href={`/services/${service.slug}`}>Explore service <span aria-hidden="true">↗</span></Link></article>)}</div>
      <section className="services-contact"><p className="eyebrow teal">Start a conversation</p><h2>Tell us what your business needs.</h2><p>Share your goals with the Workhour Business team.</p><Link className="button button-dark" href="/contact">Enquire about a service <span aria-hidden="true">↗</span></Link></section>
    </div></main>
    <ServicesFooter />
  </>
}

export function ServicesFooter() { return <footer className="footer section-pad"><div className="footer-top"><Image src="/workhour-business-logo.jpeg" alt="Workhour Business" width={267} height={56} /><p>WorkHour Business - we power your complete business journey.</p></div><div className="footer-links"><div><small>Services</small><Link href="/services">All services</Link>{services.map(s => <Link key={s.slug} href={`/services/${s.slug}`}>{s.title}</Link>)}</div><div><small>Explore</small><Link href="/about">About Us</Link><Link href="/businesses">Businesses</Link><Link href="/careers">Careers</Link><Link href="/global-presence">Global Presence</Link></div><div><small>Connect</small><Link href="/contact">Contact Us</Link><Link href="/announcements">Announcement</Link><Link href="/news-media">News &amp; Media</Link></div></div><div className="footer-bottom"><span>© Workhour Business</span><span>Design preview · No production claims</span></div></footer> }
