'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export type BrandNavService = { title: string; slug: string }

type Props = {
  name: string
  logo?: { url: string; alt: string; width?: number | null; height?: number | null } | null
  services: BrandNavService[]
}

const mainLinks = [
  { title: 'Home', href: '/' },
  { title: 'About', href: '/about' },
  { title: 'Contact', href: '/contact' },
  { title: 'Our Global Reach', href: '/global-reach' },
]

export function BrandSiteHeader({ name, logo, services }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return <header className="brand-site-header">
    <Link className="brand-site-logo" href="/" aria-label={`${name} home`} onClick={closeMenu}>
      {logo ? <Image src={logo.url} alt={logo.alt || name} width={logo.width || 360} height={logo.height || 110} priority /> : <span>{name}</span>}
    </Link>
    <button className="brand-menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="brand-site-navigation" onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? 'Close' : 'Menu'}</button>
    <nav id="brand-site-navigation" className={menuOpen ? 'brand-site-nav is-open' : 'brand-site-nav'} aria-label={`${name} navigation`}>
      {mainLinks.slice(0, 2).map((item) => <Link href={item.href} key={item.href} onClick={closeMenu}>{item.title}</Link>)}
      <details className="brand-services-dropdown">
        <summary>Services <span aria-hidden="true">⌄</span></summary>
        <div className="brand-services-menu">
          <Link href="/services" onClick={closeMenu}>All services</Link>
          {services.length ? services.map((service) => <Link href={`/services/${service.slug}`} key={service.slug} onClick={closeMenu}>{service.title}</Link>) : <span>No service details published yet.</span>}
        </div>
      </details>
      {mainLinks.slice(2).map((item) => <Link href={item.href} key={item.href} onClick={closeMenu}>{item.title}</Link>)}
    </nav>
  </header>
}
