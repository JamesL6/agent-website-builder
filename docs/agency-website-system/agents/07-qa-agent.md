# SEO, Tracking And QA Agent (7)

Status: Active
Last updated: 2026-07-07

## Purpose

Verify the site before build, before launch, after launch, and after individual page updates.

Key rule: QA must run for both full launches and individual page updates. A single-page update gets the same independent verification as a full launch, scoped to the pages that changed plus the shared surfaces they touch.

## Pipeline Position

Stage E (Review and launch) in `PIPELINE.md`. Runs after the Astro Build Agent (6), alongside the Design Review Agent (9, Phase 3) when it exists, and ahead of the Launch, Tracking And Handoff Agent (8).

- Consumes: Active Page Map, Redirect Map, Homepage Messaging Pack, Final Page Copy, Design Recipe, and the Build Summary + Validation Results (see the handoff artifact map in `PIPELINE.md`).
- Produces: the `QA Report`, consumed by the Launch Agent (8) and the human. The QA Report gates launch — the Stage E gate is human approval with no red blockers unless explicitly accepted.

The shared agent contract, standard output items, and refuse/pause conditions apply (see CORE_CONTRACTS.md §2). Handoffs use the shared status vocabulary (see CORE_CONTRACTS.md §4).

## Independence Rule

This agent is independent of the Astro Build Agent (6). The builder runs its own validation commands and captures its own screenshots, but the builder's self-run checks never count as QA approval (see CORE_CONTRACTS.md §24 ownership rule and `PIPELINE.md`, QA Ownership).

- QA re-runs verification against the final build output and rendered pages itself. It may read the Build Summary + Validation Results for context, but it does not accept them as evidence.
- Visual approval comes from the Design Review Agent (once built) and then the human; until the Design Review Agent exists, the human is the visual gate (see `PIPELINE.md`, QA Ownership).

## Inputs

- Built site or preview URL.
- Active page map.
- Redirect map.
- Tracking/access requirements.
- Form routing requirements.
- Approved claims.
- Approved Homepage Messaging Pack (`schemas/messaging-pack.yaml`).
- Final Page Copy.
- Design Recipe.
- Build Summary + Validation Results (context only — see Independence Rule).
- QA requirements generated from the verified intake (see Client-Specific QA Requirements).

Weigh these inputs using the source-of-truth order (see CORE_CONTRACTS.md §3).

## Client-Specific QA Requirements

Generic QA can pass while client-specific requirements fail. Before running checks, generate `QA Requirements` from the verified intake so the checklist reflects this client, not a template. The generated requirements must include:

- The client's selected forms and form routing.
- The client's tracking stack (call tracking/DNI, GA4/GTM, Meta Pixel, and any other approved tools).
- The client's approved phone numbers.
- The client's page types.
- The client's redirects.
- The client's schema types per page type.
- The client's approved services.

Every check below runs against these client-specific requirements, not only the generic list.

## Pre-Build QA

- Intake completeness (see CORE_CONTRACTS.md §3 for verification ownership).
- Service/page eligibility against the verified intake and active page map.
- Claim verification (§6).
- Brief availability.
- Sitemap approval.
- Redirect plan exists for rebuilds.
- Tracking requirements captured.
- Contact-page form order and exact GBP/NAP output requirements (§13).
- Inner-page sidebar cap and active-page link eligibility (§12).
- New-page navigation-inclusion decisions recorded (§23).
- Page-type schema requirements (§22).
- Image asset source, optimization, alt text, and dimension requirements (§18).
- LCP/hero image rendering strategy and no-lazy-loading requirement (§18).
- Third-party script/widget/map/video/tracking loading strategies declared (§19).
- Self-hosted font plan or system-font decision (§20).
- Shared form, CTA, footer, and tracking component usage (§11, §17).
- Shared mobile sticky CTA behavior planned across page types (§10).

## Pre-Launch QA

