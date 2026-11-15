# Dossier final technical QA — 2026-11-15

Scope: current Concept B dossier implementation at `http://127.0.0.1:4182`, independently tested read-only. This report verifies behavior and measurable layout/accessibility properties; it does not certify visual fidelity or physical hardware. The parent handles fresh visual review and final build checks. No application edits or detector rerun were performed by this assessment.

## Result

The full normal-size matrix and core behavior checks pass. One P1 navigation issue was discovered under actual400% native browser zoom, corrected by the parent, and verified in the focused follow-up below. Native zoom documents do not overflow horizontally and the final focused tab labels no longer collide or clip.

**Final open findings: P0 0 · P1 0 · P2 0 · P3 0.** Historical failure evidence is retained below to explain the fix. Final verification totals:286 matrix samples,21 clean axe scans,25 original behavior checks and3 focused native400% tab-focus checks; all pass within their stated scope.

## Coverage

Chrome157.0.8103.78 driven by the existing local Playwright1.65 package, reduced motion enabled. Separate new browser pages/contexts were used. Touch behaviors use emulated touch capability and synthesized taps; no physical-device claim.

- **286 route/size samples**: all22 routes/states at320×800,375×812,390×844,430×932,768×1024,960×900,961×900,1024×768,1280×720,1366×768,1440×900,844×390 landscape and667×375 landscape.
- Routes/states: home; Experience default/intern/gro/invalid; Projects; all3 in-development projects; all7 earlier projects; Contact; Writing/About/Start redirects; missing top-level/project pages.
- **0 document horizontal overflows**, **0 intersecting interactive target boxes**, **0 broken visible images**, **0 uncaught page errors**, **0 development console errors** in this full matrix.
- **21 axe-core4.10.3 scans**, covering7 representative routes (home,Experience,Projects,Contact,TrendSage,Feedback,missing page) at390/961/1280: **zero violations**.
- **25 focused behavior assertions**, all pass before native zoom stress. Details below.
- **12 actual native-zoom route samples**:6 representative routes at200% and400%, with separately verified Chrome settings/DPR/layout dimensions. These are not CSS zoom or synthetic font doubling.

The normal matrix source hashes and all raw results are stored in `.impeccable/qa/mobile-qa-2026-dossier-final.json`; the corresponding `.log` lists per-width completion and25 checks. The later cover-only fix has its own final source fingerprints in `.impeccable/qa/mobile-qa-2026-dossier-cover-final.json`. The full286 matrix was not unnecessarily repeated for the decorative position/asset-size fix.

## Laptop regression

All5 desktop homepages have document height exactly equal to the viewport, no horizontal overflow, and positive clearance between the right-fold content and home-folio.

| Viewport | Document height | Right-fold/footer clearance |
|---|---:|---:|
|961×900|900|67.98px|
|1024×768|768|97.64px|
|1280×720|720|41.36px|
|1366×768|768|68.58px|
|1440×900|900|76.25px|

Regression screenshots: `mobile-qa-2026-dossier-{width}-{height}-home.png` in `.impeccable/qa/`. Phone screenshots are archived for320/375/390 home,Experience,Projects,Contact andTrendSage detail.

## Navigation and behavior

- All3 mobile tabs have **44px width** and height at least44px. Exactly the appropriate chapter receives `aria-current="page"`; Contact instead marks the header utility and current-chapter label. In-development/earlier project detail states retain Projects context.
- Sticky rail after scrolling: top22px; bottom450 at320×800/390×844; bottom368 at844×390; bottom353 at667×375. It fits each requested normal/landscape viewport. Keyboard Enter on Experience navigates and selects the correct tab.
- Product/Internship/Marketing role links update the content correctly. Invalid role query falls back to the APM state in the route matrix.
- Mobile “Making launches correct” proof anchor and both desktop proof links update the hash and focus their matching content section.
- All6 screenshot dialogs open, fit390px, receive focus, close on Escape and restore the trigger's focus.
- Real clipboard success was verified by reading the copied email; forced denial presents manual-copy/Open email recovery.
- Resume responds200 `application/pdf`,90,966bytes, beginning `%PDF-`.
- Catalogue browser Back restores scroll exactly **1177→1177px**.
- Missing screenshot disables the unusable dialog trigger. Missing paper/header assets preserve a readable heading and horizontal reflow; missing portrait shows the accessible “Portrait unavailable” fallback.

## Contrast

Ratios calculated using WCAG sRGB relative luminance from measured computed colors. All listed combinations exceed4.5:1, including the small header text. Texture backgrounds were checked against their sampled/computed base; axe reported no contrast failure.

| Text/control | Foreground/background | Ratio |
|---|---|---:|
|Selected Contact utility|#f2b689 / #081644|9.79:1|
|Normal header utility|#f1f2f5 / #081644|15.52:1|
|White primary action|#ffffff / #9a2d09|7.63:1|
|Selected chapter tab|#9a2d09 / #e8e8e9|6.23:1|
|Normal chapter tab|#07174f / #b3cfe6|10.43:1|

## Real browser zoom and effective320px reflow

