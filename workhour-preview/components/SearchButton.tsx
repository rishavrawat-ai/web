'use client'

import Link from 'next/link'
import { useState } from 'react'
import { businesses, media, services } from '../data/content'
import { businessContent, homepageBusinessIntros } from '../data/business-content'

const searchable = [
  ...businesses.map(item => ({ title: item.name, body: `${homepageBusinessIntros[item.slug] ?? item.intro} ${businessContent[item.slug]?.map(section => `${section.title} ${section.paragraphs?.join(' ') ?? ''} ${section.bullets?.join(' ') ?? ''}`).join(' ') ?? `${item.detail} ${item.sections?.join(' ') ?? ''}`}`, href: `/businesses/${item.slug}`, type: 'Business' })),
  ...media.map(item => ({ title: item.title, body: `${item.kicker} ${item.text}`, href: item.href, type: item.kicker })),
  ...services.map(item => ({ title: item.title, body: `${item.intro} ${item.description} ${item.sections.map(section => `${section.title} ${section.text}`).join(' ')}`, href: `/services/${item.slug}`, type: 'Service' })),
  { title: 'Services', body: 'Website designing content animation SEO marketing digital services', href: '/services', type: 'Page' },
  { title: 'About Workhour', body: 'Our history awards certifications impact corporate social responsibility presence vision mission', href: '/about', type: 'Page' },
  { title: 'Careers', body: 'Jobs benefits values global exposure learning culture apply now', href: '/careers', type: 'Page' },
  { title: 'Contact Us', body: 'Get in touch enquiry office email phone', href: '/contact', type: 'Page' },
  { title: 'Global Presence', body: 'Provisional country groupings Asia India Malaysia Oceania Australia Middle East UAE Africa Kenya Zimbabwe Malawi Rwanda North America Canada Mexico pending confirmation', href: '/global-presence', type: 'Page' },
  { title: 'Announcement', body: 'IGNITA featured announcement', href: '/announcements#ignita', type: 'Page' },
]

export default function SearchButton() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const results = query.trim() ? searchable.filter(item => `${item.title} ${item.body}`.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 7) : []

  return <>
    <button className="search-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="site-search-panel">Search <span aria-hidden="true">⌕</span></button>
    {open && <div className="search-panel" id="site-search-panel"><label htmlFor="site-search">Search Workhour Business</label><input id="site-search" autoFocus value={query} onChange={event => setQuery(event.target.value)} placeholder="Search businesses, services, or stories" />{query.trim() ? results.length ? <ul className="search-results">{results.map(result => <li key={`${result.type}-${result.title}`}><Link href={result.href} onClick={() => setOpen(false)}><small>{result.type}</small><strong>{result.title}</strong><span aria-hidden="true">↗</span></Link></li>)}</ul> : <p className="search-empty">No matching pages or businesses.</p> : <span>Search the site content</span>}</div>}
  </>
}
