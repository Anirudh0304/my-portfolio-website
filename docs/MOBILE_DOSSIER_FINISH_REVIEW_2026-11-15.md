# Mobile dossier finish review — 15 November 2026

## Initial disposition: fix — superseded by verdict pass below

The implementation recognizably delivers the selected B, Tabbed dossier. It replaces the rejected flat blue article with a navy desk, layered file backs, neutral reading stock, an actual raster clip/edge, the genuine portrait, and attached chapter tabs. One responsive material-clearance defect must be corrected before this review can return ship. A rebuild or another concept selection is not warranted.

This is an independent design finish review. Application code was read, not edited. The reviewer did not consume the technical reviewer's findings. Impeccable context, the approved surface brief, mobile concept record, original folded-paper reference, approved B comp, current DESIGN.md, and craft floor informed the review. Existing session authorization supplies the direction; no new user question is required.

## Evidence and coverage

Target: `src/atlas/Atlas.jsx`, `src/atlas/atlas.css`, `src/atlas/dossier.css`, rendered at `http://127.0.0.1:4182/`.

Independent Chrome captures used Playwright, the installed Chrome channel, loaded fonts, reduced motion, and document-top resets. Home, Experience, Projects, TrendSage Lite detail, and Contact were captured at every requested size: 390×844, 375×667, 320×800, 768×1024, 1280×720, and 1440×900. Viewport and full-document captures are under `.impeccable/review/mobile-2026-11-15/finish-review/`; `capture-metrics.json` and `behavior-metrics.json` record measurements. `capture.mjs` and `behavior.mjs` make this review reproducible.

The pixel review inspected the opening composition at all six sizes and full-document examples across phone, tablet, and laptop. Additional screenshots cover the open screenshot dialog and scrolled catalogue with its sticky tabs. No horizontal document overflow was measured in the 30 route/viewport samples. The laptop homepage fits without vertical scrolling at both requested laptop sizes.

## Direction, hierarchy, and craft assessment

| Requirement | Assessment |
| --- | --- |
| Recognizable selected B | Meets. Layering, clip, reading stock, navy surround, vertical tabs, and orange action create the dossier immediately. The implementation is substantially closer to B than the rejected flat article. |
| Genuine identity and evidence | Meets within inspected sources. The production portrait uses `/materials/portrait.webp`, and project screenshots remain the existing source images. Generated facial/screenshot pixels from the comp are not used as page content. |
| Name, role, portrait, CTA | Clear and readable at 390, 375, and 320. The narrow layout wraps deliberately and separates résumé from the full-width primary action at 320. At tablet width the decorative edge partially overlays the top of the identity region; see F1. |
| First proof discoverability | Meets. “Making launches correct” is in the first viewport at each requested phone size, including 320. At 390 the whole evidence link is visible. Clicking it reaches the relevant Experience section, whose top lands approximately 22px below the viewport top. |
| Attached chapter navigation | Meets. About/Experience/Projects have distinct tab shapes, readable labels, and a clear active chapter. After 1000px of catalogue scroll the rail remains at top 22px in all four phone/tablet tests and stays outside the reading column. |
| Project catalogue | Meets. Two finished screenshot-led projects lead; five further builds remain substantial ruled entries; planned studies are explicitly separated as “Coming next.” The real bottom closes with Experience and contact destinations. |
| Project detail order | Meets. All projects precedes the title, section links precede screenshot and explanation, original screenshot has an enlargement control, source follows the explanation and stack, and next-project navigation closes the page. The source's position is appropriate for this short case study. |
| Laptop authority preserved | Meets in the inspected 1280 and 1440 renders. Original blue folded landscape stock, unequal folds, printed left chapter index, central identity/evidence, right context, and folio remain intact. No mobile tab rail or neutral dossier surface leaks into the laptop composition. |
| Overall craft | Strong enough for a scoped fix. Typography has clear weight/size steps, the stock has credible material character, controls remain live, and normal scrolling works. The top material currently violates the composition's own reading clearance. |

## Findings

### F1 — P2: The responsive top-edge raster paints over live chapter identification and tablet identity

Affected code: `src/atlas/dossier.css`, `.dossier-edge` and the top clearance of `.dossier-location` / `.home-centre`.

