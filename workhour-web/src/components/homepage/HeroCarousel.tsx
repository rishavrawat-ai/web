'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import type { Homepage } from '../../payload-types'
import { mediaAlt, mediaUrl } from './types'

const fallbackImages = [
  '/hero-innovate.webp',
  '/hero-progress.webp',
  '/hero-evolve.webp',
  '/hero-transform.webp',
]

function Arrow() {
  return <span aria-hidden="true">↗</span>
}

type HeroSlide = NonNullable<Homepage['heroSlides']>[number]

export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || slides.length < 2) return
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length)
    }, 5000)
    return () => window.clearInterval(timer)
  }, [paused, slides.length])

  if (slides.length === 0) {
    return (
      <section className="hero section-pad hero-empty" aria-labelledby="hero-empty-title">
        <div className="hero-copy">
          <p className="eyebrow">Workhour Business</p>
          <h1 id="hero-empty-title">Homepage content has not been published yet.</h1>
        </div>
      </section>
    )
  }

  const slide = slides[active]
  const image = mediaUrl(slide.image) ?? fallbackImages[active % fallbackImages.length]
  const imageAlt = mediaAlt(slide.image, `${slide.headline} — illustrative corporate scene`)
  const ctaHref = slide.ctaUrl || '#approach'

  return (
    <section className="hero section-pad" aria-roledescription="carousel" aria-label="Featured stories">
      <Image
        key={image}
        className="hero-image"
        src={image}
        alt={imageAlt}
        fill
        sizes="100vw"
        priority={active === 0}
      />
      <div className="hero-overlay" aria-hidden="true" />
      <div className="hero-orbit" aria-hidden="true"><i /><i /><i /></div>
      <div className="hero-copy" aria-live="polite">
        <p className="eyebrow">Workhour Business / 2026</p>
        <div className="hero-counter">
          {String(active + 1).padStart(2, '0')} <span>/ {String(slides.length).padStart(2, '0')}</span>
        </div>
        <h1>{slide.headline}</h1>
        <p className="hero-sub">
          Business capability for the complete journey — from the first idea to the next horizon.
        </p>
        <Link className="button button-light" href={ctaHref}>
          {slide.ctaLabel || 'Explore our businesses'} <Arrow />
        </Link>
        {slides.length > 1 && (
          <div className="hero-controls" aria-label="Slideshow controls">
            <button
              type="button"
              onClick={() => setActive((active + slides.length - 1) % slides.length)}
              aria-label="Previous slide"
            >
              ←
            </button>
            {slides.map((item, index) => (
              <button
                key={item.id ?? `${item.headline}-${index}`}
                type="button"
                className={index === active ? 'dot active' : 'dot'}
                onClick={() => setActive(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === active ? 'true' : undefined}
              />
            ))}
            <button
              type="button"
              onClick={() => setActive((active + 1) % slides.length)}
              aria-label="Next slide"
            >
              →
            </button>
            <button
              className="pause"
              type="button"
              onClick={() => setPaused((value) => !value)}
              aria-label={paused ? 'Resume slideshow' : 'Pause slideshow'}
            >
              {paused ? 'Play' : 'Pause'}
            </button>
          </div>
        )}
      </div>
      <div className="hero-aside" aria-hidden="true">
        <span>01</span><div className="hero-line" /><span>Global ambition<br />meets determined action</span>
      </div>
    </section>
  )
}
