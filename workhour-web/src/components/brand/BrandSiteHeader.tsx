'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export type BrandNavService = { title: string; slug: string }

type Props = {
  name: string
  logo?: { url: string; alt: string; width?: number | null; height?: number | null } | null
  services: BrandNavService[]
  serviceMenuLabel: string
  showGlobalReach: boolean
}

export function BrandSiteHeader({ name, logo, services, serviceMenuLabel, showGlobalReach }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return <header className="brand-site-header">
    <Link className="brand-site-logo" href="/" aria-label={`${name} home`} onClick={closeMenu}>
      {logo ? <Image src={logo.url} alt={logo.alt || name} width={logo.width || 360} height={logo.height || 110} priority /> : <span>{name}</span>}
    </Link>
    <button className="brand-menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="brand-site-navigation" onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? 'Close' : 'Menu'}</button>
    <nav id="brand-site-navigation" className={menuOpen ? 'brand-site-nav is-open' : 'brand-site-nav'} aria-label={`${name} navigation`}>
      <Link href="/" onClick={closeMenu}>Home</Link>
      <Link href="/about" onClick={closeMenu}>About</Link>
      <details className="brand-services-dropdown">
        <summary>{serviceMenuLabel}<span aria-hidden="true">⌄</span></summary>
        <div className="brand-services-menu">
          <Link href="/services" onClick={closeMenu}>All {serviceMenuLabel.toLowerCase()}</Link>
          {services.length ? services.map((service) => <Link href={`/services/${service.slug}`} key={service.slug} onClick={closeMenu}>{service.title}</Link>) : <span>No service details published yet.</span>}
        </div>
      </details>
      <Link href="/contact" onClick={closeMenu}>Contact</Link>
      {showGlobalReach ? <Link href="/global-reach" onClick={closeMenu}>Our Global Reach</Link> : null}
    </nav>
  </header>
}
