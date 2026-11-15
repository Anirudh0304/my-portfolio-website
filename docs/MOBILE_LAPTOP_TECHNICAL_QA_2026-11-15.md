# Mobile and laptop technical QA — 2026-11-15

Method: isolated Assessment B (`/root/technical_qa`), read-only application review. Assessment A was not read. Impeccable `audit.md` and `critique.md` were read in full. Parent owns design synthesis, implementation and final verification.

## Implementation integrity verdict

Technical foundation passes: source detector returns zero findings, all 22 route/state cases render at all 11 requested sizes, and core contact/project/navigation behavior works. This is not a visual-design verdict or release certification. Four confirmed P2 issues remain in the baseline, plus one P3 development warning; synthetic enlarged-text checks expose a separate unresolved accessibility risk.

## Audit health

| Dimension | Score | Evidence |
|---|---:|---|
| Accessibility | 3/4 | Keyboard/dialog recovery and contact live feedback work. Unnamed duplicate complementary landmarks remain. Enlarged-text risk needs native verification. |
| Performance | 3/4 | Self-hosted fonts/materials; screenshot lazy loading; no observed JS failure or broken visible asset. No throttled-device performance certification. |
| Theming | 3/4 | Shared ink/material tokens with intentional raster material colors; no user-facing theme switch to test. Some literal fallback colors remain. |
| Responsive design | 2/4 | No baseline document overflow, but small desktop text/footer collision and undersized mobile controls remain. |
| Implementation integrity | 3/4 | Source detector clean; real project assets, real PDF and explicit unavailable-media recovery. |
| **Total** | **14/20 — Good** | Fix responsive weak points before considering release. |

Confirmed issue counts: **P0 0 · P1 0 · P2 4 · P3 1**. Enlarged-text simulation is documented separately and is not counted as a confirmed native WCAG failure.

## Coverage and evidence

- Chrome **157.0.8103.78**, Playwright 1.65 from the existing `.impeccable/qa/browser-tools/node_modules/playwright/index.mjs`. Independent browser/context/pages; no package installation.
- **242 route × viewport samples**: 22 cases × widths/heights 320×800, 375×812, 390×844, 430×932, 768×1024, 960×900, 961×900, 1024×768, 1280×720, 1366×768, 1440×900.
- Cases: home; Experience default/intern/gro/invalid query; Projects; feedback/funnel/ai; all seven earlier projects; Contact; Writing/About/Start redirects; unknown top-level/project routes. Current BrowserRouter paths were tested directly. Writing redirects to Projects as intended.
- **0 document horizontal overflow**, **0 uncaught page errors**, **0 HTTP ≥400 responses**, **0 broken visible images** in the 242 baseline samples.
- **66 axe-core 4.10.3 scans** at 390, 961 and 1280: 26 clean, 40 scans report only `landmark-unique`; one node (`.index`) per violating scan. No axe WCAG A/AA failure was found. This does not establish complete WCAG conformance.
- **45 original behavior/geometry assertions**: 44 passed; one synchronous menu-close measurement ran before the React effect. A bounded 180ms follow-up passes, so this is a test race, not an application defect. A second follow-up adds a passing synthesized-touch swipe. Effective distinct assertions: **46/46 pass after the corrected timing check**.
- **18 additional reflow/stress samples**: 6 routes at320 and640 effective CSS width, plus6 at1280 with computed font sizes doubled in the test DOM. The latter is synthetic text-resize stress, not native browser zoom.
- Browser evidence uses emulated viewports, `hasTouch`/`isMobile`, Playwright tap, and CDP `Input.dispatchTouchEvent` swipe. **No physical-device certification**. Firefox and WebKit launch attempts both failed `browserType.launch: spawn UNKNOWN`; their existing binary paths and errors are recorded in baseline JSON. Native browser text zoom remains untested.

Raw files:

- `.impeccable/qa/mobile-qa-2026-baseline.json` and `mobile-qa-2026-baseline.log`
- `.impeccable/qa/mobile-qa-2026-interactions.json` and `mobile-qa-2026-followup.json`
- `.impeccable/qa/mobile-qa-2026-reflow.json`
- `.impeccable/qa/mobile-qa-2026-detector.json`
- Screenshot evidence uses `mobile-qa-2026-` prefixes in the same directory.

Baseline fingerprints (before parent edits):

```
src/atlas/Atlas.jsx 953fee0fc9b69b946e8efcb008e796a0eab39080dae65fba096444e5e860f346
src/atlas/atlas.css c465e72f0ddd67e023c82dbe55306a67995342e05a077078d16710967fbf0fac
```

Parent was explicitly told when the 242-sample baseline completed and source edits could begin. Later reflow/follow-up runs overlapped implementation; their source fingerprints differ and their results must not be represented as immutable baseline evidence or final acceptance of the finished change.

