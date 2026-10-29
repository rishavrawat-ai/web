// Enable only after the parent domain and its wildcard DNS are connected to Vercel.
export const brandDomain = (process.env.NEXT_PUBLIC_BRAND_DOMAIN ?? '').trim().toLowerCase()
export const brandSlugs = ['inceptura', 'employaa', 'remunerax', 'go-travel-global', 'elevatrain', 'thinkrunspace', 'leaders-pinnacle']
export const groupHref = (path: string) => brandDomain ? `${process.env.NEXT_PUBLIC_GROUP_ORIGIN || 'https://workhour-preview.vercel.app'}${path}` : path
export const brandBase = (slug: string) => brandDomain ? `https://${slug}.${brandDomain}` : `/brands/${slug}`
