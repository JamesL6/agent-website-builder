# Current Build State

Project: Green State Restoration
Status: New homepage rebuild preview running, feedback pass 9 applied, pending human visual approval
Last updated: 2026-06-11

## Current Stage

Homepage Rebuild Preview.

The latest homepage was rebuilt from the visual evidence brief and is now running locally for human review. Do not treat it as approved until James confirms the visual direction.

- `docs/design/GREEN_STATE_HOMEPAGE_REBUILD_BRIEF.md`

Current local preview URL:

- `http://localhost:5177/`

## What Is Still Useful

- Agency website system docs are copied into this project:
  - `docs/agency-website-system/AGENCY_WEBSITE_AGENT_SYSTEM_PLAN.md`
  - `docs/agency-website-system/AGENCY_WEBSITE_AGENT_EXECUTION_SPECS.md`
- Global skills to use:
  - `$agency-website-design-builder`
  - `$restoration-content-brief-generator`
  - `$restoration-page-copywriter`
- Client/intake source docs remain useful:
  - `docs/client-intake/CLIENT_INTAKE_SOURCE_EXTRACT.md`
  - `docs/client-intake/BRAND_GUIDELINES_SOURCE_EXTRACT.md`
  - `docs/client-intake/ACTIVE_PAGE_MAP_RECOMMENDATION.md`
  - `docs/client-intake/SERVICE_PAGE_BRIEF_INVENTORY.md`
- Brand palette from the supplied Green State PDF remains the controlling color source:
  - `#3F3F3F`
  - `#5C5C5C`
  - `#3AA156`
  - `#21472A`
- The active page-map strategy remains: Seattle-focused root service pages first; city pages and city-service pages deferred pending client/account-manager decision.
- `src/data/site.ts` remains as a reusable data source, but all values must still be checked against the intake docs before production use.

## Latest Fresh Build

Production-target Astro homepage route rebuilt from scratch:

- `src/pages/index.astro`
- `src/layouts/BaseLayout.astro`
- `src/components/SiteHeader.astro`
- `src/components/RequestServicePanel.astro`
- `src/components/StickyMobileCTA.astro`
- `src/components/SiteFooter.astro`
- `src/styles/global.css`

The mobile sticky CTA is mounted from the shared layout/shell and exposes `[data-mobile-sticky-cta]`.
The homepage hero exposes `[data-page-hero]`.

Validation completed on 2026-06-04:

- `npm run check`: passed
- `npm run build`: passed
- Local preview URL: `http://localhost:4321/`
- Desktop screenshot: `/tmp/green-state-home-desktop-1440x1100.png`
- Tablet screenshot: `/tmp/green-state-home-tablet-1024x900.png`
- Mobile initial screenshot: `/tmp/green-state-home-mobile-initial-390x844.png`
- Mobile scrolled screenshot: `/tmp/green-state-home-mobile-scrolled-390x844.png`
- No-horizontal-overflow check: passed for 1440x1100, 1024x900, 390x844 initial, and 390x844 scrolled.
- Sticky CTA hidden in hero: passed.
- Sticky CTA visible after hero scroll: passed.

Human approval is still required before this homepage direction is treated as approved.

The current `src/pages/index.astro` is the active rebuild preview. It should still be revised based on James's visual feedback.

Latest validation completed on 2026-06-11:

- `npm run check`: passed
- `npm run build`: passed
- Local preview URL: `http://localhost:5177/`
- Desktop screenshot: `docs/design/evidence/green-state-rebuild-home-desktop-1440x1100-v2.png`
- Desktop midpage screenshot: `docs/design/evidence/green-state-rebuild-home-desktop-y900.png`
- Mobile initial screenshot: `docs/design/evidence/green-state-rebuild-home-mobile-390x844.png`
- Mobile scrolled screenshot: `docs/design/evidence/green-state-rebuild-home-mobile-scrolled-390x844.png`
- Mobile sticky after hero screenshot: `docs/design/evidence/green-state-rebuild-home-mobile-sticky-after-hero-390x844.png`
- No-horizontal-overflow check: passed for mobile 390x844.
- Sticky CTA hidden while the hero remains in view: passed.
- Sticky CTA visible after hero scroll: passed.
- Remote Google Font references removed from production source: passed.
- Customer-visible internal design/planning phrases removed from `src/`: passed.

Feedback pass 1 applied on 2026-06-11:

