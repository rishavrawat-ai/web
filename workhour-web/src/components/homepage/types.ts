import type { Business, Homepage, Media } from '../../payload-types'

export type HomepageBusiness = Business
export type HomepageData = {
  homepage: Homepage | null
  businesses: HomepageBusiness[]
  loadError?: boolean
}

export type SearchEntry = {
  title: string
  body: string
  href: string
  type: string
}

export function mediaUrl(value: number | Media | null | undefined): string | null {
  if (!value || typeof value !== 'object') return null
  return value.url || null
}

export function mediaAlt(value: number | Media | null | undefined, fallback: string): string {
  if (!value || typeof value !== 'object') return fallback
  return value.alt || fallback
}
