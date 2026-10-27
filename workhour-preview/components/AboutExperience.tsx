import Image from 'next/image'
import Link from 'next/link'
import MainHeader from './MainHeader'
import MainFooter from './MainFooter'
import { aboutSections, type AboutSection } from '../data/about'
import { businesses, globalPresence, homepageBusinessOrder } from '../data/content'
import { brandHref, brandSites } from '../data/brand-sites'
import styles from './AboutExperience.module.css'

function Arrow() { return <span aria-hidden="true">↗</span> }
function Photo({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return <div className={`${styles.photo} ${className}`}><Image src={src} alt={alt} fill sizes="(max-width: 700px) 100vw, 50vw" /></div>
}
function BusinessDirectory() {
  return <section className={styles.directory} aria-labelledby="business-heading">
    <div><p className={styles.eyebrow}>Specialists, together</p><h2 id="business-heading">One group.<br />Seven areas of expertise.</h2><p>Distinct businesses. Focused capabilities. Support for different stages of your business journey.</p><Link className={styles.textLink} href="/businesses">Explore our portfolio <Arrow /></Link></div>
    <div className={styles.businessList}>{homepageBusinessOrder.map((slug, index) => {
      const brand = brandSites.find(item => item.slug === slug)!
      const business = businesses.find(item => item.slug === slug)!
      return <Link href={brandHref(brand)} key={slug}><span className={styles.number}>0{index + 1}</span><span><strong>{business.name}</strong><small>{brand.strapline}</small></span><Arrow /></Link>
    })}</div>
  </section>
}
function Story({ section }: { section: AboutSection }) {
  return <><section className={styles.story}>
    <Photo src="/business-thinkrunspace.webp" alt="Illustrative flexible workspace with areas for individual and collaborative work" />
    <div className={styles.storyCopy}><p className={styles.eyebrow}>The Workhour story</p><h2>Built around the<br /><span>business journey.</span></h2><p className={styles.lead}>Business needs change. The right expertise helps you move forward.</p>{section.paragraphs.map(p => <p key={p}>{p}</p>)}<div className={styles.purpose}><span aria-hidden="true">↗</span><p>From early planning to everyday operations and growth.</p></div></div>
  </section><BusinessDirectory /></>
}
function Impact({ section }: { section: AboutSection }) {
  const images = ['/business-inceptura.webp', '/business-remunerax.webp', '/business-elevatrain.webp']
  const alts = ['Illustrative business planning workspace', 'Illustrative payroll and administration work', 'Illustrative professional learning session']
  return <><section className={styles.statement}><p className={styles.eyebrow}>The value of focused expertise</p><h2>{section.heading}</h2><div>{section.paragraphs.map(p => <p key={p}>{p}</p>)}</div></section>
    <section className={styles.outcomes} aria-label="How our work helps">{section.pillars.map((pillar, i) => <article className={styles.outcome} key={pillar.title}><Photo src={images[i]} alt={alts[i]} /><div><p className={styles.eyebrow}>0{i + 1} / {['Direction', 'Everyday operations', 'Development'][i]}</p><h2>{pillar.title}</h2><p>{pillar.text}</p><p className={styles.serviceNote}>{['Business planning · Strategy', 'Recruitment · Payroll · Travel · Workspace', 'Corporate learning · Professional events'][i]}</p></div></article>)}</section></>
}
function Responsible({ section }: { section: AboutSection }) {
  return <><section className={styles.statement}><p className={styles.eyebrow}>Our approach</p><h2>{section.heading}</h2><div>{section.paragraphs.map(p => <p key={p}>{p}</p>)}</div></section>
    <section className={styles.principles} aria-label="Responsible working principles"><div className={styles.principleIntro}><p className={styles.eyebrow}>People. Context. Clarity.</p><h2>Considered decisions,<br />at every step.</h2><p>Keep the people affected by business decisions in view throughout the process.</p><Photo src="/about-responsible.webp" alt="Illustrative colleagues discussing work in a shared workspace" /></div><div>{section.pillars.map((pillar, i) => <article className={styles.principle} key={pillar.title}><span className={styles.number}>0{i + 1}</span><div><h3>{pillar.title}</h3><p>{pillar.text}</p></div></article>)}</div></section></>
}
function Presence({ section }: { section: AboutSection }) {
  return <section className={styles.presence}><div className={styles.presenceCopy}><p className={styles.eyebrow}>Regional perspective</p><h2>{section.heading}</h2><p>{section.paragraphs[0]}</p><aside className={styles.contextNote}><strong>Planning markets</strong><p>{section.paragraphs[1]} Contact us to discuss the support available for your location.</p></aside><Link href="/contact" className={styles.textLink}>Discuss your location <Arrow /></Link></div><div className={styles.regionList} aria-label="Markets referenced in planning">{globalPresence.map((region, i) => <article key={region.region}><span className={styles.number}>0{i + 1}</span><div><h3>{region.region}</h3><ul>{region.countries.map(country => <li key={country}>{country}</li>)}</ul></div><span className={styles.regionTag}>Planning reference</span></article>)}</div></section>
}
export default function AboutExperience({ section }: { section?: AboutSection }) {
  const hero = section ?? aboutSections[0]
  return <><MainHeader /><main className={styles.page}>
    <div className={styles.container}><nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span>{section ? <><Link href="/about">About Us</Link><span aria-hidden="true">/</span><span aria-current="page">{section.label}</span></> : <span aria-current="page">About Us</span>}</nav>
    <section className={`${styles.hero} ${section?.slug === 'responsible-business' ? styles.responsibleHero : ''}`}><div className={styles.heroCopy}><p className={styles.eyebrow}>Workhour Business / About us</p><h1>{section?.label ?? 'About Workhour'}</h1><p className={styles.heroMessage}>{section ? <>{section.title}<br /><span>{section.accent}</span></> : <>Specialist expertise.<br /><span>A shared perspective.</span></>}</p><p className={styles.heroIntro}>{hero.intro}</p><Link className={styles.button} href="/contact">Let’s talk <Arrow /></Link></div><div className={styles.heroVisual}><Image src={hero.image} alt={hero.alt} fill sizes="(max-width: 700px) 100vw, 55vw" priority /><div className={styles.imageLabel}><span aria-hidden="true" />{section ? { 'our-story': 'Expertise, working together', 'our-impact': 'Turning capability into possibility', 'responsible-business': 'People at the heart of the work', presence: 'A broader business perspective' }[section.slug] : 'Expertise, working together'}</div></div></section>
    {section?.slug === 'our-story' && <Story section={section} />}
    {section?.slug === 'our-impact' && <Impact section={section} />}
    {section?.slug === 'responsible-business' && <Responsible section={section} />}
    {section?.slug === 'presence' && <Presence section={section} />}
    {!section && <section className={styles.overview}><p className={styles.eyebrow}>Get to know us</p><h2>Four perspectives. One Workhour.</h2><div>{aboutSections.map((item, i) => <Link href={`/about/${item.slug}`} key={item.slug}><Photo src={item.image} alt="" /><span className={styles.number}>0{i + 1}</span><h3>{item.label}</h3><p>{item.intro}</p><Arrow /></Link>)}</div></section>}
    {section && <nav className={styles.related} aria-label="More about Workhour"><span>More about Workhour</span>{aboutSections.filter(item => item.slug !== section.slug).map(item => <Link href={`/about/${item.slug}`} key={item.slug}>{item.label} <Arrow /></Link>)}</nav>}
    <section className={styles.contact}><div><p className={styles.eyebrow}>Start a conversation</p><h2>What’s your next step?</h2></div><Link className={styles.button} href="/contact">Connect with Workhour <Arrow /></Link></section>
    <p className={styles.imageNote}>Imagery illustrates our areas of work; it does not depict actual Workhour people or locations.</p></div>
  </main><MainFooter /></>
}

