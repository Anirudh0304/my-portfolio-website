---
name: Konduri Anirudh — Folded Portfolio
description: A personal product journey held in a physically folded paper sheet.
colors:
  ink: "#07174f"
  orange: "#9a2d09"
  orange-hover: "#802405"
  desktop-surround: "#ece9e2"
  mobile-paper-fallback: "#d2e8f5"
  dossier-desk: "#081644"
  dossier-stock: "#e8e8e9"
  dossier-back: "#b3cfe6"
  dossier-masthead: "#f1f2f5"
  action-on-orange: "#fff"
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
  mobile-display:
    fontFamily: "Alan, Inter, sans-serif"
    fontSize: "clamp(32px, calc((100cqw - 40px) * 0.141), 62px)"
    fontWeight: 750
    lineHeight: 0.99
    letterSpacing: "-0.035em"
  mobile-home-lede:
    fontFamily: "Inter, sans-serif"
    fontSize: "16px"
    fontWeight: 450
    lineHeight: 1.45
    letterSpacing: "-0.015em"
  mobile-body:
    fontFamily: "Inter, sans-serif"
    fontSize: "17px"
    fontWeight: 450
    lineHeight: 1.45
  mobile-tab:
    fontFamily: "Alan, Inter, sans-serif"
    fontSize: "24px"
    fontWeight: 750
    lineHeight: 1
rounded:
  mobile-action: "6px"
  dossier-front: "18px 18px 22px 2px"
  dossier-tab: "0 22px 22px 0"
spacing:
  chapter-desktop: "4.2cqw 2.2cqw 0"
  chapter-mobile: "20px 20px 26px"
  dossier-gutter: "20px"
  dossier-primary-action: "11px 12px"
  mobile-gutter: "clamp(20px, 5.6vw, 32px)"
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
  dossier-primary-action:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.action-on-orange}"
    rounded: "{rounded.mobile-action}"
    padding: "{spacing.dossier-primary-action}"
  dossier-primary-action-active:
    backgroundColor: "{colors.orange-hover}"
    textColor: "{colors.action-on-orange}"
  dossier-front:
    backgroundColor: "{colors.dossier-stock}"
    textColor: "{colors.ink}"
    rounded: "{rounded.dossier-front}"
  dossier-tab:
    backgroundColor: "{colors.dossier-back}"
    textColor: "{colors.ink}"
    rounded: "{rounded.dossier-tab}"
    width: "44px"
    padding: "16px 7px"
  dossier-tab-current:
    backgroundColor: "{colors.dossier-stock}"
    textColor: "{colors.orange}"
  mobile-image-dialog:
    backgroundColor: "{colors.dossier-stock}"
    textColor: "{colors.ink}"
    padding: "12px"
  image-dialog:
    backgroundColor: "{colors.dialog-paper}"
    textColor: "{colors.ink}"
    padding: "20px"
---

# Design System: Konduri Anirudh — Folded Portfolio

## Overview

**Creative North Star: "A journey held in one folded sheet"**

A personal journey held in physical paper. The original folded-paper reference establishes the desktop silhouette, unequal folds and expressive navy print on a warm-grey desk. On mobile, the user-selected tabbed dossier carries the same editorial identity through light neutral reading stock, pale-blue file backs, an actual raster clip and attached chapter tabs.

Heavy Alan Sans lettering, Inter supporting copy, fine printed rules and occasional offwhite torn inserts make the system tactile and editorial. Chapter compositions adapt to their content. The genuine portrait and original project evidence remain unchanged. The rejected conventional sidebar redesign and full-bleed blue mobile article are not visual references.

**Key Characteristics:**

- Pale-blue fibrous stock and unequal folds on laptop
- Neutral reading stock, pale-blue file backs and attached tabs on mobile
- Navy print with sparse burnt-orange actions
- Genuine portrait and original project evidence
- Semantic text and ordinary scrolling above decorative raster material

This scan merges the implemented mobile system into the preserved laptop world following the user's explicit merge choice on 2026-11-15. Source: `src/atlas/Atlas.jsx`, `atlas.css` and the later-cascading `dossier.css`. Surface direction lives in `docs/surface-brief.md` and `docs/mobile-surface-brief.md`. This document records implementation, not release approval. Manual visual/technical review is separate from the formal CLI material checkpoint, whose tool-specific receipt remains null; do not claim that checkpoint passed.

## Colors

