import { chromium } from '../.impeccable/qa/browser-tools/node_modules/playwright/index.mjs';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const out = '.impeccable/review/mobile-2026-11-15';
for (const [name, viewport, deviceScaleFactor] of [
  ['mobile-home-final', { width: 390, height: 844 }, 1],
  ['dossier-comp-repro', { width: 390, height: 845 }, 852 / 390],
  ['laptop-home-final', { width: 1280, height: 720 }, 1],
]) {
  const context = await browser.newContext({ viewport, deviceScaleFactor, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4182/', { waitUntil: 'networkidle' });
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.allSettled([...document.images].map(image => image.decode()));
  });
  await page.screenshot({ path: `${out}/${name}.png`, fullPage: name === 'mobile-home-final' });
  console.log(name, viewport, deviceScaleFactor);
  await context.close();
}
await browser.close();
