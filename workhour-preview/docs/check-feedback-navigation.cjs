const {chromium,expect}=require('../../workhour-web/node_modules/@playwright/test');
const fs=require('fs');
async function main(){
 const origin=process.env.CHECK_ORIGIN||'http://localhost:3001';
 const routes=Object.keys(require('../.next/prerender-manifest.json').routes).filter(r=>!r.startsWith('/_')&&!r.includes('.'));
 for(const route of routes){const res=await fetch(origin+route);if(res.status!==200)throw Error(route+': '+res.status)}
 const browser=await chromium.launch();
 for(const mobile of [false,true]){
  const page=await browser.newPage({viewport:{width:mobile?390:1440,height:900},hasTouch:mobile,isMobile:mobile});
  await page.goto(origin,{waitUntil:'networkidle'});
  if(mobile)await page.getByRole('button',{name:'Open navigation',exact:true}).tap();
  const trigger=page.locator('#main-navigation summary').filter({hasText:'Services'});
  if(mobile)await trigger.tap();else{await trigger.focus();await page.keyboard.press('Enter')}
  await page.locator('#main-navigation').getByRole('link',{name:'All services',exact:true}).click();
  await expect(page).toHaveURL(/\/services$/);await expect(page.locator('h1')).toHaveText('Services');
  await page.reload();await expect(page.locator('h1')).toHaveText('Services');
  await page.goBack();await expect(page).toHaveURL(origin+'/');
  await page.goto(origin+'/brands/remunerax/services/payroll-processing');
  await page.getByRole('link',{name:'Workhour Business portfolio'}).click();await expect(page).toHaveURL(/\/businesses\/remunerax$/);
  await page.close();
 }
 await browser.close();fs.writeFileSync(__dirname+'/feedback/navigation.json',JSON.stringify({routeCount:routes.length,desktopKeyboard:true,mobileTouch:true,refresh:true,back:true,portfolioBacklink:true},null,2));console.log('Passed '+routes.length+' routes and desktop/mobile navigation');
}main().catch(e=>{console.error(e);process.exit(1)});
