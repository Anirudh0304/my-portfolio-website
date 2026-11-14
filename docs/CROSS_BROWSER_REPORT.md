# Supplemental cross-browser and native zoom validation — 2026-11-08

## Outcome

Final production build: `index-CMbOobCw.js` and `index-Crez0CUF.css`, served at http://127.0.0.1:4183/.

- Firefox159.0 and Playwright WebKit27.2:120/120 route/interaction assertions pass.
- Normal320/960/961/1440px boundary checks in both engines:24/24 pass.
- Genuine Firefox200% browser zoom and200% text-only zoom:16/16 assertions pass across7representative routes per mode, plus runtime-error checks.
- Three additional product issues were found and fixed. No unresolved reproducible defect remains in this supplemental tested scope.

This extends the initial Chromium audit. It does not turn WebKit automation into Safari testing or a physical-device result.

## Exact engines and setup

Isolated tooling under ignored `.impeccable/qa/browser-tools`: Playwright1.65.0, bundled Firefox159.0 revision1572 and WebKit27.2 revision2388, installed on Windows. Firefox UA identifies Firefox159.0. WebKit UA contains a Safari compatibility string, but the executed engine is Playwright's WebKit test browser on Windows—NOT macOS Safari or iOS Safari.

The existing production preview was verified by PID3904 and its exact repository Vite-preview command line, stopped, and restarted against the patched Vite6.4.5 toolchain. Current preview session70187 is left running for review. React Router7.18.5 was included in the final production build after QA dependency remediation.

No product code was changed during initial engine assessment. Root then authorized the minimal font-relative responsive correction; QA coordinated the JSX motion/focus fix. There was no Git push or external deployment.

## Coverage

For each engine: desktop1440×1000 and phone-sized390×1000 contexts,17route states (About; APM, intern and marketing Experience; Projects; Writing; Contact;3planned and7historical details). Actual screenshots were captured for every main chapter and both detail families. This includes genuine portrait/screenshots/material and all page content.

Interactions: in-flow menu open, Escape/focus, active-chapter dismissal, navigation, named native screenshot dialog, scroll isolation, Escape return focus, project Back-scroll restoration, in-project anchors/Back, clipboard success/rejection branch using an in-page test clipboard, console exceptions,866/961 responsive Projects flow, first-entry settling and rapid chapter interruption.

Boundary smoke covers About/Projects/Contact at320,960,961,1440 in both engines. It verifies normal default-font breakpoint behaviour stayed intact after replacing pixel media queries with em equivalents.

Native zoom coverage: About, Experience, Projects, Writing, Contact, planned Feedback→Decision detail and historical TrendSage detail at a1440physical-width Firefox window.

## Additional findings and fixes

| ID | Severity | Reproduction / impact | Fix | Final proof |
|---|---|---|---|---|
| CB01 / UX11 | P1 | Native Firefox200% text-only zoom retained a1440CSS-pixel viewport, doubled computed root text to32px, and left the fixed960px desktop layout active. The printed index/signature and right context/folio overlapped. | CSS960px/961px/540px queries became60em/60.0625em/33.75em, preserving normal16px thresholds. QA uses the same font-relative matchMedia decision for desktop opening/chapter motion. | Seven text-only zoom routes now reflow with menu visible, no horizontal overflow, context/folio clearance and intact titles. |
| CB02 / UX12 | P2 | WebKit pointer opening did not focus the image button. Native Escape dismissal closed the dialog but returned focus to the prior body, rather than the enlargement trigger, on desktop and phone-sized layouts. Firefox's implicit restoration had hidden the issue. | QA added an image-trigger ref and explicit native dialog onClose focus restoration with preventScroll. No Escape event workaround or custom dialog was introduced. | Both engines now pass desktop/phone modal close, background-scroll isolation and trigger-focus assertions. Shared with QA; do not double-count. |
| CB03 / UX13 | P2 | Enlarged Firefox text switched Writing/Contact to the readable layout, but at the wide1440CSS-pixel viewport the104% loose-stock image exceeded the fixed22px gutter. Decorative paper caused horizontal overflow. | Capped mobile-layout material bleed to8px using calc(100% +16px), preserving the same raster stock and semantic text. | Writing/Contact now pass the native200% text-only overflow test; normal phone and boundary checks also pass. |

Earlier apparent WebKit thumbnail failures were harness timing: the test checked the old SPA DOM before the new route committed. Settling now waits for the actual render and loaded image dimensions. They are not counted as product defects. An earlier anchor assertion incorrectly required a near-page-end target to reach document top despite natural scroll clamping; it now correctly verifies the complete target is visible and the destination hash is right.

## Genuine zoom method

Ctrl+Plus automation did not change zoom in either headless engine, so it was not counted as a zoom test.

For Firefox, the test creates isolated profiles and seeds the browser's native global `browser.content.full-zoom` content preference to2.0, using the schema6 definition inspected from that exact bundled Firefox159 `ContentPrefService2.sys.mjs`. `browser.zoom.full=true` exercises native full zoom; false exercises native text-only zoom through Firefox ZoomManager. No CSS zoom, style injection, font mutation or artificial viewport substitution is used in this test.

Observed full zoom:1440physical-width window →720CSS-pixel content width, devicePixelRatio2, root font16px, CSS zoom1. Observed text-only zoom:1440CSS-pixel content width, devicePixelRatio1, computed root font32px, CSS zoom1. These distinct measurements and screenshots demonstrate the actual browser modes. The test uses only its ignored isolated profiles; it does not alter the user's Firefox profile.

## Evidence and repeat commands

Evidence directory `.impeccable/qa/cross-browser/`:

- `results.json`: engine versions,120assertions, zero failures.
- `boundary-results.json`:24normal boundary checks, zero failures.
- `native-zoom-results.json`:16native zoom assertions, zero failures.
- Engine/route screenshots, menu/modal captures, and `firefox-native200-full-*` / `firefox-native200-text-only-*` screenshots.

Repeat with Node24 and the production preview running:

```powershell
npm install --prefix .impeccable/qa/browser-tools --no-audit --no-fund playwright@1.65.0
node .impeccable/qa/browser-tools/node_modules/playwright/cli.js install firefox webkit
node scripts/cross-browser-check.mjs
node scripts/cross-browser-boundaries.mjs
node scripts/firefox-native-zoom-check.mjs
```

The native zoom script bootstraps its own isolated schema6 Firefox content-preference profiles. Node's built-in SQLite may emit an ExperimentalWarning; the test results are still explicit, with a failing process exit if an assertion fails.

## Remaining validation limits

- Physical iPhone, iPad, Android and macOS hardware were not available; no physical touch/gesture result is claimed.
- Actual Safari.app / iOS Safari was not run. WebKit test-browser coverage is additional engine evidence only.
- A physical screen-reader session was not available; the separate automated accessibility report and browser semantics do not substitute for an NVDA/VoiceOver listening test.
- Genuine native zoom was verified in Firefox at the stated1440physical-width window. WebKit's browser-chrome zoom was not exposed by its headless runner; CSS-only emulation is not relabelled as native zoom.
- Network timing was local; no WAN-speed or production Netlify result is claimed.
- The pre-existing formal Impeccable browser-receipt gate remains separate and open. The user’s chat authorization is preserved; this report does not invent a receipt or publication approval.
