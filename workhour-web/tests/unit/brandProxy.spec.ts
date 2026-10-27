import { NextRequest } from 'next/server'
import { afterEach, describe, expect, it } from 'vitest'

import { proxy } from '../../src/proxy'

const originalSecret = process.env.PAYLOAD_SECRET

afterEach(() => {
  if (originalSecret === undefined) delete process.env.PAYLOAD_SECRET
  else process.env.PAYLOAD_SECRET = originalSecret
})

describe('brand host proxy boundaries', () => {
  it('does not allow forged brand headers to enter the internal route', () => {
    process.env.PAYLOAD_SECRET = 'unit-test-secret'
    const response = proxy(new NextRequest('http://unknown.localhost/brand-site-internal/remunerax/about', {
      headers: {
        host: 'unknown.localhost',
        'x-brand-site-host': 'remunerax.localhost',
        'x-brand-site-signature': 'forged',
      },
    }))

    expect(response.status).toBe(404)
  })

  it('removes a forged brand header on unknown hosts', () => {
    const response = proxy(new NextRequest('http://unknown.localhost/api/brand-pages', {
      headers: {
        host: 'unknown.localhost',
        'x-brand-site-host': 'remunerax.localhost',
      },
    }))
    const forwarded = response.headers.get('x-middleware-override-headers')?.split(',') ?? []

    expect(forwarded).not.toContain('x-brand-site-host')
  })
})
