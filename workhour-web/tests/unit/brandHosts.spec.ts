import { describe, expect, it } from 'vitest'

import { resolveBrandSlug } from '../../src/lib/brandHosts'

describe('brand host resolution', () => {
  it('requires an exact configured hostname and strips the port', () => {
    expect(resolveBrandSlug('employaa.localhost:3000')).toBe('employaa')
    expect(resolveBrandSlug('www.employaa.localhost:3000')).toBeNull()
    expect(resolveBrandSlug('unknown.localhost:3000')).toBeNull()
    expect(resolveBrandSlug('localhost:3000')).toBeNull()
  })

  it('supports explicit mappings without suffix inference', () => {
    const mapping = 'staff.example.test=employaa,think.example.test=thinkrunspace'
    expect(resolveBrandSlug('staff.example.test', mapping)).toBe('employaa')
    expect(resolveBrandSlug('other.example.test', mapping)).toBeNull()
  })
})
