'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'

export type InnerNavService = { title: string; slug: string; introduction: string; summary?: string | null }
export type InnerSearchEntry = { title: string; body: string; href: string; type: string }

export function InnerSiteHeader({ services, searchEntries }: { services: InnerNavService[]; searchEntries: InnerSearchEntry[] }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const results = useMemo(() => {
    const term = query.trim().toLowerCase()
    return term ? searchEntries.filter((entry) => `${entry.title} ${entry.body}`.toLowerCase().includes(term)).slice(0, 7) : []
  }, [query, searchEntries])

  const closeMenu = () => setMenuOpen(false)

  return <>
    <header className="site-header">
      <Link href="/" className="brand" aria-label="Workhour Business home">
        <Image src="/workhour-business-logo.jpeg" alt="Workhour Business" width={534} height={111} priority />
      </Link>
      <button className="menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="inner-navigation" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>
        {menuOpen ? 'Close' : 'Menu'}
      </button>
      <nav id="inner-navigation" className={menuOpen ? 'nav inner-nav open' : 'nav inner-nav'} aria-label="Main navigation">
        <Link className="nav-link" href="/about" onClick={closeMenu}>About Us</Link>
        <Link className="nav-link" href="/#businesses" onClick={closeMenu}>Businesses</Link>
        <details className="nav-dropdown">
          <summary className="nav-link">Services <span aria-hidden="true">⌄</span></summary>
          <div className="dropdown">
            <Link href="/services" onClick={closeMenu}>All services</Link>
            {services.map((service) => <Link href={`/services/${service.slug}`} key={service.slug} onClick={closeMenu}>{service.title}</Link>)}
          </div>
        </details>
        <Link className="nav-link" href="/announcements" onClick={closeMenu}>Announcement</Link>
        <Link className="nav-link" href="/careers" onClick={closeMenu}>Careers</Link>
        <Link className="nav-link" href="/news-media" onClick={closeMenu}>News &amp; Media</Link>
        <Link className="nav-link" href="/global-presence" onClick={closeMenu}>Global Presence</Link>
        <button className="search-button" type="button" onClick={() => setSearchOpen((open) => !open)} aria-expanded={searchOpen} aria-controls="inner-search-panel">Search <span aria-hidden="true">⌕</span></button>
        <Link className="contact-button" href="/contact" onClick={closeMenu}>Contact Us <span aria-hidden="true">↗</span></Link>
      </nav>
    </header>
    {searchOpen && <div className="search-panel" id="inner-search-panel">
      <label htmlFor="inner-site-search">Search Workhour Business</label>
      <input id="inner-site-search" autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search pages, services and news" />
      {query.trim() ? results.length ? <ul className="search-results">{results.map((result) => <li key={`${result.type}-${result.href}`}><Link href={result.href} onClick={() => setSearchOpen(false)}><small>{result.type}</small><strong>{result.title}</strong><span aria-hidden="true">↗</span></Link></li>)}</ul> : <p className="search-empty">No matching published content.</p> : <span>Search published pages, services and news</span>}
    </div>}
  </>
}
