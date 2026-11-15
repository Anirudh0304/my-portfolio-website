Method: dual-agent (A: /root/design_review · B: /root/technical_qa)

# Strict product QA — mobile and laptop, 15 November 2026

## Completed redesign and final verification

**B, the tabbed dossier, is implemented.** All ten baseline findings below were addressed by the mobile redesign and shared laptop corrections. The user selected B, approved merging its rules while preserving laptop rules, and explicitly instructed completion after the material checkpoint. The result uses live attached chapter links, navy ground, layered file stock and clip, genuine portrait/screenshots, earlier role/proof, a continuous finished-project catalogue and section links before project content.

Final evidence: **286 route/viewport samples, 28 interaction/focus checks, 21 clean axe scans and 12 true native Chrome zoom route checks at200%/400%**. A real400% tab-label collision was found and fixed using intrinsic tab sizes with native rail scrolling. The independent visual review found one material/label clearance issue; responsive asset geometry resolved it in20 recaptured examples. No confirmed technical findings remain within the final report's scope. Physical devices, Safari/Firefox and text-only enlargement remain unverified.

Current reports: `MOBILE_DOSSIER_FINAL_QA_2026-11-15.md` and `MOBILE_DOSSIER_FINISH_REVIEW_2026-11-15.md`. DESIGN.md and its sidecar contain the authorized mobile merge. Historical scores below apply to the original baseline, not the finished redesign. Formal CLI material receipt remains null; direct user authorization and independent review/QA are recorded separately, never represented as a passed automated gate. Native comp comparison measured70%; the real portrait, live factual copy, intrinsic navigation sizing and removal of decorative kickers differ from generated pixels. No pixel-perfect match or automated comp-gate pass is claimed.

The user has now requested a repository push. Commit/push verification is recorded in the session handoff; do not infer deployment success from Git success.

## Historical baseline and first adaptation

**Verdict: mobile needs a new design, not another spacing pass. Laptop needs focused corrections.** The original mobile implementation preserved the paper color and texture but lost the recognizable folded object. The user's correction explicitly supersedes the previous mobile visual approval: explore both a recognizable fold and a mobile-specific visual identity. Laptop keeps its approved composition.

This is a review of the captured baseline, followed by a clearly separated account of local corrections. Scores are judgments of that baseline, not ratings of the unbuilt replacement. No push or deployment occurred.

## Baseline scores

| Heuristic | Mobile /4 | Laptop /4 | Main issue |
|---|---:|---:|---|
| Visibility of status | 3 | 3 | Active mobile chapter hidden inside Explore |
| Match with real world | 3 | 3 | Contents navigation follows its sections |
| Control and freedom | 3 | 3 | Labelled Back/menu/dialog exits work |
| Consistency | 3 | 4 | Phone inherits desktop content placement |
| Error prevention | 3 | 3 | Finished and developing work distinguished |
| Recognition over recall | 2 | 3 | Role/proof/navigation buried on phone |
| Flexibility | n/a | n/a | Portfolio does not require app accelerators |
| Aesthetic and minimalist design | 2 | 3 | Flat article rhythm loses mobile identity |
| Recovery | 3 | 3 | Clear image/copy fallback paths |
| Help/documentation | n/a | n/a | Navigation should explain itself |
| **Total** | **22/32, Acceptable** | **25/32, Good** | Applicable maximum32 |

Technical baseline: **14/20** (accessibility3, performance3, theming3, responsive2, implementation integrity3). Design scores and technical scores measure different things; do not average them.

## Ten confirmed issues

Two P1, seven P2, one P3; no P0. These are ten distinct records, not the sum of every automated occurrence.

