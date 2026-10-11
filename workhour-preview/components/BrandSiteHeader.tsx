'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { BrandSite } from '../data/brand-sites'
import { brandHref, serviceSlug } from '../data/brand-sites'

export default function BrandSiteHeader({ brand }: { brand: BrandSite }) {
  const [open, setOpen] = useState(false)
  const base = brandHref(brand)
  return <>
    <div className="preview-bar">Independent brand-site preview <span>·</span> Copy and imagery remain subject to client approval</div>
    <header className="brand-site-header">
      <Link href={base} className="brand-site-wordmark" aria-label={`${brand.name} home`}><span className="brand-site-mark">{brand.mark}</span><span>{brand.name}</span></Link>
      <button className="brand-menu-toggle" aria-expanded={open} aria-controls="brand-site-navigation" onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'}</button>
      <nav id="brand-site-navigation" className={open ? 'brand-site-nav open' : 'brand-site-nav'} aria-label={`${brand.name} navigation`}>
        <Link href={base} onClick={() => setOpen(false)}>Home</Link><Link href={`${base}/about`} onClick={() => setOpen(false)}>About</Link>
        <details><summary>{brand.menuLabel}</summary><div className="brand-site-menu"><Link href={`${base}/${brand.menuLabel.toLowerCase()}`} onClick={() => setOpen(false)}>All {brand.menuLabel.toLowerCase()}</Link>{brand.services.map((title) => <Link key={title} href={`${base}/${brand.menuLabel.toLowerCase()}/${serviceSlug(title)}`} onClick={() => setOpen(false)}>{title}</Link>)}</div></details>
        {brand.includeReach && <Link href={`${base}/our-global-reach`} onClick={() => setOpen(false)}>Our Global Reach</Link>}
        <Link className="brand-site-contact" href={`${base}/contact`} onClick={() => setOpen(false)}>Contact <span aria-hidden="true">↗</span></Link>
      </nav>
    </header>
  </>
}
