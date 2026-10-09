import Image from 'next/image'
import Link from 'next/link'
import SearchButton from '../../components/SearchButton'
import { globalPresence, services } from '../../data/content'

export const metadata = {
  title: 'Global Presence | Workhour Business',
  description: 'Provisional country groupings for Workhour Business, pending client confirmation.',
}

export default function GlobalPresencePage() {
  return <>
    <header className="site-header"><Link href="/" className="brand"><Image src="/workhour-business-logo.jpeg" alt="Workhour Business" width={267} height={56} /></Link><nav className="nav review-nav" aria-label="Main navigation"><Link href="/about">About Us</Link><Link href="/businesses">Businesses</Link><Link href="/announcements">Announcement</Link><Link href="/careers">Careers</Link><Link href="/news-media">News &amp; Media</Link><Link href="/global-presence">Global Presence</Link><details className="nav-dropdown services-dropdown"><summary className="nav-link">Services <span aria-hidden="true">⌄</span></summary><div className="dropdown"><Link href="/services">All services</Link>{services.map(s => <Link key={s.slug} href={`/services/${s.slug}`}>{s.title}</Link>)}</div></details><SearchButton /><Link className="contact-button" href="/contact">Contact Us</Link></nav></header>
    <main className="review-page"><div className="review-inner">
      <p className="eyebrow teal">Where we work</p><h1>Global presence</h1><p className="review-intro">The country groupings below are provisional and pending client confirmation.</p>
      <div className="presence-grid">{globalPresence.map(({ region, countries }) => <section className="presence-card" key={region} aria-labelledby={`presence-${region.toLowerCase().replaceAll(' ', '-')}`}><p className="eyebrow teal">Region</p><h2 id={`presence-${region.toLowerCase().replaceAll(' ', '-')}`}>{region}</h2><ul className="presence-countries">{countries.map(country => <li key={country}>{country}</li>)}</ul></section>)}</div>
      <p className="empty-note">These are country groupings only; no office addresses or specific city locations are confirmed here.</p>
    </div></main>
  </>
}
