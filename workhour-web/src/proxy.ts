import { createHmac, timingSafeEqual } from 'node:crypto'
import { NextResponse, type NextRequest } from 'next/server'

import { resolveBrandSlug } from './lib/brandHosts'

function shouldPassThrough(pathname: string): boolean {
  return pathname === '/api' || pathname.startsWith('/api/')
    || pathname.startsWith('/_next/')
    || /\/[^/]+\.[^/]+$/.test(pathname)
}

function rewriteSignature(secret: string, host: string, pathname: string): string {
  return createHmac('sha256', secret).update(`${host}\n${pathname}`).digest('hex')
}

function isTrustedInternalRewrite(request: NextRequest): boolean {
  const segments = request.nextUrl.pathname.split('/').filter(Boolean)
  if (segments[0] !== 'brand-site-internal' || segments.length < 3) return false
  const brandSlug = segments[1]
  const originalHost = request.headers.get('x-brand-site-host')
  const signature = request.headers.get('x-brand-site-signature')
  const secret = process.env.PAYLOAD_SECRET
  if (!originalHost || !signature || !secret || resolveBrandSlug(originalHost) !== brandSlug) return false
  const expected = Buffer.from(rewriteSignature(secret, originalHost, request.nextUrl.pathname))
  const supplied = Buffer.from(signature)
  return supplied.length === expected.length && timingSafeEqual(supplied, expected)
}

export function proxy(request: NextRequest) {
  // Internal rewrite destinations are private implementation routes, not public URLs.
  if (request.nextUrl.pathname === '/brand-site-internal' || request.nextUrl.pathname.startsWith('/brand-site-internal/')) {
    if (isTrustedInternalRewrite(request)) {
      return NextResponse.next({ request: { headers: new Headers(request.headers) } })
    }
    return new NextResponse(null, { status: 404 })
  }
  const brandSlug = resolveBrandSlug(request.headers.get('host'))
  if (!brandSlug) {
    const forwardedHeaders = new Headers(request.headers)
    forwardedHeaders.delete('x-brand-site-host')
    forwardedHeaders.delete('x-brand-site-signature')
    return NextResponse.next({ request: { headers: forwardedHeaders } })
  }

  // The Payload admin is served only from the main site host.
  if (request.nextUrl.pathname === '/admin' || request.nextUrl.pathname.startsWith('/admin/')) {
    return new NextResponse(null, { status: 404 })
  }
  const forwardedHeaders = new Headers(request.headers)
  forwardedHeaders.set('x-brand-site-host', request.headers.get('host') ?? '')
  forwardedHeaders.delete('x-brand-site-signature')
  if (shouldPassThrough(request.nextUrl.pathname)) return NextResponse.next({ request: { headers: forwardedHeaders } })

  const destination = request.nextUrl.clone()
  destination.pathname = request.nextUrl.pathname === '/'
    ? `/brand-site-internal/${brandSlug}/home`
    : `/brand-site-internal/${brandSlug}${request.nextUrl.pathname}`
  const secret = process.env.PAYLOAD_SECRET
  if (!secret) return new NextResponse(null, { status: 500 })
  forwardedHeaders.set('x-brand-site-signature', rewriteSignature(secret, request.headers.get('host') ?? '', destination.pathname))
  return NextResponse.rewrite(destination, { request: { headers: forwardedHeaders } })
}

export const config = {
  matcher: ['/((?!_next|.*\\.[^/]+$).*)'],
}
