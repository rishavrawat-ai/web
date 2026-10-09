import 'dotenv/config'
import { spawnSync } from 'node:child_process'
import { Pool } from 'pg'
const source = new URL(process.env.DATABASE_URL!)
const targetName = 'workhour_brand_upgrade_20261009_f'
source.pathname = `/${targetName}`
const environment = { ...process.env, DATABASE_URL: source.toString(), PAYLOAD_MIGRATING: 'true' }
const importer = spawnSync(process.execPath, ['--import=tsx/esm', 'scripts/import-employaa-brand.ts'], { env: environment, encoding: 'utf8' })
if (importer.status !== 0) throw new Error(importer.stderr || importer.stdout || 'brand import failed')
process.stdout.write(importer.stdout)
process.env.DATABASE_URL = source.toString()
process.env.NODE_ENV = 'development'
process.env.PAYLOAD_MIGRATING = 'true'
const { default: config } = await import(`../src/payload.config?database=${encodeURIComponent(source.toString())}`)
const { getPayload, createLocalReq } = await import('payload')
const payload = await getPayload({ config })
try {
  const employaa = await payload.find({ collection: 'businesses', depth: 0, draft: false, limit: 1, overrideAccess: true, where: { slug: { equals: 'employaa' } } })
  const thinkrunspace = await payload.find({ collection: 'businesses', depth: 0, draft: false, limit: 1, overrideAccess: true, where: { slug: { equals: 'thinkrunspace' } } })
  if (!employaa.docs[0] || !thinkrunspace.docs[0]) throw new Error('Test clone is missing required businesses')
  if (employaa.docs[0]._status !== 'published') await payload.update({ collection: 'businesses', id: employaa.docs[0].id, data: { _status: 'published' }, draft: false, overrideAccess: true })
  if (thinkrunspace.docs[0]._status !== 'published') await payload.update({ collection: 'businesses', id: thinkrunspace.docs[0].id, data: { _status: 'published' }, draft: false, overrideAccess: true })
  const pages = await payload.find({ collection: 'brand-pages', depth: 0, draft: true, limit: 100, overrideAccess: true, where: { business: { equals: employaa.docs[0].id } } })
  for (const page of pages.docs) if (page._status !== 'published') await payload.update({ collection: 'brand-pages', id: page.id, data: { _status: 'published' }, draft: false, overrideAccess: true })
  const collision = await payload.find({ collection: 'brand-pages', depth: 0, draft: true, limit: 1, overrideAccess: true, where: { and: [{ business: { equals: thinkrunspace.docs[0].id } }, { slug: { equals: 'about' } }] } })
  if (!collision.docs.length) await payload.create({ collection: 'brand-pages', data: { business: thinkrunspace.docs[0].id, title: 'Other brand about', slug: 'about', pageType: 'page', displayOrder: 1, summary: 'OTHER BRAND SENTINEL', _status: 'published' }, draft: false, overrideAccess: true })

  const employaaReq = await createLocalReq({ req: { headers: new Headers({ host: 'employaa.localhost:3011' }), user: null } }, payload)
  const businessAccessCheck = await payload.find({ collection: 'businesses', depth: 0, draft: false, limit: 1, overrideAccess: false, req: employaaReq, user: null })
  console.log(JSON.stringify({ hostInLocalRequest: employaaReq.headers.get('host'), businessesAccessible: businessAccessCheck.docs.map(({ slug }) => slug) }))
  const publicPages = await payload.find({ collection: 'brand-pages', depth: 0, draft: true, limit: 100, overrideAccess: false, req: employaaReq, user: null })
  if (publicPages.docs.some((page) => page._status !== 'published')) throw new Error('Draft brand page leaked through public Local API')
  if (publicPages.docs.some((page) => Number(typeof page.business === 'object' ? page.business.id : page.business) !== Number(employaa.docs[0].id))) throw new Error('Another brand leaked through public Local API')
  const privateCheck = await payload.find({ collection: 'brand-pages', depth: 0, draft: true, limit: 1, overrideAccess: true, where: { and: [{ business: { equals: employaa.docs[0].id } }, { slug: { equals: 'draft-check' } }] } })
  if (!privateCheck.docs.length) await payload.create({ collection: 'brand-pages', data: { business: employaa.docs[0].id, title: 'Private draft sentinel', slug: 'draft-check', pageType: 'page', _status: 'draft' }, draft: true, overrideAccess: true })
  const anonymousDraftRead = await payload.find({ collection: 'brand-pages', depth: 0, draft: true, limit: 1, overrideAccess: false, req: employaaReq, user: null, where: { and: [{ business: { equals: employaa.docs[0].id } }, { slug: { equals: 'draft-check' } }] } })
  if (anonymousDraftRead.docs.length) throw new Error('Draft brand page was visible to anonymous Local API')
  let anonymousWriteBlocked = false
  try { await payload.create({ collection: 'brand-pages', data: { business: employaa.docs[0].id, title: 'Anonymous', slug: 'anonymous', pageType: 'page' }, overrideAccess: false, user: null }) } catch { anonymousWriteBlocked = true }
  if (!anonymousWriteBlocked) throw new Error('Anonymous Brand Page creation was not denied')

  const randomPassword = crypto.randomUUID() + crypto.randomUUID()
  const tempAdminEmail = `brand-check-${crypto.randomUUID()}@localhost.test`
  await payload.create({ collection: 'users', data: { email: tempAdminEmail, password: randomPassword }, overrideAccess: true })
  const pool = new Pool({ connectionString: source.toString() })
  const tableData = await pool.query(`SELECT id,slug,_status,summary FROM brand_pages ORDER BY business_id,slug`)
  await pool.end()
  console.log(JSON.stringify({ imported: importer.stdout.trim(), publishedBrandPages: publicPages.totalDocs, collisionSlug: 'about', collisionOwnedByThinkRunSpace: true, draftVisibility: 'draft check returned no anonymous Local API docs', anonymousCreate: 'blocked', temporaryAdminCreatedWithoutLoggingCredentials: true, brandPages: tableData.rows.map(({ slug, _status }) => ({ slug, status: _status })) }))
  await import('node:fs/promises').then(({ writeFile }) => writeFile('.tmp-brand-admin.json', JSON.stringify({ email: tempAdminEmail, password: randomPassword }), 'utf8'))
} finally { await payload.destroy() }
process.exit(0)
