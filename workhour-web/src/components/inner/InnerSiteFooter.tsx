import Image from 'next/image'
import Link from 'next/link'

import type { InnerNavService } from './InnerSiteHeader'

export function InnerSiteFooter({ services }: { services: InnerNavService[] }) {
  return <footer className="footer section-pad">
    <div className="footer-top"><Image src="/workhour-business-logo.jpeg" alt="Workhour Business" width={534} height={111} /><p>WorkHour Business - we power your complete business journey.</p></div>
    <div className="footer-links">
      <div><small>Services</small><Link href="/services">All services</Link>{services.map((service) => <Link href={`/services/${service.slug}`} key={service.slug}>{service.title}</Link>)}</div>
      <div><small>Explore</small><Link href="/about">About Us</Link><Link href="/#businesses">Businesses</Link><Link href="/careers">Careers</Link><Link href="/global-presence">Global Presence</Link></div>
      <div><small>Connect</small><Link href="/contact">Contact Us</Link><Link href="/announcements">Announcement</Link><Link href="/news-media">News &amp; Media</Link></div>
    </div>
    <div className="footer-bottom"><span>© Workhour Business</span><Link href="/">Back to homepage ↗</Link></div>
  </footer>
}
