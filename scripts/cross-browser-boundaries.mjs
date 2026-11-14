import {
  firefox,
  webkit,
} from "../.impeccable/qa/browser-tools/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const checks = [];
for (const [engine, type] of [
  ["firefox", firefox],
  ["webkit", webkit],
]) {
  const b = await type.launch({ headless: true });
  try {
    for (const width of [320, 960, 961, 1440]) {
      const c = await b.newContext({
        viewport: { width, height: 900 },
        reducedMotion: "reduce",
      });
      const p = await c.newPage();
      await p.goto("http://127.0.0.1:4183/#/", { waitUntil: "networkidle" });
      for (const route of ["/", "/projects", "/contact"]) {
        await p.evaluate((r) => {
          location.hash = r;
        }, route);
        await p.waitForTimeout(150);
        await p.evaluate(async () => {
          await document.fonts.ready;
          await Promise.allSettled(
            [...document.images].map((i) => {
              i.loading = "eager";
              return i.decode();
            }),
          );
        });
        const state = await p.evaluate(() => ({
          noOverflow: document.documentElement.scrollWidth <= innerWidth,
          mobileLayout:
            getComputedStyle(document.querySelector(".mobile-explore"))
              .display !== "none",
        }));
        checks.push({
          engine,
          width,
          route,
          pass: state.noOverflow && state.mobileLayout === width <= 960,
          ...state,
        });
      }
      await c.close();
    }
  } finally {
    await b.close();
  }
}
writeFileSync(
  ".impeccable/qa/cross-browser/boundary-results.json",
  JSON.stringify(checks, null, 2),
);
console.log(
  JSON.stringify({
    passed: checks.filter((c) => c.pass).length,
    total: checks.length,
    failures: checks.filter((c) => !c.pass),
  }),
);
if (checks.some((c) => !c.pass)) process.exitCode = 1;
