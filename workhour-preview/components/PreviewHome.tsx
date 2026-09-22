'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { businesses, heroSlides, media, values } from '../data/content'

const logo = '/workhour-business-logo.jpeg'

function Arrow() { return <span aria-hidden="true">↗</span> }

function Header() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState(false)
  return <>
    <div className="preview-bar">Design preview <span>·</span> Content and imagery remain subject to client approval</div>
    <header className="site-header">
      <Link href="/" className="brand" aria-label="Workhour Business home"><Image src={logo} alt="Workhour Business" width={534} height={111} priority /></Link>
      <button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation">{open ? 'Close' : 'Menu'}</button>
      <nav className={open ? 'nav open' : 'nav'} aria-label="Main navigation">
        <div className="nav-dropdown"><button className="nav-link">About Us <span>⌄</span></button><div className="dropdown"><Link href="/about">Our History</Link><Link href="/about#impact">Our Impact</Link><Link href="/about#presence">Presence</Link></div></div>
        <div className="nav-dropdown"><button className="nav-link">Businesses <span>⌄</span></button><div className="dropdown"><Link href="/businesses">All businesses</Link>{businesses.slice(0, 3).map(b => <Link key={b.slug} href={`/businesses#${b.slug}`}>{b.name}</Link>)}</div></div>
        <Link className="nav-link" href="/announcements">Announcement</Link><Link className="nav-link" href="/careers">Careers</Link><Link className="nav-link" href="/news-media">News &amp; Media</Link>
        <button className="search-button" onClick={() => setSearch(!search)} aria-expanded={search}>Search <span>⌕</span></button><Link className="contact-button" href="/contact">Contact Us <Arrow /></Link>
      </nav>
    </header>
    {search && <div className="search-panel"><label htmlFor="preview-search">Search preview content</label><input id="preview-search" autoFocus placeholder="Try “Inceptura” or “mindfulness”" /><span>Local preview search only</span></div>}
  </>
}

function Hero() {
  const [active, setActive] = useState(0); const [paused, setPaused] = useState(false)
  useEffect(() => { if (paused) return; const id = window.setInterval(() => setActive(v => (v + 1) % heroSlides.length), 5000); return () => window.clearInterval(id) }, [paused])
  return <section className="hero section-pad"><Image className="hero-image" src={heroSlides[active].image} alt={`${heroSlides[active].headline} — illustrative corporate scene`} fill sizes="100vw" priority={active === 0} /><div className="hero-overlay" aria-hidden="true" /><div className="hero-orbit" aria-hidden="true"><i /><i /><i /></div><div className="hero-copy"><p className="eyebrow">Workhour Business / 2026</p><div className="hero-counter">{heroSlides[active].number} <span>/ 04</span></div><h1>{heroSlides[active].headline}</h1><p className="hero-sub">Business capability for the complete journey — from the first idea to the next horizon.</p><Link className="button button-light" href="/about">About Us <Arrow /></Link><div className="hero-controls"><button onClick={() => setActive((active + heroSlides.length - 1) % heroSlides.length)} aria-label="Previous slide">←</button>{heroSlides.map((s, i) => <button key={s.number} className={i === active ? 'dot active' : 'dot'} onClick={() => setActive(i)} aria-label={`Go to slide ${i + 1}`} />)}<button onClick={() => setActive((active + 1) % heroSlides.length)} aria-label="Next slide">→</button><button className="pause" onClick={() => setPaused(!paused)} aria-label={paused ? 'Resume slideshow' : 'Pause slideshow'}>{paused ? 'Play' : 'Pause'}</button></div></div><div className="hero-aside"><span>01</span><div className="hero-line" /><span>Global ambition<br />meets determined action</span></div></section>
}