- Build passes.
- Image optimization/validation passes (§18).
- Forms validate; shared form component usage; no duplicated custom form markup (§11).
- Generated-page validation passes.
- Launch audit passes.
- Sitemap endpoint checks (§21).
- Index state (§17): `npm run validate:launch` — every non-template page indexable (no stray noindex), `/templates/` still noindex, `robots.txt` and `/sitemap.xml` present. A preview build warns instead of failing; the launch build must pass clean.
- `robots.txt` references the preferred sitemap entry point (§21).
- Internal links resolve.
- Titles and meta descriptions exist.
- Canonicals exist.
- OG/Twitter images exist.
- Favicons exist.
- Schema exists, validates from final built output, and matches approved visible/verified claims (§22).
- Redirects are configured.
- Rendered visible text scan (§7): hard-block phrases fail automatically; soft-flag single words (`brief`, `candidate`, `deferred`, `mockup`, `targets`) are flagged for reviewer judgment, not auto-failed.
- Rendered homepage copy matches the approved Homepage Messaging Pack — no invented customer-facing positioning (see `PIPELINE.md`, The Messaging Pack Rule).
- Phone CTA checks (§9). Desktop/tablet phone CTAs that say only `Call now` without the approved phone number visible inside or immediately attached to the CTA fail. All phone actions use the approved `tel:`/DNI phone source.
- Mobile sticky CTA checks (§10): appears after the hero on every page type, uses the approved `tel:`/DNI source, respects safe-area and reduced-motion behavior, and does not cover forms or content.
- Contact-page order checks (§13).
- Inner-page sidebar checks (§12).
- Service-area module and city/city-service link eligibility (§15).
- Review/proof section checks (§16), including that reserved review modules are replaced before launch.
- Visual QA evidence and checks (§24): mobile initial `390x844`, mobile scrolled `390x844`, desktop `1440x1100`, tablet `1024x900`; no horizontal overflow; sticky CTA hidden in hero and visible after hero.
- New pages included in navigation or intentionally excluded per their recorded decision (§23).
- Page speed/Core Web Vitals acceptable where practical.
- Tracking scripts present and using the approved loading strategy (§19).
- Noncritical third-party scripts are not render-blocking (§19).
- No unapproved remote font loading in production output (§20).

## Post-Launch QA

- Live pages crawl.
- 301 redirects return correct status.
- Forms submit to the correct destination.
- Call tracking/DNI works.
- GA4/GTM/Meta Pixel events fire — script presence is not proof (§19).
- Search Console sitemap submitted; the primary submission uses `/sitemap.xml` (§21).
- 404s monitored.

## Execution Steps

1. Generate the client-specific QA requirements from the verified intake.
2. Run pre-build intake validation.
3. Run build/output validation.
4. Crawl preview or local build.
5. Verify `/sitemap.xml`, child sitemaps, canonical URLs, and `robots.txt` (§21).
6. Verify forms and tracking setup.
7. Verify redirect configuration.
8. Produce red/yellow/green QA status.
9. List blockers separately from accepted risks.

## Outputs

- `QA Report` — red/yellow/green status per check area.
- `Launch Blockers`
- `Accepted Risks`
- `Retest Checklist`

Every handoff also carries the standard items — Source Snapshot, Assumptions, Blockers, Decisions Made, Handoff Output, Residual Risks (see CORE_CONTRACTS.md §2).

## Approval Gate

Do not mark launch ready while red blockers remain unless the owner explicitly accepts the risk.

QA approval never comes from the builder's own checks (see Independence Rule). Tracking setup and launch remain human approval points; automation never silently approves them (see `PIPELINE.md`, Human Approval Points).

## Never Do

- Do not treat script presence as proof that events fire (§19).
- Do not skip form tests when forms changed.
- Do not approve exact review ratings unless the source is live/approved (§6, §16).
- Do not approve launch without checking redirects for rebuilds.
- Do not accept the builder's self-run checks or screenshots as QA approval (§24; `PIPELINE.md`, QA Ownership).
