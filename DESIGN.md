---
name: Konduri Anirudh — Folded Portfolio
description: A personal product journey held in a physically folded paper sheet.
colors:
  ink: "#07174f"
  orange: "#9a2d09"
  orange-hover: "#802405"
  desktop-surround: "#ece9e2"
  mobile-paper-fallback: "#d2e8f5"
  dialog-paper: "#d8e9f3"
  dialog-backdrop: "#08183ac9"
  screenshot-ground: "#10111a"
  selection: "#f2b689"
typography:
  display:
    fontFamily: "Alan, Inter, sans-serif"
    fontSize: "6.9cqw"
    fontWeight: 750
    lineHeight: 1.01
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Alan, Inter, sans-serif"
    fontSize: "6.25cqw"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Alan, Inter, sans-serif"
    fontSize: "2.5cqw"
    lineHeight: 1.02
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "1.3cqw"
    fontWeight: 450
    lineHeight: 1.45
  label:
    fontFamily: "Inter, sans-serif"
    fontSize: "1.2cqw"
    fontWeight: 750
    lineHeight: 1.3
    letterSpacing: "0.12em"
spacing:
  chapter-desktop: "4.2cqw 2.2cqw 0"
  chapter-mobile: "34px 22px 30px"
  mobile-gutter: "22px"
  copy-button: "2px 0"
components:
  action:
    textColor: "{colors.orange}"
  action-hover:
    textColor: "{colors.orange-hover}"
  copy-button:
    textColor: "{colors.ink}"
    backgroundColor: "transparent"
    padding: "{spacing.copy-button}"
  chapter-current:
    textColor: "{colors.orange}"
  image-dialog:
    backgroundColor: "{colors.dialog-paper}"
    textColor: "{colors.ink}"
    padding: "20px"
---

# Design System: Konduri Anirudh — Folded Portfolio

## Overview

**Creative North Star: "A journey held in one folded sheet"**

A personal journey held in one physically folded sheet. The original folded-paper reference establishes the physical silhouette, unequal folds and expressive navy print; the approved replacement world uses a warm-grey desktop surround. The paper is a material object with readable semantic content, rather than a screenshot of an interface.

Heavy Alan Sans lettering, Inter supporting copy, fine printed rules and occasional offwhite torn inserts make the system tactile and editorial. Chapter compositions adapt to their content while keeping the same sheet. The rejected conventional sidebar redesign is not a visual reference.

**Key Characteristics:**

- Pale-blue fibrous stock and unequal folds
- Navy print with orange underlined actions
- Genuine portrait and original project evidence
- Full-bleed continuous paper on mobile

This is a scan of the built system in `src/atlas/Atlas.jsx` and `atlas.css`, refreshed on 2026-11-08 after the user-approved replacement design. Page strategy and the six-block direction contract remain in `docs/surface-brief.md`. This document records implementation, not a visual-review pass or release approval. The formal CLI plates gate remains OPEN: explicit chat approval exists, but its tool-specific web receipt is null. Do not invent a receipt or a passed gate.

## Colors

Deep navy print sits on pale-blue raster stock, with warm-grey air around the desktop object and sparse burnt-orange actions. Frontmatter values are normative; paper and insert grain retain their image colour variation rather than becoming flat fills.

### Primary

- **Navy ink:** headings, body copy, fine rules, connectors and printed index.

### Secondary

- **Burnt orange:** journey actions, active chapter and development status; the deeper hover shade applies to fine-pointer action links and copy controls.

### Neutral

- **Warm-grey surround:** desktop root background; supersedes the older cobalt approval.
- **Pale-blue fallback:** mobile sheet behind its continuous texture.
- **Dialog paper:** screenshot viewer surface.
- **Screenshot ground:** dark containment around original screenshots.
- **Warm selection:** selected text with navy foreground.

## Typography

**Display Font:** self-hosted Alan Sans, registered as `Alan`, with Inter and sans-serif fallbacks.
**Body Font:** self-hosted Inter with sans-serif fallback. Sources are `public/fonts/AlanSans.woff2` for display, `public/fonts/Inter.woff2` for upright supporting copy and `public/fonts/InterItalic.woff2` for genuine italic supporting copy. All three variable faces declare weights (100–900) and `font-display: swap`; the italic file is registered within the same Inter family with `font-style: italic`. `font-synthesis: none` remains enabled: Previously, annotations and other italic supporting text use the real italic face. This adds a face, not a third font family; the Inter license is retained.

Display lettering is heavy and compact; supporting copy remains conversational and legible. The frontmatter display role is the personal-name treatment; headline and title describe base chapter rules, with deliberate chapter overrides.

### Hierarchy

