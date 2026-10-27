import type { CSSProperties, ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import type { Business, Media } from '../../payload-types'
import { getBrandSiteDefinition } from '../../content/brandSiteDefinitions'
import { BrandSiteHeader, type BrandNavService } from './BrandSiteHeader'

function safeColor(value: string | null | undefined, fallback: string): string {
  return value && /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i.test(value) ? value : fallback
}

function publishedLogo(value: number | Media | null | undefined): Media | null {
  return value && typeof value === 'object' && value._status === 'published' && value.url ? value : null
}

export function BrandSiteFrame({ business, services, children }: { business: Business; services: BrandNavService[]; children: ReactNode }) {
  const logo = publishedLogo(business.logo)
  const definition = getBrandSiteDefinition(business.slug)
  const style = {
    '--brand-primary': safeColor(business.brandPrimaryColor, '#071a31'),
    '--brand-accent': safeColor(business.brandAccentColor, '#2baaa3'),
    '--brand-background': safeColor(business.brandBackgroundColor, '#f8faf9'),
  } as CSSProperties

  return <div className="brand-site" style={style}>
    <BrandSiteHeader name={business.name} logo={logo ? { url: logo.url!, alt: logo.alt || business.name, width: logo.width, height: logo.height } : null} services={services} serviceMenuLabel={definition.serviceMenuLabel} showGlobalReach={definition.showGlobalReach} />
    {children}
    <footer className="brand-site-footer">
      <div className="brand-footer-top">
        {logo ? <Image src={logo.url!} alt={logo.alt || business.name} width={logo.width || 360} height={logo.height || 110} /> : <strong>{business.name}</strong>}
        <p>{business.name}</p>
      </div>
      <nav aria-label={`${business.name} footer navigation`}>
        <Link href="/">Home</Link><Link href="/about">About</Link><Link href="/services">{definition.serviceMenuLabel}</Link>
        <Link href="/contact">Contact</Link>{definition.showGlobalReach ? <Link href="/global-reach">Our Global Reach</Link> : null}
      </nav>
      <small>© {business.name}</small>
    </footer>
  </div>
}
