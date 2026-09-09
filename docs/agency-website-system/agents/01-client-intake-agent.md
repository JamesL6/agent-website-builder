# Client Intake Agent (1)

Status: Active
Last updated: 2026-07-07

## Purpose

Convert the account-manager-verified intake into a reliable client profile and website-build instruction set.

Working model: pre-fill first, then ask for confirmation. The account-manager-verified post-call intake (`AM Verified Website Intake`) is the MVP source of truth; the raw onboarding form and current website are pre-fill and discovery signals only (see CORE_CONTRACTS.md §3). A parent service never automatically approves its child services.

## Pipeline Position

Stage A of the pipeline (see PIPELINE.md). No agent runs before this one. Stage gate: `Verified Intake Status = Verified` AND `AI Intake Validation Status = Passed`.

- Consumes: the AM-verified intake tab and supporting client sources (see Inputs). No upstream agent handoff.
- Produces: `Verified Intake Summary + Blockers` (prose for now — schema TODO), consumed by agents 2, 3, 4, and 5.
- Co-produces: the `Active Page Map` with the Content Brief Agent (3), in the format in `schemas/active-page-map.yaml`, consumed by agents 2, 4, 5, 6, and 7. This agent contributes the intake-derived fields: page eligibility from the verified service matrix, `primary_service_page_target_area`, client-requested pages, excluded pages with reasons, and per-page blockers.
- Downstream agents may draft recommendations from incomplete intake, but must label the output `Draft` and list blockers (see CORE_CONTRACTS.md §2, §4).

## Owner

The account manager is the only role responsible for filling out and changing the `AM Verified Website Intake` tab during the MVP. Other roles may review, comment, or ask for clarification, but they must not change verified intake decisions unless the account manager confirms the update.

The tab:

- Lives inside the client's existing per-client Local SEO Sheet by default. Use a standalone website-intake sheet only when the client has no Local SEO Sheet, the website project is handled separately from local SEO, the Local SEO Sheet has restricted visibility, or a temporary pilot needs isolation.
- Is generated from the master `AM Verified Website Intake - Template` (standard sections, column names, dropdown values, required fields, notes/help text, version number, last updated date). The master template updates future clients automatically; existing client sheets are updated intentionally through a migration step that preserves existing answers — never silently.
- Sections: Call Status, Client Basics, Default Pages, Parent Service Categories, Conditional Sub-Service Matrix, City / Service Area Decisions, Primary Service Page Target Area, Claims And Proof, Client-Requested Pages, Design Requests, Tracking And Access, Assets Needed, Final Verification.

The account manager confirms decisions; this agent converts them into build instructions. The AM does not write the final sitemap manually, pick content briefs, write SEO titles or meta descriptions, decide every internal link, or create redirect maps (except to correct agent recommendations).

## Inputs

- Client Local SEO Sheet URL.
- `AM Verified Website Intake` tab.
- Raw GoHighLevel onboarding form, if pasted/exported — pre-call context only.
- Onboarding call notes, if available.
- Current website URL.
- GBP, social, and profile URLs, if available.
- Uploaded client assets, if available.
- Industry master template.

Handoff into this agent: the AM sends the Google Sheet URL with the instruction `Use AM Verified Website Intake as the source of truth.` If Drive access is unavailable, the fallback is an exported or pasted CSV of the tab. Long chat messages are not an acceptable primary handoff.

## Required Checks

- Confirm `Verified Intake Status`.
- Confirm `AI Intake Validation Status`, if present.
- Read template version and generated date.
- Confirm required client basics are present.
- Confirm at least one parent service is selected.
- Confirm child service rows do not contradict parent service rows.
- Confirm service area and priority city fields are present when city pages are requested.
- Confirm `Primary Service Page Target Area` is present for root/non-city service pages.
- Confirm claims have proof or are marked not allowed in copy (claim states: CORE_CONTRACTS.md §6).
- Confirm tracking/access/assets status.

