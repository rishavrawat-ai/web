import 'dotenv/config'
import { readFile, mkdir, unlink } from 'node:fs/promises'
import { spawn, spawnSync } from 'node:child_process'
import { Pool } from 'pg'
import { chromium } from '@playwright/test'

const dbURL = new URL(process.env.DATABASE_URL!)
const targetName = 'workhour_brand_upgrade_20261009_f'
dbURL.pathname = `/${targetName}`
const port = '3010'
const server = spawn('npm.cmd', ['run', 'dev', '--', '--hostname', '127.0.0.1', '-p', port], {
  shell: true,
  env: { ...process.env, DATABASE_URL: dbURL.toString(), BRAND_HOSTS: 'employaa.localhost=employaa,thinkrunspace.localhost=thinkrunspace', PAYLOAD_MIGRATING: 'true', NODE_ENV: 'development' },
  stdio: ['ignore', 'pipe', 'pipe'],
})
const output: string[] = []
server.stdout.on('data', (chunk) => output.push(String(chunk)))
server.stderr.on('data', (chunk) => output.push(String(chunk)))
const base = `http://employaa.localhost:${port}`
const health = `http://127.0.0.1:${port}`
const employaaHost = `employaa.localhost:${port}`
const adminBase = `http://localhost:${port}`
let browser: Awaited<ReturnType<typeof chromium.launch>> | undefined

