import Link from 'next/link'
import Image from 'next/image'
import { businesses, businessSupplements, globalExpansion, media } from '../data/content'
import SearchButton from './SearchButton'
import { businessContent, homepageBusinessIntros } from '../data/business-content'
import { brandSites, brandHref } from '../data/brand-sites'

const aboutSections = [
  { id: 'history', title: 'Our History', paragraphs: ['Established in the heart of New Delhi, India WorkHour Business began with a simple yet powerful vision: to empower SMEs, entrepreneurs, and startups with world-class Business Process Outsourcing (BPO) services at affordable rates. What started as a 3-member team handling basic back-office operations for local Indian businesses has phenomenally evolved into a continental outsourcing leader serving India, Asia, Africa, and the Middle East.', 'India: Birthplace and talent hub – 70% of our experts based in Delhi-NCR. Asia: Strategic operations in Tier-1 cities (Bangalore, Mumbai, Manila). Africa: Rapid expansion serving Kenya, Nigeria, South Africa, Egypt. Middle East: GCC powerhouse (UAE, Saudi Arabia, Qatar, Oman).', '“WorkHour Promise”: Every client gets a dedicated time allocation for innovation projects alongside routine operations. This unique model ensures continuous value addition – turning transactional clients into strategic partners.', 'Future Vision: By 2030, become the #1 outsourcing partner for emerging markets, powering 10,000+ SMEs with cutting-edge automation + human expertise.', 'WorkHour Business – Where Global Ambition Meets Delhi Determination.'] },
  { id: 'awards', title: 'Awards', paragraphs: [] },
  { id: 'certifications', title: 'Certifications', paragraphs: [] },
  { id: 'impact', title: 'Our Impact', paragraphs: ['Since its inception in Delhi, WorkHour Business has created a profound global impact, empowering SMEs, entrepreneurs, and startups across India, Asia, Africa, and the Middle East to achieve sustainable growth through world-class Business Process Outsourcing services.', 'From our Delhi headquarters, we’ve driven collective client revenue growth, created many direct jobs across the continents, and pioneered cross-border operations that helped businesses scale regionally—most notably enabling African startups to expand across multiple countries while GCC retailers penetrated digital markets.', 'Our unique WorkHour Promise—allocating dedicated innovation time per client—has delivered 3.2x average ROI within 18 months, deployed tech stacks and GTM’s saving clients 65% in costs, and maintained a stellar 95% retention rate against the industry average of 75%. Beyond numbers, we’ve empowered women from Tier-2/3 cities, provided first corporate jobs to graduates—truly transforming Delhi’s entrepreneurial spirit into a continental economic force.'] },
  { id: 'csr', title: 'Corporate Social Responsibility', paragraphs: ['WorkHour Business is deeply committed to creating shared value beyond profits, channelling our Delhi roots into meaningful societal impact across the regions we serve. Our CSR initiatives focus on Women Empowerment, providing them stable corporate careers consulting and skill development in digital tools and customer service.', 'We are bringing the “WorkHour Scholars” program sponsoring education for kids from low-income families, while our Africa Skill Bridge initiative will also provide free consulting and mentorship to entrepreneurs.', 'Through these efforts, we will be impacting lives directly, embodying our belief that true business success measures not just revenue growth, but the communities we uplift along the way.'] },
  { id: 'presence', title: 'Presence', paragraphs: ['WorkHour Business identifies Delhi-NCR as its primary delivery hub and says it serves clients across time zones. The supplied documents list different regional locations; please see Global Presence for the combined list pending client confirmation.', 'India – HQ + Primary Delivery: Delhi (HQ); Regional Centres: Bangalore, Mumbai, Chandigarh.', 'Asia – Regional Centre: Malaysia.', 'Africa – Regional Centres: Nairobi, Kenya; Malawi; Zimbabwe; South Africa; Ivory Coast; Rwanda; Ghana.', 'The sitemap also names Australia, UAE, Canada, USA, and Mexico. Exact office and client-centre locations need confirmation.', 'Our distributed delivery model ensures 24/7 coverage across multiple languages—from Hindi and Swahili to Arabic and Mandarin. Clients connect through our centralized Delhi dashboard while receiving localized support from regional delivery centres.', 'Simple truth: One Delhi HQ, global reach. Your business gets world-class outsourcing with a single point of contact.'] },
]

const careerGroups = [
  { title: 'Why WorkHour?', items: ['Real Growth', 'Global Exposure', 'Flexible Careers', 'Learning Culture', 'Competitive Pay'] },
  { title: 'What we Value', items: ['Positive Attitude', 'Team player', 'Willingness to learn', 'Communication'] },
  { title: 'Employee Benefits', items: ['Health insurance', 'Free certification courses', 'Performance incentives', 'Career progression'] },
]

