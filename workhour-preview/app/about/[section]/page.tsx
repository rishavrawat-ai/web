import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import AboutExperience from '../../../components/AboutExperience'
import { aboutSections, getAboutSection } from '../../../data/about'

export function generateStaticParams() {
  return aboutSections.map(section => ({ section: section.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ section: string }> }): Promise<Metadata> {
  const section = getAboutSection((await params).section)
  if (!section) notFound()
  return { title: section.label, description: section.intro }
}

export default async function AboutSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const section = getAboutSection((await params).section)
  if (!section) notFound()
  return <AboutExperience section={section} />
}
