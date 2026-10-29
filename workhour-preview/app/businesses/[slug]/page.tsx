import PageBanner from '../../../components/PageBanner'
import { businessVisuals } from '../../../data/page-visuals'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import MainHeader from '../../../components/MainHeader'
import MainFooter from '../../../components/MainFooter'
import { businesses } from '../../../data/content'
import { brandHref, brandSites, suppliedBrandSections } from '../../../data/brand-sites'
import { homepageBusinessIntros } from '../../../data/business-content'

export function generateStaticParams() { return businesses.map(({ slug }) => ({ slug })) }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const business = businesses.find(item => item.slug === slug); return { title: business ? business.name + ' | Workhour Business' : 'Business', description: business?.intro } }

export default async function BusinessPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const business = businesses.find(item => item.slug === slug)
  const brand = brandSites.find(item => item.slug === slug)
  if (!business || !brand) notFound()
  const sections = suppliedBrandSections(slug)
  return <><MainHeader /><main className="review-page banner-page"><PageBanner title={business.name} description={homepageBusinessIntros[slug] ?? business.intro} image={business.image} alt={`${business.name} illustrative scene`} parent={{label: "Portfolio", href: "/businesses"}} /><div className="review-inner"><div className="portfolio-support-image"><Image src={businessVisuals[slug].image} alt={businessVisuals[slug].alt} fill sizes="(max-width: 700px) 100vw, 40vw" /></div>{sections.map(section => <section className="about-content business-copy-section" key={section.title}><h2>{section.title}</h2>{section.paragraphs?.map(paragraph => <p key={paragraph}>{paragraph}</p>)}{section.bullets && <ul className="brand-bullets">{section.bullets.map(item => <li key={item}>{item}</li>)}</ul>}</section>)}<section className="about-content"><h2>Explore the group</h2><div className="brand-switcher">{brandSites.filter(item => item.slug !== slug).map(item => <Link href={brandHref(item)} key={item.slug}>{item.name} <span aria-hidden="true">↗</span></Link>)}</div></section><section className="about-content brand-contact-cta"><h2>Explore {business.name}.</h2><p>Visit the dedicated brand experience to review its services and offerings.</p><Link className="button button-dark" href={brandHref(brand)}>Visit {business.name} <span aria-hidden="true">↗</span></Link></section><Link className="text-link" href="/businesses">All businesses <span aria-hidden="true">↗</span></Link></div></main><MainFooter /></>
}
