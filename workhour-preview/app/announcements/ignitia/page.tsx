import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import MainHeader from '../../../components/MainHeader'
import MainFooter from '../../../components/MainFooter'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'IGNITIA — Where Vision Meets Opportunity',
  description: 'Introducing IGNITIA: a platform for leadership, innovation, collaboration, and global impact, connecting Africa with the world.',
}

const themes = [
  { title: 'Leadership', text: 'Bringing visionary leaders, global decision-makers and changemakers into the same conversation.' },
  { title: 'Innovation', text: 'Exchanging transformative ideas that help shape the future of industries and economies.' },
  { title: 'Collaboration', text: 'Creating opportunities for strategic partnerships across business, government and technology.' },
  { title: 'Global impact', text: 'Connecting Africa with the world to inspire progress and unlock opportunities.' },
]

function Arrow() { return <span aria-hidden="true">↗</span> }

export default function IgnitiaPage() {
  return <><MainHeader /><main className={styles.page}>
    <section className={styles.hero} aria-labelledby="ignitia-title">
      <Image className={styles.heroImage} src="/ignitia-auditorium.webp" alt="Illustrative leadership gathering in a contemporary auditorium with a speaker on stage" fill sizes="100vw" priority />
      <div className={styles.heroShade} />
      <div className={styles.heroInner}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/announcements">Announcements</Link><span aria-hidden="true">/</span><span aria-current="page">IGNITIA</span></nav>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}><span className={styles.spark} aria-hidden="true">✳</span> A platform for possibility</p>
          <h1 id="ignitia-title">IGNITIA<span aria-hidden="true">.</span></h1>
          <p className={styles.heroStatement}>Where vision meets opportunity.<br /><span>And ideas ignite change.</span></p>
          <p className={styles.heroIntro}>Bringing visionary leaders, industry pioneers and changemakers together to shape what comes next.</p>
          <div className={styles.actions}><a className={styles.button} href="#vision">Discover the vision <span aria-hidden="true">↓</span></a><Link className={styles.quietLink} href="/contact">Connect with us <Arrow /></Link></div>
        </div>
        <div className={styles.heroFoot}><span>Africa’s potential. A global perspective.</span><span>Leadership &nbsp; / &nbsp; Innovation &nbsp; / &nbsp; Collaboration</span></div>
      </div>
    </section>

    <div className={styles.container}>
      <section className={styles.vision} id="vision" aria-labelledby="vision-heading">
        <div><p className={styles.eyebrow}>The IGNITIA vision</p><h2 id="vision-heading">A meeting of minds.<br /><span>A world of possibility.</span></h2></div>
        <div className={styles.prose}><p className={styles.lead}>A powerful convergence of visionary leaders, global decision-makers, industry pioneers and changemakers.</p><p>IGNITIA is a premier platform dedicated to leadership, innovation, collaboration and global impact. Bringing together influential voices across business, government and technology, it creates opportunities to exchange transformative ideas, forge strategic partnerships, and shape the future of industries and economies.</p></div>
      </section>

      <section className={styles.connection} aria-labelledby="connection-heading">
        <div className={styles.connectionImage}><Image src="/ignitia-connections.webp" alt="Illustrative African and international professionals exchanging ideas in a conference foyer" fill sizes="(max-width: 700px) 100vw, 55vw" /><span>Ideas become stronger in conversation.</span></div>
        <div className={styles.connectionCopy}><p className={styles.eyebrow}>Rooted in potential. Open to the world.</p><h2 id="connection-heading">Connecting Africa.<br /><span>Inspiring the world.</span></h2><p>With its presence in Africa, IGNITIA celebrates the continent’s immense potential while connecting Africa with the world to inspire progress, unlock opportunities, and drive lasting impact.</p><div className={styles.connections}><span>Business</span><span>Government</span><span>Technology</span></div></div>
      </section>

      <section className={styles.themes} aria-labelledby="themes-heading"><div className={styles.sectionHeading}><div><p className={styles.eyebrow}>What brings us together</p><h2 id="themes-heading">Different perspectives.<br />Shared ambition.</h2></div><p>Four connected themes at the heart of IGNITIA.</p></div><div className={styles.themeGrid}>{themes.map((theme, i) => <article key={theme.title}><span className={styles.number}>0{i + 1}</span><h3>{theme.title}</h3><p>{theme.text}</p></article>)}</div></section>

      <section className={styles.closing} aria-labelledby="closing-heading"><div className={styles.closingMark} aria-hidden="true">✳</div><div><p className={styles.eyebrow}>The conversation starts here</p><h2 id="closing-heading">Igniting ideas. Uniting leaders.<br /><span>Shaping tomorrow.</span></h2><Link href="/contact" className={styles.button}>Connect about IGNITIA <Arrow /></Link></div><span className={styles.signature} aria-hidden="true">IGNITIA.</span></section>
      <div className={styles.endnote}><p>Imagery is illustrative and does not depict an actual IGNITIA event or confirmed participants.</p><Link href="/announcements">All announcements <Arrow /></Link></div>
    </div>
  </main><MainFooter /></>
}