- Desktop header changed to fixed/sticky conversion header.
- Desktop phone CTA kept more prominent than request-service CTA.
- Mobile header changed to logo, tap-to-call button, and menu button.
- Mobile menu verified open.
- Hero trust bullets moved higher in the hierarchy.
- Desktop H1 kept to a controlled three-line layout.
- Request form updated to include name, phone, email, service need, city or ZIP, and additional information.
- Request form now explains 24/7 emergency calls and one-business-day online request callback expectation.
- Form layout revised so city or ZIP is paired with email instead of floating alone.

Latest feedback-pass evidence:

- Desktop screenshot: `docs/design/evidence/green-state-feedback-pass-desktop-1440x1100-v3.png`
- Desktop scrolled sticky-header screenshot: `docs/design/evidence/green-state-feedback-pass-desktop-scrolled-1440x1100-v2.png`
- Mobile screenshot: `docs/design/evidence/green-state-feedback-pass-mobile-390x844.png`
- Mobile menu-open screenshot: `docs/design/evidence/green-state-feedback-pass-mobile-menu-open-390x844.png`

Feedback pass 2 applied on 2026-06-11:

- Desktop hero H1 revised to explicit line groups instead of uncontrolled browser wrapping.
- Desktop H1 target is two controlled lines on wide screens:
  - `Western Washington's`
  - `Emergency Restoration Team`
- The H1 no longer uses viewport-width font scaling. It uses fixed breakpoint sizing plus no-wrap protection for the service phrase on desktop.
- Request-form emergency notice contrast increased. Do not use muted gray helper text on dark, green, or gradient backgrounds for urgent form messaging.
- Mobile header revised to the required conversion-service pattern:
  - Tap-to-call button on the left.
  - Logo centered.
  - Menu button on the right.
- Agency design rules and Green State project rules were updated so future service-business sites use the same H1 wrapping, form readability, and mobile-header requirements.

Feedback pass 2 validation:

- `npm run check`: passed
- `npm run build`: passed
- Validation was run with bundled Node via `PATH=/Users/jameslarosa/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH`. The default shell Node may be too old for Astro.
- H1 line-count check at `1440x1100`: passed, no overflow.
- H1 line-count check at `2560x1400`: passed, no overflow.
- Mobile header alignment check at `390x844`: passed, logo centered with `0px` offset, call left, and menu right.

Feedback pass 2 evidence:

- Desktop screenshot: `docs/design/evidence/green-state-headline-mobile-header-fix-desktop-1440x1100.png`
- Wide desktop screenshot: `docs/design/evidence/green-state-headline-fix-wide-2560x1400.png`
- Mobile screenshot: `docs/design/evidence/green-state-mobile-header-order-fix-390x844.png`

Feedback pass 3 applied on 2026-06-11:

- Hero market language changed from `Western Washington's` to `Greater Seattle Area's`.
- Utility strip, hero copy, metadata, footer, and service-area section updated to reference `Greater Seattle Area`, `Western Washington`, and `Northern Washington`.
- Hero trust/checkmark bullets shortened and moved directly under the H1 so they load above the fold on desktop and mobile.
- The customer-facing proof/review section was rewritten to remove internal design strategy language such as `phone CTA stays visible near urgent decision points`.
- Service-area module replaced the fake decorative CSS map with a real Leaflet/OpenStreetMap component:
  - Component: `src/components/ServiceAreaMap.astro`
  - Dependency: `leaflet`
  - Type dependency: `@types/leaflet`
  - Loading strategy: initializes with `IntersectionObserver` when the map is near viewport.
- Service-area county summaries now use `communities` instead of the internal word `targets`.
- Shared design rules and Green State project rules were updated:
  - Above-fold hero trust bullets are required.
  - Local-service service-area modules should use a real scalable map pattern, typically Leaflet/OpenStreetMap unless another provider is approved.
  - Internal SEO/planning words like `targets`, `page map`, `proof plan`, `approved rollout`, and `candidate` must not render to customers.

Feedback pass 3 validation:

- `npm run check`: passed
- `npm run build`: passed
- Source scan: no customer-facing `targets`, old internal CTA strategy copy, or old `Seattle and Western Washington` market wording found in `src/`.
- Browser DOM check at `1440x1100`: hero trust/checkmark block was above the fold, no horizontal overflow, no rendered `targets`.
- Browser DOM check at `390x844`: hero trust/checkmark block was above the fold, primary CTA started above the fold, no horizontal overflow.
- Browser DOM check at service-area section: Leaflet initialized, OSM tiles loaded, service-area text used `communities`, and no rendered `targets`.
- Pass-3 screenshot capture was attempted but the in-app browser tab detached during capture. Re-capture screenshots before treating pass 3 as final visual QA evidence.

Feedback pass 4 applied on 2026-06-11:

- Service-area city pills removed entirely.
- Service-area section now models the intended county -> city hub -> city-service page structure:
  - County dropdowns expose cities.
  - Each city name links to the general city hub route, such as `/service-areas/washington/arlington/`.
  - Each city row has a separate `City services` dropdown.
  - City-service links are generated from shared `site.cityServicePages`, such as `/service-areas/washington/arlington/water-damage-restoration/`.
- Green State currently renders 6 county groups, 81 city rows, 81 city-service dropdowns, and 486 city-service links in the service-area section.
- Added explicit design-system rules for this pattern:
  - Service-area sections are internal-link modules, not only maps.
  - Default structure is county/state selector -> city hub link -> expandable city-service links.
  - Do not duplicate cities as decorative pills when the accordion/list already exposes them.
  - Production links should not point to missing city/city-service routes unless those routes exist or the generated-route plan is approved.
  - Alternate design option is `Regional Service Explorer`: real map plus segmented county/state browser and optional city search/filter.

Feedback pass 4 validation:

- `npm run check`: passed
- `npm run build`: passed
- Dependency repair note: the default shell `npm` is v6 and temporarily rewrote `package-lock.json` to lockfile v1 while adding Leaflet dependencies. `npm install --package-lock-only` was rerun with nvm Node `v22.9.0` / npm `10.8.3` to restore `package-lock.json` to lockfile v3. Final validation still uses bundled Node `v24.14.0` because Astro requires `>=22.12.0`.
- Browser DOM check at service-area section: Leaflet initialized, no `.area-pills`, no rendered `targets`, 6 county groups, 81 city rows, 486 city-service links, and no horizontal overflow.
- Service-area screenshot: `docs/design/evidence/green-state-service-area-city-service-links-1440x1100.png`

Feedback pass 5 applied on 2026-06-11:

- Review/proof rules were checked. The design-system rules already required a homepage review/proof section and required a real widget when available.
- Implementation issue found: the homepage still rendered a generic trust/proof block because the real review widget source was treated as missing.
- The provided Elfsight All-in-One Reviews snippet is now implemented through a reusable Astro component:
  - `src/components/ReviewWidget.astro`
  - Elfsight platform script loads with `async`.
  - Widget container uses `data-elfsight-app-lazy`.
- Homepage review section now uses the real review widget instead of the old `proof-ledger` content.
- Shared design rules were tightened so future agents must replace reserved review states when a widget snippet, app ID, embed source, or approved review source exists.
- Schema guardrail remains: do not add `Review` or `AggregateRating` schema from the widget alone unless exact review/rating data is verified, visible, and defensible.

Feedback pass 5 validation:

- `npm run check`: passed
- `npm run build`: passed
- Browser DOM check at `http://localhost:5177/`: passed
  - Elfsight script present.
  - Elfsight script uses `async`.
  - Widget container present.
  - Widget container uses `data-elfsight-app-lazy`.
  - Old `.proof-ledger` section removed.
  - Old generic trust/proof copy removed.
  - No horizontal overflow.
- Review-section screenshot: `docs/design/evidence/green-state-homepage-elfsight-reviews.png`

Feedback pass 6 applied on 2026-06-11:

- Homepage review layout changed from split column to stacked full-width:
  - Review intro/copy appears above.
  - Real Elfsight review widget renders full row width below the copy.
- Service-area layout changed from short-copy/tall-map split columns to stacked full-width:
  - Text intro row appears above.
  - Map/explorer row appears below.
  - County/city/city-service link module stays inside the full-width map/explorer card.
- Expanded county city lists now use controlled height and internal scroll so opening a large county does not take over the page.
- Expanded city-service link lists also use controlled height and internal scroll.
- Shared design rules were updated:
  - Homepage review widgets should normally be full-width below intro copy.
  - Large service-area modules should not use lopsided two-column layouts.
  - Long county/city-service expansions require max-height scrolling, filtering, pagination, or progressive disclosure.

