'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MouseEvent as ReactMouseEvent, useEffect, useRef, useState } from 'react'
import { aboutSections } from '../data/about-sections'
import { brandHref, brandSites } from '../data/brand-sites'
import { services } from '../data/content'
import SearchButton from './SearchButton'
import styles from './MainHeader.module.css'

export default function MainHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null)
  const headerRef = useRef<HTMLElement>(null)

  function closeMenus() {
    headerRef.current?.querySelectorAll<HTMLDetailsElement>('details[open]').forEach((details) => { details.open = false })
    setHoveredMenu(null)
  }

  function closeOtherMenus(current: HTMLDetailsElement) {
    headerRef.current?.querySelectorAll<HTMLDetailsElement>('details[open]').forEach((details) => {
      if (details !== current && !details.contains(current)) details.open = false
    })
  }

  function handleSummaryClick(event: ReactMouseEvent<HTMLElement>) {
    const details = event.currentTarget.parentElement
    if (details instanceof HTMLDetailsElement) closeOtherMenus(details)
    setHoveredMenu(null)
  }

  useEffect(() => {
    function handlePointerDown(event: globalThis.PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) {
        closeMenus()
        setMenuOpen(false)
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return
      const openDetails = Array.from(headerRef.current?.querySelectorAll<HTMLDetailsElement>('details[open]') ?? [])
      const lastOpen = openDetails.at(-1)
      if (lastOpen) {
        event.preventDefault()
        lastOpen.open = false
        lastOpen.querySelector('summary')?.focus()
        setHoveredMenu(null)
      } else if (menuOpen) {
        event.preventDefault()
        setMenuOpen(false)
        headerRef.current?.querySelector<HTMLButtonElement>('button[aria-controls="main-navigation"]')?.focus()
      }
    }
    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [menuOpen])

  function handleLinkClick() {
    closeMenus()
    setMenuOpen(false)
  }

  return <header className={styles.header} ref={headerRef}>
    <Link href="/" className={styles.brand} aria-label="Workhour Business home" onClick={handleLinkClick}>
      <Image src="/workhour-business-logo.jpeg" alt="Workhour Business" width={534} height={111} priority />
    </Link>
    <button className={styles.menuToggle} type="button" onClick={() => setMenuOpen((current) => !current)} aria-expanded={menuOpen} aria-controls="main-navigation" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>{menuOpen ? 'Close' : 'Menu'}</button>
    <nav id="main-navigation" className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`} aria-label="Main navigation">
      <details className={styles.navDropdown} data-hovered={hoveredMenu === 'about'} onMouseEnter={() => setHoveredMenu('about')} onMouseLeave={() => setHoveredMenu(null)}>
        <summary className={styles.navLink} onClick={handleSummaryClick}>About Us <span aria-hidden="true">⌄</span></summary>
        <div className={`${styles.dropdown} ${styles.aboutDropdown}`}>{aboutSections.map(({ id, title }) => <Link href={`/about#${id}`} key={id} onClick={handleLinkClick}>{title}</Link>)}</div>
      </details>
      <details className={styles.navDropdown} data-hovered={hoveredMenu === 'businesses'} onMouseEnter={() => setHoveredMenu('businesses')} onMouseLeave={() => setHoveredMenu(null)}>
        <summary className={styles.navLink} onClick={handleSummaryClick}>Businesses <span aria-hidden="true">⌄</span></summary>
        <div className={`${styles.dropdown} ${styles.businessDropdown}`}>
          <Link href="/businesses" onClick={handleLinkClick}>All businesses</Link>
          <details className={styles.nestedDropdown} data-hovered={hoveredMenu === 'services'} onMouseEnter={() => setHoveredMenu('services')} onMouseLeave={() => setHoveredMenu(null)}>
            <summary className={styles.nestedSummary} onClick={handleSummaryClick}>Services <span aria-hidden="true">›</span></summary>
            <div className={styles.nestedMenu}><Link href="/services" onClick={handleLinkClick}>All services</Link>{services.map((service) => <Link href={`/services/${service.slug}`} key={service.slug} onClick={handleLinkClick}>{service.title}</Link>)}</div>
          </details>
          {brandSites.map((brand) => <Link href={brandHref(brand)} key={brand.slug} onClick={handleLinkClick}>{brand.name}</Link>)}
        </div>
      </details>
      <details className={styles.navDropdown} data-hovered={hoveredMenu === 'brand-sites'} onMouseEnter={() => setHoveredMenu('brand-sites')} onMouseLeave={() => setHoveredMenu(null)}>
        <summary className={styles.navLink} onClick={handleSummaryClick}>Brand sites <span aria-hidden="true">⌄</span></summary>
        <div className={styles.dropdown}>{brandSites.map((brand) => <Link href={brandHref(brand)} key={brand.slug} onClick={handleLinkClick}>{brand.name}</Link>)}</div>
      </details>
      <Link className={styles.navLink} href="/announcements" onClick={handleLinkClick}>Announcement</Link>
      <Link className={styles.navLink} href="/careers" onClick={handleLinkClick}>Careers</Link>
      <Link className={styles.navLink} href="/news-media" onClick={handleLinkClick}>News &amp; Media</Link>
      <Link className={styles.navLink} href="/global-presence" onClick={handleLinkClick}>Global Presence</Link>
      <SearchButton />
      <Link className={styles.contactButton} href="/contact" onClick={handleLinkClick}>Contact Us <span aria-hidden="true">↗</span></Link>
    </nav>
  </header>
}
