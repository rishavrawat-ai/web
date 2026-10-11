'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import SearchButton from './SearchButton'
import { brandHref, brandSites } from '../data/brand-sites'
import { services } from '../data/content'

export default function MainHeader() {
  const [open, setOpen] = useState(false)
  return <header className="site-header"><Link href="/" className="brand" aria-label="Workhour Business home"><Image src="/workhour-business-logo.jpeg" alt="Workhour Business" width={534} height={111} priority /></Link><button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="main-navigation" aria-label={open ? 'Close navigation' : 'Open navigation'}>{open ? 'Close' : 'Menu'}</button><nav id="main-navigation" className={open ? 'nav open' : 'nav'} aria-label="Main navigation">
    <details className="nav-dropdown"><summary className="nav-link">About Us <span aria-hidden="true">⌄</span></summary><div className="dropdown"><Link href="/about#history">Our Story</Link><Link href="/about#impact">Our Impact</Link><Link href="/about#csr">Responsible Business</Link><Link href="/about#presence">Presence</Link></div></details>
    <details className="nav-dropdown"><summary className="nav-link">Businesses <span aria-hidden="true">⌄</span></summary><div className="dropdown"><Link href="/businesses">All businesses</Link>{brandSites.map(brand => <Link href={`/businesses/${brand.slug}`} key={brand.slug}>{brand.name}</Link>)}</div></details>
    <details className="nav-dropdown"><summary className="nav-link">Brand sites <span aria-hidden="true">⌄</span></summary><div className="dropdown">{brandSites.map(brand => <Link href={brandHref(brand)} key={brand.slug}>{brand.name}</Link>)}</div></details>
    <Link className="nav-link" href="/announcements" onClick={() => setOpen(false)}>Announcement</Link><Link className="nav-link" href="/careers" onClick={() => setOpen(false)}>Careers</Link><Link className="nav-link" href="/news-media" onClick={() => setOpen(false)}>News &amp; Media</Link><Link className="nav-link" href="/global-presence" onClick={() => setOpen(false)}>Global Presence</Link>
    <details className="nav-dropdown services-dropdown"><summary className="nav-link">Services <span aria-hidden="true">⌄</span></summary><div className="dropdown"><Link href="/services">All services</Link>{services.map(service => <Link href={`/services/${service.slug}`} key={service.slug}>{service.title}</Link>)}</div></details>
    <SearchButton /><Link className="contact-button" href="/contact" onClick={() => setOpen(false)}>Contact Us <span aria-hidden="true">↗</span></Link>
  </nav></header>
}
