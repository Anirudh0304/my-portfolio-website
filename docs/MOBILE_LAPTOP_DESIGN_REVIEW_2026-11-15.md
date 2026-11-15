# Independent mobile and laptop design review — 2026-11-15

Method: isolated Assessment A, `/root/design_review`; design judgment made without detector or Assessment B output. This file is the independent design input to the parent’s combined assessment, not a completed dual-assessment critique or release approval.

Target: `C:/Users/aniru/Downloads/Myself/previous-portfolio-source/src/atlas/Atlas.jsx` and `atlas.css`, rendered at `http://127.0.0.1:4182` before the current mobile work. Mode: Experience. Evidence captured in a fresh Chromium context for each viewport, using installed Chrome, at 100% CSS scale and reduced motion. No application files were edited by this reviewer. Baseline images are authoritative for this review because implementation continued after capture.

Read: root `PORTFOLIO_CONTEXT.md`, `memory/projects/portfolio-atlas.md`, project `PRODUCT.md`, `DESIGN.md`, `docs/surface-brief.md`, original `docs/reference/folded-atlas.png`, and the complete Impeccable `reference/critique.md`. Latest portfolio context supersedes stale HashRouter/Writing/content statements in the design documents. No critique ignore file existed at review time.

## Verdict

**Mobile needs a new composition, with the folded-paper world retained. Laptop needs targeted refinement.** The desktop is an unmistakable physical spread: unequal folds, irregular perimeter, deep navy print, real portrait and warm desk all reinforce each other. The phone version keeps the blue stock but discards the object’s spatial cues. It reads as a conventional long article with a paper background. Texture alone does not carry the approved folded-paper identity.

There are **5 priority findings: 0 P0, 2 P1, 3 P2, 0 P3**. No task-blocking visual failure was observed in the inspected states. This says nothing about untested assistive technologies, real phones, or performance.

## Coverage and evidence

Inspected Home, Experience, Projects, Contact and TrendSage Lite detail at **390×844, 375×667, 1280×720 and 1440×900**. All 20 states have an initial-viewport image and full-page image, 40 PNGs total, plus `manifest.json`.

Evidence root: `.impeccable/review/mobile-2026-11-15/baseline-A/`.

- Naming: `<width>x<height>-<home|experience|projects|contact|trendsage>-<top|full>.png`.
- Capture harness: `.impeccable/review/mobile-2026-11-15/capture-A.mjs`.
- Manifest: `.impeccable/review/mobile-2026-11-15/baseline-A/manifest.json`.
- Mobile full-page heights at 390px: Home 1356px; Experience 2123px; Projects 3011px; Contact 1114px; detail 1919px. Height itself is not a defect; ordering and repetitive low-value blocks are the problems.
- Laptop Home fits the viewport in both requested sizes. Scrolling on content-heavy laptop pages is expected and not counted as a failure.

## Design specificity

**Laptop: specific and coherent.** The fold is structural rather than an ornamental card background. The genuine framed portrait and project screenshots give the surface credibility. The existing desktop shape is worth protecting.

**Mobile: insufficiently specific.** Both edges become straight, the three-panel relation disappears, and horizontal texture creases occur behind ordinary stacked text without defining panels or reading order. Remove the texture and nearly the same page would serve any personal biography. The new phone design needs an intelligible paper object or an equally deliberate translation of its folds, not extra decorative crease lines pasted onto the same article stack.

## Heuristic scores

The mobile score is the primary score for this redesign. Laptop is scored separately to avoid allowing its stronger composition to conceal the phone’s weaknesses. Scores are design-review judgments, not automated accessibility certification.

| # | Heuristic | Mobile | Laptop | Evidence / rationale |
|---|---|---:|---:|---|
| 1 | Visibility of system status | 3 | 3 | Clear chapter headings, active desktop navigation and explicit development labels. Collapsed mobile Explore does not expose the active chapter. |
| 2 | Match with real world | 3 | 3 | Straightforward role/project language. The mobile material metaphor is weak; the detail contents order is unnatural. |
| 3 | User control and freedom | 3 | 3 | Visible All projects/back/next and native menu/dialog exits in source; no observed trapped view. Full keyboard and screen-reader validation belongs to technical assessment. |
| 4 | Consistency and standards | 3 | 4 | Consistent navy/orange type, ruled links and paper system. Mobile source/contents order inherits desktop placement rather than phone use. |
| 5 | Error prevention | 3 | 3 | Finished work and work in development are honestly distinguished; contact uses direct email/copy rather than unnecessary input. |
| 6 | Recognition rather than recall | 2 | 3 | Mobile menu hides routes, selected proof comes late, and contents appears after its sections. Laptop shows routes/context together. |
| 7 | Flexibility and efficiency | n/a | n/a | Experience surface: app accelerators and customization are not required. |
| 8 | Aesthetic and minimalist design | 2 | 3 | Mobile material becomes a background and reading order wastes attention. Laptop’s authored composition is strong, with some excess vacant space on short chapters. |
| 9 | Error recovery | 3 | 3 | Source includes readable unavailable-image and copy-failure alternatives; these states were not fault-injected in this visual review. |
| 10 | Help and documentation | n/a | n/a | Portfolio navigation should explain itself; a help system is unnecessary. |
| **Total** | | **22/32 — 68.75%, Acceptable** | **25/32 — 78.13%, Good** | **Applicable maximum 32; heuristics 7 and 10 excluded.** |