| Priority | Finding and user impact | Required change | Local state |
|---|---|---|---|
| P1 | **Phone looks like a flat textured article.** Remove the stock image and the composition is generic; the folded-paper concept is not recognizable. | Choose and build a genuinely different phone composition or mobile-specific identity. | **OPEN: three visual concepts awaiting choice.** |
| P1 | **Role and proof arrive too late.** At375×667 the first screen does not identify the current employer/title; selected proof begins around1185px at390. | Put the current role with the identity and let visitors inspect proof before reading career history. | Addressed in first adaptation draft; must carry into replacement. |
| P2 | **Projects suggests the journey has ended halfway through.** Three unfinished studies and a Contact folio interrupt the seven finished projects after the first two. | Continuous finished catalogue, then developing studies and one final exit. | Corrected in local draft. |
| P2 | **Mobile archive summaries are squeezed by a desktop action column.** About210px remains for some descriptions. | Content-wide project rows with the action below; clear project-specific accessible names. | Corrected in local draft. |
| P2 | **Project contents arrives after the content.** The reader sees the navigation only after reading all three sections; source access is delayed too. | Put section links ahead of the sections, keep source and technology access predictable. | Section links corrected in draft; placement must survive new concept. |
| P2 | **Small laptop labels shrink to roughly10–11px.** “Based in” was9.54px at961; background dates were10.97px. | Apply a supporting-text floor and verify it still fits. | Confirmed fixed; Before now12px at961/1024. |
| P2 | **Education date crosses the footer rule at961px.** Zero document overflow concealed an actual internal collision. | Rebalance the right fold at the small desktop boundary. | Confirmed fixed;49.95px/81.64px footer clearance at961/1024. |
| P2 | **Several phone touch boxes are below44px.** Résumé was18px high, proof links28px, upcoming links29px, profile links31px. | Enlarge clickable boxes without inflating all typography. | Corrected in local adaptation draft.44px is the craft target, not an automatic claim of AA failure. |
| P2 | **Desktop aside landmarks are indistinguishable.** Axe landmark-unique appeared in40 baseline scans. | Name the chapter index and each contextual aside. | Confirmed fixed:30 focused scans, zero violations. |
| P3 | **React18 warns about fetchPriority.** A development warning adds noise to real diagnostics. | Use the React18-compatible lowercase attribute. | Confirmed fixed:zero console warnings/errors in focused follow-up. |

## What works and should survive

The laptop has a clear authored identity: unequal paper folds, navy display lettering, original portrait and genuine screenshot evidence. Finished projects and developing studies are honestly separated. Native menu/dialog behavior, copy fallback, Back restoration, résumé delivery and missing-media recovery work. No invented employer outcomes, metrics or client screens are needed.

## User journeys and cognitive load

- **Recruiter on a phone:** baseline forces a biography/history scroll before useful proof. The replacement must answer who, current role and where the work is within the opening interaction.
- **Distracted one-handed visitor:** several clickable labels are too small; navigation disappears into Explore. Keep explicit labels,44px boxes and clear active state in the new structure.
- **Keyboard/low-vision visitor:** named asides now fix the measured landmark ambiguity, but true browser text zoom and screen-reader use still need validation. Do not trade material effects for predictable reading/focus order.

The emotional high point is the tactile desktop opening; the phone previously has no equivalent. The Projects midpoint Contact block creates a false ending. The replacement should have one memorable opening, calm content, and one real close. Avoid a wall of competing cards or decorative fold effects on every section.

## Evidence and limits

Independent design inspection covered20 states: Home, Experience, Projects, Contact and TrendSage Lite at390×844,375×667,1280×720,1440×900, with40 baseline captures. Technical baseline covered242 route/viewport states (22×11),66 axe scans,46 distinct corrected-timing behavior assertions. No horizontal document overflow, uncaught page error or broken visible asset occurred in the242 baseline samples. The detector returned exact `[]` once. The clean detector did not detect the lost mobile concept or internal footer overlap.

Focused draft follow-up: five laptop homes fit one viewport with positive footer clearance;30 axe scans are clean;22 phone route/state checks plus3 core behaviors pass. The source remains an unapproved adaptation draft because the user rejected its overall mobile appearance. A functional draft is not the requested redesign.

Browser evidence uses installed Chrome, resized/emulated viewports, synthesized taps and a CDP touch swipe. Firefox/WebKit launch failed with spawn UNKNOWN. Synthetic doubled computed font sizes exposed homepage/Experience reflow risks, but that test is not native browser text zoom and is not a certified WCAG failure. Physical iPhone/Android behavior, actual Safari, screen-reader review, and throttled real-device performance remain unverified. Contrast over textured paper is not exhaustively certified.

Reports: MOBILE_LAPTOP_DESIGN_REVIEW_2026-11-15.md and MOBILE_LAPTOP_TECHNICAL_QA_2026-11-15.md. Baseline design captures: `.impeccable/review/mobile-2026-11-15/baseline-A/`. Technical evidence: `.impeccable/qa/mobile-qa-2026-*`.

## Next action

The user's priority is resolved: a whole mobile redesign, and exploration including its own visual identity. No need to repeat scope/audience questions. The remaining design decision is the concrete visual choice: A folded cover, B tabbed dossier, C work reel, or a stated combination. Review all three together, select, then implement and repeat target-device QA. Laptop receives the verified narrow fixes. No release is authorized.