Deep navy print, sparse burnt-orange actions and real paper colour variation connect both compositions. Frontmatter values are normative; raster grain retains its variation.

### Primary

- **Navy ink:** headings, body copy, rules, connectors, desktop index and mobile tabs.
- **Dossier navy ground:** mobile surrounding surface; this is the approved mobile-specific world, not a return to the old desktop cobalt surround.

### Secondary

- **Burnt orange:** journey links, current chapter and development status. The mobile homepage primary action uses it as a filled background with white text; the deeper shade serves active/hover states.

### Neutral

- **Warm-grey surround:** laptop desk; its subtle radial light and paper shadow remain intact.
- **Dossier stock:** light neutral mobile reading sheet and selected tab, with fine raster grain.
- **Dossier backs:** pale-blue layered file backs and unselected tabs, textured with multiply blending.
- **Dossier masthead:** light utility text over the mobile navy ground.
- **Pale-blue fallback:** retained legacy stock/failure colour and mobile tab pressed state; it no longer defines the mobile page surface.
- **Dialog paper:** laptop screenshot viewer. Mobile uses dossier stock instead.
- **Screenshot ground:** dark containment around original screenshots.
- **Warm selection:** selected text with navy foreground; also the mobile masthead active/current utility colour.

## Typography

**Display Font:** self-hosted Alan Sans, registered as `Alan`, with Inter and sans-serif fallbacks.
**Body Font:** self-hosted Inter with sans-serif fallback. Sources are `public/fonts/AlanSans.woff2`, `Inter.woff2` and `InterItalic.woff2`. Alan declares weights (100–900); the delivered upright and genuine italic Inter faces declare weights (400–800), share one family and use `font-display: swap`. Keep `font-synthesis: none` and the retained licenses.

Display lettering is heavy and compact; supporting copy is conversational and readable. Unprefixed frontmatter roles retain the laptop/base rules; mobile roles supplement them at the font-relative readable breakpoint. Chapter-specific overrides remain intentional.

### Hierarchy

- **Display:** stacked homepage name. Laptop retains its container-relative scale. Mobile uses the `mobile-display` role, measured against the reading sheet, with a fixed (62px) tablet override from (42em).
- **Headline:** laptop base chapter heading with Experience/Projects overrides (5.2cqw) and detail override (4.6cqw). Mobile chapters use `clamp(34px, calc((100cqw - 40px) * 0.155), 62px)`; project detail uses `clamp(32px, 10.5cqw, 50px)`.
- **Title:** mobile company heading (34px), role heading (22px), section headings (23px), featured work (29px) and catalogue titles (24px). Laptop keeps its measured chapter scale.
- **Body:** mobile long copy uses the `mobile-body` role; leads are (18px / 1.5). Homepage positioning uses the smaller `mobile-home-lede` role and becomes (21px) from (42em); role/specialty text is (15px / 1.35), then (18px) on tablet. Catalogue summaries remain (16px / 1.5).
- **Label:** laptop printed uppercase markers retain their base role. Mobile markers are (13px); the current-chapter label is (12px), uppercase, tracked (0.12em), and sits in a (44px) link. Attached tabs use the `mobile-tab` role with vertical writing.

Laptop supporting copy retains readable floors: body/case-study text (14px), dates/annotations (12px), screenshot affordance (13px). Homepage lede and approach keep the 2026-11-14 measured laptop composition and large-screen scaling.

**The Two Families Rule.** Use Alan Sans for display and Inter for supporting text; introduce no third family.

## Layout

The laptop composition remains an unequal (20/58/22) folded spread: left printed index, central content, right context. Centre begins at (20cqw) and spans (58cqw); right text begins at (79.5cqw) and spans (17.2cqw). The home object retains a landscape (3:2) footprint and fits the viewport height: `min(100% - 32px, 2400px, calc((100svh - 32px) * 1.5))`, with at least (16px) surrounding space and vertical centring. Other spreads retain their base (1600px) cap. The continuous straight masthead rule, aligned bio/action edges, right Now/Before context and bottom proof links remain the laptop composition. The 2026-11-14 straight masthead supersedes the older rotated/broken header rules.

The readable layout begins at (60em) and below; laptop-specific rules begin at (60.0625em). These equal (960/961px) at default browser text size and permit enlarged text to select reflow. Mobile is a separate paper-object composition. Its navy surround remains visible, while the reading dossier is centred at a maximum (650px). A grid reserves an outer (44px) tab column beside a `minmax(0, 1fr)` reading sheet. Tabs never overlay body copy. The masthead is outside the object, with KA, résumé and contact. It has (20px) side clearance and a maximum width (610px). Safe-area insets remain part of the sheet and sticky rail.

