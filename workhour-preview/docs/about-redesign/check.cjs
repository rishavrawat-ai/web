const { chromium, expect } = require('../../../workhour-web/node_modules/@playwright/test')
const fs = require('fs')
const path = require('path')
const base = 'http://localhost:3000'
const routes = [['Our Story','our-story'],['Our Impact','our-impact'],['Responsible Business','responsible-business'],['Presence','presence']]
async function main(){
 const browser=await chromium.launch()
 let page=await browser.newPage()
 const errors=[]; const results=[]
 page.on('pageerror',e=>errors.push(e.message))
 for(const width of [1440,768,390]){
  await page.setViewportSize({width,height:900})
  for(const [label,slug] of [...routes,['About Workhour','']]){
   await page.close()
   page=await browser.newPage({viewport:{width,height:900}})
   page.on('pageerror',e=>errors.push(e.message))
   const response=await page.goto(`${base}/about/${slug}`,{waitUntil:'networkidle'})
   await page.evaluate(async()=>{await Promise.all([...document.images].map(i=>{i.loading='eager';return i.decode().catch(()=>{})}))})
   await page.waitForFunction(()=>[...document.images].every(i=>i.complete&&i.naturalWidth>0))
   await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))))
   await page.waitForTimeout(250)
   await page.addStyleTag({content:'nextjs-portal{display:none!important}'})
   const state=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,broken:[...document.images].filter(i=>!i.naturalWidth).length,h1:document.querySelectorAll('h1').length,title:document.title,description:document.querySelector('meta[name="description"]')?.content}))
   if(response.status()!==200||state.overflow||state.broken||state.h1!==1||!state.description)throw Error(JSON.stringify({width,slug,status:response.status(),...state}))
   await expect(page.locator('h1')).toHaveText(label)
   await page.screenshot({path:path.join(__dirname,`${slug||'overview'}-${width}.png`),fullPage:true})
   results.push({width,slug:slug||'overview',...state});console.log(width,slug||'overview','passed')
  }
 }
 await page.setViewportSize({width:1440,height:900})
 for(const [label,slug] of routes){
  await page.locator('#main-navigation summary').filter({hasText:'About Us'}).hover()
  await page.locator('#main-navigation').getByRole('link',{name:label,exact:true}).click()
  await page.waitForURL(`**/about/${slug}`);await expect(page.locator('h1')).toHaveText(label)
  await page.reload();await expect(page.locator('h1')).toHaveText(label)
 }
 await page.goto(`${base}/about/our-story`,{waitUntil:'networkidle'})
 await page.getByRole('navigation',{name:'More about Workhour'}).getByRole('link',{name:'Our Impact'}).click()
 await page.waitForURL('**/about/our-impact')
 await page.goBack();await expect(page.locator('h1')).toHaveText('Our Story')
 await page.goForward();await expect(page.locator('h1')).toHaveText('Our Impact')
 await page.locator('h1').hover()
 const trigger=page.locator('#main-navigation summary').filter({hasText:'About Us'})
 await trigger.focus();await page.keyboard.press('Enter');await expect(trigger).toHaveAttribute('aria-expanded','true')
 await page.keyboard.press('Tab');await expect(page.locator('#main-navigation').getByRole('link',{name:'Our Story',exact:true})).toBeFocused()
 await page.keyboard.press('Escape');await expect(trigger).toHaveAttribute('aria-expanded','false');await expect(trigger).toBeFocused()
 const mobile=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true})
 const mp=await mobile.newPage();await mp.goto(`${base}/about/our-story`)
 for(const [label,slug] of routes){await mp.getByRole('button',{name:'Open navigation'}).tap();await mp.locator('#main-navigation summary').filter({hasText:'About Us'}).tap();await mp.locator('#main-navigation').getByRole('link',{name:label,exact:true}).tap();await mp.waitForURL(`**/about/${slug}`);await expect(mp.locator('h1')).toHaveText(label);await expect(mp.getByRole('button',{name:'Open navigation'})).toBeVisible()}
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto(`${base}/about/our-story`)
 const duration=await page.locator('main a').first().evaluate(el=>getComputedStyle(el).transitionDuration)
 if(duration!=='0s')throw Error('Reduced motion failed')
 const response=await page.goto(`${base}/about/not-a-page`);if(response.status()!==404)throw Error('404 failed')
 if(errors.length)throw Error(errors.join('\n'))
 fs.writeFileSync(path.join(__dirname,'checks.json'),JSON.stringify({results,interactions:['Desktop dropdown links','Direct loading and refresh','Browser back and forward','Keyboard Enter, Tab, Escape and restored focus','Mobile touch menu and all four links','Reduced motion','Unknown section returns 404'],browserErrors:errors},null,2))
 console.log('All route, interaction and responsive checks passed');await browser.close()
}
main().catch(e=>{console.error(e);process.exit(1)})
