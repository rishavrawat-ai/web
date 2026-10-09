import 'dotenv/config'

import config from '../src/payload.config'
import { employaaBrandPages } from '../src/content/employaaBrandPages'
import { getPayload } from 'payload'

const payload = await getPayload({ config })

try {
  const businessResult = await payload.find({
    collection: 'businesses',
    depth: 0,
    draft: true,
    limit: 2,
    overrideAccess: true,
    pagination: false,
    where: { slug: { equals: 'employaa' } },
  })
  const business = businessResult.docs.find((item) => item.slug === 'employaa')
  if (!business) throw new Error('Employaa business record is missing. Import/seed the existing Businesses content first.')

  let created = 0
  let skipped = 0
  for (const page of employaaBrandPages) {
    const existing = await payload.find({
      collection: 'brand-pages',
      depth: 0,
      draft: true,
      limit: 1,
      overrideAccess: true,
      pagination: false,
      where: { and: [{ business: { equals: business.id } }, { slug: { equals: page.slug } }] },
    })
    if (existing.docs.length) {
      skipped += 1
      continue
    }

    await payload.create({
      collection: 'brand-pages',
      data: {
        ...page,
        business: business.id,
        _status: 'draft',
        sections: page.sections?.map((section) => ({
          ...section,
          paragraphs: section.paragraphs?.map((text) => ({ text })),
        })),
      },
      draft: true,
      overrideAccess: true,
    })
    created += 1
  }
  console.log(JSON.stringify({ brand: 'employaa', createdAsDrafts: created, skippedExistingWithoutChanges: skipped }))
} finally {
  await payload.destroy()
}
process.exit(0)