## Verification Model

Two-part verification. Ownership and the two-status gate are defined in CORE_CONTRACTS.md §3: the account manager controls `Verified Intake Status`, the AI controls `AI Intake Validation Status`, and final downstream build work requires both `Verified` and `Passed`.

Recommended field values (these are intake-tab field statuses; handoff statuses are CORE_CONTRACTS.md §4):

- `Verified Intake Status`: `Draft`, `In Call`, `Needs Follow-Up`, `Verified`, `Blocked`.
- `AI Intake Validation Status`: `Not Checked`, `Passed`, `Blocked`, `Warnings`.

The account manager marks the intake `Verified` when the client decisions are final enough to proceed. The AI then validates the tab. If the AI finds missing or contradictory data, it sets the validation result to `Blocked` or `Warnings` and produces exact follow-up questions for the account manager.

## Execution Steps

1. Read the `AM Verified Website Intake` tab.
2. Create a source snapshot (CORE_CONTRACTS.md §2).
3. Crawl the current website, if available, to generate candidate observations only.
4. Normalize client basics.
5. Normalize parent services and sub-services.
6. Classify each service as `Build`, `Mention Only`, `Do Not Mention`, `Needs Follow-Up`, or `Future`.
7. Normalize service areas and city priorities.
8. Confirm the largest approved service area to target on root/non-city service pages.
9. Extract approved claims and blocked claims.
10. Extract client-requested pages and design exceptions.
11. Compare the current-website observations against AM-verified answers and flag mismatches.
12. Produce an AM summary and blocker report.
13. Hand off only when the intake is AM-verified and AI-validated, or clearly marked as draft/review-only.

### Reading The Service Decision Matrix

Treat the tab as structured instructions, not loose notes. Matrix columns: Service Category, Sub-Service, Offer Status, In-House / Partner, Residential / Commercial, Promote On Website, Build Dedicated Page, Build City-Service Pages, Notes, Verified By, Verified Date.

Allowed values:

- `Offer Status`: `Yes`, `No`, `Limited`, `Partner`, `Unknown`, `Needs Follow-Up`.
- `Promote On Website`: `Yes`, `Mention Only`, `No`, `Future`.
- `Build Dedicated Page`: `Yes`, `No`, `Use Parent Page`, `Needs SEO Review`.

Interpretation rules:

- Required default pages are included automatically unless marked as an exception: Home, Contact, About, Reviews, main services overview, service area page, privacy policy, and terms/legal page when required. The AM only flags exceptions or special requests for these.
- Parent service `Offer Status = Yes` activates the parent hub recommendation.
- Parent service `Offer Status = No` blocks the parent hub and child pages unless a child has a clear exception.
- Child service `Offer Status = Yes` with `Build Dedicated Page = Yes` becomes a candidate service page.
- `Promote On Website = Mention Only`: mention on parent/related pages; no standalone page.
- `Offer Status = Partner`: requires partner/disclaimer language and must not imply in-house service.
- `Offer Status = Limited`, `Unknown`, or `Needs Follow-Up`: a blocker or review item, never a final build instruction.
- `Build City-Service Pages = Yes` allows city-service generation only when the service and the city are both approved.
- Root/non-city service pages use `Primary Service Page Target Area` — the largest approved area the client services, unless the AM or SEO owner approves a different strategy.
- Client-requested pages are compared against the master page map before being accepted.
- Claims are used only when they are marked verified or proof is supplied (CORE_CONTRACTS.md §6).
- When a service is marked not offered/not promoted but the old site has a URL for it, flag a redirect/noindex decision for the Site Audit Agent (2).

## Current Website Crawl Behavior

The agent may crawl the current website before or after the onboarding call. The website is a candidate signal only (CORE_CONTRACTS.md §3).

Allowed uses:

- Suggest services the AM may want to verify.
- Detect current phone numbers, locations, service areas, forms, claims, reviews, and existing pages.
- Surface conflicts between current website copy and AM-verified answers.

Not allowed:

- Do not override AM-verified answers.
- Do not treat website copy as proof that the client still offers a service.
- Do not approve claims found on the website without verification.
- Do not final-select pages from the website crawl alone.

## Rebuild Branch (former Stage 2, merged 2026-09-09)

When the client has a current website (URL supplied — never assumed), intake also produces the migration inputs:

1. Crawl the current site per the procedure in `agents/02-site-audit-redirect-agent.md` (sitemap discovery, linked pages, status codes, canonicals, titles).
2. Classify every existing URL: keep, rewrite, merge, redirect, noindex, remove, or unknown (`Needs SEO Review`).
3. Produce the `Redirect Map` as `artifacts/redirect-map.yaml` (`schemas/redirect-map.yaml`): every 301 destination must exist in the active page map; deliberate 404s are listed with a reason; no chains. `npm run validate:artifacts` checks it.
4. Redirect decisions for valuable old URLs are a human approval point (Stage B gate). No launch without them.

When the human confirms there is no existing site, record `No existing site` and skip this branch.

## Unknown Handling

The MVP does not proceed with `Unknown` values for build-critical decisions.

- If a selected parent service is `Unknown`, block the handoff.
- If a selected child service is `Unknown` or `Needs Follow-Up`, block dedicated pages and city-service pages for that child service.
- If `Primary Service Page Target Area` is unknown, block root/non-city service page copy until the AM or SEO owner confirms it.
- If a claim required for copy is `Unknown`, block claim usage and list the follow-up question.
- If tracking, form routing, or launch-critical access is `Unknown`, flag it as a launch blocker.
- Optional unselected services can remain `No`, `Not Applicable`, or blank if the template clearly marks them as not selected.

Every blocker names who must resolve it; the default owner is the account manager (CORE_CONTRACTS.md §2).

## Outputs

- `Client Profile`
- `Verified Service Matrix`
- `Approved Claims Matrix`
- `Service Area Matrix`
- `Primary Service Page Target Area`
- `Client-Requested Pages`
- `Design Requests`
- `Tracking And Access Status`
- `Build Blockers`
- `AM Summary`
- `Current Website Candidate Observations`
- `Source Conflicts`
- `Active Page Map` — co-produced with the Content Brief Agent (3), per `schemas/active-page-map.yaml`
- `Redirect Audit Request` — current-site crawl needs and old URLs to map, for the Site Audit Agent (2)

Every handoff also carries the shared contract items — `Source Snapshot`, `Assumptions`, `Blockers`, `Decisions Made`, `Handoff Output`, `Residual Risks` (CORE_CONTRACTS.md §2).

Deferred to the roadmap, not MVP outputs: an auto-generated client-facing intake/sitemap summary (only after the internal intake workflow is proven), and direct GoHighLevel import if it saves enough AM time. Imported form data would still stay `Unverified` until the account manager confirms it after the onboarding call.

## Approval Gate

Downstream agents can draft recommendations from incomplete intake, labeled `Draft` with blockers listed (CORE_CONTRACTS.md §2, §4). Final build work requires both gate statuses per CORE_CONTRACTS.md §3:

- `Verified Intake Status = Verified`
- `AI Intake Validation Status = Passed`

The AI never marks `Verified Intake Status`; that field is owned by the account manager (CORE_CONTRACTS.md §3).

## Never Do

- Do not treat the raw GoHighLevel form as final truth.
- Do not approve child service pages because a parent category is approved.
- Do not use unsupported claims in copy (CORE_CONTRACTS.md §6).
- Do not infer licenses, certifications, response times, review ratings, or partner relationships (CORE_CONTRACTS.md §6).
- Do not proceed past intake validation when required values are `Unknown` or contradictory.
- Do not generate a client-facing intake summary in the MVP unless explicitly requested.
