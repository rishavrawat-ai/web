'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import SearchButton from './SearchButton'
import { brandHref, brandSites } from '../data/brand-sites'
import { services } from '../data/content'

function NavDropdown({ label, active, onOpen, onClose, onNavigate, children }: {
  label: string
  active: boolean
  onOpen: () => void
  onClose: () => void
  onNavigate: () => void
  children: ReactNode
}) {
  const trigger = useRef<HTMLElement>(null)
  return <details className="nav-dropdown" open={active}
    onPointerEnter={event => { if (event.pointerType === 'mouse') onOpen() }}
    onPointerLeave={event => { if (event.pointerType === 'mouse') onClose() }}
    onBlur={event => {
      // Let the next trigger handle the switch so mobile rows do not move mid-tap.
      if (event.relatedTarget instanceof HTMLElement && event.relatedTarget.matches('.nav-link')) return
      if (!event.currentTarget.contains(event.relatedTarget)) onClose()
    }}
    onKeyDown={event => { if (event.key === 'Escape') { event.preventDefault(); onClose(); trigger.current?.focus() } }}>
    <summary ref={trigger} className="nav-link" aria-expanded={active}
      onClick={event => {
        event.preventDefault()
        // Hover already opens the desktop menu; clicking its title keeps it usable.
        if (event.detail > 0 && window.matchMedia('(hover: hover) and (pointer: fine)').matches) onOpen()
        else if (active) onClose()
        else onOpen()
      }}>{label} <span aria-hidden="true">&#8964;</span></summary>
    <div className="dropdown" onClick={event => { if ((event.target as HTMLElement).closest('a')) onNavigate() }}>{children}</div>
  </details>
}

export default function MainHeader() {
  const [open, setOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const header = useRef<HTMLElement>(null)
  const closeNavigation = () => { setOpen(false); setActiveDropdown(null) }
  useEffect(() => {
    const dismiss = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setActiveDropdown(null)
    }
    document.addEventListener('pointerdown', dismiss)
    return () => document.removeEventListener('pointerdown', dismiss)
  }, [])
  const dropdownProps = (label: string) => ({
    label, active: activeDropdown === label,
    onOpen: () => setActiveDropdown(label),
    onClose: () => setActiveDropdown(current => current === label ? null : current),
    onNavigate: closeNavigation,
  })
  return <header ref={header} className="site-header managed-navigation"><Link href="/" className="brand" aria-label="Workhour Business home"><Image src="/workhour-business-logo.jpeg" alt="Workhour Business" width={534} height={111} priority /></Link><button className="menu-toggle" onClick={() => { setOpen(!open); setActiveDropdown(null) }} aria-expanded={open} aria-controls="main-navigation" aria-label={open ? 'Close navigation' : 'Open navigation'}>{open ? 'Close' : 'Menu'}</button><nav id="main-navigation" className={open ? 'nav open' : 'nav'} aria-label="Main navigation">
    <NavDropdown {...dropdownProps("About Us")}><Link href="/about/our-story">Our Story</Link><Link href="/about/our-impact">Our Impact</Link><Link href="/about/responsible-business">Responsible Business</Link><Link href="/about/presence">Presence</Link></NavDropdown>
    <NavDropdown {...dropdownProps("Portfolio")}><Link href="/businesses">All businesses</Link>{brandSites.map(brand => <Link href={`/businesses/${brand.slug}`} key={brand.slug}>{brand.name}</Link>)}</NavDropdown>
    <NavDropdown {...dropdownProps("Brand sites")}>{brandSites.map(brand => <Link href={brandHref(brand)} key={brand.slug}>{brand.name}</Link>)}</NavDropdown>
    <Link className="nav-link" href="/announcements" onClick={closeNavigation}>Announcement</Link><Link className="nav-link" href="/careers" onClick={closeNavigation}>Careers</Link><Link className="nav-link" href="/news-media" onClick={closeNavigation}>News &amp; Media</Link><Link className="nav-link" href="/global-presence" onClick={closeNavigation}>Global Presence</Link>
    <NavDropdown {...dropdownProps("Services")}><Link href="/services">All services</Link>{services.map(service => <Link href={`/services/${service.slug}`} key={service.slug}>{service.title}</Link>)}</NavDropdown>
    <SearchButton /><Link className="contact-button" href="/contact" onClick={closeNavigation}>Contact Us <span aria-hidden="true">↗</span></Link>
  </nav></header>
}
