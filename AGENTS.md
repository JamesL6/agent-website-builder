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
5. `docs/agency-website-system/REFERENCES.md` — WHERE the shared libraries live (master brief sheet, brief Docs, client sheet) and the access-proof rule. A source you cannot open is a hard stop, never an inference.

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

## Shared Working Tree Rules (added 2026-09-09)

Multiple agent sessions (Claude Code and Codex) work in this checkout at the same time. Four
times, a session has rewritten shared files from stale context and silently reverted committed
work — deleting `starter/scripts/validate-built-html.mjs`, stripping `validate:*` entries from
`starter/package.json`, removing `data-section` markers and schema checks. So:

1. **Never write a shared file from memory.** Before editing anything under `starter/scripts/`,
   `starter/package.json`, `starter/src/components/`, `starter/artifacts/`, or `docs/`, run
   `git diff <file>` and re-read the file as it is on disk NOW. Preserve every line you did not
   write. If a file you remember does not match disk, disk wins.
2. **Never delete, weaken, or bypass a validator.** `scripts/validate-artifacts.mjs`,
   `scripts/validate-built-html.mjs`, and the `validate:*` / `check*` npm scripts are committed
   enforcement (PIPELINE.md → Rejection Encoding Rule). A failing validator names a real defect —
   fix the defect. If you believe a check is wrong, leave it in place and raise it with the human.
3. **Commit only your own paths** with targeted `git add <paths>`; never `git add -A` or
   `git commit -a`. `git pull --rebase` before pushing. Do not leave system-level work
   uncommitted for days — it is one stale overwrite away from being lost.
4. **Client sites do not live in `starter/`.** Rule Zero (build skill, step 1): copy `starter/`
   into the client's own repo and build there. `starter/` is the template every future client
   starts from; client data, photos, pages, and themes in it are a defect, not a build.
5. Validation commands, from `starter/`: `npm run check` (artifacts), `npm run check:built`
   (build + built-HTML: process duplication, §7 language, dead links, index state),
   `npm run validate:launch` (pre-launch gate).