Feedback pass 6 validation:

- `npm run check`: passed
- `npm run build`: passed
- Browser layout check at `http://localhost:5177/`: passed
  - Review widget is stacked below review copy.
  - Review widget is full row width.
  - Service-area map/explorer is stacked below service-area copy.
  - Service-area map/explorer is full row width.
  - Open Snohomish County city panel is capped at `520px` with `overflow-y: auto`.
  - No horizontal overflow.
- Review layout screenshot: `docs/design/evidence/green-state-full-width-reviews.png`
- Open service-area screenshot: `docs/design/evidence/green-state-stacked-service-area-open-county.png`

Feedback pass 7 applied on 2026-06-11:

- Homepage social media section added after the real review widget and before the service-area module.
- Social profile data now lives in `src/data/site.ts` as `site.socialLinks` so footer and homepage output share the same source.
- Homepage navigation now includes a `Social` anchor.
- Footer now includes direct social links for YouTube, Instagram, and Facebook.
- Current implementation uses first-party social profile cards with direct outbound links, not embedded live feeds.
- Live social embeds are possible later, but should be treated as a separate performance-approved component because they add third-party scripts, privacy prompts, inconsistent rendering, and possible layout/performance issues.
- Social links can later be considered for `sameAs` schema only after the SEO/build agent confirms the approved production profile URLs.

Feedback pass 7 validation:

- `npm run check`: passed
- `npm run build`: passed
- Production output contains the social section, all three profile links, and all three footer social links.
- Browser DOM check at `http://localhost:5177/#social`: passed
  - Social section exists.
  - 3 homepage social cards render.
  - 3 footer social links render.
  - All cards open in a new tab with `rel="noopener noreferrer"`.
  - No horizontal overflow.
- Mobile DOM/layout check at `390x844`: passed
  - 3 homepage social cards render in one column.
  - Social grid uses one mobile column.
  - No horizontal overflow.
- Social section screenshot: `docs/design/evidence/green-state-social-section.jpg`

Feedback pass 8 applied on 2026-06-11:

- Removed the homepage secondary-service pill strip that listed:
  - Storm Damage Restoration
  - Environmental Services
  - Odor Removal
  - Contents Restoration
  - Packout Services
  - Emergency Roof Tarping
  - Water Leak Detection
  - Commercial Mold Remediation
- Redesigned the post-hero proof/stat band:
  - Removed the small stat-box treatment with `24/7 emergency calls`, `6 WA counties served`, `5 listed locations`, and `Water / fire / mold`.
  - Replaced it with a fuller conversion strip around `One company. Clear next steps.` and `From emergency response to rebuild planning.`
  - Added proof points for emergency response, full-service restoration, and reconstruction when needed.
- Added the approved full-service/one-company message into the hero lead, intro copy, proof band, process step 3, and why-choose section.
- Updated process section heading to `From the first call to a stabilized, repair-ready property.`
- Added desktop connector animation between process steps 1 -> 2 -> 3.
- Process connector animation respects the existing reduced-motion stylesheet and is hidden on mobile.
- Removed the social-section sentence that told users to review social profiles `before you call or request service`.
- Customer-review copy was tightened so it does not repeat that same awkward `before you call or request service` phrasing.

Feedback pass 8 validation:

- `npm run check`: passed
- `npm run build`: passed
- Browser DOM check at `http://localhost:5177/`: passed
  - `.secondary-service-strip` count is `0`.
  - Removed secondary-service pill labels are not rendered in body text.
  - Old proof/stat labels are not rendered.
  - Social bad sentence is not rendered.
  - 2 desktop process connector elements render.
  - Desktop process connector dots use `processFlow` animation.
  - No horizontal overflow.
- Mobile DOM/layout check at `390x844`: passed
  - Proof band stacks to one column.
  - Process connector elements are hidden.
  - Removed secondary-service pill strip remains absent.
  - Social bad sentence remains absent.
  - No horizontal overflow.
- Proof band screenshot: `docs/design/evidence/green-state-proof-band-redesign-v2.jpg`
- Process connector screenshot: `docs/design/evidence/green-state-process-animation-v3.jpg`

Feedback pass 9 applied on 2026-06-11:

