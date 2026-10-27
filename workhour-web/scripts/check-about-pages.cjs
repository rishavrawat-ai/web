const { chromium, expect } = require('@playwright/test')

async function main() {
  const browser = await chromium.launch()
  try {
    const page = await browser.newPage()
    page.setDefaultTimeout(15000)
    const errors = []
    page.on('pageerror', error => errors.push(error.message))
    for (const width of [1440, 768, 390]) {
      await page.setViewportSize({ width, height: 900 })
      for (const slug of ['our-story', 'our-impact', 'responsible-business', 'presence', '']) {
        const response = await page.goto(`http://localhost:3000/about/${slug}`, { waitUntil: 'networkidle' })
        if (response.status() !== 200) throw Error(`${slug}: ${response.status()}`)
        await page.evaluate(async () => {
          await Promise.all([...document.images].map(img => {
            img.loading = 'eager'
            return img.decode().catch(() => {})
          }))
        })
        const state = await page.evaluate(() => ({
          overflow: document.documentElement.scrollWidth > innerWidth,
          broken: [...document.images].filter(img => !img.naturalWidth).length,
          headings: document.querySelectorAll('h1').length,
        }))
        if (state.overflow || state.broken || state.headings !== 1) throw Error(JSON.stringify({ width, slug, ...state }))
        await page.screenshot({ path: `../workhour-preview/docs/about-${slug || 'overview'}-${width}.png`, fullPage: true })
        console.log(width, slug || 'overview', 'OK')
      }
    }
    await page.setViewportSize({ width: 1440, height: 900 })
    for (const [label, slug] of [['Our Story', 'our-story'], ['Our Impact', 'our-impact'], ['Responsible Business', 'responsible-business'], ['Presence', 'presence']]) {
      await page.locator('h1').hover()
      await page.locator('#main-navigation summary').filter({ hasText: 'About Us' }).hover()
      await page.locator('#main-navigation').getByRole('link', { name: label, exact: true }).click()
      await page.waitForURL(`**/about/${slug}`)
      await expect(page.getByRole('navigation', { name: 'About Us pages' }).locator('a[aria-current=page]')).toContainText(label)
    }
    const missing = await page.goto('http://localhost:3000/about/not-a-page')
    if (missing.status() !== 404) throw Error('Missing 404')
    if (errors.length) throw Error(errors.join('; '))
    console.log('Dropdown navigation, active pages, 404 and browser errors passed')
  } finally {
    await browser.close()
  }
}
main().catch(error => { console.error(error); process.exit(1) })
