import { Browser } from "file:///C:/Users/aniru/.codex/skills/taste-skill/scripts/lib/cdp.mjs";
import { writeFileSync } from "node:fs";
const browser = await Browser.launch();
const checks = [];
const assert = (name, ok) => {
  checks.push({ name, pass: !!ok });
  if (!ok) console.error("FAIL " + name);
};
const wait = (p) => p.eval(() => new Promise((r) => setTimeout(r, 350)));
async function click(p, selector) {
  const r = await p.eval((s) => {
    const e = document.querySelector(s);
    e.scrollIntoView({ block: "center" });
    const r = e.getBoundingClientRect();
    return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
  }, selector);
  await p.send("Input.dispatchMouseEvent", {
    type: "mousePressed",
    ...r,
    button: "left",
    clickCount: 1,
  });
  const scroll = await p.eval(() => scrollY);
  await p.send("Input.dispatchMouseEvent", {
    type: "mouseReleased",
    ...r,
    button: "left",
    clickCount: 1,
  });
  return scroll;
}
try {
  const p = await browser.newPage({ width: 1536, height: 1024 });
  await p.goto("http://127.0.0.1:4182/#/", { settleMs: 1800 });
  assert(
    "First opening settles with all content visible",
    await p.eval(
      () =>
        !document.querySelector(".is-opening") &&
        !document.querySelector(".motion-overlay").children.length,
    ),
  );
  assert(
    "Session records one opening",
    await p.eval(() => sessionStorage.getItem("portfolio-opened") === "true"),
  );
  await click(p, ".home-invitation a");
  await wait(p);
  assert(
    "Journey leads to experience",
    await p.eval(
      () =>
        location.hash === "#/experience" &&
        document.activeElement.tagName === "H1",
    ),
  );
  await click(p, '.role-history a[href*="intern"]');
  await wait(p);
  assert(
    "Internship selectable",
    await p.eval(
      () =>
        document.querySelector(".role-heading h3").textContent ===
        "Product Management Intern",
    ),
  );
  await click(p, '.role-history a[href*="gro"]');
  await wait(p);
  assert(
    "Earlier marketing role selectable",
    await p.eval(
      () =>
        document.querySelector(".role-heading h2").textContent === "GroGoliath",
    ),
  );
  await p.eval(() => {
    location.hash = "/projects";
  });
  await wait(p);
  assert(
    "Seven earlier projects are visible",
    await p.eval(
      () =>
        document.querySelectorAll(
          ".previous-featured article,.project-register article",
        ).length === 7,
    ),
  );
  await p.eval(() => window.scrollTo(0, 1100));
  await wait(p);
  const oldScroll = await click(p, ".preview-image");
  await wait(p);
  assert(
    "Screenshot opens real project detail",
    await p.eval(
      () =>
        location.hash === "#/projects/trendsage-lite" &&
        document.querySelector(".detail-image img").naturalWidth > 0,
    ),
  );
  assert(
    "Project detail has contents index, technologies and next destination",
    await p.eval(
      () =>
        document.querySelectorAll(".in-project a").length === 3 &&
        document.querySelector(".built-with").innerText.includes("Streamlit") &&
        document
          .querySelector(".folio .action")
          .getAttribute("href")
          .includes("quantpegy"),
    ),
  );
  assert(
    "Shared image transition cleans up",
    await p.eval(
      () => !document.querySelector(".motion-overlay").children.length,
    ),
  );
  await click(p, ".detail-image");
  assert(
    "Enlargement uses native modal",
    await p.eval(() => document.querySelector("dialog").open),
  );
  await p.send("Input.dispatchKeyEvent", {
    type: "keyDown",
    key: "Escape",
    code: "Escape",
    windowsVirtualKeyCode: 27,
  });
  await p.send("Input.dispatchKeyEvent", {
    type: "keyUp",
    key: "Escape",
    code: "Escape",
    windowsVirtualKeyCode: 27,
  });
  assert(
    "Escape closes modal and restores trigger focus",
    await p.eval(
      () =>
        !document.querySelector("dialog").open &&
        document.activeElement.classList.contains("detail-image"),
    ),
  );
  await p.eval(() => history.back());
  await wait(p);
  assert(
    "Browser Back restores project scroll",
    await p.eval(
      (y) => location.hash === "#/projects" && Math.abs(scrollY - y) < 20,
      oldScroll,
    ),
  );
  for (const id of [
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
  ]) {
    await p.eval((id) => {
      location.hash = "/projects/" + id;
    }, id);
    await wait(p);
    assert(
      "Detail route " + id,
      await p.eval(
        () =>
          !!document.querySelector(".project-detail h1") &&
          !document.body.innerText.includes("A missing page."),
      ),
    );
  }
  await p.eval(() => {
    location.hash = "/writing";
  });
  await wait(p);
  assert(
    "Writing has no fake published links",
    await p.eval(
      () =>
        document.body.innerText.includes("Not yet published") &&
        ![...document.querySelectorAll(".writing a")].some((a) =>
          /read|medium/i.test(a.innerText),
        ),
    ),
  );
  await p.eval(() => {
    location.hash = "/contact";
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async (text) => {
          window.copied = text;
        },
      },
    });
  });
  await wait(p);
  await click(p, ".text-button");
  assert(
    "Copy email works",
    await p.eval(
      () =>
        window.copied === "kondurianirudh0304@gmail.com" &&
        document.querySelector("[role=status]").textContent.includes("copied"),
    ),
  );
  await p.eval(() => {
    navigator.clipboard.writeText = async () => {
      throw new Error("denied");
    };
  });
  await click(p, ".text-button");
  assert(
    "Clipboard denial offers selectable email fallback",
    await p.eval(() =>
      document
        .querySelector("[role=status]")
        .textContent.includes("Select the email"),
    ),
  );
  await p.goto("http://127.0.0.1:4182/", { settleMs: 250 });
  assert(
    "Return resumes last chapter with no opening",
    await p.eval(
      () =>
        location.hash === "#/contact" &&
        !document.querySelector(".opening-leaf"),
    ),
  );
  await p.eval(() => {
    location.hash = "/missing";
  });
  await wait(p);
  assert(
    "Unknown route has recovery action",
    await p.eval(
      () =>
        document.querySelector("h1").innerText === "A missing page." &&
        !!document.querySelector(".centre .action"),
    ),
  );
  assert("No runtime exceptions", p.consoleErrors.length === 0);
  await p.close();
  const phone = await browser.newPage({
    width: 390,
    height: 844,
    mobile: true,
    reducedMotion: true,
  });
  await phone.goto("http://127.0.0.1:4182/#/", { settleMs: 200 });
  await click(phone, "summary");
  assert(
    "Mobile menu opens in document flow",
    await phone.eval(
      () =>
        document.querySelector("details").open &&
        document.querySelector("h1").getBoundingClientRect().top > 400,
    ),
  );
  await phone.screenshot({
    path: ".impeccable/review/mobile-menu.png",
    format: "png",
    fullPage: true,
  });
  await phone.send("Input.dispatchKeyEvent", {
    type: "keyDown",
    key: "Escape",
    code: "Escape",
    windowsVirtualKeyCode: 27,
  });
  assert(
    "Mobile Escape closes menu",
    await phone.eval(
      () =>
        !document.querySelector("details").open &&
        document.activeElement.tagName === "SUMMARY",
    ),
  );
  await click(phone, "summary");
  await click(phone, '.mobile-explore a[href="#/experience"]');
  await wait(phone);
  assert(
    "Mobile chapter selection closes menu",
    await phone.eval(
      () =>
        location.hash === "#/experience" &&
        !document.querySelector("details").open,
    ),
  );
  assert(
    "Reduced motion creates no fold layers",
    await phone.eval(
      () => !document.querySelector(".motion-overlay").children.length,
    ),
  );
  assert("No mobile runtime exceptions", phone.consoleErrors.length === 0);
  writeFileSync(
    ".impeccable/review/interaction-checks.json",
    JSON.stringify(checks, null, 2),
  );
  console.log(
    JSON.stringify(
      {
        passed: checks.filter((c) => c.pass).length,
        total: checks.length,
        failures: checks.filter((c) => !c.pass),
      },
      null,
      2,
    ),
  );
  if(checks.some(check=>!check.pass))process.exitCode=1;
} finally {
  await browser.close();
}
