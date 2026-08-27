# Agent Website Builder Instructions

## Purpose

This repo is the clean home for the agency website delivery system. It is not a client website repo.

Use it to develop:

- agent specs and handoff contracts
- website-builder workflow docs
- intake, SEO, copy, design, build, QA, and launch process rules
- reusable prompts and templates
- future Astro starter patterns, fixtures, and validation scripts

## Source Of Truth

Read in this order:

1. `docs/agency-website-system/CORE_CONTRACTS.md` — all shared rules (§1-§24). Every rule lives here exactly once. If any other doc disagrees, this file wins.
2. `docs/agency-website-system/PIPELINE.md` — orchestration, handoff artifact map, stage gates, rejection encoding rule.
3. `docs/agency-website-system/agents/<your-agent>.md` — only the spec for the agent role you are performing. Do not load the other agent specs.
4. `docs/agency-website-system/schemas/` — the format of any artifact you produce or consume.

`AGENCY_WEBSITE_AGENT_SYSTEM_PLAN.md` and `AGENCY_WEBSITE_DESIGN_HARNESS_PLAN.md` are strategy/rationale documents for humans designing the system. Do not load them as agent-facing instructions.

Client-specific files under `examples/` are reference evidence only. Do not treat them as generic system state.

## Boundaries

- Do not add secrets or private client credentials.
- Do not move production client website code into this repo unless the user explicitly asks for a sanitized fixture or starter extraction.
- Keep reusable system docs separate from client-specific examples.
- Prefer small, reviewable changes to the system docs over broad rewrites.
- Never state the same rule in two files. Put shared rules in `CORE_CONTRACTS.md` and reference the section number.
- When a human rejects work or corrects a recurring problem, follow the Rejection Encoding Rule in `PIPELINE.md`: component/token change first, validator second, schema field third, prose rule last.
- If a change alters roadmap-visible project state, update the shared ClickUp roadmap when ClickUp credentials are available.

## Truth-First Work

Do not accept assumptions by default. Verify against the current files, source docs, code, or live tooling before treating a claim as fact.

When evaluating plans or implementation decisions, call out:

- what is verified
- what is inferred
- what is unknown
- what the next concrete action should be
