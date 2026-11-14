import { Browser } from "file:///C:/Users/aniru/.codex/skills/taste-skill/scripts/lib/cdp.mjs";
import { writeFileSync } from "node:fs";
const b = await Browser.launch();
const report = {};
try {
  const p = await b.newPage({ width: 1024, height: 768 });
  await p.send("Fetch.enable", {
    patterns: [{ urlPattern: "*materials/*" }, { urlPattern: "*fonts/*" }],
  });
  const pending = [];
  const off = b.on(p.sessionId, "Fetch.requestPaused", (e) => {
    pending.push(e.request.url);
    setTimeout(
      () =>
        p
          .send("Fetch.continueRequest", { requestId: e.requestId })
          .catch(() => {}),
      2200,
    );
  });
  let domOff;
  const dom = new Promise((r) => {
    domOff = b.on(p.sessionId, "Page.domContentEventFired", () => r());
  });
  await p.send("Page.navigate", { url: "http://127.0.0.1:4182/#/" });
  await dom;
  await p.eval(async () => {
    for (let i = 0; i < 80 && !document.querySelector("h1"); i++)
      await new Promise((r) => setTimeout(r, 20));
  });
  report.firstPaint = await p.eval(() => ({
    heading: document.querySelector("h1")?.textContent,
    body: document.querySelector(".home-bio")?.textContent,
    opacity:
      document.querySelector(".centre") &&
      getComputedStyle(document.querySelector(".centre")).opacity,
    blocked: document.querySelector(".is-opening") !== null,
  }));
  await p.eval(() => new Promise((r) => setTimeout(r, 1250)));
  report.whileDelayed = await p.eval(() => ({
    heading: document.querySelector("h1")?.textContent,
    opacity: getComputedStyle(document.querySelector(".centre")).opacity,
    blocked: !!document.querySelector(".is-opening"),
    leaves: document.querySelector(".motion-overlay").children.length,
  }));
  await p.screenshot({
    path: ".impeccable/qa/delayed-assets-readable.png",
    format: "png",
  });
  await p.eval(() => new Promise((r) => setTimeout(r, 1300)));
  report.after = {
    pending: pending.length,
    errors: p.consoleErrors,
    ...(await p.eval(() => ({
      blocked: !!document.querySelector(".is-opening"),
      leaves: document.querySelector(".motion-overlay").children.length,
    }))),
  };
  off();
  domOff();
  await p.close();
  const f = await b.newPage({ width: 390, height: 844, reducedMotion: true });
  await f.send("Network.enable");
  await f.send("Network.setBlockedURLs", {
    urls: ["*materials/*", "*fonts/*", "*screenshots/*.webp"],
  });
  await f.goto("http://127.0.0.1:4182/#/", { settleMs: 300 });
  report.failedHome = await f.eval(() => ({
    portraitFallback: !!document.querySelector(".portrait-unavailable"),
    visibleBroken: [...document.images].filter(
      (i) => !i.naturalWidth && getComputedStyle(i).display !== "none",
    ).length,
    h1: document.querySelector("h1")?.textContent,
  }));
  await f.eval(async () => {
    location.hash = "/projects/trendsage-lite";
    await new Promise((r) => setTimeout(r, 300));
  });
  report.failedProject = await f.eval(() => ({
    fallback: !!document.querySelector(".media-unavailable"),
    disabled: document.querySelector(".detail-image")?.disabled,
    buttonLabel: document
      .querySelector(".detail-image")
      ?.getAttribute("aria-label"),
    source: !!document.querySelector(".detail-aside .action"),
  }));
  await f.screenshot({
    path: ".impeccable/qa/missing-assets-after.png",
    format: "png",
  });
  await f.close();
  console.log(JSON.stringify(report, null, 2));
  writeFileSync(
    ".impeccable/qa/resilience-results.json",
    JSON.stringify(report, null, 2),
  );
  if (
    !report.firstPaint.heading ||
    report.whileDelayed.blocked ||
    report.whileDelayed.leaves ||
    !report.failedHome.portraitFallback ||
    report.failedHome.visibleBroken ||
    !report.failedProject.fallback ||
    !report.failedProject.disabled ||
    !report.failedProject.source
  )
    process.exitCode = 1;
} finally {
  await b.close();
}
