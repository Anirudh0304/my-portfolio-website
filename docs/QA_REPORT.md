# Website QA report

2026-11-08 · React/Vite portfolio · local preview http://127.0.0.1:4182/#/

## Outcome

Confirmed functional, accessibility and resilience defects were fixed in the active website. The post-fix run passes all36 behavioural checks,204 real route/viewport renders and34 automated accessibility scans with no confirmed violations. UI/UX-specific findings and the visual acceptance assessment are recorded separately in UI_UX_REPORT.md.

No Git push, Netlify deployment, fabricated content or approval-record manipulation occurred.

## Confirmed issues and fixes

| ID | Severity | Before / user impact | Root cause and implemented fix | Evidence / verification |
|---|---|---|---|---|
| QA-01 | P1 | `/experience?role=constructor`, `role=__proto__`, `/projects/constructor` and `/projects/toString` blanked the entire app with uncaught TypeErrors. | Experience and ProjectDetail treated inherited object properties as content records. Own-property lookups now admit only genuine records; invalid roles fall back to APM and unknown projects show the recovery page. | Before: `.impeccable/qa/baseline-findings.json`, `before-route-crash.png`. Regression covers inherited names and unknown/slightly encoded paths without runtime exceptions. |
| QA-02 | P2 | Tapping the currently active chapter in mobile Explore left the menu open and focus inside its links. | Same-route navigation returned before handling the disclosure. It now closes and focuses the current heading without replaying route motion. | Synthesized Chromium touch opens Explore, selects the current chapter, and verifies closed disclosure plus heading focus. |
| QA-03 | P1 | The native screenshot dialog had an empty accessible name. | Added a project-specific `aria-label` to the dialog; native focus trapping and Escape remain in charge. | Before AX tree: `name:""`. After AX tree: `TrendSage Lite screenshot`; modal keyboard/focus assertions. |
| QA-04 | P2 | Mouse wheel moved the background page while the screenshot modal was open (scroll51→135 in the baseline). | Native `showModal()` makes the rest inert but does not lock document scrolling. UI/UX agent added document scroll lock while the dialog is open, stable scrollbar handling and internal dialog scroll containment. | Actual Chromium wheel input now preserves the background scroll position; Escape returns focus to the image trigger. |
| QA-05 | P2 | Browser Back to a project-section URL snapped to its anchor and lost the subsequent reading offset (881→732 in the baseline). | Anchor scrolling always won over history restoration, and native hash entries can reuse the default router key. Restoration now prefers saved POP positions and identifies entries by router key plus full route/search/hash. | After fix, reading offset898→898 is retained; Back and Forward assertions cover the anchored route and onward chapter. |
| QA-06 | P2 | Internal project anchors scrolled visually while keyboard focus remained elsewhere. | Targets were not focusable and the hash handler only scrolled. Detail sections now accept programmatic focus; anchor navigation moves focus to the target without another scroll. | Direct `#project-build` places focus on the section; keyboard follows the reading destination. |
| QA-07 | P2 | At the961px desktop boundary, the first Projects footer could fall below the paper onto the grey surround. | The first decorative sheet kept a fixed aspect-height despite responsive content. A ResizeObserver measures the first folio extent into `--opening-height`; UI/UX CSS uses that extent for the first sheet. | Observer watches actual sheet/heading/content/folio dimensions and window resize; UI/UX boundary captures/metrics verify coverage. No layout feedback loop from the absolute material. |
| QA-08 | P2 | The long Previous projects catalogue ended without a continuation action, breaking the intended journey. | The only Writing folio appeared before the catalogue. A second contextual folio now follows the actual catalogue and links to Writing; the overview folio remains. | `Previous projects > .folio` has the Writing URL and its click opens Writing. |
| QA-09 | P2 | Failed material files drew native broken-image frames; failed screenshots collapsed into dark17px strips with illegible alt text while enlargement stayed active. | Added visible semantic portrait/screenshot unavailable states, hidden failed decorative rasters, and source-linked content retained. Enlargement disables when its actual image fails. Error identity follows the image URL, avoiding a cached-error/reset race. UI/UX supplied readable fallback styling and route-persistent paper fallback detection. | `.impeccable/qa/resilience-results.json`, `missing-assets-after.png`. Blocked assets produce zero visible broken images, readable content, an unavailable screenshot state and a disabled enlargement button; the source link stays available. |
| QA-10 | P2 | The evidence diagram's accessible label was attached to an unnamed generic div and was not consistently supported. | Added the appropriate `group` role to the already-labelled sequence. | Focused axe `aria-prohibited-attr` evidence showed the unsupported generic-div label before the fix. Final WCAG scans include the corrected group. |
| QA-11 | P2 | First-visit home material/font requests transferred4,507,471encoded bytes, an avoidable slow-connection burden. | Root produced whole-font WOFF2 deliveries and a WebP reverse-paper asset; UI/UX rewired the CSS. Native originals remain, and all three font glyph/cmap sets compare equal. | `asset-transfer-before.json`, `asset-transfer-after.json`, `asset-transfer-summary.json`, `font-delivery-checks.json`:1,249,134bytes after,72.3% less for this measured subset. This excludes JS/CSS/document and is not a WAN timing claim. |
| QA-12 | P3 | Missing favicon caused an automatic `/favicon.ico`404 and an unbranded tab. | Root added validated16/32px ICO, native SVG and explicit favicon declarations using the actual display-face initial. | Final normal-network scan verifies the former404 is gone; favicon validation recorded by root. |

