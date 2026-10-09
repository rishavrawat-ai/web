import Image from 'next/image'
import Link from 'next/link'

import type { Media, Service } from '../../payload-types'

function publishedImage(value: number | Media | null | undefined): value is Media {
  return Boolean(value && typeof value === 'object' && value._status === 'published' && value.url)
}

const groupTitles = { enterprise: 'Enterprise', education: 'Education', process: 'A Simple, Collaborative Process', general: '' } as const

export function ServiceContent({ service }: { service: Service }) {
  const groups = (service.sections ?? []).reduce<Array<{ key: string; sections: NonNullable<Service['sections']> }>>((result, section) => {
    const key = section.sectionGroup || 'general'
    const last = result.at(-1)
    if (last?.key === key) last.sections.push(section)
    else result.push({ key, sections: [section] })
    return result
  }, [])

  return <main className="review-page service-detail-page cms-service-page">
    <div className="review-inner">
      <p className="eyebrow teal"><Link href="/services">Services</Link> / Workhour Business</p>
      <h1>{service.title}</h1>
      {service.summary ? <p className="review-intro">{service.summary}</p> : null}
      <p className="service-lead">{service.introduction}</p>
      {(service.image && publishedImage(service.image)) ? <Image className="inner-content-image" src={service.image.url!} alt={service.image.alt || service.title} width={service.image.width || 1200} height={service.image.height || 800} sizes="(max-width: 700px) 100vw, 70vw" /> : null}
      {service.sections?.length ? <nav className="about-jumps" aria-label={`${service.title} sections`}>
        {service.sections.map((section, index) => <a href={`#service-${index + 1}`} key={section.id ?? `${section.heading}-${index}`}>{section.heading}</a>)}
      </nav> : <p className="empty-state">Service details will appear here when published.</p>}
      <div className="service-detail-sections">
        {groups.map((group, groupIndex) => <div className="cms-service-group" key={`${group.key}-${groupIndex}`}>
          {groupTitles[group.key as keyof typeof groupTitles] ? <h2>{groupTitles[group.key as keyof typeof groupTitles]}</h2> : null}
          <div className={group.sections.length > 1 && group.key !== 'general' ? 'service-grid' : undefined}>
            {group.sections.map((section, sectionIndex) => {
              const globalIndex = (service.sections ?? []).indexOf(section)
              return <section className="about-content service-content" id={`service-${globalIndex + 1}`} key={section.id ?? `${section.heading}-${sectionIndex}`}>
                <p className="eyebrow teal">{String(globalIndex + 1).padStart(2, '0')} / {service.title}</p>
                <h3>{section.heading}</h3><p>{section.body}</p>
                {section.image && publishedImage(section.image) ? <Image className="inner-content-image" src={section.image.url!} alt={section.image.alt || section.heading} width={section.image.width || 1200} height={section.image.height || 800} sizes="(max-width: 700px) 100vw, 70vw" /> : null}
                {section.cta?.label && section.cta.url ? <p><Link className="text-link" href={section.cta.url}>{section.cta.label} ↗</Link></p> : null}
              </section>
            })}
          </div>
        </div>)}
      </div>
      {service.cta?.label && service.cta.url ? <section className="services-contact"><p className="eyebrow teal">Next step</p><h2>Let’s talk about your goals.</h2><p>Contact the Workhour Business team to discuss this service.</p><Link className="button button-dark" href={service.cta.url}>{service.cta.label} <span aria-hidden="true">↗</span></Link></section> : null}
      <nav className="service-switcher" aria-label="Other services"><Link href="/services">All services</Link></nav>
    </div>
  </main>
}