The raster scales in height with dossier width while its absolute top offset and the live content's top position remain fixed. The edge therefore increasingly overlaps live content as the dossier gets wider:

| Viewport | Edge bounds | Current-chapter row | Result |
| --- | --- | --- | --- |
| 320×800 | y82–139 | y121–175 | The visible label clears the opaque material, though the boxes overlap. |
| 375×667 | y82–148 | y121–175 | Label clears narrowly; a stock lip remains across the right rail. |
| 390×844 | y82–151 | y121–175 | The top of ABOUT / EXPERIENCE / PROJECTS / CONTACT glyphs is visibly covered. |
| 768×1024 | y82–197 | y121–175 | The complete chapter label and horizontal rule disappear beneath the material. The name box starts at y187 and portrait at y180, so the material also paints over their top region. |

Evidence: `home-390x844.png`, `experience-390x844.png`, `contact-390x844.png`, `home-768x1024.png`, `experience-768x1024-full.png`, and `behavior-metrics.json` in the capture directory. At 768 the material's straight lower edge reads as an unintended band crossing the reading surface; at 390 it is a visible clipped-label defect.

Required fix: reserve responsive clearance from the raster's actual painted bottom before laying out the live current-chapter row and identity. Preserve the accepted clip/file-edge silhouette and readable name/portrait pairing. A local mobile CSS geometry correction is sufficient; do not hide the symptom by discarding the material or replacing B. Recapture all six sizes and score this finding resolved/partial/unresolved against the same affected routes. The corrected 390 opening must still expose the first evidence heading/link within the first viewport; the tablet material must no longer cover text or the portrait frame.

No P0 or P1 issue was found in this review. No additional material design finding is opened.

## Scope and remaining limits

This is design finish evidence from desktop Chrome emulation, not physical-device, Safari, Firefox, assistive-technology, native browser-text-zoom, or release certification. It does not replace the independent technical QA, provenance scan, mechanical detector, formal CLI build gates, or final documentation merge. Source navigation was inspected and the local primary proof/tab/dialog interactions were exercised; external links were not used to send messages or make changes. No push or deployment occurred.

The existing DESIGN.md still describes the superseded full-bleed mobile layout. The parent task already has user authorization to merge the selected mobile system while preserving laptop rules; that documented finish work follows the material correction and verdict. This report does not reopen an approval question.

Questions skipped: the direction, mobile scope, factual-content constraint, and mobile-documentation merge are already authorized in the supplied session.

## Verdict pass — disposition: ship

F1 is **resolved**. This continuation scores the sole material finding and the direct consequences of its correction; it is not a fresh unrestricted whole-surface audit.

The reviewer independently recaptured and opened all 20 affected viewport examples: Home, Experience, Projects, TrendSage Lite detail, and Contact at 320×800, 375×667, 390×844, and 768×1024. New evidence uses `fixed-<route>-<width>x<height>.png` in the same finish-review directory. `verdict.mjs` and `verdict-metrics.json` preserve the procedure and measurements.

| F1 acceptance condition | Result |
| --- | --- |
| Current-chapter label and rule remain readable | Resolved at all four sizes and five routes. The label/rule now render above the stock. ABOUT, EXPERIENCE, PROJECTS, and CONTACT are complete, including the formerly hidden tablet row. |
| No name or portrait occlusion | Resolved. At 768, the edge ends at y158.73, before the portrait's y180 and name box's y187. At 390, the edge ends at y142.55, before the same identity boxes. The genuine portrait frame and name are visibly intact. |
| No rectangular stock lip across the rail | Resolved. The raster width ends at the body boundary: x346 at 390, x665 at 768. The tabs occupy the adjacent column without the former material band across them. |
| First evidence remains visible at 390×844 | Resolved. The complete Making launches correct link remains at y561.97–729.52 inside the first viewport, including its heading, explanatory copy, and arrow. |
| The correction introduces no reading/overflow defect | No direct regression found in the recaptured affected region. All 20 samples retain document width equal to viewport width. The dossier layering and attached tabs remain recognizable. |

The reviewer scored the single material fix resolved. The original review's scope and limitations still apply. This design verdict does not certify deployment or substitute for the parent task's technical checks, raster provenance, CLI gates, or authorized documentation merge.
