---
name: agency-site-review
description: Independent pre-launch review of an agency-built Astro client site — functional QA (forms, tracking, schema, index state, sitemap/robots/llms.txt, redirects, images, banned language) plus visual review (screenshots scored against the starter's template previews, the approved Design Recipe, and the acceptance rubric). Use after the build and internal-linking stages, before human sign-off and launch. Never approves from the builder's own checks.
---

# Agency Site Review (Stage 7 — functional QA + visual review)

One review stage, two sections, one consolidated report. Spec: `docs/agency-website-system/agents/07-qa-agent.md`
in the canonical checkout (`/Users/jameslarosa/Documents/agent-website-builder`); shared rules `CORE_CONTRACTS.md`
(§7 language, §9 phone, §10 sticky CTA, §11 forms, §12 inner page, §13 contact, §15 links, §16 reviews,
§17 index state, §18 images, §21 sitemap/robots/llms, §22 schema, §24 visual evidence).

## Checklist first (pipeline state — owner decision 2026-09-11)

Before doing anything, read `artifacts/pipeline-state.yaml` in the client repo (schema:
`schemas/pipeline-state.yaml`). This stage is `7_review`. If any earlier stage is not
`approved`/`complete` — in particular `6_build` complete (and `6b_linking` complete or report-only) — STOP and tell the human which gate is open. Do not
reason your way past it. When you start, set `7_review.status: in_progress`; when your output is
ready for the human, set it to `awaiting_gate` with the evidence paths. You NEVER write `approved`
— only the conductor does, quoting the human. `npm run validate:state` enforces all of this.

## Independence
You are not the builder. Read the Build Summary for context only. Re-run every check against the
built output and rendered pages yourself. The builder's screenshots and self-run validators never
count as evidence (§24).

## Inputs (stop and list blockers if missing)
Built site or preview URL and its repo; Active Page Map; Redirect Map (rebuilds); approved
Homepage Messaging Pack; Final Page Copy artifacts; approved Design Recipe + Brief; verified intake
(phone numbers, tracking stack, forms, approved claims).

## Procedure

### 1. Client-specific requirements
From the verified intake, write the checklist for THIS client before checking anything: approved
phone number(s), tracking IDs, form destination, page types in scope, redirects, schema families
per page type, approved services and claims with states.

### 2. Mechanical validators (run, do not trust reports of them)
From the client repo: `npm run check` (artifacts), `npm run check:built` (build + built-HTML:
duplicate process sections, §7 language, dead links, index state, images sized/alt/eager-LCP,
form + tel on every page). On the launch build: `npm run validate:launch`. Any failure is a red
finding with the validator's exact message.

### 3. Functional QA on the rendered site
- Every phone action uses the approved `tel:` source; desktop/tablet CTAs show the number (§9).
- Sticky mobile CTA: hidden in hero, visible after, does not cover forms (§10).
- Forms: the shared component everywhere, no hand-coded forms; submit a test to the router (§11).
- Rendered homepage copy matches the Messaging Pack verbatim; §7 scan of visible text.
- Titles, meta descriptions, canonicals, OG image, favicon on every page.
- Schema validates from built output and asserts nothing unapproved (§22).
- Redirects (rebuilds): each Redirect Map row returns its status on preview/production.
- Tracking: events observed firing (GTM preview / network), not script presence (§19).
- Reviews: no reserved state remains where a real widget exists (§16).
- Contact page order (§13); inner-page sidebar caps and post-body order (§12).

### 4. Visual review
Capture the §24 evidence set — mobile initial `390x844`, mobile scrolled `390x844`, desktop
`1440x1100`, tablet `1024x900` — for: homepage, one service page, one city hub, one city-service
page, contact page. Score each area `Pass` / `Needs Revision` / `Fail` against EXACTLY these:
1. The starter's `/templates/*` preview routes — the baseline. The build may differ only in
   tokens, copy, photography, and approved variants. Any other difference is a miss.
2. The approved Design Recipe + Brief — the approved variants and tokens were used.
3. The Premium Visual Acceptance Rubric and the §24 checks: no horizontal overflow; mobile H1
   does not clip; trust bullets above the fold; legible text on dark/brand/image surfaces; no
   oversized sparse blocks; no repeated identical layouts; no placeholder proof; no fake claims.
Never compare against live reference sites.
Areas: Hero · Header/CTA · Typography/Density · Mobile Sticky CTA · Services · Proof/Reviews ·
Section Rhythm · Footer · Inner page · Contact page.

### 5. Builder loop
Send the builder ONE consolidated list per round: each miss with its screenshot, the reference it
fails against, and the exact change. Maximum 3 rounds. Then escalate to the human with scores,
screenshots, and unresolved misses. Never fix the site yourself.

### 6. Report
`Review Report`: functional red/yellow/green per check area; visual Pass/Needs Revision/Fail per
area with screenshot paths; `Launch Blockers` and `Accepted Risks` listed separately; `Retest
Checklist`. Plus the standard handoff items (§2). Red blockers block launch unless the owner
explicitly accepts the risk in writing.

## Never Do
- Never accept the builder's checks, screenshots, or "validators passed" as evidence.
- Never treat script presence as proof events fire.
- Never approve exact review ratings/counts not from the live widget.
- Never compare against live reference sites.
- Never mark launch-ready with red blockers unaccepted; never launch — that is Stage 8 and the human.
