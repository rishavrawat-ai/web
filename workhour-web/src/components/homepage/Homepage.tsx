import Image from 'next/image'
import Link from 'next/link'

import type { Homepage, Media } from '../../payload-types'
import { BusinessShowcase } from './BusinessShowcase'
import { HeroCarousel } from './HeroCarousel'
import { HomeHeader } from './HomeHeader'
import type { HomepageData, SearchEntry } from './types'
import { mediaAlt, mediaUrl } from './types'

function Arrow() {
  return <span aria-hidden="true">↗</span>
}

function isMedia(value: number | Media | null | undefined): value is Media {
  return Boolean(value && typeof value === 'object')
}

function headingLines(value: string) {
  const words = value.trim().split(/\s+/)
  const accent = words.pop()
  return words.length ? <>{words.join(' ')}<br /><em>{accent}</em></> : <em>{accent}</em>
}

function buildSearchEntries(data: HomepageData): SearchEntry[] {
  const businessEntries = data.businesses.map((business) => ({
    title: business.name,
    body: `${business.homepageIntroduction} ${business.detailedIntroduction ?? ''}`,
    href: '#businesses',
    type: 'Business',
  }))
  const announcement = data.homepage?.featuredAnnouncement
  const announcementEntry = announcement?.heading
    ? [{
        title: announcement.heading,
        body: announcement.description ?? '',
        href: announcement.url || '#announcements',
        type: 'Announcement',
      }]
    : []
  const mediaEntries = (data.homepage?.mediaCards ?? [])
    .filter((card) => card.heading)
    .map((card) => ({
      title: card.heading || '',
      body: card.description ?? '',
      href: card.url || '#news-media',
      type: 'News & Media',
    }))
  return [...businessEntries, ...announcementEntry, ...mediaEntries]
}

function IntroSection({ intro }: { intro: Homepage['intro'] | null }) {
  return (
    <section className="intro section-pad" id="approach">
      <p className="eyebrow teal">The Workhour approach</p>
      {intro?.heading ? (
        <h2>{headingLines(intro.heading)}</h2>
      ) : (
        <h2>One group.<br /><em>Many ways forward.</em></h2>
      )}
      {intro?.description ? (
        <p className="intro-statement">{intro.description}</p>
      ) : (
        <p className="intro-empty empty-note">The introduction will appear here once published.</p>
      )}
      <div className="intro-mark" aria-hidden="true">WH<span>+</span></div>
    </section>
  )
}

function ValuesSection({ panels }: { panels: NonNullable<Homepage['valuePanels']> }) {
  return (
    <section className="values-section" aria-labelledby="values-heading">
      <div className="values-head section-pad">
        <p className="eyebrow teal">What moves us</p>
        <h2 id="values-heading">The work is complex.<br /><em>The direction is clear.</em></h2>
      </div>
      {panels.length ? (
        <div className="value-grid">
          {panels.map((panel, index) => (
            <article className={`value value-${index}`} key={panel.id ?? `${panel.heading}-${index}`}>
              <span className="value-no">{String(index + 1).padStart(2, '0')}</span>
              <h3>{panel.heading}</h3>
              <p>{panel.description}</p>
            </article>
          ))}
        </div>
      ) : (
        <p className="empty-state section-pad">Company values will appear here once published.</p>
      )}
    </section>
  )
}

function AnnouncementSection({ announcement }: { announcement: Homepage['featuredAnnouncement'] }) {
  const image = mediaUrl(announcement?.image)
  const hasContent = Boolean(announcement?.heading || announcement?.description || image)

  return (
    <section className="announcement section-pad" id="announcements">
      <div>
        <p className="eyebrow teal">Featured announcement</p>
        {announcement?.heading ? <h2>{announcement.heading}</h2> : <h2>Announcement</h2>}
        {image && isMedia(announcement?.image) ? (
          <Image
            className="announcement-image"
            src={image}
            alt={mediaAlt(announcement.image, announcement.heading || 'Featured announcement')}
            width={announcement.image.width || 960}
            height={announcement.image.height || 640}
            sizes="(max-width: 700px) 100vw, 40vw"
          />
        ) : null}
      </div>
      <div className="announcement-copy">
        {hasContent ? (
          <>
            {announcement?.description ? <p>{announcement.description}</p> : null}
            {announcement?.url ? (
              <Link className="text-link" href={announcement.url}>
                {announcement.label || 'View announcement'} <Arrow />
              </Link>
            ) : null}
          </>
        ) : (
          <p className="empty-state">No featured announcement has been published yet.</p>
        )}
      </div>
    </section>
  )
}

