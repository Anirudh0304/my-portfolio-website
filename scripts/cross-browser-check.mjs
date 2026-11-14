import {
  firefox,
  webkit,
} from "../.impeccable/qa/browser-tools/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const base = process.env.PORTFOLIO_BASE || "http://127.0.0.1:4183";
const out = ".impeccable/qa/cross-browser";
const results = [];
const versions = {};
const record = (engine, name, pass, evidence = {}) => {
  results.push({ engine, name, pass: !!pass, ...evidence });
  if (!pass)
    console.error(
      "FAIL " + engine + " " + name + " " + JSON.stringify(evidence),
    );
};
async function settle(p) {
  await p.waitForTimeout(120);
  await p.evaluate(async () => {
    await document.fonts.ready;
    await Promise.allSettled(
      [...document.images].map((img) => {
        img.loading = "eager";
        return img.decode();
      }),
    );
  });
  await p.waitForFunction(
    () =>
      [...document.images]
        .filter((i) => !i.hidden)
        .every((i) => i.complete && i.naturalWidth > 0),
    null,
    { timeout: 8000 },
  );
  await p.waitForTimeout(60);
}
const detailIds = [
  "feedback",
  "funnel",
  "ai",
  "trendsage-lite",
  "quantpegy",
  "xai-governance",
  "sql-data-warehouse",
  "uber-analysis-dashboard",
  "hr-analytics",
  "task-manager",
];
for (const [engine, type] of [
  ["firefox", firefox],
  ["webkit", webkit],
]) {
  let browser;
  try {
    browser = await type.launch({ headless: true });
    versions[engine] = { version: browser.version() };
    for (const width of [1440, 390]) {
      const context = await browser.newContext({
        viewport: { width, height: 1000 },
        reducedMotion: "reduce",
        hasTouch: width === 390,
      });
      const p = await context.newPage();
      const errors = [];
      p.on("pageerror", (err) => errors.push(String(err)));
      await p.goto(base + "/#/", { waitUntil: "networkidle" });
      versions[engine].userAgent = await p.evaluate(() => navigator.userAgent);
      for (const route of [
        "/",
        "/experience",
        "/experience?role=intern",
        "/experience?role=gro",
        "/projects",
        "/writing",
        "/contact",
        ...detailIds.map((id) => "/projects/" + id),
      ]) {
        await p.evaluate((r) => {
          location.hash = r;
        }, route);
        await settle(p);
        const state = await p.evaluate(() => ({
          width: innerWidth,
          scrollWidth: document.documentElement.scrollWidth,
          h1: document.querySelector("#main h1")?.textContent.trim(),
          missing: [...document.images]
            .filter(
              (img) => !img.hidden && (!img.complete || !img.naturalWidth),
            )
            .map((img) => img.src),
          materialHeight: document
            .querySelector("#main>.paper")
            ?.getBoundingClientRect().height,
        }));
        record(
          engine,
          width + " route " + route,
          state.scrollWidth <= state.width &&
            !!state.h1 &&
            !state.missing.length,
          { ...state, route },
        );
        if (
          [
            "/",
            "/experience",
            "/projects",
            "/writing",
            "/contact",
            "/projects/trendsage-lite",
            "/projects/feedback",
          ].includes(route)
        )
          await p.screenshot({
            path: `${out}/${engine}-${width}-${route === "/" ? "home" : route.replace(/[^a-z0-9]+/gi, "-")}.png`,
            fullPage: true,
          });
      }
      if (width === 390) {
        await p.goto(base + "/#/", { waitUntil: "networkidle" });
        await p.locator(".mobile-explore summary").click();
        record(
          engine,
          "mobile menu opens",
          (await p.locator(".mobile-explore").getAttribute("open")) !== null,
        );
        await p.screenshot({
          path: `${out}/${engine}-mobile-menu.png`,
          fullPage: true,
        });
        await p.keyboard.press("Escape");
        record(
          engine,
          "mobile Escape closes and focuses summary",
          await p.evaluate(
            () =>
              !document.querySelector(".mobile-explore").open &&
              document.activeElement.tagName === "SUMMARY",
          ),
        );
        await p.locator(".mobile-explore summary").click();
        await p.locator('.mobile-explore a[href="#/"]').click();
        record(
          engine,
          "current mobile chapter closes menu",
          await p.evaluate(
            () =>
              !document.querySelector(".mobile-explore").open &&
              document.activeElement.tagName === "H1",
          ),
        );
        await p.locator(".mobile-explore summary").click();
        await p.locator('.mobile-explore a[href="#/experience"]').click();
        await p.waitForTimeout(120);
        record(
          engine,
          "mobile menu navigation",
          await p.evaluate(
            () =>
              location.hash === "#/experience" &&
              !document.querySelector(".mobile-explore").open,
          ),
        );
      }
      await p.goto(base + "/#/projects/trendsage-lite", {
        waitUntil: "networkidle",
      });
      await p.locator(".detail-image").click();
      record(
        engine,
        width + " named native modal opens",
        await p
          .getByRole("dialog", { name: "TrendSage Lite screenshot" })
          .isVisible(),
      );
      const beforeY = await p.evaluate(() => scrollY);
      await p.mouse.wheel(0, 600);
      await p.waitForTimeout(100);
      record(
        engine,
        width + " modal background remains still",
        Math.abs((await p.evaluate(() => scrollY)) - beforeY) < 2,
      );
      await p.screenshot({ path: `${out}/${engine}-${width}-modal.png` });
      await p.keyboard.press("Escape");
      await p.waitForTimeout(120);
      record(
        engine,
        width + " modal Escape restores trigger focus",
        await p.evaluate(
          () =>
            !document.querySelector("dialog").open &&
            document.activeElement.classList.contains("detail-image"),
        ),
      );
      await p.goto(base + "/#/projects", { waitUntil: "networkidle" });
      await p.locator(".preview-image").first().scrollIntoViewIfNeeded();
      const savedY = await p.evaluate(() => scrollY);
      await p.locator(".preview-image").first().click();
      await p.waitForURL("**/#/projects/trendsage-lite");
      await p.goBack();
      await p.waitForTimeout(180);
      record(
        engine,
        width + " Back restores project scroll",
        Math.abs((await p.evaluate(() => scrollY)) - savedY) < 3,
        { savedY, actualY: await p.evaluate(() => scrollY) },
      );
      await p.goto(base + "/#/projects/trendsage-lite", {
        waitUntil: "networkidle",
      });
      await p.locator(".in-project a").last().click();
      await p.waitForTimeout(150);
      record(
        engine,
        width + " project contents anchor",
        await p.evaluate(
          () =>
            location.hash.endsWith("#project-interface") &&
            document.querySelector("#project-interface").getBoundingClientRect()
              .top >= 0 &&
            document.querySelector("#project-interface").getBoundingClientRect()
              .bottom <=
              innerHeight + 2,
        ),
      );
      await p.goBack();
      await p.waitForTimeout(150);
      record(
        engine,
        width + " Back removes contents hash",
        await p.evaluate(() => location.hash === "#/projects/trendsage-lite"),
      );
      await p.goto(base + "/#/contact", { waitUntil: "networkidle" });
      await p.evaluate(() =>
        Object.defineProperty(navigator, "clipboard", {
          configurable: true,
          value: {
            writeText: async (text) => {
              window.testCopied = text;
            },
          },
        }),
      );
      await p.locator(".text-button").click();
      record(
        engine,
        width + " copy status",
        await p.evaluate(
          () =>
            window.testCopied === "kondurianirudh0304@gmail.com" &&
            document
              .querySelector("[role=status]")
              .textContent.includes("copied"),
        ),
      );
      await p.evaluate(() => {
        navigator.clipboard.writeText = async () => {
          throw Error("denied");
        };
      });
      await p.locator(".text-button").click();
      record(
        engine,
        width + " copy rejection fallback",
        await p.evaluate(() =>
          document
            .querySelector("[role=status]")
            .textContent.includes("Select the email"),
        ),
      );
      record(engine, width + " no runtime exceptions", errors.length === 0, {
        errors,
      });
      await context.close();
    }
    for (const width of [866, 961]) {
      const context = await browser.newContext({
        viewport: { width, height: 1000 },
        reducedMotion: "reduce",
      });
      const p = await context.newPage();
      await p.goto(base + "/#/projects", { waitUntil: "networkidle" });
      await settle(p);
      const state = await p.evaluate(() => {
        const r = (s) => document.querySelector(s).getBoundingClientRect();
        return {
          overflow: document.documentElement.scrollWidth > innerWidth,
          captionClear:
            r(".project-caption>span").bottom + 8 <=
            r(".project-caption .action").top,
          arrow:
            getComputedStyle(document.querySelector(".flow-arrow")).display !==
            "none",
          paperCovers:
            innerWidth <= 960 ||
            r("#main>.paper").bottom >= r("#main>.folio").bottom - 0.5,
        };
      });
      record(
        engine,
        "boundary " + width,
        Object.values(state).every((value, i) => (i === 0 ? !value : value)),
        state,
      );
      await p.screenshot({
        path: `${out}/${engine}-${width}-projects.png`,
        fullPage: true,
      });
      await context.close();
    }
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
      reducedMotion: "no-preference",
    });
    const p = await context.newPage();
    await p.goto(base + "/#/", { waitUntil: "domcontentloaded" });
    await p.waitForFunction(() => !!sessionStorage.getItem("portfolio-opened"));
    await p.waitForFunction(
      () =>
        !document.querySelector(".opening-leaf") &&
        !document.querySelector(".is-opening"),
      null,
      { timeout: 6000 },
    );
    record(engine, "first paper opening settles", true);
    await p.locator(".home-invitation a").click();
    await p.waitForTimeout(50);
    await p.locator('#main>.index a[href="#/projects"]').click();
    await p.waitForTimeout(400);
    record(
      engine,
      "rapid chapter interruption settles",
      await p.evaluate(
        () =>
          location.hash === "#/projects" &&
          !document.querySelector(".motion-overlay").children.length,
      ),
    );
    await context.close();
  } catch (error) {
    record(engine, "suite completion", false, { error: String(error) });
  } finally {
    await browser?.close();
  }
}
writeFileSync(
  out + "/results.json",
  JSON.stringify(
    {
      base,
      versions,
      checks: results,
      passed: results.filter((r) => r.pass).length,
      total: results.length,
      failures: results.filter((r) => !r.pass),
    },
    null,
    2,
  ),
);
console.log(
  JSON.stringify(
    {
      versions,
      passed: results.filter((r) => r.pass).length,
      total: results.length,
      failures: results.filter((r) => !r.pass),
    },
    null,
    2,
  ),
);
if (results.some((r) => !r.pass)) process.exitCode = 1;