## What works

1. **Desktop material and typography form one world.** The folded perimeter, unequal panels and expressive Alan lettering are recognisable and sustained across the five inspected routes. Preserve them rather than turning the site into an app shell.
2. **Genuine evidence earns trust.** A real portrait and original application screenshots carry more authority than invented product mockups. Finished and developing work remain distinct.
3. **Actions are readable and restrained.** Burnt-orange underlined actions, labelled back links, plain email controls and native disclosure communicate interaction without covering the paper in button furniture.

## Priority findings

### A1 — P1: Mobile loses the folded object

**Where:** every phone route. Strongest comparisons: `390x844-home-top.png`, `390x844-projects-full.png`, `375x667-experience-top.png`, versus `1280x720-home-top.png` and `1440x900-projects-full.png`.

**What:** the phone renders a straight-edged full-width column of paper texture. Horizontal creases are merely part of the repeating background; they do not define recognisable folded parts or a chapter-specific composition. The header and almost every subsequent section follow the same full-width stacked article rhythm.

**Why it matters:** the material composition is the defining identity, not just a colour preference. The phone’s first impression fails to communicate the central design idea. Good legibility and no overflow do not resolve that failure.

**Recommendation:** design a new phone surface concept before adjusting spacing. Establish a visibly legible physical paper relationship in the first viewport—an identifiable fold, reveal, edge, or related composition—and use that structure to organize content. Keep semantic content, normal scrolling, native in-flow navigation, original imagery and the pale-blue/navy/orange world. Avoid shrinking the desktop canvas or introducing a generic sidebar, dashboard cards or a decorative animation that obscures reading.

**Suggested commands:** `$impeccable shape`, then `$impeccable adapt`.

### A2 — P1: The mobile introduction delays the role and strongest proof

**Where:** `390x844-home-full.png`, `375x667-home-top.png`, `375x667-home-full.png`.

**What:** a two-row header consumes about 130px; the first main content starts around 166px. The first screen introduces a name and long positioning statement, but at 375×667 does not identify the current employer or title. At 390px, Associate Product Manager appears around y824. The “Start with” proof links begin around y1185, after the Now and Before chronology. The employer’s large heading later competes in scale with the personal name.

**Why it matters:** a recruiter’s quick phone skim must establish who this person is, what role he currently holds and where to inspect evidence. The chronological sidebar works beside the desktop hero; placing its entire history ahead of selected proof on mobile reverses that priority.

**Recommendation:** in the new composition, place a concise current-role cue with the personal introduction, followed by one primary action and selected proof. Move previous roles/education behind the first proof decision. Give the masthead/navigation a compact treatment while retaining a clear current-location cue. Keep factual copy honest; do not add impact claims.

**Suggested commands:** `$impeccable adapt`, `$impeccable layout`.

### A3 — P2: Projects signals an ending before the finished catalogue is complete

**Where:** `390x844-projects-full.png`, `375x667-projects-full.png`, `1440x900-projects-full.png`.

**What:** two finished projects lead, then three future-study links, then the Experience / “Selected work above. More projects below.” / Let’s talk folio. Only after that does More projects introduce the remaining five completed builds. On mobile, this second catalogue begins around y1630. The final Contact folio repeats the earlier apparent ending.

**Why it matters:** the sequence asks visitors to switch from evidence to promises to an exit and then back to evidence. The explanatory footer sentence acknowledges the discontinuity but does not make it an intuitive reading order. Five valid finished artifacts are easier to miss.

**Recommendation:** keep the seven completed projects in one uninterrupted reading sequence on phone, with featured work followed by compact archive rows. Put Coming next after completed evidence and put the journey-ending Contact action at the actual end. Preserve the desktop’s distinct supporting fold where appropriate; do not require the mobile DOM order to mimic the desktop sidebar.

**Suggested commands:** `$impeccable adapt`, `$impeccable layout`.

### A4 — P2: The phone archive retains a cramped desktop action column

**Where:** lower register in `390x844-projects-full.png` and `375x667-projects-full.png`.

**What:** View project remains a separate right-hand column while title/summary occupies roughly two-thirds of an already narrow sheet. Multiword titles such as SQL Data Warehouse and Uber Analysis Dashboard break into multiple lines; their descriptions form narrow rags while empty space remains below the side action. The category label creates a third text rhythm.

**Why it matters:** this is the information-heavy portion of a long page. Its small, narrow summaries slow comparative scanning and feel like a desktop table squeezed onto a phone. The same content is easy to scan in the laptop register.

