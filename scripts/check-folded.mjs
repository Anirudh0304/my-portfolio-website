import { Browser } from "file:///C:/Users/aniru/.codex/skills/taste-skill/scripts/lib/cdp.mjs";
import { writeFileSync } from "node:fs";
const browser = await Browser.launch();
const results = [];
try {
  for (const width of [1536, 1440, 1024, 768, 390, 375]) {
    const p = await browser.newPage({
      width,
      height: width === 1536 ? 1024 : 900,
      reducedMotion: true,
    });
    for (const route of [
      "/",
      "/experience",
      "/projects",
      "/writing",
      "/contact",
      "/projects/trendsage-lite",
      "/projects/feedback",
    ]) {
      if (route === "/")
        await p.goto("http://127.0.0.1:4182/#/", { settleMs: 350 });
      else
        await p.eval(async (r) => {
          location.hash = r;
          await new Promise((done) => setTimeout(done, 180));
        }, route);
      await p.eval(async () => {
        await document.fonts.ready;
        await Promise.allSettled(
          [...document.images].map((img) => {
            img.loading = "eager";
            return img.decode();
          }),
        );
        return true;
      });
      const state = await p.eval(() => ({
        width: innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        title: document.querySelector("h1")?.innerText,
        missing: [...document.images]
          .filter((i) => !i.complete || !i.naturalWidth)
          .map((i) => i.src),
        footer: document.querySelector(".folio").getBoundingClientRect().top,
      }));
      results.push({ route, ...state, errors: p.consoleErrors });
      if (width === 1536 || width === 390)
        await p.screenshot({
          path: `.impeccable/review/${width === 1536 ? "desktop" : "mobile"}${route === "/" ? "" : "-" + route.split("/").filter(Boolean).join("-")}.png`,
          format: "png",
          fullPage: !(width === 1536 && route === "/"),
        });
    }
    await p.close();
  }
  writeFileSync(
    ".impeccable/review/layout-checks.json",
    JSON.stringify(results, null, 2),
  );
  console.log(JSON.stringify(results));
  if(results.some(r=>r.scrollWidth>r.width||r.missing.length||r.errors.length))process.exitCode=1;
} finally {
  await browser.close();
}
