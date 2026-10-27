const { chromium, expect } = require('../../../workhour-web/node_modules/@playwright/test')
const fs = require('fs')
const path = require('path')
async function main() {
 const browser = await chromium.launch()
 const results = []
 try {
  for (const width of [1440, 390]) {
   const context = await browser.newContext({ viewport: { width, height: 900 }, hasTouch: width === 390, isMobile: width === 390 })
   const page = await context.newPage()
   for (const route of ['/', '/about/our-story', '/about/our-impact', '/about/responsible-business', '/about/presence', '/contact', '/global-presence', '/announcements']) {
    const response = await page.goto('http://localhost:3000' + route, { waitUntil: 'networkidle' })
    if (response.status() !== 200) throw Error(route + ': ' + response.status())
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)
    if (overflow) throw Error(route + ': overflow at ' + width)
    results.push({ width, route, status: 200, overflow })
   }
   for (const [label, slug] of [['Our Story','our-story'], ['Our Impact','our-impact'], ['Responsible Business','responsible-business'], ['Presence','presence']]) {
    if (width === 1440) await page.locator('h1').hover()
    if (width === 390) await page.getByRole('button', { name: 'Open navigation' }).tap()
    const summary = page.locator('#main-navigation summary').filter({ hasText: 'About Us' })
    if (width === 390) await summary.tap(); else await summary.hover()
    const link = page.locator('#main-navigation').getByRole('link', { name: label, exact: true })
    await expect(link).toHaveAttribute('href', '/about/' + slug)
    if (width === 390) await link.tap(); else await link.click()
    await expect(page.locator('h1')).toHaveText(label)
    await page.waitForLoadState('networkidle')
   }
   await context.close()
  }
  fs.writeFileSync(path.join(__dirname, 'integration-checks.json'), JSON.stringify(results, null, 2))
  console.log('Home, four About routes, contact, global presence, announcements and desktop/touch About menus passed.')
 } finally { await browser.close() }
}
main().catch(e => { console.error(e); process.exit(1) })
