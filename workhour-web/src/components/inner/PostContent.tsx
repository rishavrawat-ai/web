import Image from 'next/image'
import Link from 'next/link'

import type { Media, Post } from '../../payload-types'
import type { PostType } from '../../lib/posts'

function isPublishedImage(value: number | Media | null | undefined): value is Media {
  return Boolean(value && typeof value === 'object' && value._status === 'published' && value.url)
}

function postDate(value: string): string {
  const date = new Date(value)
  return Number.isNaN(date.valueOf()) ? value : new Intl.DateTimeFormat('en', { dateStyle: 'long' }).format(date)
}

export function PostListing({ type, title, posts, page, totalPages }: { type: PostType; title: string; posts: Post[]; page: number; totalPages: number }) {
  return <main className="review-page post-list-page">
    <div className="review-inner">
      <p className="eyebrow teal">Workhour Business</p><h1>{title}</h1>
      <p className="review-intro">Updates and stories from Workhour Business.</p>
      {posts.length ? <div className="post-listing-grid">{posts.map((post) => {
        const href = post.entryKind === 'external' && post.externalUrl ? post.externalUrl : `/${type}/${post.slug}`
        const external = post.entryKind === 'external' && Boolean(post.externalUrl)
        return <article className="post-card" key={post.id}>
          {isPublishedImage(post.image) ? <Image src={post.image.url!} alt={post.image.alt || post.title} width={post.image.width || 1000} height={post.image.height || 640} sizes="(max-width:700px) 100vw, 45vw" /> : null}
          <p className="eyebrow teal">{postDate(post.publicationDate)}</p><h2>{post.title}</h2><p>{post.excerpt}</p>
          <Link className="text-link" href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{external ? 'Read at source' : 'Read article'} <span aria-hidden="true">↗</span></Link>
        </article>
      })}</div> : <p className="empty-state">No {type === 'announcement' ? 'announcements' : 'news and media'} have been published yet.</p>}
      {totalPages > 1 ? <nav className="post-pagination" aria-label={`${title} pages`}>
        {page > 1 ? <Link rel="prev" href={`/${type}?page=${page - 1}`}>Previous</Link> : <span aria-disabled="true">Previous</span>}
        <span aria-current="page">Page {page} of {totalPages}</span>
        {page < totalPages ? <Link rel="next" href={`/${type}?page=${page + 1}`}>Next</Link> : <span aria-disabled="true">Next</span>}
      </nav> : null}
    </div>
  </main>
}

export function PostArticle({ post, type, title }: { post: Post; type: PostType; title: string }) {
  return <main className="review-page post-detail-page">
    <article className="review-inner">
      <Link className="post-back-link" href={`/${type}`}>← All {title}</Link>
      <p className="eyebrow teal">{title} · {postDate(post.publicationDate)}</p><h1>{post.title}</h1>
      <p className="review-intro">{post.excerpt}</p>
      {isPublishedImage(post.image) ? <Image className="post-detail-image" src={post.image.url!} alt={post.image.alt || post.title} width={post.image.width || 1200} height={post.image.height || 800} sizes="(max-width:700px) 100vw, 70vw" /> : null}
      <div className="post-body">{(post.body || '').split(/\r?\n\s*\r?\n/).filter(Boolean).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
    </article>
  </main>
}
