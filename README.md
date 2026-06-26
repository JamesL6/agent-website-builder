# Agent Website Builder

Clean working repo for the agency website delivery system.

This repo separates the reusable website-builder system from individual client website repos. It should hold the agent workflow, execution specs, design harness, templates, prompts, and future starter assets that make local-service website builds repeatable.

## Current Contents

- `docs/PROJECT_STATUS.md` - current project handoff, GitHub/account status, and remaining work.
- `docs/agency-website-system/AGENCY_WEBSITE_AGENT_SYSTEM_PLAN.md` - full delivery-system strategy and roadmap.
- `docs/agency-website-system/AGENCY_WEBSITE_AGENT_EXECUTION_SPECS.md` - per-agent execution specs, gates, handoff contracts, and failure behavior.
- `docs/agency-website-system/AGENCY_WEBSITE_DESIGN_HARNESS_PLAN.md` - design harness plan for improving visual quality and repeatability.
- `examples/green-state/CURRENT_BUILD_STATE.md` - Green State Restoration project state retained as a reference example.
- `examples/green-state/FRESH_HOMEPAGE_REBUILD_PROMPT.md` - Green State-specific rebuild prompt retained as an example, not a generic instruction.

## Agent Sequence

1. Client Intake Agent
2. Current Site Audit, Sitemap And Redirect Agent
3. Content Brief Agent
4. Copywriting And Localization Agent
5. Template And Brand Adaptation Agent
6. Astro Build Agent
7. SEO, Tracking And QA Agent
8. Launch, Tracking And Handoff Agent

## Working Rules

- Keep reusable system rules in `docs/agency-website-system/`.
- Keep client-specific artifacts in `examples/` or a dedicated client folder.
- Do not copy a full client site into this repo unless it is intentionally added as a sanitized fixture.
- Do not store secrets, API keys, tokens, client credentials, or private onboarding data in this repo.
- Treat repo markdown as the detailed source of truth. ClickUp can track visual status when configured.
