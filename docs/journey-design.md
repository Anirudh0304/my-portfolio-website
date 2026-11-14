# Anirudh portfolio journey design

Date: 2026-11-08
Status: proposed experience design for user review before prototype changes
Scope: Home and About, Experience, Projects connections, Writing, and navigation between them

Content update: the user supplied the previous portfolio repository during planning. See content-inventory.md for inspected source, conflicts, assets, and final integration target. Its historical content is evidence for the journey; its visual style is not the new direction.

## The problem

The current entry is a project spread, with a narrow sidebar trying to introduce Anirudh's employment. Every other destination becomes the same plain text page. The reader gets disconnected facts instead of an understanding of how Anirudh's background, work, projects, and thinking connect.

The atlas should portray a personal journey. Its paper is the visual language; its map is the relationship between chapters. It should help a visitor understand who Anirudh is, what he does, what evidence they can inspect, and where to go next. A geographic map is unnecessary unless a real place is relevant to the story.

## Audience and outcome

Working audience: product hiring managers, recruiters, and product peers. Their first questions are Who is this person, what do they do now, and what can I inspect. A curious visitor should be able to follow the journey; a busy reviewer should reach Experience, Projects, or Resume directly from every page.

The intended first impression is a person opening his working atlas. The intended lasting impression is a product practitioner connecting technical understanding, work with teams, AI product experience, and evidence-based decisions. These are design intentions, not claims that visitor research has validated them.

## Recommended route

Home and introductory About → Experience → Projects → Writing → Contact

About has two depths. Home supplies the short introduction needed to enter the journey. A full About chapter holds the background and personal perspective for readers who want more. Home is labelled Start in navigation, About remains available, and both have distinct URLs and page titles. Start is not a renamed project page.

Navigation order: Start, Experience, Projects, Writing, About, Resume. Keep the name as an additional Home link. At smaller widths, show the current chapter plus an accessible Chapters menu; Resume remains a direct link. Do not compress six links into unreadably small text.

The sequence is suggested, never mandatory. All chapters are directly accessible. Each has the same chapter index, a clear current location, and a next destination named for its content. Browser Back restores the previous location, including selected project and scroll position where the browser supports restoration. No visited-state storage, progress percentage, locked pages, or required introductory animation.

Contact is the correspondence area at About#contact, not an extra chapter or a separate form page. Contact navigation scrolls to that area; the email action there opens the user's mail application. Home and each chapter may also offer a direct email link clearly labelled Email Anirudh.

## Common atlas structure

Every chapter belongs to the same physical publication but has a composition suited to its content.

- A narrow left fold carries the chapter index and the active location. On mobile it becomes the chapter menu at the top.
- The main spread carries the current story, with the strongest fact or artifact first.
- The outer fold carries context or the next meaningful destination, not a repeated sales pitch.
- The bottom edge offers a deliberate next step and an optional previous step. The same paper, navy ink, orange link treatment, type family, and fold boundaries persist.
- Actual articles and long case studies enter a quiet reading view inside this atlas shell. Their opening and closing remain connected to the parent chapter. Avoid giant lettering on every screenful.

The location cue uses ordinary names such as Atlas / Experience / Revspot. A small route line can connect the chapter names, but it must carry navigation meaning. Decorative route drawings do not replace content.

## Home as the opening spread

Reader question: Who am I meeting and where should I begin?

First viewport:

| Left fold | Main spread | Outer fold |
| --- | --- | --- |
| Chapter index with Start selected | Anirudh's name, product management, and a compact introduction | The suggested journey with Experience as the next stop |
| Resume and direct chapter access | A concise view of technical background, team leadership, and current product work | Current role stated plainly with dates |

The name and introductory statement lead instead of WORK. Keep the reference's scale and print character, but reserve WORK for the Projects chapter where it describes what the visitor is viewing.

Proposed introduction: I’m Anirudh, an Associate Product Manager at Revspot, working on AI advertising workflows and evaluation. Supporting background names computer science and data science at VIT and rover-team leadership without inventing a personal origin story.

The first clear action is Explore my experience. See projects and Resume remain visible alternatives. The introduction should fit without opening accordions or scrolling through an empty hero. Home can contain a short About excerpt; the full About route is a separate optional detour, not a required stop before Experience.

## Experience as a career spread

Reader question: What has Anirudh actually worked on, and how has his role developed?

Composition: a career line along the inside fold, with one role opened across the central spread. The outer fold shows the relationship to the independent projects. This should read like a working record, not a list of skills or an elaborate timeline with empty dates.