## Confirmed findings

### [P2] Small laptop breakpoint prints supporting text below12px

Location: `src/atlas/atlas.css` `.signature span`, `.home-current`, `.previous-role`, desktop `cqw` overrides; `src/atlas/Atlas.jsx` Home/Index supporting text. At961×900, “Based in” computes **9.54px** and previous-label/intern/education dates **10.97px**. At1024×768 these compute **10.20px/11.72px**; Based in remains10.77px at1280×720 and11.53px at1366×768. These are measured legibility weaknesses, not an automatic WCAG minimum-font violation. Clamp informational text and validate vertical fit together. Suggested command: `$impeccable typeset`.

Evidence: `mobile-qa-2026-chromium-961-home.png`, baseline `tinyText` records.

### [P2] Homepage education date crosses footer rule at961px

Location: Home `.home-current .previous-role` and homepage footer positioning in `src/atlas/Atlas.jsx`/`atlas.css`. At961×900, “May2026” starts at y675.14 with14.25px height while the footer rule is approximately y681; screenshot shows the rule running through the date. This is a real unscaled layout collision despite no document overflow. Allow more content-driven vertical space at the small desktop breakpoint. Suggested command: `$impeccable adapt`.

Evidence: `mobile-qa-2026-chromium-961-home.png`.

### [P2] Several mobile targets miss the44px craft target

Location: Header brand; Home `.secondary-action`/start-with links; Projects `.coming-next a`; Contact `.contact-links a`. At390px, brand is33px high, Resume secondary action **119.7×18px**, start-with links28px high, upcoming-study links29px, and contact external links31px. These remain small for thumb use. Enlarge the clickable box with padding/min-height without increasing type size.

WCAG precision: **44×44 is the skill's quality target**. The only tested mobile target under24px is the secondary Resume link; its centered24px test circle does not collide with another target in the checked homepage geometry. Thus the observed18px height is **not itself a proven SC2.5.8 AA violation**. Suggested command: `$impeccable adapt`.

Evidence: baseline `targets`, interactions `Target dimensions` records.

### [P2] Desktop complementary landmarks are indistinguishable

Location: `src/atlas/Atlas.jsx`, Index `<aside className="index">` and page-specific `<aside className="right-fold…">`. Axe rule **`landmark-unique`**, moderate, returns `.index` once in40 desktop scans. Name the chapter index and each contextual aside with meaningful `aria-label` or `aria-labelledby` values. This is an axe best-practice issue, not a claimed WCAG A/AA violation. Suggested command: `$impeccable harden`.

Evidence: baseline `axe[].nodes` includes exact HTML `<aside class="index">`.

### [P3] React18 development console warns about fetchPriority

Location: `src/atlas/Atlas.jsx` Material image `fetchPriority="high"` (baseline approximately line133). A fresh development page logs React's “does not recognize the fetchPriority prop” warning. No uncaught exception occurs. Use the attribute spelling supported by the installed React version or remove the redundant attribute if the preload provides the intended priority. Suggested command: `$impeccable polish`.

Evidence: follow-up overlay console log. This warning is separate from `pageerror` counts.

## Enlarged-text risk, pending native confirmation

At1280×720, doubling every element's already-computed font size in the isolated test DOM causes home name/portrait occlusion and bio/action/footer collisions. Experience grows to **1325px** document width on a1280px viewport. See `mobile-qa-2026-text200-home.png`, `mobile-qa-2026-text200-_experience.png` and reflow JSON. Root font remains16px and CSS zoom1 because the harness doubles each computed element font explicitly.

This is a useful layout stress result, but differs from native browser zoom/text-only zoom. Do not label it a certified SC1.4.4 failure. Validate native200% zoom/text preferences when Firefox or an equivalent browser session can launch. SC1.4.10-style effective-width320/640 checks passed horizontal overflow across all6 tested routes. The simplistic `asideFooterOverlap` field is **not a mobile overlap failure**: mobile DOM order can place the homepage footer before a later aside without intersecting their boxes.

## Behavior that passed

- Explore opens with a synthesized tap, pushes content down, closes after chapter navigation, and Escape restores summary focus. The route-close effect is asynchronous and needs a bounded wait in tests.
- Role query selection, invalid-role fallback to APM, refresh persistence and browser Back restore the correct role content.
- All6 available screenshot dialogs open, fit390px viewport, capture focus, close via Escape and visible Close, and return focus to their trigger. Missing screenshot disables the enlargement trigger and gives “Screenshot unavailable.” XAI appropriately has no image dialog.
- Project contents anchors update the real URL hash and focus their section; Back removes the hash. Catalogue Back restores exact scroll position **1445→1445**.
- Real clipboard write/read returns the email and an announced success status. Forced permission denial and absent Clipboard API both expose a manual-copy/Open email recovery message.
- Resume responds200 `application/pdf`, **90,966bytes**, begins `%PDF-`.
- Keyboard skip link reaches an h1. Touch swipe scrolls Projects from0 to1224px. No custom drag/sliders exist to test for pointer cancellation.

