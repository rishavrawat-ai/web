'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { heroSlides, homepageBusinessOrder, values } from '../data/content'
import { businesses, media, services } from '../data/content'
import { brandSites, brandHref } from '../data/brand-sites'
import MainHeader from './MainHeader'
import MainFooter from './MainFooter'
import VisualIcon, { getServiceIcon, type VisualIconName } from './VisualIcon'

const homeBusinesses = homepageBusinessOrder.map((slug) => ({ ...businesses.find((item) => item.slug === slug)!, brand: brandSites.find((item) => item.slug === slug)! }))
const businessIcons: Record<string, VisualIconName> = { inceptura: 'strategy', employaa: 'people', remunerax: 'payroll', 'go-travel-global': 'travel', elevatrain: 'learning', thinkrunspace: 'workspace', 'leaders-pinnacle': 'events' }
const serviceArtwork: Record<string, string> = { 'website-designing': '/service-web-design.webp', 'content-animation': '/service-content-motion.webp', 'seo-marketing': '/service-search-growth.webp' }

function Arrow() { return <span aria-hidden="true">↗</span> }

function Hero() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches || paused) return
    const id = window.setInterval(() => setActive((value) => (value + 1) % heroSlides.length), 6000)
    return () => window.clearInterval(id)
  }, [paused])
  const previous = () => setActive((active + heroSlides.length - 1) % heroSlides.length)
  const next = () => setActive((active + 1) % heroSlides.length)
  return <section className="hero section-pad" aria-roledescription="carousel" aria-label="Workhour Business highlights"><Image key={heroSlides[active].image} className="hero-image" src={heroSlides[active].image} alt="" fill sizes="100vw" priority /><div className="hero-overlay" aria-hidden="true" /><div className="hero-orbit" aria-hidden="true"><i /><i /><i /></div><div className="hero-copy"><p className="eyebrow">Workhour Business</p><div className="hero-counter">{heroSlides[active].number} <span>/ {String(heroSlides.length).padStart(2, '0')}</span></div><h1 aria-live="polite">{heroSlides[active].headline}</h1><p className="hero-sub">Business capability for the complete journey — from the first idea to the next horizon.</p><Link className="button button-light" href="/about">About Us <Arrow /></Link><div className="hero-controls" aria-label="Slide controls"><button onClick={previous} aria-label="Previous slide">←</button>{heroSlides.map((slide, i) => <button key={slide.number} className={i === active ? 'dot active' : 'dot'} onClick={() => setActive(i)} aria-label={`Go to slide ${i + 1}`} aria-current={i === active ? 'true' : undefined} />)}<button onClick={next} aria-label="Next slide">→</button><button className="pause" onClick={() => setPaused(!paused)} aria-label={paused ? 'Resume slideshow' : 'Pause slideshow'}>{paused ? 'Play' : 'Pause'}</button></div></div><div className="hero-aside"><span>{heroSlides[active].number}</span><div className="hero-line" /><span>Ideas into action<br />for the next horizon</span></div></section>
}

function BusinessShowcase() {
  const [active, setActive] = useState(0)
  const business = homeBusinesses[active]
  const handleKeys = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') { event.preventDefault(); setActive((active + 1) % homeBusinesses.length) }
    if (event.key === 'ArrowLeft') { event.preventDefault(); setActive((active + homeBusinesses.length - 1) % homeBusinesses.length) }
  }
  return <section className="business-section section-pad" id="businesses"><div className="section-intro"><div className="section-intro-copy"><p className="eyebrow teal">Our businesses</p><p className="section-intro-description">Seven specialist businesses, connected by one ambition: to make progress more possible for the people and organisations they serve.</p></div><h2>One group.<br /><em>Many ways forward.</em></h2></div><div className="business-layout"><div className="business-list" role="tablist" aria-label="Workhour businesses" onKeyDown={handleKeys}>{homeBusinesses.map((item, index) => <button id={`business-tab-${item.slug}`} key={item.slug} role="tab" aria-controls="business-panel" aria-selected={active === index} tabIndex={active === index ? 0 : -1} className={active === index ? 'business-tab active' : 'business-tab'} onClick={() => setActive(index)} onFocus={() => setActive(index)}><span className="business-tab-number">{String(index + 1).padStart(2, '0')}</span><VisualIcon className="business-tab-icon" name={businessIcons[item.slug]} /><span className="business-tab-name">{item.name}</span><Arrow /></button>)}</div><div className="business-feature" id="business-panel" role="tabpanel" aria-labelledby={`business-tab-${business.slug}`} tabIndex={0}><Link className="business-art" href={brandHref(business.brand)} aria-label={`Explore ${business.name}`}><Image src={business.image} alt={`${business.name} illustrative business scene`} fill sizes="(max-width: 700px) 100vw, 35vw" /><div className="business-image-overlay" aria-hidden="true" /><span>{business.mark}</span></Link><div className="business-detail"><p className="eyebrow">{String(active + 1).padStart(2, '0')} / 07</p><h3>{business.name}</h3><p>{business.intro}</p><Link className="text-link" href={brandHref(business.brand)}>Explore {business.name} <Arrow /></Link></div></div></div></section>
}

