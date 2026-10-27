import Image from 'next/image'
import Link from 'next/link'
import styles from './IgnitiaFeature.module.css'

export default function IgnitiaFeature() {
  return (
    <section className={styles.feature} id="ignita" aria-labelledby="ignitia-feature-heading">
      <Link className={styles.visual} href="/announcements/ignitia" aria-label="Discover IGNITIA">
        <Image src="/ignitia-leadership.webp" alt="Illustrative scene of leaders exchanging ideas at an African innovation summit" fill sizes="(max-width: 700px) 90vw, 50vw" />
      </Link>
      <div className={styles.copy}>
        <p className="eyebrow teal">Featured announcement</p>
        <h2 id="ignitia-feature-heading"><Link href="/announcements/ignitia">IGNITIA <span aria-hidden="true">↗</span></Link></h2>
        <h3>Where vision meets opportunity<br />and ideas ignite change.</h3>
        <p>A premier platform for leadership, innovation, collaboration, and global impact — connecting Africa with the world.</p>
        <Link className="text-link" href="/announcements/ignitia">Discover IGNITIA <span aria-hidden="true">↗</span></Link>
      </div>
    </section>
  )
}
