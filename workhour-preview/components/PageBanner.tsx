import Image from 'next/image'
import Link from 'next/link'
import styles from './PageBanner.module.css'

type Props = {
  title: string
  description: string
  image: string
  alt: string
  eyebrow?: string
  parent?: { label: string; href: string }
}

export default function PageBanner({ title, description, image, alt, eyebrow = 'Workhour Business', parent }: Props) {
  return <section className={styles.banner} aria-label={`${title} introduction`}>
    <Image className={styles.image} src={image} alt={alt} fill sizes="100vw" priority />
    <div className={styles.shade} aria-hidden="true" />
    <div className={styles.inner}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span>{parent && <><Link href={parent.href}>{parent.label}</Link><span aria-hidden="true">/</span></>}<span aria-current="page">{title}</span></nav>
      <div className={styles.copy}><p className={styles.eyebrow}>{eyebrow}</p><h1 className={styles.title}>{title}</h1><p className={styles.description}>{description}</p></div>
    </div>
  </section>
}