**Recommendation:** use an intentionally composed full-width mobile row: project title, concise summary and optional muted discipline, with an obvious action placed in its reading order. A whole-row linked title can reduce duplicate “View project” furniture if keyboard and touch semantics remain clear. Retain printed rules and type hierarchy; no generic cards are needed.

**Suggested commands:** `$impeccable adapt`, `$impeccable typeset`.

### A5 — P2: Detail navigation arrives after the content it is meant to navigate

**Where:** `390x844-trendsage-full.png`, `375x667-trendsage-full.png`; compare `1280x720-trendsage-top.png`.

**What:** on phone, the Project contents block comes after The idea, The build and The interface. It sends readers backward through sections they have just passed. Built with and View source come after those redundant jump links. The source link is around y1600 in a 1919px page, while laptop presents source and contents alongside the artifact.

**Why it matters:** a navigation aid should help choose where to read; here it adds a tall detour and delays the evidence destination. It is an understandable consequence of stacking a right fold, but not a useful phone reading order.

**Recommendation:** place a compact optional contents/jump control before the sections if needed, and expose source/materials near the project introduction or screenshot. Omit the redundant bottom contents block on phone. Keep the screenshot enlargement and clear All projects return.

**Suggested commands:** `$impeccable adapt`, `$impeccable distill`.

## Cognitive load

**Mobile: 2/8 checklist failures, moderate.**

| Check | Result | Reason |
|---|---|---|
| Single focus | Pass | Most individual viewports have one reading region and one obvious next action. |
| Chunking | Pass | Experience has three themes; project groups are visibly labelled. |
| Grouping | Pass | Rules and spacing make adjacent sections intelligible. |
| Visual hierarchy | **Fail** | Home’s role and proof follow the full chronological sidebar; large employer heading competes with the name. |
| One thing at a time | Pass | No filters, pop-ups or competing form choices. |
| Minimal choices | Pass with note | Menu has 3 chapters plus 2 utilities (5 links), but they are meaningfully grouped; this alone is not overload. Archive has 5 comparable entries, manageable as a scan list. |
| Working memory | Pass | No required multi-step remembered input. |
| Progressive disclosure | **Fail** | Future studies interrupt finished work; detail contents appears after its sections and delays source. |

The problem is excess journey and weak prioritization, not a mass of simultaneous buttons. Do not solve it by hiding all content in accordions.

## Emotional journey

Laptop opens with an engaging, credible material peak and makes the person, role and proof visible together. Phone opens with a quieter generic-textured-page impression, then asks for sustained reading before showing the role and proof choices. Projects reaches a genuine screenshot peak, loses momentum in future promises and a premature ending, then resumes the catalogue. Contact is a coherent tactile close: the offwhite correspondence paper and direct email actions work. Improve the opening and intermediate sequencing while preserving that credible ending.

## Persona red flags

- **Jordan, first-time visitor:** the home screen says what sort of work Anirudh does but leaves the title/employer below the first viewport; collapsed Explore does not show what routes exist. On a project, the late contents block looks like new material but only links backward.
- **Casey, distracted mobile visitor:** short-phone Project opening shows the first artifact/description but its explicit View project action lands at or beyond the bottom edge. The next finished-work decisions require scrolling through Coming next and a Contact ending. Phone usability should be composed for fast interruption and return, rather than relying on visitors to finish the full page.
- **Recruiting reviewer, derived from PRODUCT.md audience:** needs to establish current product scope and inspect finished evidence quickly. Current title arrives too late on Home; project source arrives too late on detail. Existing honest labels are a strength; adding fabricated business outcomes would damage trust rather than repair the evidence hierarchy.

These are walkthrough red flags, not measured abandonment rates. No real participant testing occurred.

## Minor observations and boundaries

- The 15px right-hand strip in captures corresponds to the reserved desktop scrollbar gutter in this Windows Chrome rendering. It makes mobile appear slightly inset, but should be checked on actual mobile browser behavior before being classified as a site defect.
- Contact email wrapping before `@` remains readable and preserves the full address. Do not force it onto an overflowing single line.
- Mobile full-page text is readable; no text/screenshot collisions were visually observed in the saved baseline. The issue is composition, not the need to compress everything into one viewport.
- Pale-blue stock, dark ink, restrained orange actions, the original face and real screenshots remain the appropriate material vocabulary. Preserve the desktop’s original silhouette and approved warm desk surround.

## Questions for parent synthesis

These are design decisions for the new phone concept, not a request to repeat recorded approvals: Which first-view material cue makes a folded sheet recognizable without reducing reading width? What current-role/proof combination should occupy the first phone decision? Can finished work remain one uninterrupted sequence while the future studies still feel deliberately placed?

The parent should apply the user’s current direction and already-authorized scope to resolve these. This Assessment A subtask does not independently ask the user questions or close the combined critique workflow.
