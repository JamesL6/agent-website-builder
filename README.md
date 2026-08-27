# Agent Website Builder

Clean working repo for the agency website delivery system.

This repo separates the reusable website-builder system from individual client website repos. It holds the agent workflow, execution specs, design harness, templates, prompts, and future starter assets that make local-service website builds repeatable.

## Current Contents

- `docs/PROJECT_STATUS.md` - current project handoff, GitHub/account status, and remaining work.
- `docs/agency-website-system/CORE_CONTRACTS.md` - **single source of truth for all shared rules (§1-§24).** Every rule lives here exactly once; agent specs reference it.
- `docs/agency-website-system/PIPELINE.md` - orchestration: agent sequence, parallelism, handoff artifact map, stage gates, QA ownership, and the rejection encoding rule.
- `docs/agency-website-system/agents/` - one spec file per agent (01-08). Each agent loads only its own spec plus CORE_CONTRACTS and PIPELINE.
- `docs/agency-website-system/schemas/` - structured handoff formats: messaging pack, design recipe, active page map, final page copy.
- `docs/agency-website-system/AGENCY_WEBSITE_AGENT_SYSTEM_PLAN.md` - strategy and rationale (not agent-facing).
- `docs/agency-website-system/AGENCY_WEBSITE_DESIGN_HARNESS_PLAN.md` - design harness strategy and rationale (not agent-facing).
- `docs/agency-website-system/archive/` - superseded documents kept for history.
- `examples/green-state/` - Green State Restoration reference artifacts (example evidence only, not generic system state).

## Agent Sequence

See `docs/agency-website-system/PIPELINE.md` for the full dependency graph and what runs in parallel.

1. Client Intake Agent
2. Current Site Audit, Sitemap And Redirect Agent
3. Content Brief Agent
4. Copywriting And Localization Agent (produces the Homepage Messaging Pack first)
5. Template And Brand Adaptation Agent (produces the Design Recipe)
6. Astro Build Agent
7. SEO, Tracking And QA Agent
8. Launch, Tracking And Handoff Agent
9. Design Review Agent (planned — independent visual reviewer between build and human approval)

## Working Rules

- Shared rules live only in `docs/agency-website-system/CORE_CONTRACTS.md`. Never copy a rule into a second file; reference the section number.
- When a human rejects work, encode the fix per the Rejection Encoding Rule in `PIPELINE.md`: component/token change first, validator second, schema field third, prose rule last.
- Keep reusable system rules in `docs/agency-website-system/`. Keep client-specific artifacts in `examples/` or a dedicated client folder.
- Do not copy a full client site into this repo unless it is intentionally added as a sanitized fixture.
- Do not store secrets, API keys, tokens, client credentials, or private onboarding data in this repo.
- Treat repo markdown as the detailed source of truth. ClickUp can track visual status when configured.