function Values() { const icons: VisualIconName[] = ['resilience', 'innovation', 'legacy']; return <section className="values-section"><div className="values-head section-pad"><p className="eyebrow teal">What moves us</p><h2>The work is complex.<br /><em>The direction is clear.</em></h2></div><div className="value-grid">{values.map((value, index) => <article className={`value value-${index}`} key={value.display}><div className="value-meta"><span className="value-no">0{index + 1}</span><VisualIcon name={icons[index]} className="value-icon" /></div><h3>{value.display}</h3><p>{value.text}</p></article>)}</div></section> }

function MediaSection() {
  return <><section className="announcement section-pad" id="ignita"><div className="announcement-visual"><Image src="/feature-ignita.webp" alt="Abstract amber light and glass forms; illustrative editorial artwork" fill sizes="(max-width: 700px) 100vw, 55vw" /></div><div className="announcement-copy"><p className="eyebrow teal">Featured announcement</p><h2>IGNITA</h2></div></section><section className="media-section section-pad"><div className="media-head"><div><p className="eyebrow teal">News &amp; media</p><h2>Ideas worth<br /><em>carrying forward.</em></h2></div><Link className="text-link" href="/news-media">Explore the archive <Arrow /></Link></div><div className="media-grid">{media.filter((item) => item.slug !== 'ignita').map((item) => <article className={`media-card ${item.tone}`} key={item.slug}><div className="media-visual"><Image src={item.image} alt={item.alt} fill sizes="(max-width: 700px) 100vw, 33vw" /></div><p className="eyebrow">{item.kicker}</p><h3>{item.title}</h3><p>{item.text}</p><Link className="text-link" href={item.href}>{item.link} <Arrow /></Link></article>)}</div></section></>
}

function ServiceLinks() { return <section className="home-services section-pad"><p className="eyebrow teal">Workhour Business services</p><h2>Expertise for the next step.</h2><p className="home-services-intro">Explore digital design, animation, and marketing support for your business.</p><div className="home-service-grid">{services.map((service) => <Link className="home-service-card" key={service.slug} href={`/services/${service.slug}`}><span className="home-service-image"><Image src={serviceArtwork[service.slug]} alt={`${service.title} illustrative artwork`} fill sizes="(max-width: 700px) 100vw, 33vw" /></span><span className="home-service-content"><VisualIcon name={getServiceIcon(service.title)} className="home-service-icon" /><strong>{service.title}</strong><span className="home-service-cta">Explore service <Arrow /></span></span></Link>)}</div></section> }

export default function PreviewHome() { return <><MainHeader /><main><Hero /><section className="intro section-pad"><h2 className="intro-heading">The Workhour Approach</h2><p className="intro-statement-heading">Together<br /><em>We Thrive</em></p><p className="intro-statement">Workhour Business — we power your complete business journey.</p><Image className="intro-logo" src="/workhour-business-logo.jpeg" alt="Workhour Business" width={534} height={135} /></section><BusinessShowcase /><Values /><MediaSection /><ServiceLinks /></main><MainFooter /></> }
