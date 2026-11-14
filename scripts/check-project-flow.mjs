import { Browser } from "file:///C:/Users/aniru/.codex/skills/taste-skill/scripts/lib/cdp.mjs";
import { writeFileSync } from "node:fs";
const b = await Browser.launch();
const results = [];
try {
  for (const width of [320, 390, 540, 541, 768, 866, 960, 1024, 1536]) {
    const p = await b.newPage({ width, height: 1000, reducedMotion: true });
    await p.goto("http://127.0.0.1:4182/#/projects", { settleMs: 150 });
    await p.eval(async () => {
      await document.fonts.ready;
      await Promise.allSettled(
        [...document.images].map((i) => {
          i.loading = "eager";
          return i.decode();
        }),
      );
      document.querySelector(".feature-heading").scrollIntoView();
    });
    const result = await p.eval(() => {
      const box = (s) => {
        const r = document.querySelector(s).getBoundingClientRect();
        return { top: r.top, bottom: r.bottom, left: r.left, right: r.right };
      };
      const caption = box(".project-caption>span"),
        action = box(".project-caption .action"),
        problem = box(".evidence-note"),
        test = box(".evidence-note:last-child");
      return {
        width: innerWidth,
        noOverflow: document.documentElement.scrollWidth <= innerWidth,
        captionSeparated: caption.bottom + 8 <= action.top,
        arrowVisible:
          getComputedStyle(document.querySelector(".flow-arrow")).display !==
          "none",
        sequence:
          innerWidth <= 960
            ? problem.bottom < test.top
            : problem.right < test.left,
        stageHeight: problem.bottom - problem.top,
        actionHeight: action.bottom - action.top,
      };
    });
    result.errors = p.consoleErrors;
    results.push(result);
    if ([390, 866, 1536].includes(width))
      await p.screenshot({
        path: `.impeccable/review/project-flow-${width}.png`,
        format: "png",
      });
    await p.close();
  }
  writeFileSync(
    ".impeccable/review/project-flow-checks.json",
    JSON.stringify(results, null, 2),
  );
  console.log(JSON.stringify(results));
  if (
    results.some(
      (r) =>
        !r.noOverflow ||
        !r.captionSeparated ||
        !r.arrowVisible ||
        !r.sequence ||
        r.actionHeight < 44 ||
        r.errors.length,
    )
  )
    process.exitCode = 1;
} finally {
  await b.close();
}
