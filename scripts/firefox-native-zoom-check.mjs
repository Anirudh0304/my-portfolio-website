import { firefox } from "../.impeccable/qa/browser-tools/node_modules/playwright/index.mjs";
import { writeFileSync, mkdirSync } from "node:fs";
import { DatabaseSync } from "node:sqlite";
const results = [];
for (const [mode, profile, full] of [
  ["full", ".impeccable/qa/browser-tools/firefox-zoom200-profile", true],
  ["text-only", ".impeccable/qa/browser-tools/firefox-text200-profile", false],
]) {
  mkdirSync(profile, { recursive: true });
  const db = new DatabaseSync(profile + "/content-prefs.sqlite");
  // Firefox159 ContentPrefService2 schema6, from bundled omni.ja; isolated test profiles only.
  db.exec(
    "CREATE TABLE IF NOT EXISTS groups(id INTEGER PRIMARY KEY,name TEXT NOT NULL);CREATE TABLE IF NOT EXISTS settings(id INTEGER PRIMARY KEY,name TEXT NOT NULL);CREATE TABLE IF NOT EXISTS prefs(id INTEGER PRIMARY KEY,groupID INTEGER REFERENCES groups(id),settingID INTEGER NOT NULL REFERENCES settings(id),value BLOB,timestamp INTEGER NOT NULL DEFAULT 0);PRAGMA user_version=6;",
  );
  db.prepare("INSERT OR REPLACE INTO settings(id,name) VALUES(1,?)").run(
    "browser.content.full-zoom",
  );
  db.prepare(
    "INSERT OR REPLACE INTO prefs(id,groupID,settingID,value,timestamp) VALUES(1,NULL,1,?,?)",
  ).run(2, Math.floor(Date.now() / 1000));
  db.close();
  const c = await firefox.launchPersistentContext(profile, {
    headless: true,
    viewport: null,
    args: ["--width=1440", "--height=1000"],
    reducedMotion: "reduce",
    firefoxUserPrefs: {
      "browser.zoom.siteSpecific": false,
      "browser.zoom.full": full,
    },
  });
  try {
    const p = c.pages()[0] || (await c.newPage());
    const errors = [];
    p.on("pageerror", (e) => errors.push(String(e)));
    await p.goto("http://127.0.0.1:4183/#/", { waitUntil: "networkidle" });
    for (const route of [
      "/",
      "/experience",
      "/projects",
      "/writing",
      "/contact",
      "/projects/feedback",
      "/projects/trendsage-lite",
    ]) {
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
      await p.waitForFunction(() =>
        [...document.images]
          .filter((i) => !i.hidden)
          .every((i) => i.complete && i.naturalWidth > 0),
      );
      const state = await p.evaluate(() => {
        const r = (s) => document.querySelector(s)?.getBoundingClientRect();
        const aside = r(".right-fold"),
          folio = r("#main>.folio");
        return {
          innerWidth,
          innerHeight,
          devicePixelRatio,
          rootFont: getComputedStyle(document.documentElement).fontSize,
          cssZoom: getComputedStyle(document.documentElement).zoom,
          mobileLayout:
            getComputedStyle(document.querySelector(".mobile-explore"))
              .display !== "none",
          noOverflow: document.documentElement.scrollWidth <= innerWidth,
          contextClear: !aside || aside.bottom <= folio.top + 0.5,
          titleInside: r("#main h1").right <= innerWidth + 1,
        };
      });
      const pass =
        state.mobileLayout &&
        state.noOverflow &&
        state.contextClear &&
        state.titleInside &&
        state.cssZoom === "1" &&
        (full
          ? state.devicePixelRatio === 2 && state.innerWidth === 720
          : state.devicePixelRatio === 1 &&
            state.innerWidth === 1440 &&
            state.rootFont === "32px");
      results.push({ mode, route, pass, ...state });
      await p.screenshot({
        path: `.impeccable/qa/cross-browser/firefox-native200-${mode}-${route === "/" ? "home" : route.replace(/[^a-z0-9]+/gi, "-")}.png`,
        fullPage: true,
      });
    }
    results.push({
      mode,
      name: "no runtime errors",
      pass: errors.length === 0,
      errors,
    });
  } finally {
    await c.close();
  }
}
writeFileSync(
  ".impeccable/qa/cross-browser/native-zoom-results.json",
  JSON.stringify(results, null, 2),
);
console.log(JSON.stringify(results));
if (results.some((r) => !r.pass)) process.exitCode = 1;