try {
  let ready = false
  for (let index = 0; index < 120; index++) {
    try {
      const response = await fetch(health, { headers: { host: employaaHost } })
      if (response.status < 500) { ready = true; break }
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }
  if (!ready) throw new Error(`Local server did not become ready: ${output.slice(-20).join('')}`)
  browser = await chromium.launch({ headless: true, args: ['--host-resolver-rules=MAP *.localhost 127.0.0.1,EXCLUDE localhost'] })
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
  const routeResults: Record<string, number> = {}
  for (const route of ['/', '/about', '/services', '/contact', '/global-reach', '/services/permanent-hiring', '/services/contract-hiring', '/services/it-tech-staffing', '/services/rpo', '/services/campus-hiring', '/services/bulk-hiring', '/services/gig-industry-specific']) {
    const response = await desktop.goto(`${base}${route}`, { waitUntil: 'domcontentloaded' })
    routeResults[route] = response?.status() ?? 0
    if (routeResults[route] !== 200) throw new Error(`${route} returned ${routeResults[route]}; page=${(await desktop.locator('body').innerText()).slice(0, 500)}; server=${output.slice(-20).join('')}`)
  }
  await desktop.goto(base, { waitUntil: 'domcontentloaded' })
  if (await desktop.locator('h1').innerText() !== 'Employaa') throw new Error('Employaa root host did not render its Home page')
  const desktopOverflow = await desktop.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)
  if (desktopOverflow) throw new Error('Desktop layout overflows the viewport')
  await desktop.getByText('Services', { exact: true }).first().focus()
  await desktop.keyboard.press('Enter')
  if (!(await desktop.locator('.brand-services-dropdown').getAttribute('open'))) throw new Error('Services dropdown did not open by keyboard')
  await mkdir('artifacts/brand-site', { recursive: true })
  await desktop.screenshot({ path: 'artifacts/brand-site/employaa-desktop.png', fullPage: true })
  await desktop.goto(`${base}/about`, { waitUntil: 'domcontentloaded' })
  await desktop.screenshot({ path: 'artifacts/brand-site/employaa-about-desktop.png', fullPage: true })

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } })
  await mobile.goto(base, { waitUntil: 'domcontentloaded' })
  const menuButton = mobile.getByRole('button', { name: 'Menu' })
  await menuButton.click()
  if (await menuButton.getAttribute('aria-expanded') !== 'true') throw new Error('Mobile navigation did not open')
  await mobile.locator('.brand-services-dropdown summary').focus()
  await mobile.keyboard.press('Enter')
  if (!(await mobile.locator('.brand-services-dropdown').getAttribute('open'))) throw new Error('Mobile Services dropdown did not open by keyboard')
  const mobileOverflow = await mobile.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)
  if (mobileOverflow) throw new Error('Mobile layout overflows 390px viewport')
  await mobile.screenshot({ path: 'artifacts/brand-site/employaa-mobile.png', fullPage: true })

  const responseEmployaa = await fetch(`${base}/about`, { headers: { host: employaaHost } })
  const aboutText = await responseEmployaa.text()
  if (aboutText.includes('OTHER BRAND SENTINEL')) throw new Error('About slug collision leaked another brand through Employaa host')
  const otherResponse = await fetch(`http://thinkrunspace.localhost:${port}/about`)
  const otherText = await otherResponse.text()
  if (!otherText.includes('OTHER BRAND SENTINEL')) throw new Error('ThinkRunSpace host did not resolve to its own about record')
  const draftResponse = await fetch(`${base}/draft-check`, { headers: { host: employaaHost } })
  if (draftResponse.status !== 404) throw new Error(`Draft page route returned ${draftResponse.status}, expected 404`)
  const unknownResponse = await fetch(`http://unmapped.localhost:${port}/about`)
  const unknownText = await unknownResponse.text()
  if (unknownText.includes('OTHER BRAND SENTINEL') || unknownText.includes('Employaa is a specialized recruitment')) throw new Error('Unknown host selected a brand')
  const apiResponse = await fetch(`${base}/api/brand-pages?limit=100`, { headers: { host: employaaHost } })
  const apiData = await apiResponse.json() as { docs: Array<{ _status?: string; business?: number | { slug?: string } }> }
  if (!apiResponse.ok || apiData.docs.some((doc) => doc._status !== 'published' || (typeof doc.business === 'object' && doc.business.slug !== 'employaa'))) throw new Error('Public API did not scope Brand Pages to the resolved published brand')

  const adminSecret = JSON.parse(await readFile('.tmp-brand-admin.json', 'utf8')) as { email: string; password: string }
  const admin = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
  await admin.goto(`${adminBase}/admin/login`, { waitUntil: 'domcontentloaded' })
  await admin.locator('input[name="email"]').fill(adminSecret.email)
  await admin.locator('input[name="password"]').fill(adminSecret.password)
  await admin.getByRole('button', { name: /login/i }).click()
  await admin.waitForURL(/\/admin(?:\/|$)/, { timeout: 30000 })
  const pool = new Pool({ connectionString: dbURL.toString() })
  const homeRow = await pool.query("SELECT id,summary FROM brand_pages WHERE business_id=(SELECT id FROM businesses WHERE slug='employaa' LIMIT 1) AND slug='home' LIMIT 1")
  if (!homeRow.rowCount) throw new Error('Employaa home record is missing')
  const homeID = homeRow.rows[0].id
  const editURL = `${adminBase}/admin/collections/brand-pages/${homeID}`
  await admin.goto(editURL, { waitUntil: 'domcontentloaded' })
  const summaryField = admin.locator('textarea[name="summary"], input[name="summary"]').first()
  await summaryField.fill('Admin workflow published version one')
  const draftResponseEvent = admin.waitForResponse((response) => response.url().includes(`/api/brand-pages/${homeID}`) && response.request().method() === 'PATCH')
  await admin.getByRole('button', { name: /save draft/i }).click()
  const draftResponsePayload = await draftResponseEvent
  const saveRequest = { status: draftResponsePayload.status(), body: await draftResponsePayload.json().catch(() => null) }
  if (draftResponsePayload.status() < 200 || draftResponsePayload.status() >= 300) throw new Error('Admin Save Draft request failed')
  await desktop.goto(base, { waitUntil: 'domcontentloaded' })
  if ((await desktop.locator('main').innerText()).includes('Admin workflow published version one')) throw new Error('Admin draft edit leaked to public Home')

  const publishEvent = admin.waitForResponse((response) => response.url().includes(`/api/brand-pages/${homeID}`) && response.request().method() === 'PATCH')
  await admin.getByRole('button', { name: /^publish$/i }).click()
  const publishResponse = await publishEvent
  if (publishResponse.status() < 200 || publishResponse.status() >= 300) throw new Error('Admin Publish request failed')
  await desktop.goto(base, { waitUntil: 'domcontentloaded' })
  if (!(await desktop.locator('main').innerText()).includes('Admin workflow published version one')) throw new Error('Published Admin edit did not update the public Home without rebuilding')
  console.log(JSON.stringify({ routes: routeResults, desktopViewport: '1440px passed', mobileViewport: '390px passed', keyboardDropdown: 'passed desktop/mobile', brandSlugIsolation: 'passed', unknownHost: 'no brand selected', draftRoute: draftResponse.status, publicAPI: 'resolved-brand and published filters passed', adminSaveDraftRequest: saveRequest, publicDraftLeak: 'none', adminPublishRequestStatus: publishResponse.status(), dynamicPublishedUpdate: 'visible without rebuild', screenshots: ['artifacts/brand-site/employaa-desktop.png', 'artifacts/brand-site/employaa-about-desktop.png', 'artifacts/brand-site/employaa-mobile.png'] }))
  await pool.end()
  await unlink('.tmp-brand-admin.json')
} finally {
  await browser?.close()
  if (server.pid) spawnSync('taskkill', ['/PID', String(server.pid), '/T', '/F'], { stdio: 'ignore' })
  server.kill()
}
process.exit(0)
