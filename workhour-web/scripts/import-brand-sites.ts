import dotenv from 'dotenv'
import { getPayload } from 'payload'

import { brandSiteDefinitions } from '../src/content/brandSiteDefinitions'
import type { BrandSiteDefinition } from '../src/content/brandSiteDefinitions'

const explicitImportURL = process.env.BRAND_IMPORT_DATABASE_URL
dotenv.config()

if (!explicitImportURL) {
  throw new Error('Set BRAND_IMPORT_DATABASE_URL explicitly to the intended content database before importing brand pages.')
}

const importTarget = new URL(explicitImportURL)
const configuredTarget = process.env.DATABASE_URL ? new URL(process.env.DATABASE_URL) : null
const identity = (url: URL) => ({ host: url.hostname.toLowerCase(), port: url.port || '5432', database: decodeURIComponent(url.pathname.slice(1)).toLowerCase() })
if (configuredTarget) {
  const targetIdentity = identity(importTarget)
  const normalIdentity = identity(configuredTarget)
  if (targetIdentity.host === normalIdentity.host && targetIdentity.port === normalIdentity.port && targetIdentity.database === normalIdentity.database) {
    throw new Error('BRAND_IMPORT_DATABASE_URL resolves to the configured DATABASE_URL database. Use the intended isolated or deployment database explicitly.')
  }
}

process.env.DATABASE_URL = importTarget.toString()
Reflect.set(process.env, 'NODE_ENV', 'production')

const definitions = brandSiteDefinitions.filter(({ businessSlug }) => businessSlug !== 'employaa')

function cleanSuppliedText(value: string): string {
  return value
    .replaceAll('â€™', '’')
    .replaceAll('â€œ', '“')
    .replaceAll('â€', '”')
    .replaceAll('â€”', '—')
    .replaceAll('â€“', '–')
    .replaceAll('â€¦', '…')
}

function serviceSlug(title: string): string {
  return title
    .normalize('NFKD')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function rowsForBrand(definition: BrandSiteDefinition, name: string, homepageCopy: string, detailedCopy: string) {
  const profileParagraphs = cleanSuppliedText(detailedCopy || homepageCopy)
    .split(/\r?\n\s*\r?\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)

  const rows = [
    { title: name, slug: 'home', pageType: 'page' as const, displayOrder: 0, summary: cleanSuppliedText(homepageCopy) },
    {
      title: `About ${name}`,
      slug: 'about',
      pageType: 'page' as const,
      displayOrder: 1,
      sections: [{ heading: 'Business overview', paragraphs: profileParagraphs }],
    },
    { title: definition.serviceMenuLabel, slug: 'services', pageType: 'page' as const, displayOrder: 2 },
    { title: 'Contact', slug: 'contact', pageType: 'page' as const, displayOrder: 3 },
    ...(definition.showGlobalReach
      ? [{ title: 'Our Global Reach', slug: 'global-reach', pageType: 'page' as const, displayOrder: 4 }]
      : []),
    ...definition.serviceTitles.map((title, index) => ({
      title,
      slug: serviceSlug(title),
      pageType: 'service' as const,
      displayOrder: 10 + index,
    })),
  ]

  return rows
}

async function main() {
  const { default: config } = await import('../src/payload.config')
  const payload = await getPayload({ config: await config })

  try {
  const businesses = await Promise.all(definitions.map(async (definition) => {
    const result = await payload.find({
      collection: 'businesses',
      depth: 0,
      draft: true,
      limit: 1,
      overrideAccess: true,
      pagination: false,
      where: { slug: { equals: definition.businessSlug } },
    })
    const business = result.docs.find(({ slug }) => slug === definition.businessSlug)
    if (!business) throw new Error(`Business record '${definition.businessSlug}' is missing. Seed existing Businesses before import.`)
    return { definition, business }
  }))

  let created = 0
  let skipped = 0
  for (const { definition, business } of businesses) {
    const rows = rowsForBrand(
      definition,
      business.name,
      business.homepageIntroduction,
      business.detailedIntroduction ?? business.homepageIntroduction,
    )

    for (const row of rows) {
      const existing = await payload.find({
        collection: 'brand-pages',
        depth: 0,
        draft: true,
        limit: 1,
        overrideAccess: true,
        pagination: false,
        where: { and: [{ business: { equals: business.id } }, { slug: { equals: row.slug } }] },
      })
      if (existing.docs.length) {
        skipped += 1
        continue
      }

      await payload.create({
        collection: 'brand-pages',
        data: {
          ...row,
          business: business.id,
          sections: 'sections' in row && row.sections ? row.sections.map((section) => ({
            ...section,
            paragraphs: section.paragraphs.map((text) => ({ text })),
          })) : undefined,
          _status: 'draft',
        },
        draft: true,
        overrideAccess: true,
      })
      created += 1
    }
  }

  console.log(JSON.stringify({ brands: businesses.map(({ definition }) => definition.businessSlug), createdAsDrafts: created, skippedExistingWithoutChanges: skipped }))
  } finally {
    await payload.destroy()
  }
}

await main()
process.exit(0)
