# Current Site Audit, Sitemap And Redirect Agent (2)

Status: Active
Last updated: 2026-07-07

## Purpose

Protect SEO and migration continuity by comparing the existing website against the proposed site.

This agent runs for every website build. If the client has no existing website, the agent records that there is no current site to crawl and outputs a no-existing-site audit result.

Key rule: no launch without redirect decisions for old important URLs.

## Pipeline Position

Stage B (Mapping) in `PIPELINE.md`. Runs in parallel with the Content Brief Agent (3) once the Stage A intake gate has passed.

- Consumes: the Verified Intake Summary and blockers from the Client Intake Agent (1), and the active page map from the intake/page-map process.
- Produces: the `Existing Site Crawl` and the `Redirect Map`, consumed by the Astro Build Agent (6), the SEO, Tracking And QA Agent (7), and the Launch, Tracking And Handoff Agent (8).
- Stage B gate: the active page map is approved and redirect decisions exist for rebuilds.

The shared agent contract, standard output items, and refuse/pause conditions apply (see CORE_CONTRACTS.md §2). Handoffs use the shared status vocabulary (see CORE_CONTRACTS.md §4). This agent inspects and reports on the existing site only; it does not change any site's source code (see CORE_CONTRACTS.md §5).

## Inputs

- `Existing Website?` value from `AM Verified Website Intake`.
- AM-confirmed current live website URL, when one exists.
- Current website URL.
- Current XML sitemap, if available.
- Existing URLs from crawl.
- Search Console URL/export, if available and intentionally provided.
- Active page map from the intake/page-map process.
- Client-requested pages.
- Existing pages discussed during the onboarding call, if captured.

Weigh these inputs using the source-of-truth order (see CORE_CONTRACTS.md §3): the current website is candidate signal only, and verified intake controls what the client actually offers.

## Required Checks

- Confirm `Existing Website? = Yes` or `No`.
- If `Yes`, confirm the account manager verified the current live site URL with the client.
- If `No`, record no current-site crawl needed and skip crawl/redirect discovery.
- If `Yes`, crawl current site when available.
- Discover XML sitemap if available.
- Identify indexable pages, redirects, 404s, canonical URLs, titles, and major content types.
- Compare current URLs against proposed URLs.
- Flag old URLs with no destination.
- Flag crawled URLs that were not listed in the sitemap or discussed during onboarding.

## Execution Steps

1. Read the existing-site fields from `AM Verified Website Intake`.
2. If no existing website exists, produce a no-current-site audit result and skip to handoff.
3. If an existing website exists, confirm the AM-verified live URL is present.
4. Crawl the current site and fetch/discover sitemap URLs.
5. Normalize URL variants.
6. Compare crawled URLs, sitemap URLs, and onboarding-discussed URLs.
7. Classify existing URLs: keep, rewrite, merge, redirect, noindex, remove, or unknown.
8. Compare the existing site to the proposed active page map.
9. Identify content gaps and page conflicts.
10. Produce redirect recommendations.
11. Send unknown/no-match URLs to SEO specialist review.
12. Escalate to the account manager when the decision requires client/business clarification.
13. Require sitemap/redirect approval before build/launch can proceed.

## Crawl Behavior

The agent handles the crawl itself for MVP.

It attempts to collect:

- XML sitemap URLs.
- Linked pages found from navigation, footer, body links, and crawl traversal.
- Status codes.
- Canonicals.
- Titles.
- Meta descriptions.
- H1s when practical.
- Obvious service/location intent.
- Pages not present in the sitemap.

SEMrush may still be used by the team, but the MVP must not depend on SEMrush for basic crawl discovery.

## Onboarding Call Fields

`AM Verified Website Intake` should include:

```text
Existing Website? Yes / No
AM-Confirmed Current Live Site URL
Existing Pages Discussed On Call
Known Pages To Keep
Known Pages To Remove
Known Pages Client Cares About
```

The account manager should confirm the current live site URL with the client during onboarding. This gives the crawl agent a reliable source of truth.

## Unknown URL Handling

If the crawl finds old URLs with no obvious matching new page:

1. Ask the SEO specialist to classify the URL.
2. The SEO specialist can decide if the mapping is obvious.
3. Escalate to the account manager when the decision depends on client intent, service availability, legal/compliance, or whether the page should still exist.
4. Do not silently delete, noindex, or redirect to the homepage unless approved.

Default status for no-match URLs: `Needs SEO Review`.

## Search Console Export Behavior

For MVP, Search Console exports are optional, not required.

If available, they should be used to find URLs Google has seen that a normal crawl may miss, such as:

- Old pages no longer linked from the site.
- URLs with clicks or impressions.
- Indexed pages missing from the sitemap.
- URLs that need high-priority redirect decisions.
- Legacy URLs, parameter URLs, or 404s with search visibility.

If unavailable, the agent proceeds with the live crawl and sitemap inventory, then marks Search Console as a future/optional enhancement.

## Outputs

- `Existing Site Crawl`
- `Current Sitemap Inventory`
- `Gap Analysis`
- `Redirect Map` — includes the keep/rewrite/merge/redirect/noindex/remove/unknown decision for each existing URL (step 7).
- `Page Conflict Notes`
- `Redirect Approval Needs`
- `No Current Site Audit Result`, when no existing website exists
- `SEO Specialist Review Queue`

Every handoff also carries the standard items — Source Snapshot, Assumptions, Blockers, Decisions Made, Handoff Output, Residual Risks (see CORE_CONTRACTS.md §2).

## Approval Gate

The proposed sitemap and redirect map must be approved before continuing to launch. For rebuilds, do not launch until redirect decisions exist for important old URLs or the risk is explicitly accepted.

Redirect decisions for valuable old URLs and page deletions are human approval points; automation never silently approves them (see `PIPELINE.md`, Human Approval Points).

For the MVP, the redirect map lives in the same client Local SEO Sheet as a `Redirect Map` tab.

## Never Do

- Do not delete or ignore old URLs without a decision.
- Do not assume a 301 destination when page intent does not match.
- Do not let client-requested URLs override canonical URL rules without SEO review.
- Do not crawl or map an unverified website URL as the source of truth.
- Do not treat Search Console as required for MVP.