Additional defensive accessibility change: the decorative animation overlay is explicitly hidden from assistive technology so a shared-image clone cannot duplicate meaningful image announcements during a transition. This is not counted as another reproduced runtime defect.

## Test coverage

- **Engine:** installed Google Chrome156.0.8078.81, driven through Chrome DevTools Protocol. Viewport and touch emulation are not physical-device evidence.
- **Routes:** About/home, Experience default/intern/GroGoliath, Projects, Writing, Contact and all ten planned/prior project details; aliases, unknown routes, invalid/prototype-like query and path values, direct section hashes, browser Back/Forward and returning-session restoration.
- **Responsive states:**320,375,390,540,541,768,866,960,961,1024,1440,1536CSS pixels. Real content includes long project/role labels and the full seven-project catalogue. The768CSS-pixel state also represents the layout viewport of a1536px display at200% browser layout zoom; this is not a physical browser-zoom/device test.
- **Accessibility:** axe-core4.10.3 WCAG A/AA rule tags on desktop and phone routes; native accessible dialog name, keyboard/Enter/Escape behaviour, focus restoration, section target focus, visible menu operation, heading count and reduced-motion path.
- **Interaction:** synthesized native touch for the menu, mouse wheel for modal background lock, normal pointer navigation, native modal Tab/Escape, clipboard success/rejection at the API boundary, internal links and catalogue continuation.
- **Resilience:** sessionStorage getter throws, materials/portrait/fonts/screenshots deliberately blocked, materials/fonts deliberately delayed2200ms per asset, rapid chapter changes during motion, unknown content routes.
- **Content integrity:** no invented results, publication links, employer screens or metrics; known unfinished work remains labelled. External mailto is inspected, not sent.
- **Commands:** `node scripts/qa-comprehensive.mjs`, `node scripts/qa-resilience.mjs`, scoped ESLint on active source. Root performs the final production-build smoke separately.

## External link checks

GitHub profile and all six linked source repositories returned HTTP200. LinkedIn rejected automated HEAD with405 and GET with999, but root subsequently navigated the actual in-app browser successfully to LinkedIn’s sign-in wall, with its session redirect pointing to `/in/konduri-anirudh`. No404 or navigation error appeared. The destination is reachable; private/logged-in profile identity/content remains unverified behind authentication. No login, account creation, messages or emails were attempted, and no external content was mutated.

## Verification limits and retained debt

- Automated axe scans are not complete WCAG certification. Paper/image-background text contrast includes manual-review/incomplete results; UI/UX review covers visual evidence separately. Physical iPhone/Android, the Safari application, screen-reader software and a real mobile network remain unavailable. Supplemental browser-engine and native Firefox text-zoom checks are handled by the separate UI/UX validation report; WebKit-engine results are not a claim of testing physical Safari.
- Clipboard success/rejection tests stub the browser API boundary to avoid changing the user's OS clipboard. Native mail-client opening and sending are not exercised.
- Delayed-resource tests prove usable rendering and cleanup under the stated artificial delay, not a production performance score.
- Follow-up authorization covered the69 legacy lint errors. All are now fixed with genuine prop contracts, unused-binding/import removal and equivalent JSX apostrophe escapes. Original components, styling, content and handlers remain. Full `npm run lint` now reports0errors/0warnings, including Node automation scripts under appropriate globals. Baseline: `.impeccable/qa/source-lint.json`; final: `full-lint-after.json`.
- Impeccable's formal CLI receipt gate remains openly separate from this QA result. No receipt was forged or forced, and this report does not approve public release.