## Detector and browser-overlay provenance

CLI command ran **once**, target `src/atlas/Atlas.jsx`: `impeccable detect --json src/atlas/Atlas.jsx`. Result exactly **`[]`**, zero findings, rules **[]**, file locations **[]**. Parent must reuse this output rather than rerunning it during synthesis.

Slug helper: **`src-atlas-atlas-jsx`**. No `.impeccable/critique/ignore.md` was present. Context was already run by parent and was not rerun here.

Browser-only mutation preflight succeeded by changing document title and appending a script node in a new isolated page. `detect.js` from a local Impeccable live server was injected on4 representative views (Home, Experience, Projects, Contact); console reported **“2 anti-patterns found”** per initial view. Captured overlay labels include `overused-font` (Inter), `cream-palette` (rgb236,233,226), and visual `straggler`/`kicker-above-heading` annotations. These are aesthetic heuristics requiring Assessment A/product context; they are not technical defects. The prescribed material/type system takes precedence over categorical aesthetic warnings.

A later immediate-injection follow-up logged7 findings including `text-occlusion` selectors before stable fonts/layout; the settled screenshot does not show those occlusions. This is a transient overlay false positive and is not a confirmed finding. Do not merge that count into the baseline source-detector total.

The pages were headless. **No reliable user-visible [Human] browser tab was presented**, despite the isolated page title label; the evidence is archived screenshots and console logs. Both live-server runs were stopped using `live-server stop --keep-inject`; no application HTML injection, package change, application edit, push or deploy was performed by Assessment B. Test scripts and evidence are intentionally retained; no report temp file remains.

## Recommended order

1. `$impeccable adapt`: fix961px footer collision and touched target boxes.
2. `$impeccable typeset`: enforce legible minimums while keeping small-laptop columns content-driven.
3. `$impeccable harden`: label duplicate complementary landmarks; verify native text enlargement.
4. `$impeccable audit`: rerun affected route/size checks after implementation has stabilized.
5. `$impeccable polish`: close the development warning and inspect the final rendered result.

Questions and final critique persistence are owned by the parent synthesis; Assessment B does not independently ask the user or change approved design decisions.

## Focused final-draft regression check

The user rejected the mobile design. The first adaptation remains an **unapproved draft**; this follow-up certifies neither its design nor any replacement concept. No application edits were made by Assessment B. This section is separate from the earlier baseline and covers shared laptop corrections plus basic route integrity in the pending draft.

Evidence: `.impeccable/qa/mobile-qa-2026-final-draft.json`, matching `.log`, and `mobile-qa-2026-final-draft-home-{width}.png`.

| Home viewport | Document height | Right-fold bottom | Home-folio top | Clearance | Text below12px |
|---|---:|---:|---:|---:|---|
|961×900|900|630.17|681.47|51.30px|“Before”10.968px|
|1024×768|768|549.59|631.59|82.00px|“Before”11.724px|
|1280×720|720|595.03|621.34|26.31px|None|
|1366×768|768|609.05|663.58|54.53px|None|
|1440×900|900|712.58|779.70|67.13px|None|

All5 homes fit one viewport vertically, have no document horizontal overflow and have positive right-fold/footer clearance. The baseline date/rule collision is fixed. The remaining legibility observation is `.previous-label` “Before” below12px at961/1024; no other text node under12px was measured in those homepage states.

**30 axe scans** (15 representative route/content states ×961/1280) now return **zero violations**. The named asides resolve the earlier `landmark-unique` issue. **22 mobile390px route/state samples** render a heading, have no document horizontal overflow or broken visible images. Three focused behaviors pass: Explore chapter navigation closes after its effect; TrendSage screenshot opens and Escape restores trigger focus; clipboard denial presents manual recovery. No uncaught page errors were observed.

This focused pass does not repeat the original 242-case matrix, certify mobile design, resolve the earlier synthetic text200/native-zoom limitation, or supersede the user's rejection. Lint/build were run by the parent, not independently rerun here.

### Final two-fix confirmation

After the parent increased `.home-current .previous-role > p.previous-label` specificity and changed Material's attribute to lowercase `fetchpriority`, only the requested961/1024 checks were repeated. “Before” now computes **12px at both961×900 and1024×768**. Right-fold/footer clearance remains positive at **49.95px** and **81.64px**, respectively; no collision. The fresh development page logs **zero console warnings/errors**, including **zero fetchPriority warnings**. These two baseline observations are resolved in the current draft. Evidence: `.impeccable/qa/mobile-qa-2026-final-font-floor.json`. The mobile adaptation remains unapproved; no broader checks or design certification were performed in this confirmation.
