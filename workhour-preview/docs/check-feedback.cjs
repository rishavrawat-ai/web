const { chromium } = require('../../workhour-web/node_modules/@playwright/test');
const fs=require('fs');
async function main(){
 const browser=await chromium.launch(); const results=[]; const errors=[];
 const routes=['/','/businesses','/businesses/remunerax','/businesses/go-travel-global','/services','/services/website-designing','/services/content-animation','/services/seo-marketing','/brands/remunerax','/brands/remunerax/services','/brands/remunerax/services/payroll-processing','/careers','/contact','/announcements','/news-media','/global-presence'];
 fs.mkdirSync(__dirname+'/feedback',{recursive:true});
 for(const width of [1440,768,390]) for(const route of routes){
  const page=await browser.newPage({viewport:{width,height:900}}); page.on('pageerror',e=>errors.push(e.message));
  const response=await page.goto((process.env.CHECK_ORIGIN || 'http://localhost:3001')+route,{waitUntil:'networkidle'});
  await page.evaluate(async()=>{await Promise.all([...document.images].map(i=>{i.loading='eager';return i.decode().catch(()=>{})}))});
  await page.waitForTimeout(200);
  const state=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,broken:[...document.images].filter(i=>!i.naturalWidth).map(i=>i.src),h1:document.querySelectorAll('h1').length}));
  results.push({route,width,status:response.status(),...state});
  if(route==='/'){if(await page.getByText('carrying forward.').count())throw Error('Home media section remains');const labels=await page.locator('#main-navigation > details > summary').allTextContents();if(!labels[2].includes('Services'))throw Error('Navigation order wrong')}
  await page.addStyleTag({content:'nextjs-portal{display:none!important}'});
  if(['/businesses','/services/website-designing','/brands/remunerax/services','/careers'].includes(route))await page.screenshot({path:__dirname+'/feedback/'+route.slice(1).replaceAll('/','-')+'-'+width+'.png',fullPage:true});
  await page.close();
 }
 await browser.close();fs.writeFileSync(__dirname+'/feedback/results.json',JSON.stringify({results,errors},null,2));
 const failures=results.filter(r=>r.status!==200||r.overflow||r.broken.length||r.h1!==1);if(failures.length||errors.length)throw Error(JSON.stringify({failures,errors}));console.log('Passed '+results.length+' responsive route checks');
}main().catch(e=>{console.error(e);process.exit(1)});
