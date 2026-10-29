import PageBanner from '../../../components/PageBanner'
import { serviceVisuals } from '../../../data/page-visuals'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import MainHeader from '../../../components/MainHeader'
import MainFooter from '../../../components/MainFooter'
import { services } from '../../../data/content'

const serviceIllustrations: Record<string, string> = {
  'website-designing': '/service-web-design.webp',
  'content-animation': '/service-content-motion.webp',
  'seo-marketing': '/service-search-growth.webp',
}
const serviceDetails: Record<string, { audience: string; approach: string; benefits: string }> = {
  'website-designing': { audience: 'Businesses creating a new digital presence or improving an existing website for their customers.', approach: 'Begin with audience needs, goals, content, and required functionality. Shape the structure and visual direction, review the experience across screen sizes, then refine the implementation against the agreed scope.', benefits: 'A considered website gives visitors clearer routes through information and makes it easier for a business to present its offer consistently across devices.' },
  'content-animation': { audience: 'Organizations that need to explain ideas, services, or learning material through motion and visual storytelling.', approach: 'Clarify the audience and learning or communication goal, develop a script and storyboard, review the visual style, then produce and refine the animation against agreed deliverables.', benefits: 'Motion can make abstract or information-heavy topics easier to follow when the story, pacing, and visuals are aligned with the audience.' },
  'seo-marketing': { audience: 'Businesses seeking a clearer approach to organic discovery, paid campaigns, and useful digital content.', approach: 'Start with business goals, audience, current channels, and available data. Prioritize relevant opportunities, define a measurement plan, then review activity and adjust based on observed results.', benefits: 'A focused plan helps connect marketing activity with audience needs and gives teams a more useful basis for evaluating performance.' },
}

export function generateStaticParams() { return services.map(service => ({ slug: service.slug })) }
export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => { const service = services.find(item => item.slug === slug); return { title: service ? `${service.title} | Workhour Business` : 'Service | Workhour Business', description: service?.intro } })
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = services.find(item => item.slug === slug)
  if (!service) notFound()
  const detail = serviceDetails[service.slug]
  return <><MainHeader /><main className="review-page service-detail-page banner-page"><PageBanner title={service.title} description={service.intro} {...serviceVisuals[slug]} parent={{label: "Services", href: "/services"}} /><div className="review-inner"><p className="service-lead">{service.description}</p><div className="service-detail-illustration"><Image src={serviceIllustrations[service.slug]} alt={`${service.title} illustrative artwork`} fill sizes="(max-width: 800px) 100vw, 75vw" priority /></div><section className="service-overview"><p className="eyebrow teal">Who it serves</p><h2>Start with the people and goals.</h2><p>{detail.audience}</p><h3>How the work takes shape</h3><p>{detail.approach}</p><h3>Practical benefits</h3><p>{detail.benefits}</p></section><nav className="about-jumps" aria-label={`${service.title} scope sections`}>{service.sections.map((section, index) => <a href={`#service-section-${index}`} key={section.title}>{section.title}</a>)}</nav><div className="service-detail-sections">{service.sections.map((section, index) => <section className="about-content service-content" id={`service-section-${index}`} key={section.title}><p className="eyebrow teal">{String(index + 1).padStart(2, '0')} / {service.title}</p><h2>{section.title}</h2><p>{section.text}</p></section>)}</div><section className="services-contact"><p className="eyebrow teal">Next step</p><h2>Explore the right service area.</h2><p>Browse Workhour Business services and brands to identify a useful starting point.</p><Link className="button button-dark" href="/contact">Explore contact options <span aria-hidden="true">↗</span></Link></section><nav className="service-switcher" aria-label="Other services"><Link href="/services">All services</Link>{services.filter(item => item.slug !== service.slug).map(item => <Link href={`/services/${item.slug}`} key={item.slug}>{item.title} <span aria-hidden="true">↗</span></Link>)}</nav></div></main><MainFooter /></>
}
