import { NextRequest, NextResponse } from 'next/server'
import { brandDomain, brandSlugs } from './data/brand-domains'

export function proxy(request: NextRequest) {
  if (!brandDomain) return NextResponse.next()
  const host = request.nextUrl.hostname.toLowerCase()
  const brand = brandSlugs.find(slug => host === `${slug}.${brandDomain}`)
  if (!brand) return NextResponse.next()
  const url = request.nextUrl.clone()
  const legacyPrefix = `/brands/${brand}`
  if (url.pathname === legacyPrefix || url.pathname.startsWith(`${legacyPrefix}/`)) {
    url.pathname = url.pathname.slice(legacyPrefix.length) || '/'
    return NextResponse.redirect(url)
  }
  url.pathname = `${legacyPrefix}${url.pathname === '/' ? '' : url.pathname}`
  return NextResponse.rewrite(url)
}

export const config = { matcher: ['/((?!api|_next|.*\\..*).*)'] }