const copy: Record<string, { title: string; intro: string; body: string }> = {
  about: { title: 'About Workhour', intro: 'Where global ambition meets Delhi determination.', body: 'Global expansion made simple, scalable, and risk-aware. Workhour Business supports international teams with local hiring, compliance, operational infrastructure, and strategic consulting.' },
  businesses: { title: 'Our businesses', intro: 'Specialists, connected by one complete business journey.', body: 'Explore the seven businesses and their services, markets and operating models.' },
  careers: { title: 'Join Delhi’s Global Outsourcing Powerhouse', intro: 'We’re always look out for passionate, customer-focused talent to power our 24/7 operations serving SMEs across India, Asia, Africa, and the Middle East.', body: 'WorkHour Business – Where freshers become global professionals.' },
  contact: { title: 'Contact Us', intro: 'A final contact destination is still to be supplied.', body: 'Address, phone, map, form fields, recipient, spam protection and success state are not provided. This preview does not submit contact forms.' },
  announcements: { title: 'Announcement', intro: 'A place for the next signal.', body: 'No final announcement entry, image, URL or detail copy was supplied. This is an honest empty state for review.' },
  'news-media': { title: 'News & Media', intro: 'Ideas worth carrying forward.', body: 'Final news items, media descriptions, images and links are not yet supplied. The homepage preserves the three requested titles without inventing stories.' },
}

function ContactPreview() {
  return <div className="contact-layout">
    <section className="contact-panel">
      <p className="eyebrow teal">Start a conversation</p><h2>Tell us what you are building.</h2><p>Use the form layout to review the contact experience. Submission is disabled until Workhour confirms the recipient and privacy details.</p>
      <form className="contact-form">
        <label>Full name<input disabled placeholder="Your name" /></label>
        <label>Work email<input disabled type="email" placeholder="you@company.com" /></label>
        <label>Company<input disabled placeholder="Company name" /></label>
        <label>What can we help with?<select disabled defaultValue=""><option value="" disabled>Select a topic</option><option>Business services</option><option>Careers</option><option>Media enquiry</option></select></label>
        <label className="contact-message">Message<textarea disabled rows={4} placeholder="Tell us a little about your requirements" /></label>
        <button className="button button-dark" type="button" disabled>Send enquiry ↗</button>
      </form>
      <p className="form-status">Contact form delivery is not configured in this review build.</p>
    </section>
    <aside className="contact-info"><p className="eyebrow teal">Contact details</p><h3>Workhour Business</h3><dl><dt>Email</dt><dd>To be supplied</dd><dt>Phone</dt><dd>To be supplied</dd><dt>Office address</dt><dd>Delhi-NCR is identified as the primary delivery hub; the postal address is pending.</dd></dl><Link className="text-link" href="/global-presence">View global presence ↗</Link></aside>
  </div>
}

function MediaArchive() {
  return <div className="review-media-list media-archive">
    {media.map(item => <article id={item.slug} key={item.slug}>
      <div className={`media-visual ${item.tone}`}><span>{item.slug === 'ignita' ? 'I' : '·'}</span></div>
      <p className="eyebrow teal">{item.kicker} · Publication date pending</p><h2>{item.title}</h2><p>{item.text}</p>
      <Link className="text-link" href={item.href}>{item.link} ↗</Link>
    </article>)}
  </div>
}

function AnnouncementPreview() {
  return <section id="ignita" className="announcement-preview">
    <div className="announcement-art"><span>IGNITA</span></div>
    <div className="announcement-detail"><p className="eyebrow teal">Featured announcement · Date pending</p><h2>IGNITA</h2><p>The client identified IGNITA as the featured announcement. Final announcement copy, approved artwork, publication date, and destination link are needed to complete this item.</p><Link className="text-link" href="/contact">Discuss this announcement ↗</Link></div>
  </section>
}

