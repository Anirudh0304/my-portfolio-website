import { Browser } from "file:///C:/Users/aniru/.codex/skills/taste-skill/scripts/lib/cdp.mjs";
import { writeFileSync } from "node:fs";
const b = await Browser.launch();
try {
  const p = await b.newPage({ width: 1280, height: 900, reducedMotion: true });
  const errors = [];
  b.on(p.sessionId, "Runtime.consoleAPICalled", (e) => {
    if (e.type === "error")
      errors.push(e.args.map((a) => a.value || a.description).join(" "));
  });
  await p.goto("http://127.0.0.1:4182/.impeccable/qa/legacy-preview.html", {
    settleMs: 350,
  });
  const result = {
    ...(await p.eval(() => ({
      sections: [...document.querySelectorAll("section[id]")].map((n) => n.id),
      projectButtons: [...document.querySelectorAll("#work button")].length,
      formFields: [
        ...document.querySelectorAll("#contact input,#contact textarea"),
      ].map((n) => n.name),
      apostropheText: [
        "I'd love to hear from you.",
        "Let's work together",
        "VIT Vellore '26",
      ].map((text) => ({
        text,
        present: document.body.textContent.includes(text),
      })),
    }))),
    runtimeErrors: p.consoleErrors,
    consoleErrors: errors,
  };
  writeFileSync(
    ".impeccable/qa/legacy-render-after.json",
    JSON.stringify(result, null, 2),
  );
  console.log(JSON.stringify(result));
  if (
    result.sections.length !== 6 ||
    result.projectButtons !== 6 ||
    result.runtimeErrors.length ||
    result.consoleErrors.length ||
    result.apostropheText.some((t) => !t.present)
  )
    process.exitCode = 1;
} finally {
  await b.close();
}
