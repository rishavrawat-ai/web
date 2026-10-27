import Image from 'next/image'
import Link from 'next/link'
import { businesses, globalPresence, media, services } from '../data/content'
import { brandHref, brandSites } from '../data/brand-sites'
import { homepageBusinessIntros } from '../data/business-content'
import MainHeader from './MainHeader'
import MainFooter from './MainFooter'
import IgnitiaFeature from './IgnitiaFeature'

type PageKind = 'about' | 'announcements' | 'businesses' | 'careers' | 'contact' | 'news-media' | 'global-presence'

const pageCopy: Record<PageKind, { title: string; intro: string }> = {
  about: { title: 'About Workhour', intro: 'Workhour Business brings together specialist services that support organizations from early planning through day-to-day operations and growth.' },
  announcements: { title: 'Announcements', intro: 'Updates and announcements from Workhour Business.' },
  businesses: { title: 'Our businesses', intro: 'Seven specialist brands offer focused support across business setup, people, payroll, travel, learning, workspaces, and events.' },
  careers: { title: 'Careers', intro: 'Explore the kinds of work and services represented across the Workhour Business group.' },
  contact: { title: 'Contact Workhour Business', intro: 'Find the business and service area that best matches your needs.' },
  'news-media': { title: 'News & Media', intro: 'Explore the topics and service areas highlighted across Workhour Business.' },
  'global-presence': { title: 'Global presence', intro: 'Markets named in the supplied Workhour Business planning material.' },
}

function AboutPage() {
  const sections = [
    { id: 'history', title: 'Our story', paragraphs: ['Workhour Business brings together seven specialist businesses: Inceptura, Employaa, Remunerax, Go Travel Global, Elevatrain, ThinkRunSpace, and Leaders Pinnacle.', 'Together, their service areas span business planning, recruitment, payroll administration, travel, corporate learning, flexible workspaces, and professional events.'] },
    { id: 'impact', title: 'Our impact', paragraphs: ['Our aim is to make complex business needs easier to navigate by connecting organizations with focused expertise across the business journey.', 'Each brand concentrates on a distinct area of work, so organizations can explore the support relevant to their current priorities.'] },
    { id: 'csr', title: 'Responsible business', paragraphs: ['Responsible work begins with clear expectations, thoughtful planning, and respect for the people affected by business decisions.', 'We approach each service with attention to its context and encourage clients to define the outcomes, responsibilities, and safeguards that matter to them.'] },
    { id: 'presence', title: 'Presence', paragraphs: ['The supplied planning material names markets across Asia, Oceania, the Middle East, Africa, and North America. These are planning references, not a directory of confirmed offices or service locations.'] },
  ]
  return <><nav className="about-jumps" aria-label="About Workhour sections">{sections.map(section => <a href={`#${section.id}`} key={section.id}>{section.title}</a>)}</nav>{sections.map(section => <section className="about-content" id={section.id} key={section.id}><p className="eyebrow teal">Workhour Business</p><h2>{section.title}</h2>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}{section.id === 'presence' && <Link className="text-link" href="/global-presence">View market context <span aria-hidden="true">↗</span></Link>}</section>)}</>
}

function PageIntro({ kind }: { kind: PageKind }) {
  const content = pageCopy[kind]
  return <><p className="eyebrow teal">Workhour Business</p><h1>{content.title}</h1><p className="review-intro">{content.intro}</p></>
}

function BusinessesPage() {
  return <div className="review-business-list">{brandSites.map((brand, index) => { const business = businesses.find(item => item.slug === brand.slug)!; return <article key={brand.slug}><div className="business-list-image"><Image src={brand.image} alt={`${brand.name} illustrative scene`} fill sizes="(max-width: 700px) 100vw, 30vw" /></div><div><p className="eyebrow teal">Business {String(index + 1).padStart(2, '0')} / 07</p><h2>{business.name}</h2><p>{homepageBusinessIntros[business.slug] ?? business.intro}</p><Link className="text-link" href={brandHref(brand)}>Explore {brand.name} <span aria-hidden="true">↗</span></Link></div></article> })}</div>
}