function GlobalExpansionStory() {
  return <>
    <section className="about-content"><p className="eyebrow teal">Our global approach</p><h2>Global Expansion Made Simple, Scalable, and Risk-Free</h2><p>{globalExpansion.intro}</p><p>{globalExpansion.support}</p></section>
    <section className="about-content"><h2>Our Vision</h2><p>{globalExpansion.vision}</p><h2>Our Mission</h2><p>{globalExpansion.mission}</p></section>
    <section className="about-content"><h2>Core Values</h2><div className="service-grid">{globalExpansion.values.map(item => <article className="service-item" key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section>
    <section className="about-content"><h2>The WorkHour Business In-House Advantage</h2><p>{globalExpansion.advantage}</p><p>When you partner with us, your company gains access to a complete global execution engine:</p><div className="service-grid">{globalExpansion.capabilities.map(item => <article className="service-item" key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section>
    <section className="about-content"><h2>Built for Growing SMBs and Global Enterprises</h2><p>{globalExpansion.audience}</p><p>{globalExpansion.closing}</p><Link className="text-link" href="/contact">Schedule a Global Strategy Call ↗</Link> <Link className="text-link" href="/global-presence">Explore Our Client Centers ↗</Link></section>
  </>
}

function BusinessBrandSites() {
  return <section className="about-content"><h2>Explore the brand sites</h2><div className="brand-switcher">{brandSites.map(brand => <Link href={brandHref(brand)} key={brand.slug}>{brand.name} site ↗</Link>)}</div></section>
}

export default function ReviewPage({ kind }: { kind: keyof typeof copy }) {
  const page = copy[kind]
  return <><header className="site-header"><Link href="/" className="brand"><Image src="/workhour-business-logo.jpeg" alt="Workhour Business" width={534} height={111} /></Link><nav className="nav review-nav"><Link href="/about">About Us</Link><Link href="/businesses">Businesses</Link><details className="nav-dropdown"><summary className="nav-link">Brand sites⌄</summary><div className="dropdown">{brandSites.map(brand => <Link href={brandHref(brand)} key={brand.slug}>{brand.name}</Link>)}</div></details><Link href="/services">Services</Link><Link href="/global-presence">Global Presence</Link><Link href="/announcements">Announcement</Link><Link href="/careers">Careers</Link><Link href="/news-media">News &amp; Media</Link><SearchButton /><Link className="contact-button" href="/contact">Contact Us ↗</Link></nav></header><main className="review-page"><div className="review-inner"><p className="eyebrow teal">Workhour Business / Preview</p><h1>{page.title}</h1><p className="review-intro">{page.intro}</p><p className="review-body">{page.body}</p>{kind === 'about' && <><nav className="about-jumps" aria-label="About Workhour sections">{aboutSections.map(section => <a href={`#${section.id}`} key={section.id}>{section.title}</a>)}</nav>{aboutSections.map(section => <section className="about-content" id={section.id} key={section.id}><p className="eyebrow teal">Workhour Business</p><h2>{section.title}</h2>{section.paragraphs.length ? section.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>) : <p className="empty-note">Details to be supplied.</p>}</section>)}<GlobalExpansionStory /></>}{kind === 'careers' && <><div className="career-groups">{careerGroups.map(group => <section key={group.title}><h2>{group.title}</h2><ul>{group.items.map((item, index) => <li key={index}>{item}</li>)}</ul></section>)}</div><p className="review-intro">Ready to grow with us?</p><a className="button button-dark" href="mailto:careers@workhourbusiness.com">Apply Now ↗</a></>}{kind === 'businesses' && <div className="review-business-list">{businesses.map((b, i) => <article id={b.slug} key={b.slug}><span>{String(i + 1).padStart(2, '0')}</span><div><p className="eyebrow teal">Business {String(i + 1).padStart(2, '0')} / 07</p><h2>{b.name}</h2><p>{homepageBusinessIntros[b.slug] ?? b.intro}</p>{businessContent[b.slug] ? null : <><p>{b.detail}</p>{[...(b.sections ?? []), ...(businessSupplements[b.slug]?.sections ?? [])].map((section, index) => <p key={index}>{section}</p>)}{[...(b.bullets ?? []), ...(businessSupplements[b.slug]?.bullets ?? [])].length > 0 && <ul>{[...(b.bullets ?? []), ...(businessSupplements[b.slug]?.bullets ?? [])].map((item, index) => <li key={index}>{item}</li>)}</ul>}</>}<Link className="text-link" href={`/businesses/${b.slug}`}>Read More ↗</Link></div></article>)}</div>}{kind === 'businesses' && <BusinessBrandSites />}{kind === 'news-media' && <MediaArchive />}{kind === 'announcements' && <AnnouncementPreview />}{kind === 'contact' && <ContactPreview />}<Link className="text-link" href="/">Return to homepage ↗</Link></div></main><footer className="footer section-pad"><div className="footer-top"><Image src="/workhour-business-logo.jpeg" alt="Workhour Business" width={267} height={56} /><p>WorkHour Business - we power your complete business journey.</p></div><div className="footer-bottom"><span>© Workhour Business</span><Link href="/">Back to homepage ↗</Link></div></footer></>
}
