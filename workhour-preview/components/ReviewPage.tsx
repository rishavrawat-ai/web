import Image from 'next/image'
import Link from 'next/link'
import { businesses, globalExpansion, media, services } from '../data/content'
import { aboutSections } from '../data/about-sections'
import { brandHref, brandSites } from '../data/brand-sites'
import { homepageBusinessIntros } from '../data/business-content'
import MainHeader from './MainHeader'
import MainFooter from './MainFooter'
import PresenceMap from './PresenceMap'
import IgnitiaFeature from './IgnitiaFeature'
import ContactEnquiryForm from './ContactEnquiryForm'
import aboutStyles from './AboutPage.module.css'
import contactStyles from './ContactPage.module.css'

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
  return <div className={aboutStyles.aboutPage}>
    <nav className={`about-jumps ${aboutStyles.jumps}`} aria-label="About Workhour sections">{aboutSections.map(({ id, title }) => <a href={`#${id}`} key={id}>{title}</a>)}</nav>
    {aboutSections.map(({ id, title }) => <section className={`about-content ${aboutStyles.section}`} id={id} key={id}>
      <p className="eyebrow teal">Workhour Business</p>
      <h2>{title}</h2>
      {id === 'history' && <><p>Workhour Business brings together seven specialist businesses: Inceptura, Employaa, Remunerax, Go Travel Global, Elevatrain, ThinkRunSpace, and Leaders Pinnacle.</p><p>Together, their service areas span business planning, recruitment, payroll administration, travel, corporate learning, flexible workspaces, and professional events.</p></>}
      {id === 'vision-mission' && <div className={aboutStyles.pairGrid}><article><p className="eyebrow">Our Vision</p><p>{globalExpansion.vision}</p></article><article><p className="eyebrow">Our Mission</p><p>{globalExpansion.mission}</p></article></div>}
      {id === 'core-values' && <div className={aboutStyles.valuesGrid}>{globalExpansion.values.map((value) => <article key={value.title}><h3>{value.title}</h3><p>{value.text}</p></article>)}</div>}
      {id === 'impact' && <><p>Our aim is to make complex business needs easier to navigate by connecting organizations with focused expertise across the business journey.</p><p>Each brand concentrates on a distinct area of work, so organizations can explore the support relevant to their current priorities.</p></>}
      {id === 'csr' && <><p>Responsible work begins with clear expectations, thoughtful planning, and respect for the people affected by business decisions.</p><p>We approach each service with attention to its context and encourage clients to define the outcomes, responsibilities, and safeguards that matter to them.</p></>}
      {id === 'global-expansion' && <><p>{globalExpansion.intro}</p><p>Workhour Business describes support across multicultural business setup, regulatory compliance, local hiring, and strategic consulting. The supplied country references are planning context; they do not confirm client centers, offices, or service coverage.</p></>}
      {id === 'workhour-in-house' && <><p>The in-house offering is described as an operational foundation for organizations considering expansion, covering compliance, recruitment, workspace and technology infrastructure, HR and payroll, and go-to-market planning.</p><div className={aboutStyles.capabilitiesGrid}>{globalExpansion.capabilities.map((capability) => <article key={capability.title}><h3>{capability.title}</h3><p>{capability.text}</p></article>)}</div><p className={aboutStyles.qualification}>The country planning list does not confirm that Workhour Business has an office or operating center in each market.</p></>}
      {id === 'growing-smbs' && <p>{globalExpansion.audience}</p>}
      {id === 'presence' && <><p>The supplied planning material names countries across Asia, Oceania, the Middle East, Africa, and North America. Every highlighted country below is provisional and is not a confirmed office or service territory.</p><PresenceMap variant="compact" /><Link className="text-link" href="/global-presence">View the global map <span aria-hidden="true">↗</span></Link></>}
    </section>)}
  </div>
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
  return <><section className={contactStyles.formSection} aria-labelledby="contact-form-heading"><p className="eyebrow teal">Contact Workhour Business</p><h2 id="contact-form-heading">Tell us what you need.</h2><p>Share your contact details and a message. Submission is not connected yet, so no message will be sent.</p><ContactEnquiryForm /></section><section className="contact-guidance"><p className="eyebrow teal">Explore the group</p><h2>Choose the area that fits your need.</h2><p>Review each business and its services to find the right starting point.</p><div className="contact-service-links">{brandSites.map(brand => <Link key={brand.slug} href={brandHref(brand)}><strong>{brand.name}</strong><span>{brand.strapline}</span><span aria-hidden="true">↗</span></Link>)}</div></section><section className="contact-guidance"><p className="eyebrow teal">Workhour Business services</p><h2>Start with a service area.</h2><div className="service-switcher">{services.map(service => <Link key={service.slug} href={`/services/${service.slug}`}>{service.title} <span aria-hidden="true">↗</span></Link>)}</div></section></>
}

function AnnouncementPage() {
  return <IgnitiaFeature />
}

function NewsMediaPage() {
  return <div className="review-media-list media-archive">{media.map(item => <article id={item.slug} key={item.slug}><div className={`media-visual ${item.tone}`}><Image src={item.image} alt={item.alt} fill sizes="(max-width: 700px) 100vw, 50vw" /></div><p className="eyebrow teal">{item.kicker}</p><h2>{item.title}</h2><p>{item.text}</p><Link className="text-link" href={item.slug === 'ignita' ? '/announcements/ignitia' : item.slug === 'mindfulness' ? '/brands/elevatrain/trainings/mindfulness' : '/brands/leaders-pinnacle/services/bespoke-corporate-events'}>{item.link} <span aria-hidden="true">↗</span></Link></article>)}</div>
}

function GlobalPresencePage() {
  return <section className="global-presence-content"><p className="eyebrow teal">Markets named in planning material</p><h2>Global presence</h2><p>These country groupings reflect supplied planning material. They do not confirm an office, city location, or active service availability.</p><PresenceMap /></section>
}

export default function ReviewPage({ kind }: { kind: PageKind }) {
  return <><MainHeader /><main className="review-page"><div className="review-inner"><PageIntro kind={kind} />{kind === 'about' && <AboutPage />}{kind === 'businesses' && <BusinessesPage />}{kind === 'careers' && <CareersPage />}{kind === 'contact' && <ContactPage />}{kind === 'announcements' && <AnnouncementPage />}{kind === 'news-media' && <NewsMediaPage />}{kind !== 'contact' && kind !== 'about' && <section className="page-next-step"><h2>Explore the Workhour Business group.</h2><Link className="button button-dark" href="/businesses">Explore businesses <span aria-hidden="true">↗</span></Link></section>}</div></main><MainFooter /></>
}

export function MainGlobalPresence() {
  return <><MainHeader /><main className="review-page"><div className="review-inner"><PageIntro kind="global-presence" /><GlobalPresencePage /></div></main><MainFooter /></>
}
