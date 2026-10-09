import Image from 'next/image'
import Link from 'next/link'

import type { Media, Page } from '../../payload-types'

function isPublishedMedia(value: number | Media | null | undefined): value is Media {
  return Boolean(value && typeof value === 'object' && value._status === 'published' && value.url)
}

function PageImage({ image, alt }: { image: number | Media | null | undefined; alt: string }) {
  if (!isPublishedMedia(image) || !image.url) return null
  return <Image className="inner-content-image" src={image.url} alt={image.alt || alt} width={image.width || 1200} height={image.height || 800} sizes="(max-width: 700px) 100vw, 70vw" />
}

export function DisabledContactForm() {
  return <section className="contact-layout" aria-labelledby="contact-form-heading">
    <div className="contact-panel">
      <p className="eyebrow teal">Start a conversation</p><h2 id="contact-form-heading">Tell us what you are building.</h2>
      <p>Use the form layout to review the contact experience. Submission is disabled until Workhour confirms the recipient and privacy details.</p>
      <form className="contact-form">
        <label>Full name<input disabled placeholder="Your name" /></label>
        <label>Work email<input disabled type="email" placeholder="you@company.com" /></label>
        <label>Company<input disabled placeholder="Company name" /></label>
        <label>What can we help with?<select disabled defaultValue=""><option value="" disabled>Select a topic</option><option>Business services</option><option>Careers</option><option>Media enquiry</option></select></label>
        <label className="contact-message">Message<textarea disabled rows={4} placeholder="Tell us a little about your requirements" /></label>
        <button className="button button-dark" type="button" disabled>Send enquiry ↗</button>
      </form>
      <p className="form-status">Contact form delivery is not configured.</p>
    </div>
  </section>
}

export function PageContent({ page }: { page: Page }) {
  const sections = page.sections ?? []
  const anchors = sections.filter((section) => section.anchor)

  return <main className="review-page cms-page">
    <div className="review-inner">
      <p className="eyebrow teal">{page.eyebrow || 'Workhour Business'}</p>
      <h1>{page.title}</h1>
      <p className="review-intro">{page.introduction}</p>
      {page.body ? <p className="review-body">{page.body}</p> : null}
      {page.slug === 'contact' ? <DisabledContactForm /> : null}
      {anchors.length > 0 ? <nav className="about-jumps" aria-label={`${page.title} sections`}>
        {anchors.map((section) => <a href={`#${section.anchor}`} key={section.id}>{section.heading}</a>)}
      </nav> : null}
      {sections.length ? <div className="cms-sections">
        {sections.map((section, index) => <section className="about-content" id={section.anchor || undefined} key={section.id ?? `${section.heading}-${index}`}>
          {section.eyebrow ? <p className="eyebrow teal">{section.eyebrow}</p> : null}
          <h2>{section.heading}</h2>
          {(section.paragraphs ?? []).map((paragraph, paragraphIndex) => <p key={paragraph.id ?? paragraphIndex}>{paragraph.text}</p>)}
          {!section.paragraphs?.length && !section.items?.length && !section.image ? <p className="empty-note">Details to be supplied.</p> : null}
          {section.items?.length ? <div className="service-grid">
            {section.items.map((item, itemIndex) => <article className="service-item" key={item.id ?? `${item.title}-${itemIndex}`}>
              <h3>{item.title}</h3>
              {item.text ? <p>{item.text}</p> : null}
            </article>)}
          </div> : null}
          <PageImage image={section.image} alt={section.heading} />
          {section.cta?.label && section.cta.url ? <p><Link className="text-link" href={section.cta.url}>{section.cta.label} <span aria-hidden="true">↗</span></Link></p> : null}
          {section.ctaSecondary?.label && section.ctaSecondary.url ? <p><Link className="text-link" href={section.ctaSecondary.url}>{section.ctaSecondary.label} <span aria-hidden="true">↗</span></Link></p> : null}
        </section>)}
      </div> : page.slug === 'services' ? null : <p className="empty-state">There is no published content for this page yet.</p>}
      <Link className="text-link" href="/">Return to homepage <span aria-hidden="true">↗</span></Link>
    </div>
  </main>
}
