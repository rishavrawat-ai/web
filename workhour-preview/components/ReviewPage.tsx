import Link from 'next/link'
import { businesses } from '../data/content'

const copy: Record<string, { title: string; intro: string; body: string }> = {
  about: { title: 'About Workhour', intro: 'Where global ambition meets determined action.', body: 'The supplied requirements describe a business built to empower SMEs, entrepreneurs, and startups with world-class Business Process Outsourcing services. Detailed awards, certifications and final history assets are not yet supplied.' },
  businesses: { title: 'Our businesses', intro: 'Specialists, connected by one complete business journey.', body: 'Explore the seven supplied business introductions. Brand websites will use true subdomains in production; their DNS and final URLs remain unverified.' },
  careers: { title: 'Join Delhi’s Global Outsourcing Powerhouse', intro: 'We’re always look out for passionate, customer-focused talent.', body: 'Real Growth; Global Exposure; Flexible Careers; Learning Culture; Competitive Pay. Health insurance; Free certification courses; Performance incentives; Career progression.' },
  contact: { title: 'Contact Us', intro: 'A final contact destination is still to be supplied.', body: 'Address, phone, map, form fields, recipient, spam protection and success state are not provided. This preview does not submit contact forms.' },
  announcements: { title: 'Announcement', intro: 'A place for the next signal.', body: 'No final announcement entry, image, URL or detail copy was supplied. This is an honest empty state for review.' },
  'news-media': { title: 'News & Media', intro: 'Ideas worth carrying forward.', body: 'Final news items, media descriptions, images and links are not yet supplied. The homepage preserves the three requested titles without inventing stories.' },
}

export default function ReviewPage({ kind }: { kind: keyof typeof copy }) {
  const page = copy[kind]
  return <main className="review-page"><div className="review-inner"><p className="eyebrow teal">Workhour Business / Preview</p><h1>{page.title}</h1><p className="review-intro">{page.intro}</p><p className="review-body">{page.body}</p>{kind === 'businesses' && <div className="review-business-list">{businesses.map(b => <article id={b.slug} key={b.slug}><span>{b.mark}</span><div><h2>{b.name}</h2><p>{b.intro}</p><Link className="text-link" href={`/#businesses`}>Back to showcase ↗</Link></div></article>)}</div>}{kind === 'careers' && <a className="button button-dark" href="mailto:careers@workhourbusiness.com">Apply Now ↗</a>}{kind === 'contact' && <p className="empty-note">Contact form unavailable in preview.</p>}{kind !== 'businesses' && kind !== 'careers' && kind !== 'contact' && <p className="empty-note">Content pending client supply.</p>}<Link className="text-link" href="/">Return to homepage ↗</Link></div></main>
}
