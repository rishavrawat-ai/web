import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { businesses } from '../data/content'
import { brandHref, getBrand, getBrandService, proposedBrandServiceDescriptions, serviceSlug, suppliedBrandSections } from '../data/brand-sites'
import BrandSiteHeader from './BrandSiteHeader'

const globalReachPending = 'Brand-specific location details have not been supplied. No offices or operating locations are confirmed on this preview.'

function BrandFooter({ brand }: { brand: NonNullable<ReturnType<typeof getBrand>> }) {
  return <footer className="brand-site-footer"><Link className="brand-site-wordmark" href={brandHref(brand)}><span className="brand-site-mark">{brand.mark}</span><span>{brand.name}</span></Link><div><Link href={`${brandHref(brand)}/about`}>About</Link><Link href={`${brandHref(brand)}/${brand.menuLabel.toLowerCase()}`}>{brand.menuLabel}</Link><Link href={`${brandHref(brand)}/contact`}>Contact</Link><Link href="/businesses">Workhour Business group</Link></div><small>Brand preview · Details pending client confirmation</small></footer>
}

function BrandHero({ brand, title, description }: { brand: NonNullable<ReturnType<typeof getBrand>>; title: string; description: string }) {
  return <section className="brand-site-hero">
    <Image src={brand.image} alt={`${brand.name} illustrative brand image`} fill priority sizes="100vw" />
    <div className="brand-site-hero-shade" />
    <div className="brand-site-hero-copy"><p className="eyebrow">{brand.name} / {brand.strapline}</p><h1>{title === 'ThinkRunSpace' ? <>Think<wbr />RunSpace</> : title}</h1><p>{description}</p><Link className="button button-light" href={`${brandHref(brand)}/${brand.menuLabel.toLowerCase()}`}>Explore {brand.menuLabel} <span aria-hidden="true">↗</span></Link></div>
  </section>
}

function ServiceIndex({ brand }: { brand: NonNullable<ReturnType<typeof getBrand>> }) {
  const base = `${brandHref(brand)}/${brand.menuLabel.toLowerCase()}`
  return <><BrandHero brand={brand} title={brand.menuLabel} description={`${brand.name} ${brand.menuLabel.toLowerCase()}`} />
    <main className="brand-site-main"><p className="eyebrow teal">{brand.menuLabel} / {brand.name}</p><h2 className="brand-site-heading">Explore {brand.menuLabel.toLowerCase()}.</h2>
      <p className="brand-site-note">Proposed service descriptions below are pending client approval; scope, delivery, and terms require confirmation.</p>
      <div className="brand-service-grid">{brand.services.map((title, i) => <Link className="brand-service-card" href={`${base}/${serviceSlug(title)}`} key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{proposedBrandServiceDescriptions[brand.slug][title]}</p><strong>View details <span aria-hidden="true">↗</span></strong></Link>)}</div>
      <Link className="button button-dark" href={`${brandHref(brand)}/contact`}>Contact {brand.name}</Link>
    </main>
  </>
}