function CareersPage() {
  const areas = ['Business planning and operations', 'Recruitment and workforce administration', 'Payroll and employee processes', 'Travel, learning, and event coordination', 'Flexible workspace services']
  return <><section className="career-groups"><article><p className="eyebrow teal">Across the group</p><h2>Different disciplines. Shared momentum.</h2><p>Explore the seven businesses to understand the work behind each service area.</p><ul>{areas.map(area => <li key={area}>{area}</li>)}</ul><Link className="button button-dark" href="/businesses">Explore the businesses <span aria-hidden="true">↗</span></Link></article></section><p className="empty-note">There are no current openings listed here.</p></>
}

function ContactPage() {
  return <><section className="contact-guidance"><p className="eyebrow teal">Explore the group</p><h2>Choose the area that fits your need.</h2><p>Review each business and its services to find the right starting point.</p><div className="contact-service-links">{brandSites.map(brand => <Link key={brand.slug} href={brandHref(brand)}><strong>{brand.name}</strong><span>{brand.strapline}</span><span aria-hidden="true">↗</span></Link>)}</div></section><section className="contact-guidance"><p className="eyebrow teal">Workhour Business services</p><h2>Start with a service area.</h2><div className="service-switcher">{services.map(service => <Link key={service.slug} href={`/services/${service.slug}`}>{service.title} <span aria-hidden="true">↗</span></Link>)}</div></section></>
}

function AnnouncementPage() {
  return <IgnitiaFeature />
}

function NewsMediaPage() {
  return <div className="review-media-list media-archive">{media.map(item => <article id={item.slug} key={item.slug}><div className={`media-visual ${item.tone}`}><Image src={item.image} alt={item.alt} fill sizes="(max-width: 700px) 100vw, 50vw" /></div><p className="eyebrow teal">{item.kicker}</p><h2>{item.title}</h2><p>{item.text}</p><Link className="text-link" href={item.slug === 'ignita' ? '/announcements/ignitia' : item.slug === 'mindfulness' ? '/brands/elevatrain/trainings/mindfulness' : '/brands/leaders-pinnacle/services/bespoke-corporate-events'}>{item.link} <span aria-hidden="true">↗</span></Link></article>)}</div>
}

function GlobalPresencePage() {
  return <section className="global-presence-content"><p className="eyebrow teal">Markets named in planning material</p><h2>Global presence</h2><p>These country groupings reflect the supplied planning list. They do not confirm an office, city location, or active service availability.</p><div className="presence-grid">{globalPresence.map(({ region, countries }) => <section className="presence-card" key={region}><p className="eyebrow teal">Market group</p><h3>{region}</h3><ul className="presence-countries">{countries.map(country => <li key={country}>{country}</li>)}</ul></section>)}</div></section>
}

export default function ReviewPage({ kind }: { kind: PageKind }) {
  return <><MainHeader /><main className="review-page"><div className="review-inner"><PageIntro kind={kind} />{kind === 'about' && <AboutPage />}{kind === 'businesses' && <BusinessesPage />}{kind === 'careers' && <CareersPage />}{kind === 'contact' && <ContactPage />}{kind === 'announcements' && <AnnouncementPage />}{kind === 'news-media' && <NewsMediaPage />}{kind !== 'contact' && <section className="page-next-step"><h2>Explore the Workhour Business group.</h2><Link className="button button-dark" href="/businesses">Explore businesses <span aria-hidden="true">↗</span></Link></section>}</div></main><MainFooter /></>
}

export function MainGlobalPresence() {
  return <><MainHeader /><main className="review-page"><div className="review-inner"><PageIntro kind="global-presence" /><GlobalPresencePage /></div></main><MainFooter /></>
}
