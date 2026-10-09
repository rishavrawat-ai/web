import { notFound } from 'next/navigation'

import { InnerPageShell } from '../../../components/inner/InnerPageShell'
import { PageContent } from '../../../components/inner/PageContent'
import { getPublishedInnerContent } from '../../../lib/innerPages'

export const dynamic = 'force-dynamic'

export default async function CMSPageRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { pages, services } = await getPublishedInnerContent()
  const page = pages.find((item) => item.slug === slug)
  if (!page) notFound()
  const searchPages = pages.map((item) => ({ title: item.title, body: `${item.introduction} ${item.body ?? ''}`, href: `/${item.slug}`, type: 'Page' }))
  return <InnerPageShell services={services} pages={searchPages}><PageContent page={page} /></InnerPageShell>
}
