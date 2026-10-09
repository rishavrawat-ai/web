import { notFound } from 'next/navigation'

import { InnerPageShell } from '../../../../components/inner/InnerPageShell'
import { PostArticle } from '../../../../components/inner/PostContent'
import { getPublishedInnerContent } from '../../../../lib/innerPages'
import { getPublishedPost } from '../../../../lib/posts'

export const dynamic = 'force-dynamic'

export default async function AnnouncementArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [{ pages, services, posts }, post] = await Promise.all([getPublishedInnerContent(), getPublishedPost('announcement', slug)])
  if (!post) notFound()
  const searchPages = pages.map((item) => ({ title: item.title, body: `${item.introduction} ${item.body ?? ''}`, href: `/${item.slug}`, type: 'Page' }))
  return <InnerPageShell services={services} pages={searchPages} posts={posts}><PostArticle post={post} type="announcement" title="Announcements" /></InnerPageShell>
}
