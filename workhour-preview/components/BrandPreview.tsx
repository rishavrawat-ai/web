import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { businesses, globalPresence } from '../data/content'
import { brandHref, getBrand, getBrandService, serviceSlug, suppliedBrandSections } from '../data/brand-sites'
import { getBrandServiceCopy } from '../data/brand-service-content'
import BrandSiteHeader from './BrandSiteHeader'
import VisualIcon, { getServiceIcon } from './VisualIcon'

type Brand = NonNullable<ReturnType<typeof getBrand>>

function BrandFooter({ brand }: { brand: Brand }) {
  return <footer className="brand-site-footer"><Link className="brand-site-wordmark" href={brandHref(brand)}><span className="brand-site-mark">{brand.mark}</span><span>{brand.name}</span></Link><div><Link href={`${brandHref(brand)}/about`}>About</Link><Link href={`${brandHref(brand)}/${brand.menuLabel.toLowerCase()}`}>{brand.menuLabel}</Link><Link href={`${brandHref(brand)}/contact`}>Contact</Link><Link href="/businesses">Workhour Business group</Link></div><small>Part of Workhour Business</small></footer>
}

function BrandHero({ brand, title, description }: { brand: Brand; title: string; description: string }) {
  return <section className="brand-site-hero"><Image src={brand.image} alt={`${brand.name} illustrative scene`} fill priority sizes="100vw" /><div className="brand-site-hero-shade" /><div className="brand-site-hero-copy"><p className="eyebrow">{brand.name} / {brand.strapline}</p><h1>{title === 'ThinkRunSpace' ? <>Think<wbr />RunSpace</> : title}</h1><p>{description}</p><Link className="button button-light" href={`${brandHref(brand)}/${brand.menuLabel.toLowerCase()}`}>Explore {brand.menuLabel} <span aria-hidden="true">↗</span></Link></div></section>
}

function ServiceIndex({ brand }: { brand: Brand }) {
  const base = `${brandHref(brand)}/${brand.menuLabel.toLowerCase()}`
  return <><BrandHero brand={brand} title={brand.menuLabel} description={`Explore ${brand.name} ${brand.menuLabel.toLowerCase()} and find the service that fits your needs.`} /><main className="brand-site-main"><p className="eyebrow teal">{brand.menuLabel} / {brand.name}</p><h2 className="brand-site-heading">Explore {brand.menuLabel.toLowerCase()}.</h2><div className="brand-service-grid">{brand.services.map((title, i) => { const copy = getBrandServiceCopy(brand, title); return <Link className="brand-service-card" href={`${base}/${serviceSlug(title)}`} key={title}><span className="brand-service-number">{String(i + 1).padStart(2, '0')}</span><VisualIcon name={getServiceIcon(title)} className="brand-service-icon" /><h3>{title}</h3><p>{copy?.overview}</p><strong>View details <span aria-hidden="true">↗</span></strong></Link> })}</div><Link className="button button-dark" href={`${brandHref(brand)}/contact`}>Explore contact options</Link></main></>
}