Default selection: Associate Product Manager, Revspot.ai, September 2026 to present, Bengaluru. Earlier role: Product Management Intern, June to August 2026. These lead the career hierarchy; add other entries only from actual evidence rather than filling a timeline.

Repository content adds an earlier Social Media Manager role at GroGoliath, June to August 2024. Present this as an earlier secondary entry after the two Revspot roles. The relationship type is unconfirmed, so do not label it freelance or employment. Team Vyadh appears in a separate leadership lane. Dates and team figures follow the newer resume where the repository conflicts; see content-inventory.md. The path may have parallel lanes rather than pretending that education, leadership, and paid work happened sequentially.

Central hierarchy for the selected Revspot APM role:

1. Exact role, organisation, dates, and location.
2. Product context: Spot is an AI advertising platform covering planning, analysis, creative, and execution.
3. Anirudh's contribution: translating customer and operational problems into requirements, workflows, evaluation, and engineering initiatives.
4. Two or three substantial work themes with different visual treatments: a requirement-to-workflow sequence, an evaluation decision diagram, and a campaign-analysis explanation. No fabricated product screenshots or test results.
5. A limitation placed where it matters: detailed employer artifacts are not currently included. Avoid suggesting a redacted screenshot exists when none was supplied.

Three professional entries are selectable: Revspot APM, Revspot Product Management Intern, and GroGoliath Social Media Manager. Selecting an entry changes its own detail and active career marker while retaining the page context. Each selection is deep-linkable. Keyboard operation uses ordinary buttons or a documented accessible tab pattern, with focus preserved and the new role announced. All three remain readable without JavaScript through normal links or stacked content.

The central spread changes its content structure with the entry. The Revspot internship explains its documented workflow and specification work without borrowing APM ownership. GroGoliath explains social-media planning for two clients, performance reporting and email campaign tasks, without AI diagrams or unmeasured impact claims. Team Vyadh is not a fourth professional role: show a separate compact leadership passage with dates and a Read the Team Vyadh story link to About#team-vyadh. That About passage is readable inline and explains coordination, engineering-team collaboration, and sponsorship work using the newer resume. No historical entry inherits another organisation's product context.

The continuation says Explore my independent projects. It explains that these are separate demonstrations of product thinking, not Revspot deliveries. Connecting themes is useful; implying an employer approved or deployed the independent projects is not.

## Projects as the work spread

Reader question: What can I inspect to understand Anirudh's decisions?

Retain the supplied reference's WORK / IN PROGRESS composition, left project index, central artifact, and clear project action. The planned projects remain Feedback to Decision, Where the Funnel Breaks, and Should This AI Ship. Undergraduate work stays in Earlier Builds.

The right fold must stop saying Building AI products with a generic node graphic. Proposed replacement: a compact experience reference with the exact employer and role, followed by a contextual connection. For example, alongside Should This AI Ship: My current role includes structured AI workflow evaluation. This independent project explores release decisions using sample scenarios. Link to Experience. No unearned metric or company logo treatment.

The right fold's primary job is orientation: what kind of project this is, its status, what artifact will be available, and where it sits in the journey. The experience reference is secondary and can collapse to a small cross-link on mobile. For a project already open, use the outer fold to point to a related published essay only if one exists.

A finished project opens a case study with a clear problem, evidence, alternatives, decision, artifact, and learning. Until finished work is supplied, the action is Read project plan, with In development visible before clicking. The illustrative feedback diagram must not look like real interview findings; its example label stays attached to the artifact.

The continuation says Read the thinking behind the work. If there are no published essays, use a truthful writing preview rather than creating dead article links.

## Writing as an editorial spread

Reader question: How does Anirudh think beyond the project summary?

Composition: a large WRITING title across the top fold, one lead essay occupying the central area, and a narrower index of other pieces with dates and topic. This differs from the project evidence diagram and career line while keeping the same atlas material.

When content exists, the lead essay shows its actual title, a short premise, date, and reading time computed from the article. A folded excerpt can carry a real paragraph. Selecting a piece opens a full reading page with the same chapter location and a return to Writing. Related project links are editorially relevant, not automatically attached to everything.

Current empty state: there are no published essays. Show Writing in progress, the two proposed topics, and one sentence about the question each will explore. Use no publication dates, estimated reading times, preview quotations, or Read article controls until the pieces exist. A proposed topic is not an article card pretending to be published.

The actual two topics are What the funnel couldn’t tell me, exploring the gap between an observed drop-off and a justified product action; and From feedback to a product decision, exploring how evidence and tradeoffs turn requests into a next bet. In the current editorial spread, show these as two annotated working titles alongside their related project plans, not as a dominant empty featured-article slot.

