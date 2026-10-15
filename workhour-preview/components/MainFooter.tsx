import Image from 'next/image'
import Link from 'next/link'
import { brandHref, brandSites } from '../data/brand-sites'
import { services } from '../data/content'

export default function MainFooter() {
  return <footer className="footer section-pad"><div className="footer-top"><Image src="/workhour-business-logo.jpeg" alt="Workhour Business" width={267} height={56} /><p>Workhour Business — we power your complete business journey.</p></div><div className="footer-links"><div><small>Explore</small><Link href="/about">About Us</Link><Link href="/businesses">Businesses</Link><Link href="/careers">Careers</Link><Link href="/global-presence">Global Presence</Link></div><div><small>Services</small>{services.map(service => <Link key={service.slug} href={`/services/${service.slug}`}>{service.title}</Link>)}</div><div><small>Our businesses</small>{brandSites.map(brand => <Link key={brand.slug} href={brandHref(brand)}>{brand.name}</Link>)}</div><div><small>Connect</small><Link href="/announcements">Announcement</Link><Link href="/news-media">News &amp; Media</Link><Link href="/contact">Contact Us</Link></div></div><div className="footer-bottom"><span>© Workhour Business</span><Link href="/contact">Contact options</Link></div></footer>
}
