# Pipeline

Status: Active — orchestration source of truth
Last updated: 2026-07-07

This file defines how the agents run together: sequence, parallelism, handoff artifacts, stage gates, and the feedback loop. Shared rules live in `CORE_CONTRACTS.md`. Per-agent instructions live in `agents/`.

## Agents

Each stage has a written spec here; stages marked with a `$skill` also have a runnable Codex
skill in `~/.agents/skills/`. Spec and skill must be kept in sync manually — when one changes,
update the other in the same pass.

1. Client Intake Agent — `agents/01-client-intake-agent.md` — `$agency-client-intake-agent`
2. Current Site Audit, Sitemap And Redirect Agent — `agents/02-site-audit-redirect-agent.md` (spec only)
3. Content Brief Agent — `agents/03-content-brief-agent.md` — `$restoration-content-brief-generator`
4. Copywriting And Localization Agent — `agents/04-copywriting-localization-agent.md` — `$restoration-page-copywriter`
5. Template And Brand Adaptation Agent — `agents/05-design-agent.md` — `$agency-website-design-builder`
6. Astro Build Agent — `agents/06-astro-build-agent.md` — `$agency-astro-site-builder`
7. SEO, Tracking And QA Agent — `agents/07-qa-agent.md` (spec only)
8. Launch, Tracking And Handoff Agent — `agents/08-launch-handoff-agent.md` (spec only)
9. Design Review Agent (planned, Phase 3) — independent visual reviewer between build and human approval.

Orchestration: `$agency-new-client-website` (the conductor skill) runs stages 1-8 in order,
invoking stage skills where they exist and pausing at every human approval gate.

## Execution Order And Parallelism

The old model was strictly serial (1 → 2 → 3 → 4 → 5 → 6 → 7 → 8). The dependency graph is actually looser. Run it in stages:

```text
Stage A  Intake
         └─ 1. Client Intake Agent
            Gate: Verified Intake Status = Verified AND AI Intake Validation Status = Passed

Stage B  Mapping (parallel)
         ├─ 2. Site Audit / Redirect Agent  → Existing Site Crawl, Redirect Map
         └─ 3. Content Brief Agent          → Active Page Map briefs, Brief Assignments
            Gate: Active Page Map approved; redirect decisions exist for rebuilds

Stage C  Content and design (parallel)
         ├─ 4a. Copywriting Agent → Homepage Messaging Pack   (first deliverable)
         ├─ 4b. Copywriting Agent → Final Page Copy per page  (as briefs allow)
         └─ 5.  Design Agent      → Design Recipe + Design Brief
                Non-homepage pattern work may start in Draft; homepage design starts
                only when the Homepage Messaging Pack is Approved and brand tokens exist.
                Does NOT wait for all long-form page copy.
            Gate: Messaging Pack approved; Design Recipe valid; rubric has no Fail areas

Stage D  Build
         └─ 6. Astro Build Agent → Build Summary, Validation Results
            Gate: recipe + final copy for the pages in scope; critical blockers resolved or accepted

Stage E  Review and launch
         ├─ 9. Design Review Agent (Phase 3) → visual review loop with builder, max 3 rounds
         ├─ 7. QA Agent → QA Report (pre-launch)
         └─ 8. Launch Agent → Launch Report, Post-Launch QA, Handoff Packet
            Gate: human approval; no red blockers unless explicitly accepted
```

Rules:

- Final build (Stage D) does not begin until the active page map, brief assignments, final page copy for in-scope pages, design recipe, and critical blockers are resolved or explicitly accepted.
- Any agent may draft recommendations from incomplete inputs, but must label the output `Draft` and list blockers (`CORE_CONTRACTS.md §2, §4`).

## Handoff Artifact Map

Each handoff is a structured artifact, not prose in a chat message. Formats live in `schemas/`.