An initial attempt to preseed the isolated profile's default zoom was ignored (DPR1); it is not counted. The successful test opened **Chrome Settings → Appearance → Page zoom** in an isolated persistent profile and selected200%/400% through the actual `select#zoomLevel` control. `viewport:null` and `--window-size=1298,900` preserved native layout behavior.

- At200%: **DPR2**, `innerWidth640`, `innerHeight402`, root font16px, CSS zoom1.
- At400%: **DPR4**, `innerWidth320`, `innerHeight201`, root font16px, CSS zoom1.
- Home,Experience,Projects,Contact,TrendSage andFeedback all retain a heading and have `scrollWidth<=innerWidth` at both zooms.
- Native Chrome screenshot evidence uses CDP `Page.captureScreenshot` without a CSS clip. Playwright's full-page native-zoom screenshots are clipped to CSS dimensions in this environment and must not be used to infer missing content. The CDP focus screenshots show the actual native rendering.

Native evidence: `mobile-qa-2026-native-zoom.json/.log` and `mobile-qa-2026-dossier-zoom-focus.json/.log`. This replaces the earlier draft's unavailable-native-zoom limitation for **Chrome full-page zoom**, while text-only enlargement and other engines remain outside this final run.

### [P1 — resolved] Vertical tab labels collided at400% native zoom

Location: `src/atlas/dossier.css`, `.dossier-tabs a` and `a:nth-child(2/3)` viewport-height-driven minimum sizes. At320×201 CSS pixels, About's target height78px, Experience96px, andProjects88px shrink below their vertical labels' intrinsic dimensions. Experience's label is124.95px andProjects94.43px.

After page scroll with rail top22px, About's text bounds are y26.28–95.72 while Experience paints y85.53–210.47: **10.19px text overlap**. Experience andProjects text overlap **17.69px**. Focusing Experience scrolls its target into the rail, but does not fit its overflowing text; the label remains clipped/colliding. CDP screenshot `mobile-qa-2026-native4-focus-Experience.png` visibly confirms it.

Impact: users relying on high browser zoom cannot reliably read the main chapter navigation. Category: Responsive/Accessibility, relevant to SC1.4.4/1.4.10 usability under enlargement. Recommendation: give the vertical labels enough intrinsic/max-content height and retain the existing independently scrollable rail; do not shrink the text box below its content. Suggested command: `$impeccable adapt`.

The400% native keyboard checks are precisely what exposed this issue; a320px portrait viewport with800px height does not reproduce it. Document overflow and target-box intersection checks alone therefore cannot certify enlarged-text navigation.

## Scoped final cover/asset check

After the parent's decorative correction, the dossier-top raster's width matches the body exactly: **346px at390** and **606px at768**. It does not cover the44px tab rail. The current-chapter label has z-index3 above the raster's2 and is visible in the final390/768 screenshots.

`public/materials/dossier-top.webp` loads at **1100×195**, **27,620bytes**, RGBA with alpha range0–255. Missing-header interception hides the image; the heading/current-chapter label remain visible and there is no horizontal overflow. The PNG source was not modified by this assessment.

Evidence: `mobile-qa-2026-dossier-cover-final.json`, `mobile-qa-2026-dossier-cover-final-390.png`, `mobile-qa-2026-dossier-cover-final-768.png`.

Cover-check CSS SHA256:

```
src/atlas/dossier.css 3858553a99dd0794facf5ead10ddda56f9aa192a79ceb69c9581b3c208195549
```

No new source-detector scan was run: the parent retains the earlier exact`[]` result. This final QA does not claim Firefox/WebKit, physical devices, performance-throttling certification, or approval of the CSS appearance.

## Final zoom-fix confirmation and lint

The parent changed the3 tab minimum heights to126/158/144px and prevented flex shrinking, preserving the rail's native internal scroll. Only the affected actual400% native Chrome zoom/focus checks were repeated, with DPR4, effective320×201 CSS viewport, and rail bounds y22–179.

| Focused tab | Target height | Focused label top/bottom | Rail scrollTop | Result |
|---|---:|---|---:|---|
|About|126px|50.28–119.72|0|Fully visible, no label overlap|
|Experience|158px|38.53–163.47|126|Fully visible, no label overlap|
|Projects|144px|59.78–154.21|271|Fully visible, no label overlap|

**All3 focused checks pass.** Every focused text label fits inside the visible scroll rail; neighboring label bounds do not intersect. This resolves the observed native-zoom P1. CDP screenshots named `mobile-qa-2026-native4-focus-after-{About,Experience,Projects}.png` preserve the corrected rendering; original failure screenshots remain separate. Raw final states/checks: `mobile-qa-2026-dossier-zoom-focus-after.json/.log`.

Final dossier CSS SHA256:

```
src/atlas/dossier.css 8703ebf6e00af137a0c1f9af9bb7962b1a71cf46e3e44b7ae2befcc4fd9d24d4
```

The QA script now references the injected runtime as `window.axe`, avoiding an undefined global without suppressing lint rules. **`npm run lint` passes** after the final QA-script changes. No broad matrix rerun was needed after the isolated minimum-height correction. Application changes were made only by the parent; this assessor wrote scripts, evidence and this report.