export default function BrandPreview({ brandSlug, path = [] }: { brandSlug: string; path?: string[] }) {
  const brand = getBrand(brandSlug)
  if (!brand) notFound()
  const business = businesses.find(({ slug }) => slug === brand.slug)
  if (!business) notFound()
  const current = path[0] ?? 'home'
  const base = brandHref(brand)
  let pageBody: React.ReactNode

  if (current === 'home') {
    pageBody = <><BrandHero brand={brand} title={brand.name} description={business.intro} /><main className="brand-site-main brand-home-content"><section className="brand-home-intro"><p className="eyebrow teal">{brand.strapline}</p><h2 className="brand-site-heading">{business.name}</h2><p>{business.intro}</p><Link className="text-link" href={`${base}/about`}>About {brand.name} <span aria-hidden="true">↗</span></Link></section><section className="brand-home-menu"><p className="eyebrow teal">Explore</p><h2 className="brand-site-heading">{brand.menuLabel}</h2><Link className="text-link" href={`${base}/${brand.menuLabel.toLowerCase()}`}>View all {brand.menuLabel.toLowerCase()} <span aria-hidden="true">↗</span></Link><div className="brand-service-grid">{brand.services.slice(0, 4).map((title, i) => <Link className="brand-service-card" href={`${base}/${brand.menuLabel.toLowerCase()}/${serviceSlug(title)}`} key={title}><span className="brand-service-number">{String(i + 1).padStart(2, '0')}</span><VisualIcon name={getServiceIcon(title)} className="brand-service-icon" /><h3>{title}</h3><p>{getBrandServiceCopy(brand, title)?.overview}</p><strong>Explore <span aria-hidden="true">↗</span></strong></Link>)}</div><Link className="button button-dark" href={`${base}/${brand.menuLabel.toLowerCase()}`}>See all {brand.menuLabel.toLowerCase()}</Link></section><section className="brand-contact-strip"><VisualIcon name="service" className="brand-contact-icon" /><div><p className="eyebrow">Next step</p><h2>Find the right service.</h2><p>Explore the full {brand.menuLabel.toLowerCase()} range to understand how this business can support your requirements.</p></div><Link className="button button-light" href={`${base}/${brand.menuLabel.toLowerCase()}`}>Explore {brand.menuLabel} <span aria-hidden="true">↗</span></Link></section></main></>
  } else if (current === 'about') {
    const sections = suppliedBrandSections(brand.slug)
    pageBody = <><BrandHero brand={brand} title={`About ${brand.name}`} description={business.intro} /><main className="brand-site-main brand-copy-main"><p className="eyebrow teal">About / {brand.name}</p>{sections.map((section, index) => <section className={`brand-copy-section${index === 0 ? ' brand-copy-feature' : ''}`} key={`${section.title}-${index}`}>{index === 0 && <div className="brand-copy-feature-image"><Image src={brand.image} alt={`${brand.name} illustrative scene`} fill sizes="(max-width: 700px) 100vw, 42vw" /></div>}<div className="brand-copy-section-content"><p className="eyebrow">{String(index + 1).padStart(2, '0')} / {brand.name}</p><h2>{section.title === 'Problem statement and market need' && <VisualIcon name="strategy" className="brand-copy-section-icon" />}{section.title}</h2>{section.paragraphs?.map((paragraph, pIndex) => <p key={pIndex}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}</div></section>)}<Link className="button button-dark" href={`${base}/${brand.menuLabel.toLowerCase()}`}>Explore {brand.menuLabel}</Link></main></>
  } else if (current === brand.menuLabel.toLowerCase() && path.length === 1) {
    pageBody = <ServiceIndex brand={brand} />
  } else if (current === 'contact') {
    pageBody = <><BrandHero brand={brand} title="Contact" description={`Explore ${brand.name} services and the wider Workhour Business group.`} /><main className="brand-site-main brand-contact-page"><p className="eyebrow teal">Contact / {brand.name}</p><h2 className="brand-site-heading">Choose your next step.</h2><p>Review service details that match your needs, or explore the other businesses in the Workhour Business group.</p><div className="brand-detail-actions"><Link className="button button-dark" href={`${base}/${brand.menuLabel.toLowerCase()}`}>Explore {brand.menuLabel}</Link><Link className="text-link" href="/businesses">Explore all businesses <span aria-hidden="true">↗</span></Link></div></main></>
  } else if (current === 'our-global-reach' && brand.includeReach) {
    const description = 'Workhour Business planning material names markets for group-level consideration. It does not confirm an office or service location for this brand.'
    pageBody = <><BrandHero brand={brand} title="Our Global Reach" description={description} /><main className="brand-site-main brand-contact-page"><p className="eyebrow teal">{brand.name} / Global Reach</p><h2 className="brand-site-heading">Markets in context.</h2><p>{description}</p><div className="presence-grid">{globalPresence.map(({ region, countries }) => <section className="presence-card" key={region}><p className="eyebrow teal">Market group</p><h3>{region}</h3><ul className="presence-countries">{countries.map(country => <li key={country}>{country}</li>)}</ul></section>)}</div><Link className="text-link" href="/global-presence">View Workhour Business market context <span aria-hidden="true">↗</span></Link></main></>
  } else if (path.length === 2 && current === brand.menuLabel.toLowerCase()) {
    const title = getBrandService(brand, path[1])
    if (!title) notFound()
    const copy = getBrandServiceCopy(brand, title)
    if (!copy) notFound()
    pageBody = <><BrandHero brand={brand} title={title} description={copy.overview} /><main className="brand-site-main brand-detail-main"><div className="brand-detail-copy"><p className="eyebrow teal">{brand.menuLabel} / {brand.name}</p><section><h2><VisualIcon name="audience" className="brand-detail-section-icon" />Who it is for</h2><p>{copy.audience}</p></section><section><h2><VisualIcon name="scope" className="brand-detail-section-icon" />Scope</h2><ul>{copy.scope.map(item => <li key={item}>{item}</li>)}</ul></section><section><h2><VisualIcon name="process" className="brand-detail-section-icon" />How we approach it</h2><p>{copy.approach}</p></section><section><h2><VisualIcon name="benefit" className="brand-detail-section-icon" />Practical benefits</h2><p>{copy.benefits}</p></section><div className="brand-detail-actions"><Link className="button button-dark" href={`${base}/contact`}>Explore contact options</Link><Link className="text-link" href={`${base}/${brand.menuLabel.toLowerCase()}`}>All {brand.menuLabel.toLowerCase()} <span aria-hidden="true">↗</span></Link></div></div><aside className="brand-detail-aside"><VisualIcon name={getServiceIcon(title)} className="brand-detail-aside-icon" /><p className="eyebrow">{brand.name}</p><h2>{title}</h2><p>Explore the service scope, approach, and practical benefits.</p></aside></main></>
  } else {
    notFound()
  }

  return <div className="brand-site" data-brand={brand.slug}><BrandSiteHeader brand={brand} />{pageBody}<BrandFooter brand={brand} /></div>
}