The dossier begins (44px) below the masthead. Its reading sheet is a width container, with internal content using the dossier gutter token. The decorative top/clip raster is (100%) of the sheet width, positioned at (−11.5cqw) relative to that container; its clearance scales with the same sheet as the header, so it stays above readable text. Two pale-blue backs extend beyond the reading sheet to reveal separate layers. The front has a minimum height of `calc(100svh - 146px)` and grows with content. No document-height raster stretching or page-level scroll lock is used.

The homepage reads as identity/name plus genuine portrait → current APM role and specialty → short positioning → primary experience action and résumé → featured work link → further experience/projects links. The full desktop Now/Before panel and proof-link folio are hidden here because their mobile counterparts carry that information in the reading order. Experience places its role picker before the selected role. Finished project details place a section contents row before the screenshot and long copy; supporting technology/source material follows the article. Projects shows the two featured finished builds, then the remaining five catalogue rows, then the clearly marked Coming next studies, and finally the onward contact action. A catalogue-continuation link points to more projects rather than ending the journey early. On (42–60em), featured projects may use two columns; catalogue rows remain readable stacks.

The three-tab rail is sticky at `max(22px, env(safe-area-inset-top, 0px))`, bounded by `calc(100svh - 44px)` with native vertical scrolling and contained overscroll. Tab minimum heights are (126px), (158px), (144px), and all use `flex-shrink: 0`; enlarged browser text can scroll the bounded rail without compressing or losing a chapter. Main-page scrolling remains native.

## Elevation & Depth

Laptop depth comes from raster fibres, fold lighting, deckled inserts and the genuine portrait frame, with the retained soft paper-to-desk shadow. Loose notes and correspondence use distinct offwhite insert material with semantic text above it and no synthetic card border or shadow. The mobile dossier adds structural separation between its neutral front, pale-blue backs and attached tabs; its shadows express physical layers rather than generic cards.

### Shadow Vocabulary

- **Portrait lift:** `filter: drop-shadow(2px 5px 5px #142e5125)` separates the genuine photo.
- **Laptop paper lift:** `filter: drop-shadow(0 1px 2px rgb(58 48 30 / 0.14)) drop-shadow(0 14px 28px rgb(58 48 30 / 0.12))` sits over the softly lit warm desk.
- **Dossier front:** `box-shadow: 2px 5px 9px rgb(0 0 0 / 0.2)`.
- **Dossier backs:** `box-shadow: 1px 4px 7px rgb(0 0 0 / 0.2)`; the rear sheet skews (−1deg).
- **Attached tabs:** `box-shadow: 2px 4px 6px rgb(0 0 0 / 0.16)`.

**The Material Rule.** Raster stock supplies fibres, creases, torn edges and the mobile clip; semantic HTML supplies every readable word and control.

## Shapes

Laptop paper silhouettes and torn edges remain raster geometry with straight printed rules, not rounded application cards. Slight loose-slip rotations (−1deg / 1deg) and correspondence rotation (−1deg) retain the physical paper grammar. Mobile has its own limited radius vocabulary: the neutral front rounds its upper corners and lower outer corner, while tabs round only their exposed right edge. The filled mobile primary action has a small radius; no pill language is introduced. These mobile tokens do not change the laptop shape rules.

The original portrait frame and face remain untouched; never generate or retouch a replacement person. Arrows are authored SVG geometry, not substituted Unicode control glyphs.

## Components

### Actions and copy control

Laptop and secondary journey actions remain burnt-orange underlined text with an inline SVG arrow, weight (700), underline thickness (1.5px) and offset (0.2em). Fine-pointer hover deepens orange. Mobile home promotes “See experience” to the filled primary action variant, white text, Alan weight (750), size (18px), minimum height (44px); its padding/radius come from frontmatter. It wraps to full width at (21em) and below. Résumé remains a quieter underlined action.

Copy address is a transparent text button with a bottom rule and weight (600); its status is announced in `role="status"`. Disabled controls use opacity (0.6). Links/buttons retain an orange focus outline (3px) with offset (5px). Attached tabs draw that focus outline inward (−5px) so the bounded rail does not clip it. Mobile/coarse-pointer actions, back links, utilities and image close controls retain minimum (44px) touch height.

