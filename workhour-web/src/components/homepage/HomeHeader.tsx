'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'

import type { HomepageBusiness, SearchEntry } from './types'

function Arrow() {
  return <span aria-hidden="true">↗</span>
}

type HomeHeaderProps = {
  businesses: HomepageBusiness[]
  searchEntries: SearchEntry[]
}

export function HomeHeader({ businesses, searchEntries }: HomeHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) return []
    return searchEntries
      .filter((entry) => `${entry.title} ${entry.body}`.toLowerCase().includes(normalizedQuery))
      .slice(0, 6)
  }, [query, searchEntries])

  return (
    <>
      <div className="preview-bar">
        Design preview <span>·</span> Content and imagery remain subject to client approval
      </div>
      <header className="site-header">
        <Link href="/" className="brand" aria-label="Workhour Business home">
          <Image
            src="/workhour-business-logo.jpeg"
            alt="Workhour Business"
            width={534}
            height={111}
            priority
          />
        </Link>
        <button
          className="menu-toggle"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
        <nav
          className={menuOpen ? 'nav open' : 'nav'}
          id="main-navigation"
          aria-label="Main navigation"
        >
          <div className="nav-dropdown">
            <a className="nav-link" href="#approach" onClick={() => setMenuOpen(false)}>
              About Us <span aria-hidden="true">⌄</span>
            </a>
            <div className="dropdown">
              <a href="#approach" onClick={() => setMenuOpen(false)}>The Workhour approach</a>
            </div>
          </div>
          <div className="nav-dropdown">
            <a className="nav-link" href="#businesses" onClick={() => setMenuOpen(false)}>
              Businesses <span aria-hidden="true">⌄</span>
            </a>
            <div className="dropdown">
              <a href="#businesses" onClick={() => setMenuOpen(false)}>All businesses</a>
              {businesses.map((business) => (
                <a key={business.id} href="#businesses" onClick={() => setMenuOpen(false)}>
                  {business.name}
                </a>
              ))}
            </div>
          </div>
          <a className="nav-link" href="#announcements" onClick={() => setMenuOpen(false)}>
            Announcement
          </a>
          <a className="nav-link" href="#news-media" onClick={() => setMenuOpen(false)}>
            News &amp; Media
          </a>
          <button
            className="search-button"
            type="button"
            onClick={() => setSearchOpen((open) => !open)}
            aria-expanded={searchOpen}
            aria-controls="homepage-search"
          >
            Search <span aria-hidden="true">⌕</span>
          </button>
          <a className="contact-button" href="#businesses" onClick={() => setMenuOpen(false)}>
            Explore <Arrow />
          </a>
        </nav>
      </header>
      {searchOpen && (
        <div className="search-panel" id="homepage-search">
          <label htmlFor="preview-search">Search Workhour Business</label>
          <input
            id="preview-search"
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search businesses and stories"
          />
          {query.trim() ? (
            results.length ? (
              <ul className="search-results">
                {results.map((result) => (
                  <li key={`${result.type}-${result.title}`}>
                    <a href={result.href} onClick={() => setSearchOpen(false)}>
                      <small>{result.type}</small>
                      <strong>{result.title}</strong>
                      <Arrow />
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="search-empty">No matching published content.</p>
            )
          ) : (
            <span>Search published businesses and stories</span>
          )}
        </div>
      )}
    </>
  )
}
