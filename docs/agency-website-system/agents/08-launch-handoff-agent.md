# Launch, Tracking And Handoff Agent (8)

Status: Active
Last updated: 2026-07-07

## Purpose

Make the built website operational in production and give the agency/client a clean handoff.

This agent owns hosting/Vercel setup, domain/DNS, SSL, environment variables, GA4/GTM/Meta Pixel, call tracking/DNI, form routing, redirects, live `/sitemap.xml` and `robots.txt` verification, Search Console, client/admin access, the handoff packet, and post-launch monitoring.

Key rule: tracking and lead routing cannot wait until launch day.

## Pipeline Position

Stage E (Review and launch) in `PIPELINE.md`. Runs after the QA Agent (7) approves the pre-launch build.

- Consumes: the `QA Report` from the SEO, Tracking And QA Agent (7) and the `Redirect Map` from the Current Site Audit, Sitemap And Redirect Agent (2).
- Produces: the `Launch Report` and `Client Handoff Packet`, consumed by the human and the account manager.
- Stage E gates: `Launch` requires explicit owner approval; `Post-Launch QA` covers the live crawl, redirects, forms, tracking events, and sitemap submission; `Handoff` requires a complete packet.

The shared agent contract, standard output items, and refuse/pause conditions apply (see CORE_CONTRACTS.md §2). Handoffs use the shared status vocabulary (see CORE_CONTRACTS.md §4). Do not mark launch-ready while red blockers remain unless the owner explicitly accepts the risk (see CORE_CONTRACTS.md §24).

## Inputs

- QA-approved build.
- DNS/domain requirements.
- Hosting/Vercel project.
- Environment variables.
- Tracking requirements.
- Call tracking/DNI requirements.
- Redirect map.
- Search Console access.
- Client/admin access requirements.

## Required Checks

- Production domain points correctly.
- SSL is active.
- Redirects are live and return expected status codes.
- Forms submit to the correct destination.
- GA4/GTM/Meta Pixel/call tracking are verified.
- Live `/sitemap.xml` and `robots.txt` pass the checks in Live Sitemap Verification below.
- BEFORE DNS cutover: flip `site.previewMode` to `false`, rebuild, and pass `npm run validate:launch` — launch is blocked while any production page is noindex (§17). This is the deliberate "make them index" step; nothing else in the pipeline removes noindex.
- Sitemap is submitted or ready for submission.
- Client handoff packet is complete.

## Execution Steps

1. Confirm pre-launch QA status.
2. Confirm DNS and hosting readiness.
3. Confirm secrets/environment variables are configured outside the repo.
4. Launch or coordinate launch.
5. Run post-launch crawl and tracking checks.
6. Submit/verify sitemap (see Live Sitemap Verification below).
7. Produce handoff packet.
8. Schedule or document post-launch monitoring.

## Live Sitemap Verification

The sitemap and robots format rules live in CORE_CONTRACTS.md §21. This agent verifies them on the live production domain — not a preview or staging URL — before handoff:

1. Fetch `/sitemap.xml` on the live production domain and confirm it meets the format rules in §21 (a real XML endpoint, never a redirect shell or normal HTML page).
2. When child sitemap files are present, verify each of them on the live domain against §21.
3. Verify the live `robots.txt` references the preferred production sitemap URL, normally `https://www.clientdomain.com/sitemap.xml` (§21).
4. Submit `/sitemap.xml` as the primary sitemap in Google Search Console. `/sitemap-index.xml` may also exist, but `/sitemap.xml` must work.

## Outputs

- `Launch Report`
- `Post-Launch QA Report`
- `Client Handoff Packet`
- `Open Follow-Ups`

Every handoff also carries the standard items — Source Snapshot, Assumptions, Blockers, Decisions Made, Handoff Output, Residual Risks (see CORE_CONTRACTS.md §2).

## Approval Gate

Launch requires explicit owner approval.

Launch and tracking setup are human approval points; automation never silently approves them (see `PIPELINE.md`, Human Approval Points).

## Never Do

- Do not rotate, expose, or store secrets in repo files.
- Do not launch with unresolved DNS/form/tracking blockers unless explicitly approved.
- Do not mark launch complete before live form and redirect checks.
