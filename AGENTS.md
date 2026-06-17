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

Start with:

- `docs/agency-website-system/AGENCY_WEBSITE_AGENT_SYSTEM_PLAN.md`
- `docs/agency-website-system/AGENCY_WEBSITE_AGENT_EXECUTION_SPECS.md`
- `docs/agency-website-system/AGENCY_WEBSITE_DESIGN_HARNESS_PLAN.md`

Client-specific files under `examples/` are reference evidence only. Do not treat them as generic system state.

## Boundaries

- Do not add secrets or private client credentials.
- Do not move production client website code into this repo unless the user explicitly asks for a sanitized fixture or starter extraction.
- Keep reusable system docs separate from client-specific examples.
- Prefer small, reviewable changes to the system docs over broad rewrites.
- If a change alters roadmap-visible project state, update the shared ClickUp roadmap when ClickUp credentials are available.

## Truth-First Work

Do not accept assumptions by default. Verify against the current files, source docs, code, or live tooling before treating a claim as fact.

When evaluating plans or implementation decisions, call out:

- what is verified
- what is inferred
- what is unknown
- what the next concrete action should be
