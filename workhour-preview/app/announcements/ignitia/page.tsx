import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import MainHeader from '../../../components/MainHeader'
import MainFooter from '../../../components/MainFooter'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'IGNITIA — Where Vision Meets Opportunity',
  description: 'Introducing IGNITIA: a premier platform for leadership, innovation, collaboration, and global impact, connecting Africa with the world.',
}

export default function IgnitiaPage() {
  return <><MainHeader /><main className={styles.page}>
    <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/announcements">Announcements</Link><span>/</span><span aria-current="page">IGNITIA</span></nav>
    <section className={styles.hero} aria-labelledby="ignitia-title">
      <div className={styles.heroCopy}>
        <p className="eyebrow teal">Introducing IGNITIA</p>
        <h1 id="ignitia-title">Where vision meets opportunity <em>and ideas ignite change.</em></h1>
        <p>A powerful convergence of visionary leaders, global decision-makers, industry pioneers, and changemakers, IGNITIA is a premier platform dedicated to leadership, innovation, collaboration, and global impact.</p>
        <a className={styles.heroLink} href="#global-impact">Discover the vision <span aria-hidden="true">↓</span></a>
      </div>
      <div className={styles.heroImage}><Image src="/ignitia-leadership.webp" alt="Illustrative gathering of global leaders at an African leadership and innovation summit" fill sizes="(max-width: 800px) 100vw, 52vw" priority /></div>
    </section>
    <section className={styles.story} id="global-impact" aria-labelledby="impact-heading">
      <div><p className="eyebrow teal">Ideas. Connections. Impact.</p><h2 id="impact-heading">Connecting Africa.<br /><em>Inspiring the world.</em></h2></div>
      <div className={styles.storyCopy}>
        <p>Bringing together influential voices across business, government, and technology, IGNITIA creates opportunities to exchange transformative ideas, forge strategic partnerships, and shape the future of industries and economies.</p>
        <p>With its presence in Africa, IGNITIA celebrates the continent’s immense potential while connecting Africa with the world to inspire progress, unlock opportunities, and drive lasting impact.</p>
      </div>
    </section>
    <section className={styles.closing} aria-label="IGNITIA vision"><p>IGNITIA</p><h2>Igniting Ideas. Uniting Leaders.<br /><em>Shaping Tomorrow.</em></h2><Link href="/contact" className="text-link">Connect with us <span aria-hidden="true">↗</span></Link></section>
  </main><MainFooter /></>
}
