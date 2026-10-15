import Image from 'next/image'
import Link from 'next/link'
import MainHeader from '../../components/MainHeader'
import MainFooter from '../../components/MainFooter'
import { services } from '../../data/content'

export const metadata = { title: 'Services | Workhour Business', description: 'Digital design, content animation, and marketing services from Workhour Business.' }
const serviceImages = ['/service-web-design.webp', '/service-content-motion.webp', '/service-search-growth.webp']

export default function ServicesPage() {
  return <><MainHeader /><main className="review-page services-page"><div className="review-inner"><p className="eyebrow teal">Workhour Business / Services</p><h1>Digital services for your next move.</h1><p className="review-intro">Design, motion, and marketing support shaped around your audience and business goals.</p><div className="services-index">{services.map((service, index) => <article key={service.slug}><div className="service-card-image"><Image src={serviceImages[index]} alt={`${service.title} illustrative artwork`} fill sizes="(max-width: 700px) 100vw, 33vw" /></div><span>0{index + 1}</span><h2>{service.title}</h2><p>{service.intro}</p><Link className="text-link" href={`/services/${service.slug}`}>Explore service <span aria-hidden="true">↗</span></Link></article>)}</div><section className="services-contact"><p className="eyebrow teal">Explore Workhour Business</p><h2>Find the right starting point for your needs.</h2><p>Compare the group’s specialist businesses and service areas.</p><Link className="button button-dark" href="/contact">Explore contact options <span aria-hidden="true">↗</span></Link></section></div></main><MainFooter /></>
}