function MediaSection({ cards }: { cards: NonNullable<Homepage['mediaCards']> }) {
  const publishedCards = cards.filter((card) => card.heading || card.description || mediaUrl(card.image))

  return (
    <section className="media-section section-pad" id="news-media">
      <div className="media-head">
        <div>
          <p className="eyebrow teal">News &amp; media</p>
          <h2>Ideas worth<br /><em>carrying forward.</em></h2>
        </div>
        <a className="text-link" href="#news-media">All news &amp; media <Arrow /></a>
      </div>
      {publishedCards.length ? (
        <div className="media-grid">
          {publishedCards.map((card, index) => {
            const image = mediaUrl(card.image)
            const href = card.url || '#news-media'
            return (
              <article className={`media-card media-tone-${index % 3}`} key={card.id ?? `${card.heading}-${index}`}>
                <div className="media-visual">
                  {image && isMedia(card.image) ? (
                    <Image
                      src={image}
                      alt={mediaAlt(card.image, card.heading || 'News and media')}
                      fill
                      sizes="(max-width: 700px) 100vw, 30vw"
                    />
                  ) : <span aria-hidden="true">{card.heading?.slice(0, 1) || '·'}</span>}
                </div>
                <p className="eyebrow">News &amp; media</p>
                <h3>{card.heading || 'News & media'}</h3>
                {card.description ? (
                  <p>{card.description}</p>
                ) : (
                  <p className="empty-state">Details will appear here when provided.</p>
                )}
                {(card.url || card.label) ? (
                  <Link className="text-link" href={href}>{card.label || 'View story'} <Arrow /></Link>
                ) : null}
              </article>
            )
          })}
        </div>
      ) : (
        <p className="empty-state">News and media will appear here once published.</p>
      )}
    </section>
  )
}

function HomeFooter() {
  return (
    <>
      <section className="newsletter section-pad">
        <div>
          <p className="eyebrow">Stay in the loop</p>
          <h2>Make room for<br /><em>what’s next.</em></h2>
        </div>
        <div>
          <p>Newsletter delivery is not connected in this preview.</p>
          <div className="fake-form">
            <input aria-label="Email address" placeholder="Your email address" disabled />
            <button type="button" disabled>Subscribe <Arrow /></button>
          </div>
          <small>This preview does not submit newsletter data.</small>
        </div>
      </section>
      <footer className="footer section-pad">
        <div className="footer-top">
          <Image src="/workhour-business-logo.jpeg" alt="Workhour Business" width={267} height={56} />
          <p>WorkHour Business - we power your complete business journey.</p>
        </div>
        <div className="footer-links">
          <div><small>Explore</small><a href="#approach">About Us</a><a href="#businesses">Businesses</a></div>
          <div><small>Our content</small><a href="#announcements">Announcement</a><a href="#news-media">News &amp; Media</a></div>
          <div><small>Connect</small><span className="muted">Contact details have not been supplied</span><span className="muted">Social and legal links to be supplied</span></div>
        </div>
        <div className="footer-bottom">
          <span>© Workhour Business</span><span>Design preview · No production claims</span>
        </div>
      </footer>
    </>
  )
}

export function Homepage({ homepage, businesses, loadError }: HomepageData) {
  const searchEntries = buildSearchEntries({ homepage, businesses })

  return (
    <>
      <HomeHeader businesses={businesses} searchEntries={searchEntries} />
      {loadError ? (
        <p className="homepage-error section-pad" role="alert">
          Homepage content is temporarily unavailable. Please try again later.
        </p>
      ) : null}
      <main>
        <HeroCarousel slides={(homepage?.heroSlides ?? []).filter((slide) => slide.headline.trim())} />
        <IntroSection intro={homepage?.intro ?? null} />
        <BusinessShowcase businesses={businesses} />
        <ValuesSection panels={homepage?.valuePanels ?? []} />
        <AnnouncementSection announcement={homepage?.featuredAnnouncement} />
        <MediaSection cards={homepage?.mediaCards ?? []} />
      </main>
      <HomeFooter />
    </>
  )
}
