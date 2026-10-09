import { NextResponse, type NextRequest } from 'next/server'

import { resolveBrandSlug } from './lib/brandHosts'

function shouldPassThrough(pathname: string): boolean {
  return pathname === '/api' || pathname.startsWith('/api/')
    || pathname.startsWith('/_next/')
    || /\/[^/]+\.[^/]+$/.test(pathname)
}

export function proxy(request: NextRequest) {
  const brandSlug = resolveBrandSlug(request.headers.get('host'))
  if (!brandSlug) {
    const forwardedHeaders = new Headers(request.headers)
    forwardedHeaders.delete('x-brand-site-host')
    return NextResponse.next({ request: { headers: forwardedHeaders } })
  }

  // The Payload admin is served only from the main site host.
  if (request.nextUrl.pathname === '/admin' || request.nextUrl.pathname.startsWith('/admin/')) {
    return new NextResponse(null, { status: 404 })
  }
  // Internal rewrite destinations are private implementation routes, not public URLs.
  if (request.nextUrl.pathname === '/brand-site-internal' || request.nextUrl.pathname.startsWith('/brand-site-internal/')) {
    return new NextResponse(null, { status: 404 })
  }

  const forwardedHeaders = new Headers(request.headers)
  forwardedHeaders.set('x-brand-site-host', request.headers.get('host') ?? '')
  console.log('[brand-proxy-check]', request.headers.get('host'), forwardedHeaders.get('x-brand-site-host'))
  if (shouldPassThrough(request.nextUrl.pathname)) return NextResponse.next({ request: { headers: forwardedHeaders } })

  const destination = request.nextUrl.clone()
  destination.pathname = request.nextUrl.pathname === '/'
    ? '/brand-site-internal/home'
    : `/brand-site-internal${request.nextUrl.pathname}`
  return NextResponse.rewrite(destination, { request: { headers: forwardedHeaders } })
}

export const config = {
  matcher: ['/((?!_next|.*\\.[^/]+$).*)'],
}
