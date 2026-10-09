import type { ReactNode } from 'react'

import type { Post, Service } from '../../payload-types'
import { InnerSiteFooter } from './InnerSiteFooter'
import { InnerSiteHeader, type InnerSearchEntry } from './InnerSiteHeader'

function text(value: unknown): string {
  return typeof value === 'string' ? value : ''
}

export function InnerPageShell({ children, services, pages = [], posts = [] }: { children: ReactNode; services: Service[]; pages?: InnerSearchEntry[]; posts?: Post[] }) {
  const serviceItems = services.map((service) => ({ title: service.title, slug: service.slug, introduction: service.introduction, summary: service.summary }))
  const searchEntries: InnerSearchEntry[] = [
    ...pages,
    ...services.map((service) => ({ title: service.title, body: `${text(service.summary)} ${text(service.introduction)} ${service.sections?.map((section) => `${section.heading} ${section.body}`).join(' ') ?? ''}`, href: `/services/${service.slug}`, type: 'Service' })),
    ...posts.map((post) => ({ title: post.title, body: `${text(post.excerpt)} ${text(post.body)}`, href: post.entryKind === 'external' && post.externalUrl ? post.externalUrl : `/${post.type}/${post.slug}`, type: post.type === 'announcement' ? 'Announcement' : 'News & Media' })),
  ]

  return <><InnerSiteHeader services={serviceItems} searchEntries={searchEntries} />{children}<InnerSiteFooter services={serviceItems} /></>
}
