import { InnerPageShell } from '../../../components/inner/InnerPageShell'
import { PostListing } from '../../../components/inner/PostContent'
import { getPublishedInnerContent } from '../../../lib/innerPages'
import { getPublishedPostListing } from '../../../lib/posts'

export const dynamic = 'force-dynamic'

export default async function NewsMediaPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const params = await searchParams
  const page = Math.max(1, Number.parseInt(params.page || '1', 10) || 1)
  const [{ pages, services, posts }, listing] = await Promise.all([getPublishedInnerContent(), getPublishedPostListing('news-media', page)])
  const searchPages = pages.map((item) => ({ title: item.title, body: `${item.introduction} ${item.body ?? ''}`, href: `/${item.slug}`, type: 'Page' }))
  return <InnerPageShell services={services} pages={searchPages} posts={posts}><PostListing type="news-media" title="News & Media" posts={listing.docs} page={page} totalPages={listing.totalPages} /></InnerPageShell>
}
