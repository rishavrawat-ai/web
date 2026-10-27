'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { businesses, media, services } from '../data/content'
import { brandSites, brandHref, serviceSlug } from '../data/brand-sites'
import { getBrandServiceCopy } from '../data/brand-service-content'
import { aboutSections } from '../data/about'

const searchable = [
  ...aboutSections.map(section => ({ title: section.label, body: `${section.intro} ${section.paragraphs.join(' ')}`, href: `/about/${section.slug}`, type: 'About Us' })),
  ...businesses.map(item => ({ title: item.name, body: `${item.intro} ${item.detail}`, href: `/businesses/${item.slug}`, type: 'Business' })),
  ...brandSites.flatMap(brand => [
    { title: `${brand.name} brand site`, body: `${brand.name} ${brand.strapline} home about contact`, href: brandHref(brand), type: 'Brand site' },
    ...brand.services.map(title => ({ title, body: `${brand.name} ${brand.menuLabel} ${getBrandServiceCopy(brand, title)?.overview ?? title}`, href: `${brandHref(brand)}/${brand.menuLabel.toLowerCase()}/${serviceSlug(title)}`, type: brand.menuLabel })),
  ]),
  ...media.map(item => ({ title: item.title, body: `${item.kicker} ${item.text}`, href: item.href, type: item.kicker })),
  ...services.map(item => ({ title: item.title, body: `${item.intro} ${item.description}`, href: `/services/${item.slug}`, type: 'Service' })),
  { title: 'Services', body: 'Website designing content animation SEO marketing digital services', href: '/services', type: 'Page' },
  { title: 'About Workhour', body: 'Our story impact responsible business presence vision mission', href: '/about', type: 'Page' },
  { title: 'Careers', body: 'Careers capabilities businesses service areas', href: '/careers', type: 'Page' },
  { title: 'Contact Us', body: 'Find a service area businesses', href: '/contact', type: 'Page' },
  { title: 'Global Presence', body: 'Market groupings Asia India Malaysia Oceania Australia Middle East UAE Africa Kenya Zimbabwe Malawi Rwanda North America Canada Mexico', href: '/global-presence', type: 'Page' },
  { title: 'Announcement', body: 'IGNITIA leadership innovation Africa featured announcement', href: '/announcements/ignitia', type: 'Page' },
]

export default function SearchButton() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  useEffect(() => {
    if (!open) return
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [open])
  const results = query.trim() ? searchable.filter(item => `${item.title} ${item.body}`.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 7) : []
  return <>
    <button type="button" className="search-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="site-search-panel">Search <span aria-hidden="true">⌕</span></button>
    {open && <div className="search-panel" id="site-search-panel"><label htmlFor="site-search">Search Workhour Business</label><input id="site-search" autoFocus value={query} onChange={event => setQuery(event.target.value)} placeholder="Search businesses, services, or stories" />{query.trim() ? results.length ? <ul className="search-results">{results.map(result => <li key={`${result.type}-${result.title}`}><Link href={result.href} onClick={() => setOpen(false)}><small>{result.type}</small><strong>{result.title}</strong><span aria-hidden="true">↗</span></Link></li>)}</ul> : <p className="search-empty">No matching pages or businesses.</p> : <span>Search the site content</span>}</div>}
  </>
}