| Artifact | Produced by | Consumed by | Schema |
|---|---|---|---|
| Verified Intake Summary + Blockers | 1 Intake | 2, 3, 4, 5 | (prose for now — schema TODO) |
| Active Page Map | 1 Intake + 3 Brief | 2, 4, 5, 6, 7 | `schemas/active-page-map.yaml` |
| Redirect Map | 2 Audit | 6, 7, 8 | (tab in Local SEO Sheet for MVP) |
| Brief Assignments | 3 Brief | 4, 6 | (matrix in master sheet for MVP) |
| Homepage Messaging Pack | 4 Copywriting | 5 Design, 6 Build, 7 QA | `schemas/messaging-pack.yaml` |
| Final Page Copy | 4 Copywriting | 6 Build, 7 QA | `schemas/final-page-copy.yaml` |
| Design Recipe | 5 Design | 6 Build, 7 QA, 9 Review | `schemas/design-recipe.yaml` |
| Design Brief (prose companion to the recipe) | 5 Design | 6 Build | per agent spec |
| Build Summary + Validation Results | 6 Build | 7 QA, 9 Review | per agent spec |
| QA Report | 7 QA | 8 Launch, human | per agent spec |
| Launch Report + Handoff Packet | 8 Launch | human, AM | per agent spec |

A handoff that fails its schema is `Blocked`, not "close enough." The receiving agent rejects it back to the producer with the exact missing/invalid fields.

These checks are ENFORCED IN CODE, not just described: `starter/scripts/validate-artifacts.mjs` validates the messaging pack, design recipe, and active page map (run via `npm run check` or `npm run validate:artifacts`; client builds place artifacts in `starter/artifacts/`). Every producing agent runs it on its own artifact before handing off; every consuming agent runs it before accepting. Added 2026-08-28 after the first pilot shipped a homepage H2 without its local target — the rule existed in prose in one stage's skill while the artifact was produced by a different stage, and no code bridged them. `starter/scripts/validate-built-html.mjs` (`npm run check:built`) extends the same principle to the BUILT site: it fails any page rendering two process narratives (§12 precedence) or §7 banned/placeholder language — the class of bug where two authorities are each correct in isolation and the failure only exists in the assembled artifact (added 2026-08-28 after the pilot duplicated the process section on all four parent hubs).

## The Messaging Pack Rule

The Homepage Messaging Pack is the wiring that keeps internal planning language off customer pages:

- The Copywriting Agent produces it from verified intake and approved claims, before homepage design starts.
- The Design Agent arranges approved copy; it may request missing fields but never invents customer-facing copy.
- The Astro Build Agent places approved copy; it never rewrites or invents it.
- The QA Agent (and Design Review Agent) validate rendered homepage text against the pack and the banned-language rules (`CORE_CONTRACTS.md §7`).

## QA Ownership

- The builder runs its own validation commands and captures screenshots, but is never the final visual approver (`CORE_CONTRACTS.md §24`).
- Visual approval comes from the Design Review Agent (once built) and then the human. Until the Design Review Agent exists, the human is the visual gate.
- The review loop is bounded: builder ↔ reviewer for at most 3 rounds, then escalate to the human with the rubric, screenshots, and the unresolved misses.

## Rejection Encoding Rule

When a human rejects work or corrects a recurring problem, the fix must be encoded in the most durable layer available — prose rules are the last resort, not the default:

1. **Component or token change** in the starter (best — the mistake becomes impossible).
2. **Validator or QA check** (the mistake becomes automatically detected).
3. **Schema field** (the decision becomes required input).
4. **Prose rule** in `CORE_CONTRACTS.md` or one agent spec (last resort — record why options 1-3 don't apply).

Never append a prose rule to more than one file. Never leave the fix only in a client project's docs — promote it to the system level in the same pass.

Why this rule exists: between 2026-06-04 and 2026-06-11 the Green State homepage took 10 human feedback passes, and each pass added prose rules to three different documents. Rules-as-prose grow without bound and agents comply with them less as the corpus grows. Rules-as-code cannot be violated.

## Stage Gates Summary

- `Intake`: AM verified + AI validated.
- `Sitemap Review`: active page map approved; redirect decisions for valuable old URLs (rebuilds).
- `Content`: messaging pack approved; final copy has no unsupported claims.
- `Design`: recipe valid; Premium Visual Acceptance Rubric has no `Fail`; human approves direction.
- `Build`: validation commands pass; navigation-inclusion and schema decisions recorded for every new page.
- `Pre-Launch QA`: full checklist per QA agent spec; no red blockers unless accepted.
- `Launch`: explicit owner approval.
- `Post-Launch QA`: live crawl, redirects, forms, tracking events, sitemap submission.
- `Handoff`: packet complete.

## Human Approval Points

Automation never silently approves: claims, licensed services, page deletions, redirect decisions for valuable old URLs, client-requested custom pages, tracking setup, homepage visual direction, or launch.