- Rejected the feedback-pass-8 post-hero proof band as visually too boxy and not premium enough.
- Replaced the proof band with a simpler transition strip:
  - `One company from start to finish`
  - `From the first emergency call to a fully restored property.`
  - Inline restoration path: emergency mitigation, cleanup/documentation, reconstruction when needed.
  - Phone CTA remains integrated on the right.
- Updated process heading from `From the first call to a stabilized, repair-ready property.` to `From the first call to a fully restored property.`
- Removed `Built for Western Washington coverage` and replaced it with customer-facing local-service wording.
- Upgraded FAQ presentation:
  - Dark sticky intro card on desktop.
  - Premium FAQ cards with Q markers, custom expand controls, stronger shadows, and open-state styling.
  - FAQ intro copy now tells active/unsafe/spreading users to call directly.

Feedback pass 9 validation:

- `npm run check`: passed
- `npm run build`: passed
- Browser DOM check at `http://localhost:5177/`: passed
  - `repair-ready` is not rendered.
  - `Built for Western Washington coverage` is not rendered.
  - Old proof-band phrase `From emergency response to rebuild planning` is not rendered.
  - New proof flow renders 3 restoration-path items.
  - FAQ renders 5 premium-styled FAQ items.
  - No horizontal overflow.
- Mobile DOM/layout check at `390x844`: passed
  - Proof strip stacks to one column.
  - Proof flow stays within the container.
  - FAQ grid stacks to one column.
  - FAQ intro card is not sticky on mobile.
  - No horizontal overflow.
- Proof strip screenshot: `docs/design/evidence/green-state-proof-strip-pass9.jpg`
- FAQ screenshot: `docs/design/evidence/green-state-faq-premium-pass9-v5.jpg`

## Rejected Work

The previous homepage direction is rejected.

Do not reuse rejected homepage directions as a base. Treat them as negative examples only.

Rejected/removed old directions previously found in these artifacts:

- `src/pages/index.astro`
- `src/pages/ui-kits.astro`
- `preview/green-state-restoration/`

This does not mean the `src/pages/index.astro` route should be deleted. It means the rejected visual/content direction previously implemented there should not be preserved by default.

Rejected visual patterns:

- Oversized hero typography and excessive spacing.
- UI-kit/mockup routes that do not create a coherent premium homepage.
- Sitemap-like blocks or card grids that do not feel like a real restoration company website.
- Placeholder proof sections that look unfinished.
- Weak visual density compared with the agency premium emergency-homepage standard.
- Page-level mobile sticky CTA mounting instead of shared layout/shell behavior.

## Inner Page Template Pass - 2026-06-11

Status: In progress for human visual review.

Implemented the repeatable inner-page workflow as Astro component-first instead of a one-off service page:

- Reusable component: `src/components/templates/InnerPageTemplate.astro`.
- Real service page consuming the component: `/water-damage-restoration/water-damage-cleanup/`.
- Approval-only template preview route: `/templates/inner-page/`.
- Template preview route has `noindex,nofollow` through the shared layout metadata and should stay out of nav, generated page maps, XML sitemaps, and Search Console submissions.
- The main left content column is no longer wrapped in a large white card. It sits open on the page background; only functional modules like CTAs, H3 cards, forms, nav, reviews, and proof cards are framed.
- Elfsight widget mapping:
  - Sidebar inner-page widget: `elfsight-app-39b9e482-eeab-4152-9b0e-f68fdf37e7c8`.
  - Homepage/full-width review widget: `elfsight-app-f639fa67-b9d7-4028-ab2a-8db78cb867d0`.
- The inner-page template renders the sidebar widget in the right column and the homepage/full-width widget in the dedicated large review section.

Validation passed on 2026-06-11:

- `npm run check`: 0 errors, 0 warnings, 0 hints.
- `npm run build`: passed with 3 generated pages.
- Browser QA desktop `1440x1100`: no horizontal overflow on `/water-damage-restoration/water-damage-cleanup/`.
- Browser QA mobile `390x844`: no horizontal overflow, sticky CTA hidden at top and visible after scrolling.
- Browser QA template route: `/templates/inner-page/` renders the reusable component and exposes `robots=noindex,nofollow`.

## Next Action

Human visual review of the new homepage rebuild preview.

The next agent should:

