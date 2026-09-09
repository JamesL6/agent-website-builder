---
name: agency-new-client-website
description: Runs the full agency website pipeline for a new client from intake to launch-ready — orchestrating intake validation, content briefs, copywriting, design, build, and QA, pausing at every human approval gate. Use when starting a new client website build ("new client build", "kick off the website for <client>") with a Local SEO Sheet and brand assets in hand.
---

# Agency New Client Website (Pipeline Conductor)

Run the stages in order, invoke the stage skill where one exists, follow the stage's spec
where one doesn't, and STOP at every human gate. The AI drives; the human approves. Never
skip a gate because the output "looks obviously fine" — the gates are the product.

Authority: `agent-website-builder` repo (canonical checkout: `/Users/jameslarosa/Documents/agent-website-builder`) — `docs/agency-website-system/PIPELINE.md`
(orchestration), `CORE_CONTRACTS.md` (shared rules), `agents/01-08` (stage specs).

## Authority Path — read this first

The ONLY authoritative docs live in the git checkout at
`/Users/jameslarosa/Documents/agent-website-builder` (branch `main`).

Do not read system docs from any other location. Copies made for handoff, zip
extracts, or working folders WILL drift behind and have already been observed
4KB out of date. If you find more than one copy of `docs/agency-website-system/`
on disk, use the checkout above and tell the human the others exist.

## Kickoff — collect the only human inputs

Ask for, and do not start without:
1. The client's Local SEO Sheet URL (`AM Verified Website Intake` tab filled in by the AM).
2. Brand assets: logo, photos, brand guidelines if any.
3. The client's current website URL, or the human's EXPLICIT confirmation that there isn't one.
   Hard stop: never assume either. Interim (until the intake tab exists): intake facts may come
   in chat; record them verbatim in the Source Snapshot.

## The Stages

**Stage 1 — Intake.** Run `$agency-client-intake-agent`.
→ 🛑 **GATE 1 (AM/human):** resolve blockers; confirm the AM Summary and draft page map.
Requires `Verified Intake Status = Verified` + `AI Intake Validation Status = Passed`.

**Stage 2 — Site audit & redirects** (spec: `agents/02` — no skill yet, follow the spec).
Crawl the existing site, classify old URLs, produce the redirect map. Runs in parallel with
Stage 3. For rebuilds: no launch without redirect decisions.
→ 🛑 **GATE 2 (human/SEO):** approve the final page map + redirect map.

**Stage 3 — Content briefs.** Run `$restoration-content-brief-generator` flow per
`agents/03`: assign approved master briefs, localize placeholders, route true gaps to the
SEO owner (new briefs need human approval, then join the master library).

**Stage 4 — Copy Sprint.** Run `$restoration-page-copywriter` per `agents/04`: FIRST the
Homepage Messaging Pack, then ALL remaining Final Page Copy in one parallel sprint — one
subagent per page (Sonnet, medium effort), each reading its own approved brief plus a
per-client `copy-spec.md` the lead writes first (claim matrix with states, approved URL list
from the page map, voice rules, word-count discipline, one reference page). Strict brief
fidelity, claim states on everything. The lead verifies every artifact centrally
(`artifacts/copy/*.yaml` — `npm run validate:artifacts` checks them). ALL copy is finished
and approved before Stage 6: the builder assembles copy, it never writes any.
→ 🛑 **GATE 3 (human):** approve the Messaging Pack (homepage design cannot start before
this) and spot-check page copy.

**Stage 5 — Design.** Run `$agency-website-design-builder`: brand tokens from
guidelines/logo, one variant per section from the starter registry, Design Recipe + Design
Brief. Rubric must have no Fail areas.
→ 🛑 **GATE 4 (human):** approve tokens (mandatory when logo-derived) and the design
direction.

**Stage 6 — Build.** Run `$agency-astro-site-builder`: starter copy, theme, site data,
homepage assembly, inner pages through the template, validation, Build Summary + preview URL.
The builder never self-approves.

**Stage 7 — QA** (spec: `agents/07` — no skill yet, follow the spec). Pre-launch checklist:
forms submit, tracking fires, schema validates, sitemap/robots, redirects, images, banned
language, §24 screenshots. Red/yellow/green report; blockers listed separately from
accepted risks.
→ 🛑 **GATE 5 (human):** review the preview + QA report. Final visual sign-off. Reserved
review states must be resolved; red blockers need explicit risk acceptance to pass.

**Stage 8 — Launch** (spec: `agents/08` — no skill yet, follow the spec). DNS/hosting,
redirects live, tracking verified on production, sitemap submitted, handoff packet.
→ 🛑 **GATE 6 (human):** explicit launch approval — automation never launches on its own.

## Conductor Rules

- Announce at each gate exactly what the human is approving and what happens next. One
  message, plain English, artifacts attached/linked.
- If a stage's required input is missing or unapproved, stop the pipeline and say which gate
  reopened — never quietly regenerate an upstream artifact.
- When the human rejects something, apply the Rejection Encoding Rule (`PIPELINE.md`): the
  fix goes into a component/validator/schema first, prose last — and rerun only the affected
  stage.
- Keep a running status the human can ask for at any time: stage, gate, blockers, owner.
- Human approval at one gate approves that artifact only — it is never blanket permission
  for later stages.
