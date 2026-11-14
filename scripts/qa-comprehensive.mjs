import { Browser } from "file:///C:/Users/aniru/.codex/skills/taste-skill/scripts/lib/cdp.mjs";
import { readFileSync, writeFileSync } from "node:fs";
const b = await Browser.launch();
const report = { matrix: [], accessibility: [], checks: [], network: [] };
const routes = [
  "/",
  "/experience",
  "/experience?role=intern",
  "/experience?role=gro",
  "/projects",
  "/writing",
  "/contact",
  ...[
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
  ].map((id) => "/projects/" + id),
];
const axe = readFileSync(".impeccable/qa/package/axe.min.js", "utf8");
const pause = (p, t = 160) =>
  p.eval((t) => new Promise((r) => setTimeout(r, t)), t);
const check = (name, value, detail) => {
  report.checks.push({ name, pass: !!value, detail });
  if (!value) console.error("FAIL", name, detail || "");
};
async function click(p, s, touch = false) {
  const r = await p.eval((s) => {
    const e = document.querySelector(s);
    e.scrollIntoView({ block: "center" });
    const r = e.getBoundingClientRect();
    return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
  }, s);
  if (touch) {
    await p.send("Input.dispatchTouchEvent", {
      type: "touchStart",
      touchPoints: [r],
    });
    await p.send("Input.dispatchTouchEvent", {
      type: "touchEnd",
      touchPoints: [],
    });
  } else
    for (const type of ["mousePressed", "mouseReleased"])
      await p.send("Input.dispatchMouseEvent", {
        type,
        ...r,
        button: "left",
        clickCount: 1,
      });
}
async function hash(p, route) {
  await p.eval((r) => {
    location.hash = r;
  }, route);
  await pause(p);
}
async function key(
  p,
  key,
  code = key,
  virtual = key === "Tab" ? 9 : key === "Escape" ? 27 : 13,
) {
  await p.send("Input.dispatchKeyEvent", {
    type: "keyDown",
    key,
    code,
    windowsVirtualKeyCode: virtual,
    ...(key === "Enter" ? { text: "\r", unmodifiedText: "\r" } : {}),
  });
  await p.send("Input.dispatchKeyEvent", {
    type: "keyUp",
    key,
    code,
    windowsVirtualKeyCode: virtual,
  });
}
try {
  for (const width of [
    320, 375, 390, 540, 541, 768, 866, 960, 961, 1024, 1440, 1536,
  ]) {
    const p = await b.newPage({ width, height: 900, reducedMotion: true });
    await p.send("Network.enable");
    const off = b.on(p.sessionId, "Network.responseReceived", (e) => {
      if (e.response.status >= 400)
        report.network.push({ url: e.response.url, status: e.response.status });
    });
    await p.goto("http://127.0.0.1:4182/#/", { settleMs: 100 });
    await p.eval(async () => {
      await document.fonts.ready;
      return true;
    });
    for (const route of routes) {
      if (route !== "/") await hash(p, route);
      await p.eval(async () => {
        await document.fonts.ready;
        await Promise.allSettled(
          [...document.images].map((i) => {
            i.loading = "eager";
            return i.decode();
          }),
        );
        return true;
      });
      const state = await p.eval(() => ({
        width: innerWidth,
        h1: document.querySelector("h1")?.innerText,
        overflow: document.documentElement.scrollWidth - innerWidth,
        missing: [...document.images]
          .filter((i) => !i.complete || !i.naturalWidth)
          .map((i) => i.src),
        headings: document.querySelectorAll("h1").length,
      }));
      report.matrix.push({ route, ...state, errors: [...p.consoleErrors] });
      if ([390, 1536].includes(width)) {
        await p.eval(axe);
        const a = await p.eval(async () => {
          const r = await axe.run(document, {
            runOnly: {
              type: "tag",
              values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"],
            },
          });
          return {
            violations: r.violations.map((v) => ({
              id: v.id,
              impact: v.impact,
              description: v.description,
              nodes: v.nodes.map((n) => ({
                target: n.target,
                summary: n.failureSummary,
              })),
            })),
            incomplete: r.incomplete.map((v) => v.id),
          };
        });
        report.accessibility.push({ route, width, ...a });
      }
    }
    off();
    await p.close();
  }
  const p = await b.newPage({
    width: 390,
    height: 700,
    mobile: true,
    reducedMotion: true,
  });
  await p.goto("http://127.0.0.1:4182/#/", { settleMs: 100 });
  await click(p, "summary", true);
  check(
    "Touch opens Explore",
    await p.eval(() => document.querySelector("details").open),
  );
  await click(p, ".mobile-explore a[aria-current=page]", true);
  check(
    "Current chapter closes Explore and focuses content",
    await p.eval(
      () =>
        !document.querySelector("details").open &&
        document.activeElement.tagName === "H1",
    ),
  );
  await p.eval(() => document.querySelector("summary").focus());
  await key(p, "Enter");
  check(
    "Keyboard opens Explore",
    await p.eval(() => document.querySelector("details").open),
  );
  await key(p, "Escape");
  check(
    "Escape closes Explore and restores Summary focus",
    await p.eval(
      () =>
        !document.querySelector("details").open &&
        document.activeElement.tagName === "SUMMARY",
    ),
  );
  for (const route of ["/about", "/start"]) {
    await hash(p, route);
    check(
      "Alias " + route,
      await p.eval(
        () =>
          location.hash === "#/" &&
          document.querySelector("h1").textContent.includes("Konduri"),
      ),
    );
  }
  for (const role of ["unknown", "constructor", "__proto__", "toString"]) {
    await hash(p, "/experience?role=" + role);
    check(
      "Invalid role safe " + role,
      await p.eval(
        () =>
          document.querySelector(".role-heading h3")?.textContent ===
          "Associate Product Manager",
      ),
    );
  }
  for (const id of [
    "unknown",
    "constructor",
    "__proto__",
    "toString",
    "%3Cscript%3E",
  ]) {
    await hash(p, "/projects/" + id);
    check(
      "Invalid project safe " + id,
      await p.eval(
        () => document.querySelector("h1")?.textContent === "A missing page.",
      ),
    );
  }
  await hash(p, "/projects/trendsage-lite#project-build");
  check(
    "Section anchor focuses target",
    await p.eval(() => document.activeElement.id === "project-build"),
  );
  await p.eval(() => scrollBy(0, 150));
  await pause(p);
  const reading = await p.eval(() => scrollY);
  await hash(p, "/writing");
  await p.eval(() => history.back());
  await pause(p);
  check(
    "Back restores reading offset within anchored route",
    await p.eval((y) => Math.abs(scrollY - y) < 3, reading),
  );
  await p.eval(() => history.forward());
  await pause(p);
  check(
    "Forward restores writing",
    await p.eval(() => location.hash === "#/writing"),
  );
  await hash(p, "/projects/trendsage-lite");
  await click(p, ".detail-image");
  const ax = await p.send("Accessibility.getFullAXTree");
  check(
    "Dialog has meaningful native accessible name",
    ax.nodes.some(
      (n) =>
        n.role?.value === "dialog" &&
        n.name?.value === "TrendSage Lite screenshot",
    ),
  );
  const lockedAt = await p.eval(() => scrollY);
  await p.wheel(500);
  check(
    "Modal locks background scrolling",
    await p.eval((y) => Math.abs(scrollY - y) < 2, lockedAt),
  );
  for (let i = 0; i < 4; i++) await key(p, "Tab");
  check(
    "Modal keeps keyboard focus inside dialog",
    await p.eval(() => !!document.activeElement.closest("dialog")),
  );
  await key(p, "Escape");
  check(
    "Modal Escape restores image trigger",
    await p.eval(
      () =>
        !document.querySelector("dialog").open &&
        document.activeElement.classList.contains("detail-image"),
    ),
  );
  await hash(p, "/projects");
  check(
    "Catalogue ends with an onward Writing link",
    await p.eval(
      () =>
        document
          .querySelector(".previous-spread > .folio .action")
          ?.getAttribute("href") === "#/writing",
    ),
  );
  await click(p, ".previous-spread > .folio .action");
  check(
    "Bottom catalogue link opens Writing",
    await p.eval(() => location.hash === "#/writing"),
  );
  await hash(p, "/contact");
  await p.eval(() =>
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async (value) => {
          window.copied = value;
        },
      },
    }),
  );
  await click(p, ".text-button");
  check(
    "Clipboard success announced",
    await p.eval(
      () =>
        window.copied === "kondurianirudh0304@gmail.com" &&
        document.querySelector("[role=status]").textContent.includes("copied"),
    ),
  );
  await p.eval(() => {
    navigator.clipboard.writeText = async () => {
      throw Error("denied");
    };
  });
  await click(p, ".text-button");
  check(
    "Clipboard denial offers readable fallback",
    await p.eval(() =>
      document
        .querySelector("[role=status]")
        .textContent.includes("Select the email"),
    ),
  );
  await p.goto("http://127.0.0.1:4182/", { settleMs: 100 });
  check(
    "Returning session resumes last chapter",
    await p.eval(
      () =>
        location.hash === "#/contact" &&
        !document.querySelector(".opening-leaf"),
    ),
  );
  check(
    "Interaction run has no runtime exceptions",
    p.consoleErrors.length === 0,
    p.consoleErrors,
  );
  await p.close();
  const storage = await b.newPage({ width: 1024, height: 768 });
  await storage.send("Page.addScriptToEvaluateOnNewDocument", {
    source: `Object.defineProperty(window,'sessionStorage',{configurable:true,get(){throw new DOMException('Storage disabled','SecurityError')}});`,
  });
  await storage.goto("http://127.0.0.1:4182/", { settleMs: 200 });
  check(
    "Disabled sessionStorage preserves readable homepage",
    await storage.eval(
      () =>
        !!document.querySelector("h1") &&
        !document.querySelector(".is-opening"),
    ),
  );
  await storage.close();
  const failure = await b.newPage({ width: 1024, height: 768 });
  await failure.send("Network.enable");
  await failure.send("Network.setBlockedURLs", {
    urls: ["*materials/*", "*fonts/*", "*screenshots/*.webp"],
  });
  await failure.goto("http://127.0.0.1:4182/#/", { settleMs: 1400 });
  check(
    "Missing material/portrait/font leaves readable unblocked page",
    await failure.eval(
      () =>
        document.querySelector("h1")?.textContent.includes("Konduri") &&
        !document.querySelector(".is-opening") &&
        !document.querySelector(".motion-overlay").children.length,
    ),
  );
  await hash(failure, "/projects/trendsage-lite");
  check(
    "Missing screenshot does not crash content or source access",
    await failure.eval(
      () =>
        document.querySelector("h1")?.textContent === "TrendSage Lite" &&
        !!document.querySelector(".detail-aside .action"),
    ),
  );
  await failure.screenshot({
    path: ".impeccable/qa/missing-assets.png",
    format: "png",
  });
  await failure.close();
  const normal = await b.newPage({ width: 1536, height: 1024 });
  await normal.goto("http://127.0.0.1:4182/#/", { settleMs: 1500 });
  check(
    "Opening cleans up normally",
    await normal.eval(
      () =>
        !document.querySelector(".opening-leaf") &&
        !document.querySelector(".is-opening"),
    ),
  );
  await normal.eval(async () => {
    for (const path of ["/experience", "/projects", "/writing", "/contact"]) {
      const link = [...document.querySelectorAll("a")].find(
        (a) => a.getAttribute("href") === "#" + path,
      );
      if (link)
        link.dispatchEvent(
          new MouseEvent("click", { bubbles: true, detail: 1, button: 0 }),
        );
      await new Promise((r) => setTimeout(r, 40));
    }
    await new Promise((r) => setTimeout(r, 350));
  });
  check(
    "Rapid pointer navigation leaves final route no stale layers",
    await normal.eval(
      () =>
        location.hash === "#/contact" &&
        !document.querySelector(".motion-overlay").children.length &&
        !document.querySelector(".is-opening"),
    ),
  );
  await normal.close();
  check(
    "Route-width matrix renders all real content without overflow/missing images/errors",
    report.matrix.every(
      (r) =>
        !!r.h1 &&
        r.headings === 1 &&
        r.overflow <= 0 &&
        !r.missing.length &&
        !r.errors.length,
    ),
    { cases: report.matrix.length },
  );
  check(
    "No unexpected HTTPerrors",
    report.network.length === 0,
    report.network,
  );
  check(
    "Axe WCAG AA scan has no confirmed violations",
    report.accessibility.every((r) => !r.violations.length),
    { scans: report.accessibility.length },
  );
  writeFileSync(
    ".impeccable/qa/comprehensive-results.json",
    JSON.stringify(report, null, 2),
  );
  console.log(
    JSON.stringify(
      {
        matrix: report.matrix.length,
        axeScans: report.accessibility.length,
        checks: report.checks.length,
        failures: report.checks.filter((c) => !c.pass),
        violations: report.accessibility.filter((a) => a.violations.length),
      },
      null,
      2,
    ),
  );
  if (report.checks.some((c) => !c.pass)) process.exitCode = 1;
} finally {
  await b.close();
}