### Navigation and folio

The current journey is About → Experience → Projects. Writing is hidden until a real published piece exists; `/writing` redirects to Projects. Contact and résumé remain utilities. Laptop uses its printed numbered index. Mobile uses exactly three attached chapter links, labelled About, Experience and Projects, plus the current-chapter location label inside the sheet. These are ordinary route links, not an ARIA tab widget. Active chapter uses orange and `aria-current="page"`; active tab stock matches the neutral front and its vertical text is underlined. Pointer hover changes ink to orange; pressed tabs use the retained pale-blue fallback.

The former Explore-only mobile disclosure is retired from the rendered shell; unused legacy CSS does not define the current contract. `/about` and `/start` redirect home. BrowserRouter supplies ordinary direct routes; legacy `#/…` links are rewritten. Folios link backward and forward, and project detail keeps a clear All projects route.

### Role picker and project contents

Mobile role selection appears before role details, with ordinary links for Product, Internship and Marketing, minimum height (46px), Inter (14px / 650), and fine rules above/below. The selected role is orange with an explicit current state; visually hidden text supplies the company/title. Finished project detail has an early contents row linking The idea, The build and The interface to real anchors. These links wrap within the reading sheet rather than becoming a horizontal carousel. Section anchors retain scroll clearance and focus targets.

### Dossier, inserts and image evidence

The laptop sheet remains `public/materials/paper.webp`, reverse flaps use `paper-back.webp`, notes/correspondence use `insert.webp`, and the unchanged genuine framed portrait is `portrait.webp`. Mobile front/backs/tabs use `dossier-stock.webp`, tiled at (420px × 420px); `dossier-top.webp` is the transparent decorative top/clip. The old `mobile-paper.webp` is retained as an earlier source asset but no longer paints the rendered mobile sheet because the later dossier stylesheet clears that background.

Mobile dossier materials ship with adjacent provenance: top/clip (1100 × 195px, 27,620 bytes, alpha) and stock (840 × 840px, 9,532 bytes). Generated material sources and their records remain retained; the portrait still derives mechanically from `src/assets/profile.jpg`. Project originals remain in `src/assets/work_logo/`, delivery WebPs in `public/screenshots/`. Decorative material has empty alt text and is hidden from assistive technology. Project screenshots retain meaningful descriptive alt text. The top/clip has no pointer interaction.

Screenshot enlargement uses a native labelled dialog, viewport-bounded original image, labelled close button, document scroll lock and internal scrolling. Close restores focus explicitly to its trigger. Its laptop surface remains pale-blue dialog paper; mobile adopts textured dossier stock. Failed screenshots show a bounded unavailable state with enlargement disabled. Failed portrait preserves its aspect ratio; failed material retains a readable fallback. Loose insert bleed remains bounded to (8px) in the readable layout.

### Motion and reading

Preserve the laptop first-opening motion: connected double-sided flaps from (±175deg), each (740ms), with a (60ms) right offset, once per session. Centre print resolves (380ms) after (170ms). Pointer chapter travel turns bounded outgoing panels (280ms); pointer project navigation can carry the original screenshot to detail over (280ms). Keyboard activation and reduced motion skip travel; any key interrupts the opening. Mobile skips flap opening and chapter turns, retains ordinary scrolling and browser zoom, and adds no fake pull gesture or mandatory swipe. There is no rendered Explore disclosure to animate. Session storage resumes the last route without replaying intro; browser Back restores stored positions. No fake progress or minimum loading wait exists.

## Do's and Don'ts

### Do:

- **Do** preserve the laptop physical sheet, visible folds and chapter-specific composition.
- **Do** preserve the approved mobile dossier layers, genuine portrait and attached three-chapter navigation.
- **Do** keep semantic text above decorative raster materials and the clip clear of reading content.
- **Do** retain original image sources and provenance.
- **Do** preserve keyboard focus, native scrolling, browser zoom, direct links and reduced-motion access.

### Don't:

- **Don't** restore the rejected full-bleed blue mobile article or Explore-only mobile navigation.
- **Don't** replace the warm-grey laptop desk with the mobile navy ground.
- **Don't** turn the printed laptop chapter index into a conventional application sidebar.
- **Don't** bake navigation or readable copy into screenshots, or use generated portrait pixels.
- **Don't** present developing studies or proposed writing as completed evidence.
- **Don't** restore Archivo Black or the superseded (18/62/20) folded composition.
