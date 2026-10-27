export const defaultLocalBrandHostMapping = [
  'inceptura.localhost=inceptura',
  'employaa.localhost=employaa',
  'remunerax.localhost=remunerax',
  'gotravelglobal.localhost=gotravelglobal',
  'elevatrain.localhost=elevatrain',
  'thinkrunspace.localhost=thinkrunspace',
  'leaderspinnacle.localhost=leaderspinnacle',
].join(',')

function normalizedHostname(value: string): string | null {
  try {
    const host = new URL(`http://${value.trim()}`).hostname.toLowerCase().replace(/\.$/, '')
    if (!host || host.includes('..')) return null
    return host
  } catch {
    return null
  }
}

export function parseBrandHostMap(configured = process.env.BRAND_HOSTS ?? defaultLocalBrandHostMapping): Map<string, string> {
  const mappings = new Map<string, string>()
  for (const entry of configured.split(',')) {
    const separator = entry.indexOf('=')
    if (separator < 1) continue
    const hostname = normalizedHostname(entry.slice(0, separator))
    const brandSlug = entry.slice(separator + 1).trim().toLowerCase()
    if (!hostname || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(brandSlug) || mappings.has(hostname)) continue
    mappings.set(hostname, brandSlug)
  }
  return mappings
}

/** Match complete hostnames only; unknown hosts never infer a brand from a subdomain suffix. */
export function resolveBrandSlug(host: string | null | undefined, configured?: string): string | null {
  if (!host) return null
  const hostname = normalizedHostname(host)
  if (!hostname) return null
  return parseBrandHostMap(configured).get(hostname) ?? null
}

export function configuredHostForBrand(brandSlug: string, configured?: string): string | null {
  for (const [hostname, slug] of parseBrandHostMap(configured)) {
    if (slug === brandSlug) return hostname
  }
  return null
}
