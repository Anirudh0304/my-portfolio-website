# Anirudh portfolio

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary working assumption: recruiters, hiring managers, and product peers assessing Anirudh's product judgment and current experience. The user has requested a product portfolio, rather than a portfolio restricted to one product discipline.

## Product Purpose

Introduce Konduri Anirudh, explain his current product work, present independent projects as they become available, and provide a place for published writing. Visitors should quickly find experience, project evidence, resume, and contact information.

## Operating Context

Anirudh is an Associate Product Manager at Revspot.ai in Bengaluru, starting September 2026, following a June to August 2026 product internship. His work includes AI advertising workflows, evaluation, requirements, and campaign intelligence. Education and earlier technical projects come from the supplied resume.

## Capabilities and Constraints

- Current numbered journey: About (home) → Experience → Projects → Writing. Contact and résumé remain utilities. `/about` and `/start` redirect to home; project details use `/projects/:id` within HashRouter.
- Three planned independent projects: Feedback to Decision, Where the Funnel Breaks, and Should This AI Ship.
- Project research and finished artifacts will be supplied later. Mark planned work honestly and make updates straightforward.
- TrendSage Lite and XAI Governance are undergraduate work. Team Vyadh is earlier leadership experience. Keep them accessible in Earlier Builds, below current experience and new projects in hierarchy.
- The original two-day launch target motivated a small scope; timing does not authorise fabricated evidence or a reduced visual brief.
- Current implementation uses React 18, Vite 6 and React Router HashRouter. `src/main.jsx` loads `src/atlas/Atlas.jsx`; visual rules and content live beside it. Preserve this existing React/Vite integration. Local review preview: http://127.0.0.1:4182/.
- User-facing publishing is on hold during the revised preview. Existing Site remains private and unchanged.

## Brand Commitments

Name: Konduri Anirudh. Voice: direct, thoughtful, concrete. The user rejected a generic portfolio and a literal geographic map. The supplied folded-paper reference is binding visual evidence; its treatment is documented separately in DESIGN.md.

## Evidence on Hand

- Supplied resume: C:/Users/aniru/Downloads/Konduri_Anirudh_Resume.pdf.
- Visual reference: docs/reference/folded-atlas.png, copied unchanged from the user attachment.
- Existing project planning document under ../portfolio-project-plan/.
- No finished independent project results or published essays have been supplied. Illustrations are examples, not user research.
- Do not publish internal Revspot screens, client data, or specific internal metrics merely because they appear in a resume. Current high-level role description is sufficient.

## Product Principles

1. Show product reasoning with evidence when it exists.
2. Keep current experience and independent work distinguishable.
3. Let the visual identity create interest while navigation remains obvious.
4. Preserve the reading and keyboard experience on small screens and with reduced motion.
5. Keep future project updates confined to a documented content source.

## Open Decisions

Custom domain, eventual public hosting provider, completed project content, article URLs, and employer-specific publication permissions remain undecided. Do not invent them.

## Previous source and release target

On 2026-11-08 the user supplied https://github.com/Anirudh0304/my-portfolio-website as the previous portfolio, currently hosted on Netlify, and the eventual push target after finalisation. Source at commit 901203ff2e03f66a26a7b95fde8990badc707968 uses React/Vite/Tailwind. Preserve that architecture during eventual integration unless a migration is explicitly agreed. The current folded-paper implementation is integrated into this React/Vite checkout; earlier standalone static and motion studies are reference artifacts. No push or deployment is authorised before the design is finalised. Netlify settings are not yet verified.

Read docs/content-inventory.md before using historical material. Newer resume wins over stale dates and figures; GroGoliath's role type remains unconfirmed. The implemented entry is About (home), leading toward Experience, Projects and Writing. The current approved surface contract is docs/surface-brief.md. Work remains local for review; no push or deployment has been made as part of this implementation. Final release still requires finalisation, and the formal CLI plates gate remains open because its tool-specific receipt is null despite explicit chat approval.