1. Read this file first.
2. Read `docs/design/GREEN_STATE_HOMEPAGE_REBUILD_BRIEF.md`.
3. Read `docs/design/GREEN_STATE_RESTORATION_ASTRO_HOMEPAGE_DESIGN_BRIEF.md` as older context, not as final approval.
4. Read the client intake, brand, page-map, and service-inventory docs listed above.
5. Review the current Astro homepage preview at `http://localhost:5177/`.
6. Incorporate the materials Mariana sent via email after the email/source content is provided or extracted.
7. Reconcile Mariana's email content against the existing intake docs before using any new claims, services, assets, locations, or proof.
8. Keep verified data and source docs; do not invent claims, ratings, certifications, response times, or proof.

## Roadmap Follow-Ups

- Incorporate Mariana email materials into the Green State Restoration intake/design/build process.
  - Status: Needs source extraction.
  - Owner/input needed: James or account manager needs to provide or expose Mariana's email content.
  - Rule: Treat the email as a new source input. Extract facts, compare against current intake/page-map/brand docs, and update the relevant docs before changing homepage copy, assets, claims, locations, services, or proof modules.
  - Do not use email-derived claims publicly until they are verified or explicitly approved.

## Required Homepage QA Evidence

### Tracking Pass 1 - LeadConnector Number Pool, GA4, And Distance Chatbot

- Pulled the current live-site body-end plugin markup from `https://www.greenstaterestoration.com/`.
- Added the LeadConnector/GHL number-pool script and user-session script to shared Astro site data and mounted them through `LeadConnectorNumberPool.astro`.
- Added the live-site GA4 measurement ID `G-5LDHNTKLF8` through `GoogleAnalytics.astro`.
- Browser-loaded live-site inspection found the Distance chatbot script and widget ID: `https://cdn.distance.so/widget-js/v1/web-chat.min.js` with widget ID `Green-State-Restorat-q55vo`.
- Added the Distance chatbot through `DistanceChatbot.astro` using the supplied embed code.
- Distance local-preview caveat: the Distance loader intentionally falls back to an unversioned core script on `localhost`/`127.0.0.1`, which currently returns 404. On the production hostname, browser inspection of the live site showed the same snippet loading `live.js` and the versioned core script successfully.
- Mounted GA, Distance, and LeadConnector through `BaseLayout.astro`, so every Astro page using the shared layout inherits the same tracking/chat stack.
- Added preconnects to `https://backend.leadconnectorhq.com`, `https://cdn.distance.so`, and `https://www.googletagmanager.com`.
- Loading strategy: GA async in the head, Distance body-end on window load, LeadConnector ordered at body end so the number-pool script can inspect rendered phone links after page markup exists.

### Feedback Pass 10 - Desktop Phone CTA Visibility

- Desktop/tablet phone CTA rule added to the Green State build and reusable agency website rules.
- Post-hero proof-strip CTA now displays `Call now` plus the approved phone number instead of a generic-only label.
- Advantage-section phone CTA now displays `Call now` plus the approved phone number instead of a generic-only label.
- Proof-strip CTA styling tightened so it reads as a horizontal phone action instead of an oversized block.
- Mobile tap-to-call behavior remains allowed to use compact call copy or the phone number, as long as it uses the approved `tel:`/DNI phone source.
- Validation passed on 2026-06-11: `npm run check`, `npm run build`, rendered desktop CTA text audit, proof CTA internal-overflow check, advantage CTA internal-overflow check, and mobile no-horizontal-overflow check.

- `npm run check`
- `npm run build`
- Desktop screenshot: `1440x1100`
- Tablet screenshot: `1024x900`
- Mobile initial screenshot: `390x844`
- Mobile scrolled screenshot: `390x844`
- No-horizontal-overflow check.
- Sticky CTA hidden while the hero is in view.
- Sticky CTA visible after hero scroll.
- Sticky CTA mounted from shared layout/shell, not only `src/pages/index.astro`.

## Open Inputs Needed

- Final approved logo file.
- Final approved photo/video assets.
- Final tracking/DNI phone number.
- Form provider, routing, and tracking fields.
- Exact GBP profile links for each location.
- Proof for certifications, response-time claims, badges, exact review ratings/counts, and other review claims if those should be visible.
- Confirmation that Seattle, WA is the target area for root/non-city service pages, or the approved larger market if different.

## Build Gate

Do not treat the new homepage as approved until:

- The old homepage/mockup direction is not reused.
- The premium visual acceptance rubric has no `Fail` areas.
- The required QA evidence exists.
- Visible claims are either verified or removed.
- The human approves the rebuilt homepage direction.