- **Display:** homepage name; desktop container-relative scale, mobile (clamp(43px, 11.3vw, 72px)) with line height (1.02).
- **Headline:** chapter heading; mobile base and Projects (57px), project detail (44px). Desktop Experience and Projects are (5.2cqw), detail (4.6cqw).
- **Title:** chapter subheadings; mobile base (29px), tertiary headings (23px). Role and manuscript titles retain their own measured display scale.
- **Body:** base chapter paragraph; mobile (17px). Lead copy uses (1.65cqw / 1.4), mobile (20px), with a maximum width (46ch). Homepage bio is larger (1.98cqw / 1.5), mobile (19px / 1.5).
- **Label:** uppercase printed markers; mobile (13px) with tracking (0.1em). Annotations are italic, with mobile size (14px).

**The Two Families Rule.** Use Alan Sans for display and Inter for supporting text; introduce no third family.

## Layout

The desktop sheet is centred, full available width up to (1600px), with a landscape reference footprint (3:2). Its composition is (20/58/22): printed index on the left, content in the central fold, supporting context on the right. The centre starts at (20cqw) and spans (58cqw). The right text area starts at (79.5cqw) and spans (17.2cqw). These inset reading areas sit within the physical folds; they are not equal cards. A masthead and folio span the object. Fine rules and the slight angled masthead stroke belong to the print grammar. On desktop the brand rotates (3deg) around its left edge and the utility group (−4deg) around its right edge. The homepage’s secondary Previously label is italic and separated from the current role by a real printed rule.

Use container-width units on desktop. Chapter padding and mobile gutters are captured in frontmatter; spacing is measured to each composition rather than a fabricated universal scale. The homepage pairs stacked name and genuine framed portrait, bio below, current role at right and workbench strip below. Previous projects extend into a substantial second spread, with two featured screenshots followed by five ruled entries; each of seven projects has a detail route.

At (960px) and below, use a full-bleed continuous paper texture with no surrounding cobalt or grey side rails. The desktop index disappears; native `details`/`summary` Explore opens stacked navigation in document flow. Main content, context and folio stack naturally. Do not shrink the desktop canvas into the phone. The homepage keeps a compact name/portrait pairing before the stacked bio. The dedicated sharp full-bleed mobile stock tiles vertically at its natural aspect ratio (`background-size: 100% auto; background-repeat: repeat-y`), preserving fine grain and horizontal crease relief without stretching it to the full document height. This replaces the abandoned continuation crop.

## Elevation & Depth

Depth comes from raster fibres, fold lighting, deckled insert edges and the original portrait frame. Loose notes, the proposed outline and correspondence use distinct offwhite insert material, semantic text above it, and no synthetic card borders or shadows. The manuscript itself is unboxed. Fine navy rules divide printed sections.

### Shadow Vocabulary

- **Portrait lift:** `filter: drop-shadow(2px 5px 5px #142e5125)` adds restrained physical separation to the genuine photo.
- **Material depth:** the paper and insert image files contain their own lighting. Earlier CSS slip/manuscript shadows are superseded by later `box-shadow: none` rules and are not active tokens.

**The Material Rule.** Raster stock supplies fibres, creases and torn edges; semantic HTML supplies every readable word and control.

## Shapes

Paper silhouettes and torn edges are raster material geometry. Printed sections use straight rules; controls have no pill or rounded-card language. There is no reusable radius scale in the current stylesheet. Slight slip rotations (−1deg / 1deg) and correspondence rotation (−1deg) describe loose physical paper. SVG connectors remain real geometry. Preserve the portrait frame and the original face; never generate or retouch a replacement person.

## Components

### Actions and copy control

Actions are burnt-orange underlined text with an inline SVG arrow, weight (700), rather than filled buttons. Underlines use thickness (1.5px) and offset (0.2em). Fine-pointer hover deepens orange. Copy address is a transparent text button with a bottom rule and weight (600); its status is announced in `role="status"`. Disabled buttons use opacity (0.6). Links, buttons and summary share an orange focus outline (3px) with offset (5px).

### Navigation and folio

Printed chapter order is About (home) → Experience → Projects → Writing. Active chapter uses orange and `aria-current="page"`. Contact and résumé are utilities, not numbered chapters. Desktop numbered entries use Alan at weight (750); mobile entries are (25px) with stacked ruled rows. Explore closes on route change; Escape closes it and returns focus to summary. The folio links backward and forward through the journey. `/about` and `/start` redirect to home. HashRouter preserves direct chapter links; the address contains the hash route.

### Paper, inserts and image evidence