## Final verification result

- **PASS:**204/204 normal route/viewport renders: one visible page heading, no horizontal overflow, no missing normal-state imagery and no runtime exceptions.
- **PASS:**36/36 behavioural checks covering the listed navigation, native input, history, resilience and recovery paths. The formerly failing active-menu, anchor-history and favicon checks now pass.
- **PASS:**34/34 axe-core WCAG A/AA scans have no confirmed violations. Remaining automated incomplete results are colour-contrast manual review over image-backed paper, not an automatic compliance claim.
- **PASS:** deliberate delayed-resource and missing-resource tests preserve readable content, clear all motion layers, show media fallbacks and disable failed enlargement while retaining project/source access.
- **PASS:** active-surface ESLint. Root also confirms the final production build and built-server smoke at4183 pass: seven representative routes including malformed-constructor recovery, zero console exceptions and zero overflow. This is a separate built-artifact check, not a claim that all204 combinations ran against production.
- **RESOLVED follow-up:**all69 inactive-source lint errors, plus the full tooling lint configuration. No component source was deleted and no validation rule was disabled to obtain a pass.
- **LIMITED:** real-device/Safari-application/screen-reader validation; LinkedIn’s logged-in profile remains behind its reachable sign-in wall. Supplemental engine/zoom results are recorded separately.

Evidence: `.impeccable/qa/comprehensive-results.json`, `resilience-results.json`, `baseline-findings.json`, `external-links.json`, `linkedin-validation.json`, `source-lint.json`, and the measured performance artifacts. Earlier baseline failures remain historical evidence, not final failures.

One test-harness false positive was isolated and corrected: CDP Enter originally omitted its native carriage-return text, so it generated no keyboard activation. The native disclosure itself was not broken; adding the correct trusted Enter sequence proved normal keyboard operation. No product keyboard workaround was added.


## Explicitly authorized maintenance follow-up

The user subsequently requested the remaining issues be handled as well. This extends the original active-website audit to preserved legacy source and dependency maintenance.

| Item | Before | Resolution | Proof |
| --- | --- | --- | --- |
| M01 — legacy/full lint |69errors in ten preserved legacy files; the initial config treated only browser files and did not deliberately scope Node/CDP tooling. | Added proper PropTypes contracts, declared the already-used prop-types dependency, removed unused bindings/imports, and escaped apostrophes without changing rendered text. ESLint retains recommended rules and validates all authored source/tooling with appropriate browser/Node globals; generated review/vendor/build artifacts are excluded. | Full npm runlint0errors/0warnings; legacy client-render sanity check6sections/6cards/5fields,0runtime/PropTypes errors, representative text unchanged. |
| M02 — known dependency advisories |19package records:1low,4moderate,14high. | Compatible lockfile updates and tested same-major minimums resolve all findings; no force or major framework upgrade. | Full and production-only npm audits0; productionbuild passes; complete package/advisory/exposure table in DEPENDENCY_AUDIT.md. |
| XR01 — text-only zoom motion consistency | Supplemental Firefox200% text-only testing exposed a layout/desktop-motion mismatch. | UI/UX uses scalable em media breakpoints; QA aligned desktop animation guards to the identical60.0625em query. Normal16px breakpoints retain their existing thresholds. | Final native Firefox text-only and cross-engine proof belongs to UI_UX_REPORT.md; no blanket physical-device claim. |
| XR02 — WebKit modal return focus | Native WebKit pointer clicks did not necessarily focus the enlargement trigger before opening, so Escape could close without returning there. | Retained native dialog/Escape behaviour, added an explicit trigger ref and onClose focus restoration with preventScroll. | Final WebKit pointer/Escape proof belongs to UI_UX_REPORT.md. |

The patched dev preview was restarted on4182 after verifying its process belonged to this workspace. Post-dependency Chromium regression again passed204route/viewport states,36checks and34axe scans. Root/UI own the final built-artifact engine and zoom verification.
