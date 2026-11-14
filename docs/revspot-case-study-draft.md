# Revspot case study — draft outline and copy

Status: DRAFT, not wired into the site. Nothing here is published.
Rule: every `[…– ask Anirudh]` is a fact only Anirudh can supply or clear. No result, number, client
name or internal artifact may be filled in from inference. Client names stay hidden; use relative
figures (%, ×, before → after) where absolute numbers are confidential.

Facts already public on the site (safe to reuse): Revspot.ai, Bengaluru; Product Management Intern
Jun–Aug 2026, Associate Product Manager Sep 2026–present; building Spot, an AI advertising platform
across campaign planning, analysis, creative and execution; structured evaluations and ablation
testing; Meta and Google Ads; funnel, attribution and targeting problems.

---

## Proposed page shape (fits the existing project-detail layout)

- Centre: title, one-line lead, then four sections — Problem · What I did · What changed · What I'd do differently.
- Right fold "Project contents": anchors to the four sections + a "Role / Team / Timeline / Tools" note.
- No screenshots of internal tools unless cleared; a redrawn, anonymised workflow diagram is the safer visual
  (it can reuse the existing evidence-flow style: problem → test → decision).
- Route suggestion: `/projects/revspot-evaluation` (becomes the first item on Projects, above TrendSage Lite).

---

## Title options

1. How do we know an AI workflow actually got better?
2. Testing AI ad workflows before they ship
3. Evaluations before opinions: improving an AI ad workflow

**Lead:** At Revspot I work on Spot, an AI advertising platform. This is how we tested whether a change
to one of its AI workflows was a real improvement — not just a better-looking demo.

---

## 1. Problem

Spot uses AI workflows to help with [WORKFLOW – ask Anirudh: e.g. campaign planning / creative
analysis / targeting recommendations] for advertisers running Meta and Google Ads.

When the team changed a workflow — [WHAT CHANGED – ask Anirudh: new prompt, new model, an added step,
new data source] — it was hard to tell whether outputs were genuinely better. Reviews were
[HOW IT WAS JUDGED BEFORE – ask Anirudh: e.g. spot-checking a few outputs], so a change could look good
on the examples someone happened to try and still fail on [FAILURE CASE – ask Anirudh].

Why it mattered: [CONSEQUENCE – ask Anirudh: e.g. wasted spend recommendations, manual rework by the
team, slower launches, lost trust from a client account — no client names].

## 2. What I did

- **Defined "better" before testing.** Wrote the criteria a good output had to meet:
  [CRITERIA – ask Anirudh: e.g. correct use of campaign data, actionable for the advertiser, follows
  platform policy]. Agreed them with [WHO – ask Anirudh: role only, e.g. engineering lead, account team].
- **Built an evaluation set.** [N CASES – ask Anirudh] representative cases drawn from
  [SOURCE – ask Anirudh: anonymised past campaigns / synthetic cases], covering
  [CASE TYPES – ask Anirudh: e.g. lead-gen vs. e-commerce, Meta vs. Google].
- **Ran structured evaluations.** Scored the current and changed workflow on the same set using
  [SCORING METHOD – ask Anirudh: human rubric, LLM-as-judge with spot checks, pass/fail checks].
- **Ran ablation tests.** Removed or swapped one component at a time —
  [COMPONENTS – ask Anirudh: e.g. a context step, a tool call, a prompt section] — to see which part
  actually caused the change, instead of shipping the whole bundle on faith.
- **Turned results into a decision.** [DECISION – ask Anirudh: shipped / shipped one part / rolled back /
  changed the spec] and wrote it up as [ARTIFACT TYPE – ask Anirudh: spec, decision note — describe only,
  do not attach internal documents].

## 3. What changed

Use relative figures if absolute ones are confidential.

- Output quality on the evaluation set: [BEFORE → AFTER – ask Anirudh, e.g. "pass rate X% → Y%"]
- What the ablation showed: [FINDING – ask Anirudh, e.g. "component A drove most of the gain;
  component B added cost without improving quality"]
- Effect on the team or advertisers: [NUMBER – ask Anirudh, e.g. review time, rework, iteration speed]
- Effect on campaigns, only if cleared: [NUMBER – ask Anirudh, e.g. relative change in CPL / CTR /
  spend efficiency on Meta or Google Ads — no client names]
- What became standard practice: [PROCESS CHANGE – ask Anirudh, e.g. "evaluation set now runs before
  every workflow change"]

If no cleared numbers exist yet, this section should say so plainly
("Results are confidential; the change was [shipped / adopted as process]") rather than estimate.

## 4. What I'd do differently

Draft prompts — keep only what is true:

- Build the evaluation set earlier, before the first workflow version, so every later change has a baseline.
- [LESSON – ask Anirudh: something the ablation revealed that you would have tested first]
- [LESSON – ask Anirudh: a gap in the criteria, e.g. a failure the rubric missed]
- [LESSON – ask Anirudh: how you'd involve the account / client team sooner]

---

## Facts needed from Anirudh (checklist)

1. Which Spot workflow is the case study about, in one line.
2. What exactly changed in it (prompt, model, step, data).
3. How quality was judged before evaluations existed.
4. The failure case or cost that made this worth fixing.
5. The criteria for a "good" output, and who agreed them (roles only).
6. Size and source of the evaluation set (can be approximate: "~50 cases").
7. Scoring method (human rubric, LLM judge, automated checks).
8. Which components the ablation tests removed or swapped, and what that showed.
9. The decision taken and whether it shipped.
10. Before → after numbers you are cleared to publish (relative is fine), or confirmation that none can be shown.
11. Any campaign-level outcome on Meta/Google Ads you are cleared to publish, with no client names.
12. Process change that stuck afterwards.
13. Two or three honest "what I'd do differently" points.
14. Your role vs. the team's (what you owned, what engineering owned).
15. Publication clearance: confirmation Revspot is fine with this being public, and whether "Spot" may be named.
16. Whether any visual can be shown (anonymised diagram only, or a cleared screenshot).
