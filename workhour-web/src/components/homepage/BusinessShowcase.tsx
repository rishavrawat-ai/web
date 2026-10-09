'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import type { HomepageBusiness } from './types'
import { mediaAlt, mediaUrl } from './types'

const fallbackImages: Record<string, string> = {
  'go-travel-global': '/business-gotravel.webp',
  inceptura: '/business-inceptura.webp',
  employaa: '/business-employaa.webp',
  remunerax: '/business-remunerax.webp',
  thinkrunspace: '/business-thinkrunspace.webp',
  'leaders-pinnacle': '/business-leaders-pinnacle.webp',
  elevatrain: '/business-elevatrain.webp',
}

function Arrow() {
  return <span aria-hidden="true">↗</span>
}

export function BusinessShowcase({ businesses }: { businesses: HomepageBusiness[] }) {
  const [active, setActive] = useState(0)

  if (businesses.length === 0) {
    return (
      <section className="business-section section-pad" id="businesses">
        <div className="section-intro">
          <div><p className="eyebrow teal">Our businesses</p><h2>One group.<br /><em>Many ways forward.</em></h2></div>
          <p>No businesses have been published yet.</p>
        </div>
      </section>
    )
  }

  const business = businesses[active]
  const businessImage = mediaUrl(business.image) ?? fallbackImages[business.slug]
  const businessAlt = mediaAlt(business.image, `${business.name} illustrative business scene`)
  const mark = business.name.replace(/[^a-z0-9]/gi, '').slice(0, 2).toUpperCase()

  return (
    <section className="business-section section-pad" id="businesses">
      <div className="section-intro">
        <div>
          <p className="eyebrow teal">Our businesses</p>
          <h2>One group.<br /><em>Many ways forward.</em></h2>
        </div>
        <p>
          Seven specialist businesses, connected by one ambition: to make progress more possible
          for the people and organisations we work with.
        </p>
      </div>
      <div className="business-layout">
        <div className="business-list" role="tablist" aria-label="Published businesses">
          {businesses.map((item, index) => (
            <button
              key={item.id}
              id={`business-tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={active === index}
              aria-controls="business-panel"
              tabIndex={active === index ? 0 : -1}
              className={active === index ? 'business-tab active' : 'business-tab'}
              onClick={() => setActive(index)}
              onKeyDown={(event) => {
                if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
                  event.preventDefault()
                  setActive((index + 1) % businesses.length)
                }
                if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                  event.preventDefault()
                  setActive((index + businesses.length - 1) % businesses.length)
                }
                if (event.key === 'Home') {
                  event.preventDefault()
                  setActive(0)
                }
                if (event.key === 'End') {
                  event.preventDefault()
                  setActive(businesses.length - 1)
                }
              }}
              onKeyUp={(event) => {
                if (['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
                  document.getElementById(`business-tab-${businesses[active]?.id}`)?.focus()
                }
              }}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              {item.name}
              <Arrow />
            </button>
          ))}
        </div>
        <div
          className="business-feature"
          id="business-panel"
          role="tabpanel"
          aria-labelledby={`business-tab-${business.id}`}
          tabIndex={0}
        >
          <div className={`business-art art-${active}`}>
            {businessImage ? (
              <Image src={businessImage} alt={businessAlt} fill sizes="(max-width: 700px) 100vw, 35vw" />
            ) : null}
            <div className="business-image-overlay" aria-hidden="true" />
            <span aria-hidden="true">{mark}</span>
          </div>
          <div className="business-detail">
            <p className="eyebrow">{String(active + 1).padStart(2, '0')} / {String(businesses.length).padStart(2, '0')}</p>
            <h3>{business.name}</h3>
            <p>{business.homepageIntroduction}</p>
            <Link className="text-link" href={`/businesses/${business.slug}`}>
              Read More <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