The page should still be worth visiting: it connects the questions Anirudh is exploring to the project plans. Its next step is About Anirudh or Get in touch, not a dead end. Medium links can be added after publication; the website remains the index.

## About as a personal spread

Reader question: Who is behind this work, and what connects the stages?

Composition: an opening statement and name across the top, a central background narrative, and a side column containing factual anchors: VIT, data science, Team Vyadh, and Bengaluru/Revspot. Use dated annotations only where dates are known. Education and rover leadership overlap; do not falsely portray them as consecutive jobs.

The story has three passages: technical foundation, working with teams, and current product practice. It should explain the connections without inventing formative anecdotes, motives, hobbies, or values. Existing factual material can establish the structure; Anirudh's own voice will make the final narrative specific.

No portrait has been approved for this revision. Do not invent one or reserve a dominant blank photo box. If an existing portrait or authentic team artifact is approved later, it can become supporting material. The layout must be complete with the available content.

The previous repository contains a profile image and project image assets. These are now known candidates, to inspect before use. Their existence does not make a generic portrait hero the right entry. The layout should use an authentic project or team artifact where it helps explain a specific stage of the journey.

A closing correspondence area contains a real email link, LinkedIn, GitHub, and Resume. An invitation such as Have a product problem in mind is appropriate; claiming availability or a job search is not supported. The next destination is Experience when arriving from Home, or Contact when arriving from Writing; offer both links explicitly without detecting visitor history.

## Transitions and physical continuity

Motion answers Where am I going in the atlas, rather than adding animation to each paragraph.

- The chapter rail keeps its screen position while the active marker moves to the new chapter. The next spread appears to open from the adjacent fold, with the title anchored to the same baseline. Target 240 to 300 ms for navigation.
- Prefer a progressive shared-element or View Transition enhancement over a 3D renderer. If unsupported, use ordinary navigation with the same stable shell. Deep links and new-tab opening must still work.
- Role and project selection use a shorter 180 to 240 ms local transition. Entering long-form reading reduces the outer decoration and gives the text room; the return restores its parent context.
- All meaningful content is visible by default. No autoplay page tour, scroll hijacking, sound, dragging requirement, forced history sequence, or repeated delayed reveals.
- Reduced motion uses instant chapter changes with clear location and focus. Mobile uses vertical continuity and a chapter menu; it does not shrink a perspective desktop sheet.

These are motion requirements for a later prototype, not a claim that the current implementation has them.

## Alternatives weighed

1. One long chronological scroll: a clear sequence, but makes direct evaluation harder and pressures overlapping education/leadership into a false single timeline. Use a suggested sequence across directly accessible chapters instead.
2. A geographic map with pins: adds a spatial decoding task while most content is about ideas and roles, not places. Use chapter relationships and genuine career chronology.
3. Copy the same folded project layout to every page: visual continuity but weak content fit. Use one shell with distinct career, evidence, editorial, and personal compositions.
4. A cinematic locked tour: memorable entry at the cost of task speed, reduced-motion access, and repeat visits. Keep the journey optional and direct routes permanent.
5. Plain article pages for all destinations: technically simple, but already rejected for losing the atlas identity. Reserve reading views for actual long-form content and keep them inside the chapter shell.

## Scope and validation before coding

This document is a design proposal. Do not alter the current prototype or deploy based on it yet. First confirm the opening sequence and chapter compositions. Then produce visual designs of Start, Experience, Writing, and About using the established reference. Review these as one connected experience before implementation.

Implementation should preserve the current content source, honest development statuses, existing links, keyboard support, and browser Back. Exact filenames and component boundaries belong to the implementation plan after the designs are accepted.

This proposal supersedes DESIGN.md's project-led homepage and generic Read treatment for Experience, Writing index, and About only after user acceptance. Until then DESIGN.md remains the current implementation record and this is the proposed replacement experience. Paper, palette, lettering character, and accessibility requirements remain. The new evidence also changes the eventual delivery constraint: integrate into the user's React/Vite repository rather than overwriting it with standalone static files. No repository push is part of this design phase.

Design acceptance: the first screen identifies Anirudh and his current role; every page visibly belongs to the same atlas; a visitor can explain where they are and what comes next; each section has its own content-led composition; the right project fold clarifies rather than obscures experience; empty Writing is honest; no history or evidence is invented; direct navigation remains as easy as following the suggested journey.

Open editorial inputs for later: a short personal perspective in Anirudh's own words, any approved employer artifact, finished projects, and published essays. None blocks planning the experience. No new platform, library, analytics, or backend is required by this design phase. Schedule the work as design review, connected visual comps, then implementation and browser validation; do not promise a completion date before the visual direction is confirmed.