function BusinessShowcase() { const [active, setActive] = useState(0); const b = businesses[active]; return <section className="business-section section-pad" id="businesses"><div className="section-intro"><p className="eyebrow teal">Our businesses</p><h2>One group.<br /><em>Many ways forward.</em></h2><p>Seven specialist businesses, connected by one ambition: to make progress more possible for the people and organisations we work with.</p></div><div className="business-layout"><div className="business-list" role="tablist" aria-label="Businesses">{businesses.map((item, i) => <button key={item.slug} role="tab" aria-selected={active === i} className={active === i ? 'business-tab active' : 'business-tab'} onClick={() => setActive(i)}><span>0{i + 1}</span>{item.name}<Arrow /></button>)}</div><div className="business-feature" role="tabpanel"><div className={`business-art art-${active}`}><Image src={b.image} alt={`${b.name} illustrative business scene`} fill sizes="(max-width: 700px) 100vw, 35vw" /><div className="business-image-overlay" aria-hidden="true" /><span>{b.mark}</span></div><div className="business-detail"><p className="eyebrow">{String(active + 1).padStart(2, '0')} / 07</p><h3>{b.name}</h3><p>{b.intro}</p><p className="detail-muted">{b.detail}</p><Link className="text-link" href={`/businesses#${b.slug}`}>Discover {b.name} <Arrow /></Link></div></div></div></section> }

function Values() { return <section className="values-section"><div className="values-head section-pad"><p className="eyebrow teal">What moves us</p><h2>The work is complex.<br /><em>The direction is clear.</em></h2></div><div className="value-grid">{values.map((v, i) => <article className={`value value-${i}`} key={v.display}><span className="value-no">0{i + 1}</span><h3>{v.display}</h3><p>{v.text}</p><small>Source heading: {v.original}</small></article>)}</div></section> }

function MediaSection() { return <><section className="announcement section-pad"><div><p className="eyebrow teal">Featured announcement</p><h2>IGNITA is a signal<br /><em>of what comes next.</em></h2></div><div className="announcement-copy"><p>Final announcement copy is not yet supplied. This preview holds the editorial space without inventing a claim, event description or asset.</p><Link className="text-link" href="/announcements">View announcements <Arrow /></Link></div></section><section className="media-section section-pad"><div className="media-head"><div><p className="eyebrow teal">News &amp; media</p><h2>Ideas worth<br /><em>carrying forward.</em></h2></div><Link className="text-link" href="/news-media">All news &amp; media <Arrow /></Link></div><div className="media-grid">{media.map(item => <article className={`media-card ${item.tone}`} key={item.title}><div className="media-visual"><span>{item.title === 'IGNITA' ? 'I' : '·'}</span></div><p className="eyebrow">{item.kicker}</p><h3>{item.title}</h3><p>{item.text}</p><Link className="text-link" href="/news-media">{item.link} <Arrow /></Link></article>)}</div></section></> }

function Footer() { return <><section className="newsletter section-pad"><div><p className="eyebrow">Stay in the loop</p><h2>Make room for<br /><em>what’s next.</em></h2></div><div><p>Newsletter delivery is not connected in this design preview.</p><div className="fake-form"><input aria-label="Email address" placeholder="Your email address" disabled /><button disabled>Subscribe <Arrow /></button></div><small>By subscribing, you acknowledge this preview does not submit data.</small></div></section><footer className="footer section-pad"><div className="footer-top"><Image src={logo} alt="Workhour Business" width={267} height={56} /><p>WorkHour Business - we power your complete business journey.</p></div><div className="footer-links"><div><small>Explore</small><Link href="/about">About Us</Link><Link href="/businesses">Businesses</Link><Link href="/careers">Careers</Link></div><div><small>Connect</small><Link href="/announcements">Announcement</Link><Link href="/news-media">News &amp; Media</Link><Link href="/contact">Contact Us</Link></div><div><small>Social</small><span className="muted">Links to be supplied</span><span className="muted">Legal links to be supplied</span></div></div><div className="footer-bottom"><span>© Workhour Business</span><span>Design preview · No production claims</span></div></footer></> }

export default function PreviewHome() { return <><Header /><main><Hero /><section className="intro section-pad"><p className="eyebrow teal">The Workhour approach</p><h2>Together<br /><em>We Thrive</em></h2><p className="intro-statement">WorkHour Business - we power your complete business journey.</p><div className="intro-mark">WH<span>+</span></div></section><BusinessShowcase /><Values /><MediaSection /></main><Footer /></> }
