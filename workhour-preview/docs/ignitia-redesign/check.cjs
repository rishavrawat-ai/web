const { chromium, expect } = require('../../../workhour-web/node_modules/@playwright/test')
const fs = require('fs')
const path = require('path')
async function main() {
  const browser = await chromium.launch()
  const results = []
  const errors = []
  try {
    for (const width of [1440, 768, 390]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } })
      page.on('pageerror', e => errors.push(e.message))
      const response = await page.goto('http://localhost:3000/announcements/ignitia', { waitUntil: 'networkidle' })
      await page.evaluate(async () => {
        await Promise.all([...document.images].map(i => { i.loading = 'eager'; return i.decode() }))
      })
      await page.waitForFunction(() => [...document.images].every(i => i.complete && i.naturalWidth > 0))
      await page.waitForTimeout(250)
      await page.addStyleTag({ content: 'nextjs-portal{display:none!important}' })
      const state = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth,
        brokenImages: [...document.images].filter(i => !i.naturalWidth).length,
        headingCount: document.querySelectorAll('h1').length,
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.content,
      }))
      if (response.status() !== 200 || state.overflow || state.brokenImages || state.headingCount !== 1 || !state.description) throw Error(JSON.stringify(state))
      await page.screenshot({ path: path.join(__dirname, `ignitia-${width}.png`), fullPage: true })
      await page.getByRole('link', { name: 'Discover the vision' }).click()
      await expect(page).toHaveURL(/#vision$/)
      await expect(page.locator('#vision')).toBeInViewport()
      await page.waitForTimeout(800)
      await page.getByRole('link', { name: 'Connect about IGNITIA' }).scrollIntoViewIfNeeded()
      await page.waitForTimeout(300)
      await page.getByRole('link', { name: 'Connect about IGNITIA' }).click()
      await expect(page).toHaveURL(/\/contact$/)
      await expect(page.locator('h1')).toHaveText('Contact Workhour Business')
      await page.waitForLoadState('networkidle')
      await page.goBack()
      await expect(page).toHaveURL(/\/announcements\/ignitia/)
      await expect(page.locator('h1')).toHaveText('IGNITIA.')
      await page.reload()
      await expect(page.locator('h1')).toHaveText('IGNITIA.')
      await page.emulateMedia({ reducedMotion: 'reduce' })
      const motion = await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)
      if (motion !== 'auto') throw Error('Reduced motion scroll behavior failed')
      const cta = page.getByRole('link', { name: 'Connect about IGNITIA' })
      await cta.focus()
      await expect(cta).toBeFocused()
      const outline = await cta.evaluate(el => getComputedStyle(el).outlineStyle)
      if (outline === 'none') throw Error('Missing keyboard focus indication')
      results.push({ width, ...state, anchor: 'passed', contact: 'passed', history: 'passed', refresh: 'passed', reducedMotion: 'passed', focus: 'passed' })
      console.log(width, 'passed')
      await page.close()
    }
    if (errors.length) throw Error(errors.join('\n'))
    fs.writeFileSync(path.join(__dirname, 'checks.json'), JSON.stringify({ results, browserErrors: errors }, null, 2))
  } finally { await browser.close() }
}
main().catch(e => { console.error(e); process.exit(1) })
