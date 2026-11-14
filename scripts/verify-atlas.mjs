import {Browser} from 'file:///C:/Users/aniru/.codex/skills/taste-skill/scripts/lib/cdp.mjs';
import {mkdirSync,writeFileSync} from 'node:fs';
const base=process.env.PORTFOLIO_BASE_URL||'http://127.0.0.1:4174';
const out=new URL('../.impeccable/review/',import.meta.url);mkdirSync(out,{recursive:true});
let checks=0;const assert=(v,message)=>{checks++;if(!v)throw Error(message)};
const browser=await Browser.launch();
const visit=async(p,path)=>{await p.goto(`${base}/#${path}`,{timeoutMs:4000,settleMs:700});await p.eval(()=>document.fonts.ready.then(()=>true));};
try{
 const p=await browser.newPage({width:1440,height:1000});
 for(const width of [1440,1024,768,390]){
  await p.setViewport({width,height:1000});
  for(const chapter of ['start','experience','projects','writing','about']){
   await visit(p,`/${chapter}`);
   const state=await p.eval(()=>({title:document.querySelector('h1')?.textContent,overflow:document.documentElement.scrollWidth-innerWidth,menu:document.querySelector('.chapter-toggle')?.getAttribute('aria-expanded')}));
   assert(state.title,`Missing title ${chapter}`);assert(state.overflow<2,`Overflow ${chapter} at ${width}: ${state.overflow}`);
   if([1440,390].includes(width))await p.screenshot({path:new URL(`${chapter}-${width}.png`,out).pathname.replace(/^\/([A-Za-z]:)/,'$1'),format:'png',fullPage:true});
  }
 }
 for(const role of ['apm','intern','gro']){await visit(p,`/experience?role=${role}`);assert(await p.eval(()=>!!document.querySelector('.career-line [aria-current]')),'Role selection failed '+role)}
 await visit(p,'/experience?role=__proto__');assert(await p.eval(()=>document.querySelector('.role-detail h2').textContent==='Associate Product Manager'),'Invalid role fallback');
 for(const project of ['feedback','funnel','ai']){await visit(p,`/projects?project=${project}`);assert(await p.eval(()=>document.querySelector('.selected-project .development').textContent==='In development'),'Project status failed');await visit(p,`/projects/${project}`);assert(await p.eval(()=>document.querySelector('.plan-spread h1').textContent.length>5),'Project plan failed')}
 await visit(p,'/projects/unknown');assert(await p.eval(()=>document.querySelector('h1').textContent==='Outside this atlas.'),'Missing route failed');
 await visit(p,'/about?anchor=contact');assert(await p.eval(()=>document.querySelector('#contact').getBoundingClientRect().top<innerHeight),'Contact anchor failed');
 await visit(p,'/start');await p.eval(()=>document.querySelector('.chapter-toggle').click());assert(await p.eval(()=>document.querySelector('.chapter-toggle').getAttribute('aria-expanded')==='true'),'Mobile menu failed');
 await p.eval(()=>document.querySelector('.chapter-rail a[href="#/experience"]').click());await new Promise(r=>setTimeout(r,650));assert(await p.eval(()=>location.hash==='#/experience'&&document.querySelector('.chapter-toggle').getAttribute('aria-expanded')==='false'),'Chapter navigation failed');
 const history=await p.send('Page.getNavigationHistory');await p.send('Page.navigateToHistoryEntry',{entryId:history.entries[history.currentIndex-1].id});await new Promise(r=>setTimeout(r,500));assert(await p.eval(()=>location.hash==='#/start'),'Browser Back failed');
 const reduced=await browser.newPage({width:390,height:844,reducedMotion:true});await visit(reduced,'/projects');assert(await reduced.eval(()=>getComputedStyle(document.querySelector('.selected-project')).animationName==='none'),'Reduced motion failed');await reduced.close();
 assert(p.consoleErrors.length===0,'Browser errors: '+p.consoleErrors.join(';'));
 for(const asset of ['/resume.pdf','/fonts/ArchivoBlack-Regular.ttf'])assert((await fetch(base+asset,{method:'HEAD'})).ok,'Missing asset '+asset);
 const report={status:'passed',checks,viewports:[1440,1024,768,390],consoleErrors:p.consoleErrors};console.log(JSON.stringify(report));writeFileSync(new URL('verification.json',out),JSON.stringify(report,null,2));
}catch(error){console.error(error.stack);process.exitCode=1;}finally{await browser.close()}
