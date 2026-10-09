import { notFound } from 'next/navigation'

import { InnerPageShell } from '../../../../components/inner/InnerPageShell'
import { ServiceContent } from '../../../../components/inner/ServiceContent'
import { getPublishedInnerContent } from '../../../../lib/innerPages'

export const dynamic = 'force-dynamic'

export default async function CMSServiceRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { pages, services } = await getPublishedInnerContent()
  const service = services.find((item) => item.slug === slug)
  if (!service) notFound()
  const searchPages = pages.map((item) => ({ title: item.title, body: `${item.introduction} ${item.body ?? ''}`, href: `/${item.slug}`, type: 'Page' }))
  return <InnerPageShell services={services} pages={searchPages}><ServiceContent service={service} /></InnerPageShell>
}