export default function BrandPreview({ brandSlug, path = [] }: { brandSlug: string; path?: string[] }) {
  const brand = getBrand(brandSlug)
  if (!brand) notFound()
  const business = businesses.find(({ slug }) => slug === brand.slug)
  if (!business) notFound()
  const current = path[0] ?? 'home'
  const base = brandHref(brand)
  let pageIntro = business.intro
  let pageBody: React.ReactNode

  if (current === 'home') {
    pageBody = <>
      <BrandHero brand={brand} title={brand.name} description={business.intro} />
      <main className="brand-site-main brand-home-content"><section className="brand-home-intro"><p className="eyebrow teal">{brand.strapline}</p><h2 className="brand-site-heading">{business.name}</h2><p>{business.intro}</p><Link className="text-link" href={`${base}/about`}>About {brand.name} <span aria-hidden="true">↗</span></Link></section>
        <section className="brand-home-menu"><p className="eyebrow teal">Explore</p><h2 className="brand-site-heading">{brand.menuLabel}</h2><Link className="text-link" href={`${base}/${brand.menuLabel.toLowerCase()}`}>View all {brand.menuLabel.toLowerCase()} <span aria-hidden="true">↗</span></Link>
          <div className="brand-service-grid">{brand.services.slice(0, 4).map((title, i) => <Link className="brand-service-card" href={`${base}/${brand.menuLabel.toLowerCase()}/${serviceSlug(title)}`} key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{proposedBrandServiceDescriptions[brand.slug][title]}</p><strong>Explore <span aria-hidden="true">↗</span></strong></Link>)}</div>
          <p className="brand-site-note">Proposed service descriptions · Pending client approval</p>
        </section>
        <section className="brand-contact-strip"><div><p className="eyebrow">Next step</p><h2>Contact {brand.name}</h2><p>Brand-specific contact details have not been supplied.</p></div><Link className="button button-light" href={`${base}/contact`}>Contact page <span aria-hidden="true">↗</span></Link></section>
      </main>
    </>
  } else if (current === 'about') {
    pageIntro = business.intro
    const sections = suppliedBrandSections(brand.slug)
    pageBody = <><BrandHero brand={brand} title={`About ${brand.name}`} description={pageIntro} /><main className="brand-site-main brand-copy-main"><p className="eyebrow teal">About / {brand.name}</p>{sections.map((section, index) => <section className="brand-copy-section" key={`${section.title}-${index}`}><p className="eyebrow">{String(index + 1).padStart(2, '0')} / {brand.name}</p><h2>{section.title}</h2>{section.paragraphs?.map((paragraph, pIndex) => <p key={pIndex}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}</section>)}
      <Link className="button button-dark" href={`${base}/contact`}>Contact {brand.name}</Link></main></>
  } else if (current === brand.menuLabel.toLowerCase() && path.length === 1) {
    pageIntro = `${brand.name} ${brand.menuLabel.toLowerCase()}`
    pageBody = <ServiceIndex brand={brand} />
  } else if (current === 'contact') {
    pageIntro = 'Brand-specific contact details have not been supplied.'
    pageBody = <><BrandHero brand={brand} title="Contact" description={pageIntro} /><main className="brand-site-main brand-contact-page"><p className="eyebrow teal">Contact / {brand.name}</p><h2 className="brand-site-heading">Start a conversation.</h2><p>{pageIntro} This preview does not submit enquiries.</p><Link className="button button-dark" href="/contact">Workhour Business contact page <span aria-hidden="true">↗</span></Link></main></>
  } else if (current === 'our-global-reach' && brand.includeReach) {
    pageIntro = globalReachPending
    pageBody = <><BrandHero brand={brand} title="Our Global Reach" description={pageIntro} /><main className="brand-site-main brand-contact-page"><p className="eyebrow teal">{brand.name} / Global Reach</p><h2 className="brand-site-heading">Locations pending confirmation</h2><p>{globalReachPending}</p><Link className="text-link" href="/global-presence">View Workhour Business global presence <span aria-hidden="true">↗</span></Link></main></>
  } else if (path.length === 2 && current === brand.menuLabel.toLowerCase()) {
    const title = getBrandService(brand, path[1])
    if (!title) notFound()
    pageIntro = proposedBrandServiceDescriptions[brand.slug][title]
    const image = brand.slug === 'employaa' ? '/service-web-design.webp' : brand.slug === 'elevatrain' ? '/service-content-motion.webp' : '/service-search-growth.webp'
    pageBody = <><BrandHero brand={brand} title={title} description={pageIntro} /><main className="brand-site-main brand-detail-main"><div className="brand-detail-image"><Image src={image} alt="Abstract navy and teal service illustration; not a depiction of a specific service delivery" fill sizes="(max-width: 700px) 100vw, 42vw" /></div><div><p className="eyebrow teal">{brand.menuLabel} / {brand.name}</p><h2 className="brand-site-heading">{title}</h2><p className="brand-site-note">Proposed service description · Pending client approval</p><p>{pageIntro}</p><Link className="button button-dark" href={`${base}/contact`}>Contact {brand.name}</Link><Link className="text-link" href={`${base}/${brand.menuLabel.toLowerCase()}`}>All {brand.menuLabel.toLowerCase()} <span aria-hidden="true">↗</span></Link></div></main></>
  } else {
    notFound()
  }

  return <div className="brand-site" data-brand={brand.slug}><BrandSiteHeader brand={brand} />{pageBody}<BrandFooter brand={brand} /></div>
}