Projects retains a clear Projects heading and the introduction “Independent studies in product thinking.” Its featured study is explicitly in development. The evidence sequence uses a five-track horizontal grid on desktop. At541–960px, a bounded pair of feedback slips merges downward into a centred problem and next test. At540px and below, the feedback slips stack too. Notes size to content, SVG connectors remain visible, and the disclaimer and44px project action occupy separate rows. Navigation and diagram arrows are authored SVG geometry; the arrow in the semantic project name Feedback → Decision remains text. The contact address includes a deliberate word-break opportunity immediately before @, retaining the complete address and normal wrapping elsewhere.

The main sheet uses `public/materials/paper.webp`; mobile uses `mobile-paper.webp`; notes and correspondence use `insert.webp`; the genuine framed image is `portrait.webp`. Decorative stock has empty alt text and is hidden from assistive technology. Original project screenshots remain meaningful images with descriptive alt text. Screenshot enlargement is a native dialog, with a labelled close button, pale-blue surface, dark translucent backdrop and viewport-bounded image.

Provenance: delivery material and six project WebPs have adjacent `.json` records. Generated original paper, native paper and insert sources remain in `assets/plates/`, with prompt text; the portrait derives mechanically from retained `src/assets/profile.jpg`, not an AI face. Project originals remain in `src/assets/work_logo/`. `paper-back.webp` supplies reverse stock in the opening flaps and carries an adjacent provenance JSON; its original PNG is retained in assets/plates/paper-back-native.png with embedded provenance. Source plates also carry embedded PNG provenance; WebP delivery uses adjacent JSON fallback. The final material/project/plate provenance scan covers 16 rasters with zero missing records; it is a separate asset check, not a formal gate receipt.

### Motion and reading

First desktop opening uses connected double-sided flaps from (±175deg), each (740ms), with a (60ms) right offset, once per session. Centre print resolves (380ms) after (170ms). Chapter pointer travel turns bounded outgoing panels (280ms) over the already-present destination. Project-image pointer navigation carries the original screenshot to detail over (280ms). Motion easing and breakpoint extensions are in the sidecar.

Keyboard activation and reduced motion skip travel; any key interrupts the first opening. Mobile skips the flap opening and chapter turns. The Explore pointer disclosure animates (200ms); keyboard and reduced motion remove it. Session storage resumes the last route without replaying intro; scrolling is native and browser Back restores stored positions. No fake progress or minimum loading wait exists in this implementation.

## Do's and Don'ts

### Do:

- **Do** preserve the physical sheet, visible folds and chapter-specific composition.
- **Do** keep semantic text above decorative raster materials.
- **Do** use the genuine portrait and retain original image sources and provenance.
- **Do** preserve keyboard focus, normal scrolling, direct links and reduced-motion access.

### Don't:

- **Don’t** restore cobalt surroundings, Archivo Black or the superseded 18/62/20 composition.
- **Don’t** turn the printed chapter index into a conventional application sidebar.
- **Don’t** bake navigation or readable copy into screenshots.
- **Don’t** present developing studies or proposed writing as completed evidence.


## QA refinement — 2026-11-08

Supporting desktop copy now has readable floors: body and case-study text14px, dates/annotations12px, screenshot affordance13px. These clamp container-relative scaling near the961px desktop breakpoint without replacing the three-fold composition. The accent remains in the same burnt-orange family, deepened from #b7350b to #9a2d09 for small-text contrast over textured blue stock; navy/stock/hover colour remain unchanged.

At mobile widths, project-detail context uses normal top:auto flow, keeping its final paragraph clear of the folio. Action, copy, previous/back, contents and utility controls have44px minimum touch height. The native screenshot dialog locks document scrolling while retaining internal scrolling; stable scrollbar space avoids a desktop opening jump. Directional links use a small explicit icon/text gap.

Projects’ first paper height follows its measured first folio, so content cannot spill onto the grey surround. A final Writing folio also follows the Previous projects catalogue, preserving the onward journey at the real page end.

Failed screenshot requests show a bounded readable unavailable state with enlargement disabled. Failed portrait keeps the original aspect ratio and a quiet message; failed paper retains a pale-blue reading surface, including after route changes. Healthy images/materials remain the genuine sources. Whole-face WOFF2 delivery and reverse-stock WebP preserve glyphs/pixels while reducing first-entry asset transfer; source TTF/PNG files remain retained.


## Cross-engine and browser-text refinement

Responsive breakpoints are font-relative:60em for the readable/mobile layout,60.0625em for desktop-specific rules, and33.75em for stacked feedback slips. At the default16px browser text these remain960/961/540px. Native Firefox text enlargement can now select readable reflow without changing the CSS viewport. JSX motion guards use the matching font-relative query. Loose-stock bleed in this layout is bounded to8px, avoiding decorative overflow at a wide viewport with enlarged text. Native screenshot close explicitly returns focus to the image trigger across Chromium, Firefox and the tested WebKit engine. Cross-engine evidence and remaining hardware limits are recorded in docs/CROSS_BROWSER_REPORT.md.
