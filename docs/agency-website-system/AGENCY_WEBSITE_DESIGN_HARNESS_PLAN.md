# Agency Website Design Harness Plan

> **STRATEGY DOCUMENT — not agent-facing.** This file explains rationale and roadmap. Operational rules live in `CORE_CONTRACTS.md` (shared rules, single source of truth), `PIPELINE.md` (orchestration), `agents/` (per-agent specs), and `schemas/` (handoff formats). If this file disagrees with any of those, they win. Do not add new rules here.


Status: Planning artifact
Last updated: 2026-06-08
Owner: James / Codex

## Purpose

We need a repeatable design harness that helps AI agents produce professional local-service websites without relying on vague taste prompts like `premium`, `modern`, or `Romexterra-level`.

The current failure pattern is clear:

- The agent can follow section order, but the visual result still looks amateur.
- Long design prompts are causing generic AI website moves: oversized type, dark hero, card grids, vague proof panels, and excessive spacing.
- Internal planning language can leak onto customer-facing pages.
- Builder agents are self-grading their own visual output as `Pass`, which is not a reliable quality gate.
- Full UI-kit explorations create too much surface area for weak designs.

The harness should constrain the design process enough to get consistently strong output while still letting each client look custom.

## Core Strategy

Do not ask the AI to invent a full premium website from scratch.

Instead, make the AI compose a website from:

- A visual evidence pack with approved good and bad examples.
- Client-specific messaging.
- Approved homepage archetypes.
- A controlled design recipe.
- A reusable Astro component library.
- Clear visual QA rules.
- Human approval at the right moments.

The system should behave more like a high-quality website builder harness than a long open-ended prompt.

## Plan-Checker Revision

The first plan-checker pass found that the overall direction is right, but not yet enforceable.

Main correction:

- The harness cannot start with abstract archetypes alone. It must start with concrete visual evidence, a minimal high-quality component starter, a locked messaging pack, and independent QA.

Revised sequence:

1. Build the visual evidence pack.
2. Define the homepage quality standard from that evidence.
3. Define the Homepage Messaging Pack and claim-state rules.
4. Build one restoration-first archetype: `Emergency Split Hero`.
5. Build a minimal Astro starter/component library for that archetype.
6. Define an enum-based Design Recipe schema that maps only to approved components.
7. Add rendered visible-text QA, screenshot QA, mobile/sticky CTA QA, and separate human/reviewer approval.
8. Test on Green State.
9. Only after Green State passes, expand to more archetypes and other industries.

## Visual Evidence Pack

The harness needs visual evidence before it can define quality.

Create an evidence pack with:

- Romexterra positive examples by section.
- Green State negative examples by section.
- Notes explaining what is good or bad.
- Screenshots, not just written descriptions.
- Specific section-level observations, such as hero density, CTA hierarchy, form weight, service-card treatment, proof placement, section rhythm, mobile hero behavior, and footer quality.

Evidence should be stored as:

- Screenshots or rendered reference pages.
- A markdown annotation file.
- Optional component demo routes when the starter library exists.

Purpose:

- Teach the agent what good and bad look like.
- Give QA something concrete to compare against.
- Reduce reliance on vague words like `premium`, `modern`, or `professional`.

## UI Kit Decision

Full homepage UI kits should not be the default.

Use UI exploration only as constrained style boards when visual direction is genuinely unsettled.

Recommended approach:

- Produce 2-3 style directions, not 4 full homepages.
- Use the same client-specific messaging in every option.
- Show only the hero, proof/CTA sample, service-card treatment, and one section rhythm sample.
- Build the style boards in Astro or another rendered format, but keep them clearly non-production.
- Each style direction must use approved component variants, not freeform design.
- The human chooses one direction, then the agent builds one full homepage from that selected direction.

Style boards are allowed only after:

- The Homepage Messaging Pack exists.
- The allowed component variants exist.
- The style-board prompt forbids freeform page invention.
- The board can be reviewed against the visual evidence pack.

Default path:

- Skip UI kits.
- Create the messaging pack.
- Select an archetype.
- Produce a design recipe.
- Build the homepage from the component library.

## Homepage Messaging Pack

The Homepage Messaging Pack is client-specific.

It does not mean the same H1, subhead, or bullets are reused for every client. It means the exact customer-facing copy is locked before design starts, so the design agent cannot invent visible copy while arranging the UI.

Owner:

- The copywriter/messaging agent should produce the pack.
- The design agent may request missing fields, but should not invent customer-facing copy.
- The Astro Build Agent may place approved messaging, but should not rewrite it.

The structure is reusable:

- H1.
- Subhead.
- Primary CTA.
- Secondary CTA.
- 4-6 trust/conversion bullets.
- Proof band items.
- Services section heading and intro.
- Process section heading and step labels.
- Why-choose/differentiator heading.
- Review/proof section copy.
- Service-area section heading and intro.
- FAQ section heading.
- Final CTA heading and supporting copy.
- Footer summary.

The words change per client based on:

- Services offered.
- Parent service categories.
- Primary target market.
- Emergency availability.
- Response-time claims.
- Certifications.
- Reviews/proof.
- Commercial/residential mix.
- Brand tone.
- Client-specific priorities.

The pack must also include banned copy:

- Internal planning language.
- Page-map language.
- `service architecture`.
- `city-service pages are deferred`.
- `review source reserved until verified`.
- `widget-ready section`.
- `launch input`.
- `proof plan`.
- Any claim not approved for visible preview or launch.

Rule:

- The build agent may place approved messaging, but it may not invent new customer-facing positioning while designing.

Claim-state rules:

- `visible_preview_allowed`: may appear in preview/customer-facing mockup copy.
- `launch_proof_required`: may appear in preview, but requires proof before launch.
- `badge_asset_required`: text may be approved, but badge/logo graphics require supplied or verified assets.
- `never_without_explicit_approval`: do not use unless the human/client explicitly approves it.

Common examples:

- 24/7, free estimates, locally owned, approved certifications, and approved response-time claims can be `visible_preview_allowed` when the AM/page-map explicitly approves them.
- Exact review rating/count, certification badge graphics, carrier logos, warranties, guarantees, and insurance outcome language are normally `launch_proof_required`, `badge_asset_required`, or `never_without_explicit_approval`.
- Insurance claim approval, guaranteed coverage, reimbursement promises, and direct billing promises should default to `never_without_explicit_approval`.

## Homepage Archetypes

We should create 3-4 agency-approved homepage archetypes.

Each archetype defines layout, visual rhythm, proof placement, and conversion logic. The agent chooses the archetype based on intake and explains why.

MVP rule:

- Start restoration-only.
- Do not add plumbing and roofing archetypes until the restoration harness passes Green State.
- First archetype to build: `Emergency Split Hero`.

Initial archetype candidates:

1. Emergency Split Hero
   - Best for restoration, plumbing emergencies, urgent damage, and call-first service.
   - Left side: H1, subhead, trust bullets, CTAs.
   - Right side: substantial request-service form/panel.
   - Strong proof band near hero.

2. Large-Loss / Commercial Operator
   - Best for commercial restoration, facilities, multi-location operators, and large-scale jobs.
   - More operational tone.
   - Strong process, documentation, and property-type sections.
   - Less family/local warmth, more authority and capability.

3. Local Trusted Residential
   - Best for smaller local companies, family-owned businesses, and residential-heavy service.
   - Warmer photography.
   - Reviews and local proof higher on the page.
   - Less industrial, more neighborhood trust.

4. Premium Brand / High-End Contractor
   - Best for roofers, remodel-adjacent contractors, premium restoration, and brands with strong assets.
   - More visual whitespace, larger imagery, refined typography.
   - Still phone-first where service intent requires it.

Each archetype should define:

- Hero layout.
- Header behavior.
- CTA hierarchy.
- Proof placement.
- Form placement.
- Service-card style.
- Process section style.
- Review/proof section style.
- Service-area module style.
- Final CTA/footer treatment.
- Mobile behavior.

## Design Recipe Schema

The Design Recipe is the controlled instruction set the build agent follows.

Instead of saying `make it premium`, the design agent should output structured choices like:

```yaml
homepage_archetype: emergency_split_hero
hero_variant: image_backed_split_form
header_variant: utility_strip_sticky_header
proof_band_variant: verified_claim_stat_bar
service_card_variant: image_overlay_grid
process_variant: dark_timeline_cards
differentiator_variant: dark_advantage_board
review_variant: real_widget_or_polished_reserved_state
service_area_variant: map_with_county_accordions
final_cta_variant: dark_phone_first_band
footer_variant: full_nap_service_footer
mobile_sticky_cta: show_after_hero
section_rhythm: dark_hero__proof_bar__light_intro__white_services__dark_differentiator__light_process__map__faq__dark_cta
```

The recipe should also include:

- Brand tokens.
- Typography pairing.
- Font hosting plan.
- Image/asset rules.
- Image optimization plan.
- Third-party loading plan.
- Page-type schema plan.
- Navigation inclusion plan.
- CTA copy source.
- Claims source.
- Open blockers.
- Required QA evidence.

Rule:

- The Astro Build Agent implements the recipe. It should not invent a different page design.

Enforcement rule:

- Recipe fields should use enums, not freeform descriptions.
- A recipe is invalid if it references a component variant that does not exist in the starter.
- A recipe is invalid if required messaging-pack fields are missing.
- A recipe is invalid if typography choices lack a self-hosted font plan or system-font decision.
- A recipe is invalid if visible claims do not have claim states.
- A recipe is invalid if new pages lack navigation-inclusion decisions.
- A recipe is invalid if page types lack schema decisions.
- A recipe is invalid if image assets lack an approved optimization path.
- A recipe is invalid if third-party widgets, maps, videos, social embeds, chat, or tracking lack a loading strategy.
- A recipe is invalid if it fails to specify QA requirements.

Example validation behavior:

- Valid: `hero_variant: image_backed_split_form`
- Invalid: `hero_variant: make it cinematic and premium`

## Astro Component Library Requirements

The agency should have a reusable Astro starter with strong default components.

Required components:

- `BaseLayout`.
- `SiteHeader`.
- `InnerPageTemplate`.
- `ServicePageTemplate`.
- `CityPageTemplate`.
- `CityServicePageTemplate`.
- `ContactPageTemplate`.
- `Hero`.
- `HeroImage`.
- `OptimizedImage`.
- `GalleryImage`.
- `RequestServicePanel`.
- `ProofBand`.
- `CompanyIntro`.
- `ServiceGrid`.
- `ProcessSection`.
- `DifferentiatorSection`.
- `ReviewSection`.
- `ServiceAreaMap`.
- `FAQSection`.
- `FinalCTA`.
- `SiteFooter`.
- `StickyMobileCTA`.
- Shared schema/JSON-LD utilities or components.
- Shared navigation data utilities for header, footer, sidebar, service hubs, and sitemap inclusion.

Each component should eventually support 2-4 variants.

Template approval workflow:

- Repeatable page designs should be approved through Astro template routes that render the real reusable component, not throwaway static mockups.
- Template preview routes should use realistic placeholder data and final-layout behavior.
- Template preview routes must be `noindex,nofollow` and excluded from header navigation, footer navigation, service listings, sitemap generation, and Search Console submissions.
- Once approved, production pages should pass final copy/data into the approved component instead of duplicating the markup per page.

MVP component strategy:

- Do not build every variant first.
- Build one excellent restoration-first path before expanding.
- The first starter should support the `Emergency Split Hero` archetype end to end.
- Expansion to additional variants should happen only after the first path passes Green State QA.

Example variants:

- Hero:
  - `image_backed_split_form`
  - `commercial_command_center`
  - `local_owner_photo`
  - `premium_full_bleed`
- Service cards:
  - `image_overlay_grid`
  - `icon_plus_media_cards`
  - `commercial_service_matrix`
  - `compact_parent_hub_cards`
- Proof:
  - `verified_claim_stat_bar`
  - `review_widget_near_hero`
  - `certification_badge_row`
  - `reserved_proof_module`
- Service area:
  - `map_with_county_accordions`
  - `state_picker`
  - `county_selector`
  - `compact_city_links`

Important rule:

- The component library must be visually strong before agents use it. If the components are mediocre, the agents will keep producing mediocre websites.

Minimum first starter:

- One strong header.
- Desktop header behavior for urgent local-service sites: sticky/fixed during scroll with phone CTA visually stronger than the request-service/contact CTA.
- Mobile header behavior for urgent local-service sites: tap-to-call button on the left, logo centered, and menu button on the right. The phone action stays visible and the logo must not be pushed off-center.
- Desktop/tablet phone CTA labels must visibly include the approved phone number, not only `Call now`. Mobile tap-to-call CTAs may use `Call now` or the number, but must use the approved `tel:`/DNI phone source.
- One strong emergency hero with form/request panel.
- One optimized hero/LCP image path.
- One proof band.
- One rich service grid.
- One process section.
- One differentiator section.
- One real-widget/reserved-review section. Homepage review widgets should use a stacked layout with intro copy above and the widget full width below, not a default split column.
- One scalable service-area module using a real map provider/starter pattern, typically Leaflet/OpenStreetMap for local-service builds unless another provider is approved.
- Service-area module default: county/state selector, city hub links, and separate expandable city-service links. Do not duplicate cities as decorative pills when the accordion/list already exposes them.
- Service-area module layout for large city/city-service builds: stacked intro above map/explorer, then controlled-height county/city/city-service lists below or inside the explorer. Avoid short copy beside a tall expanded accordion.
- Expanded service-area lists need max-height scrolling, filtering, pagination, or progressive disclosure so opening one county does not take over the page.
- Service-area alternate: `Regional Service Explorer` with map plus segmented county/state browser and optional city search/filter for very large city-service builds.
- One FAQ section.
- One final CTA.
- One footer.
- One shared mobile sticky CTA.
- One schema utility path for LocalBusiness, Service, FAQPage, and BreadcrumbList.
- One image optimization and validation path using Astro image tools and Sharp fallback.

Shared request-service form minimum:

- Visible fields: name, phone, email, service needed, city or ZIP, and additional information/message.
- Emergency copy: 24/7 or emergency availability where verified, call-now instruction for active damage, and one-business-day expectation for online form callbacks.
- Form layout: do not leave lone short fields half-width; full-width any field without a natural row partner.
- Phone number visibility: approved phone/DNI number must appear inside or directly beside the form.
- Form notice readability: use high-contrast text on dark/brand backgrounds. Muted gray support text on black, green, or gradient panels fails QA.
- Homepage H1 line control: use explicit line groups and protected no-wrap phrases on desktop so important phrases do not accidentally split into awkward four-line layouts.
- Homepage hero trust bullets: 4-6 short, verified conversion facts must sit directly below the H1 or hero subhead/tagline and remain visible above the fold on desktop and mobile.
- Service-area labels must be customer-facing. Do not render internal SEO/planning words like `targets`, `page map`, `proof plan`, `approved rollout`, or `candidate`.
- Production service-area links must not point to missing city or city-service routes unless the generated-route plan is approved and the pages are being built before launch.

Astro and image rules:

- Production output must come from Astro pages, layouts, components, data files, content collections, and utilities.
- Standalone static HTML is not the production source of truth.
- Any unavoidable raw/static HTML must be generated or controlled by Astro and validated from final build output.
- Raw client images start in an intake/source folder, not the production public image folder.
- Standard images should use `OptimizedImage.astro`, galleries should use `GalleryImage.astro`, and above-the-fold hero/LCP images should use `HeroImage.astro`.
- Use Astro `Image`, `Picture`, and `getImage` wherever possible.
- Use Sharp pre-compression for CSS backgrounds, legacy generated markup, migrated gallery data, or other cases where Astro image tools cannot be used.
- The final build must not ship oversized, unoptimized, missing-dimension, missing-useful-alt, or workflow-bypassing images.
- LCP/hero imagery must be rendered as responsive image markup, not CSS backgrounds, with AVIF/WebP fallbacks, explicit dimensions, correct alt text, `decoding="async"`, `fetchpriority="high"`, and no lazy loading.

Third-party loading rules:

- Third-party scripts, review widgets, maps, social embeds, videos, chat, and tracking must declare a loading strategy.
- Use `defer`/`async` and preconnect where appropriate.
- Maps/Leaflet should load only when near viewport unless the map is above the fold.
- Review widgets above the fold may load immediately after `window.load` if trust proof is required, but should not be render-blocking in the head.
- Prefer static first-party facades for reviews, maps, social embeds, and videos, then hydrate third-party widgets after load or near viewport.
- When a review widget snippet, app ID, embed source, or approved review source exists, the build must render a real dedicated review section from that source. A reserved review module is valid only while the source is missing.
- Elfsight-style widgets should use an async platform script and lazy app container, or an equivalent non-render-blocking strategy.
- Do not add `Review` or `AggregateRating` schema from a third-party widget alone unless the exact review/rating data is verified, visible, and defensible in final output.
- Validation should fail render-blocking noncritical scripts.

Font hosting rules:

- All production fonts must be self-hosted or system fonts.
- If Google Fonts are used during design selection, the approved font files must be downloaded and self-hosted before production.
- Do not ship remote Google Fonts stylesheets, `fonts.googleapis.com` / `fonts.gstatic.com` preconnects, Adobe font kits, CDN font files, or third-party font scripts unless the human explicitly approves a documented exception.
- Prefer WOFF2 files, `@font-face`, `font-display: swap`, and only the weights/styles actually used.

Schema and navigation rules:

- The design recipe must specify the schema family expected for each page type so the build agent can implement structured data through shared Astro utilities.
- New page creation must include a navigation-inclusion decision: header, footer, sidebar/related, service hub/city hub listing, XML sitemap only, or intentionally hidden from visible nav with approval.
- SEO landing pages should have an approved internal-link path even when they do not belong in the main header.

## Visual QA Rules

The builder agent should not be the final judge of visual quality.

Visual QA should be done by:

- The human, or
- A separate QA/reviewer agent, or
- Both.

Required checks:

- Desktop screenshot.
- Tablet screenshot.
- Mobile initial screenshot.
- Mobile scrolled screenshot.
- Rendered visible DOM text scan.
- No horizontal overflow.
- Mobile H1 does not clip.
- Primary call CTA is visible and usable.
- Sticky mobile CTA is hidden in hero and visible after hero.
- Schema validates from final build output.
- Image validation passes, including optimized asset path, width/height, useful alt text where applicable, and stable background-image containers.
- LCP/hero image is not a CSS background and is not lazy-loaded.
- Noncritical third-party scripts are not render-blocking.
- Third-party widgets/maps/videos/tracking follow the declared loading strategy.
- Fonts are self-hosted or system fonts; no unapproved remote font provider requests exist.
- No internal planning language appears on the page.
- No visible placeholder/proof language unless it is intentionally client-facing.
- No oversized sparse hero.
- No generic card grid that looks like a sitemap.
- No repeated section layout from top to bottom.
- No fake reviews, ratings, badges, or claims.
- Homepage feels like a real service company, not a strategy document.

Automatic text scan should block phrases like:

- `service architecture`
- `deferred`
- `approved rollout`
- `source reserved`
- `widget-ready`
- `launch input`
- `proof plan`
- `page map`
- `brief`
- `mockup`
- `placeholder`
- `candidate` when visible to customers

Rendered-scope rule:

- Text scanning should inspect rendered visible page text, not markdown docs or hidden config.
- The scan should not fail on internal docs, comments, schema fields, or hidden metadata unless they are rendered to the customer.

QA ownership rule:

- The builder can produce screenshots and checks.
- The builder cannot be the final visual approver.
- Human approval or a separate reviewer/QA agent is required before the design is considered accepted.

## Guided Collaboration Plan

Codex should walk James through the harness in this order.

### 0. Visual Evidence Pack

Goal:

- Gather concrete reference evidence before writing quality rules.

Questions to ask:

- Which Romexterra screenshots should be treated as the strongest examples?
- Which Green State screenshots should be treated as negative examples?
- What should be annotated first: hero, services, CTA/proof, service area, or footer?
- Should reference screenshots live in Romexterra, Green State, or a new starter repo?

Output:

- Evidence pack folder.
- Annotated good/bad examples.
- Section-level observations.

### 1. Homepage Quality Standard

Goal:

- Define what `good` means in concrete design terms.

Questions to ask:

- What makes Romexterra feel premium?
- What makes Green State feel amateur?
- Which sections must feel strongest?
- What design moves are always unacceptable?
- What should be consistent across every agency site?
- What should vary per client?

Output:

- `Homepage Quality Standard`.
- Bad-pattern list.
- Acceptance checklist.

### 2. Homepage Messaging Pack

Goal:

- Define the exact client-specific copy required before design starts.

Questions to ask:

- What H1 patterns do we like by industry?
- How should subheads be written?
- Which trust bullets are common by industry?
- Which claims can be used from AM/onboarding approval?
- Which claims need proof before launch?
- What internal phrases should be banned?

Output:

- Messaging pack template.
- Claim-status rules.
- Banned visible-copy list.

### 3. Homepage Archetypes

Goal:

- Define the approved layout families.

Questions to ask:

- Which archetypes fit restoration?
- Which fit plumbing?
- Which fit roofing?
- When should the agent choose each one?
- When should the human choose?
- What examples should we use?

Output:

- Archetype library.
- Selection rules.
- Example use cases.

### 4. Component Variants

Goal:

- Define the reusable Astro component variants.

Questions to ask:

- How many hero variants are needed?
- Which reusable page templates are needed first: inner page, service page, city page, city-service page, contact page, review page, team page?
- Which noindex/nofollow template preview routes should exist for human approval?
- What service-card styles should be approved?
- What should proof/reviews look like when the widget is missing?
- What service-area modules are needed?
- What final CTA/footer treatments should exist?
- Which shared optimized image components are required for hero, gallery, service-card, team, logo, and inline images?
- Which schema utility/component path should the starter expose for common page types?
- Which components need declared third-party loading behavior, such as reviews, maps, videos, social embeds, chat, and tracking?
- Which fonts are approved, and will they be self-hosted WOFF2 files or system fonts?

Output:

- Component inventory.
- Variant specs.
- Noindex/nofollow template preview route inventory.
- Required props/data for each component.
- Optimized image component specs.
- Shared schema utility requirements.
- Third-party loading component requirements.
- Font hosting requirements.
- MVP starter scope for the first restoration archetype.

### 5. Design Recipe Schema

Goal:

- Create the structured handoff from design agent to build agent.

Questions to ask:

- Which choices should the design agent make?
- Which choices require human approval?
- What schema fields are required?
- What navigation-inclusion fields are required for new pages?
- What image-source and optimization fields are required?
- What third-party loading fields are required?
- What font hosting fields are required?
- How should exceptions be recorded?

Output:

- YAML/JSON-like design recipe schema.
- Example recipe for Green State.
- Example recipe for Romexterra-style restoration client.
- Enum list of allowed component variants.
- Navigation inclusion fields.
- Schema plan fields.
- Image optimization fields.
- Third-party loading fields.
- Font hosting fields.
- Invalid recipe examples.

### 6. Visual QA Rules

Goal:

- Define how designs are rejected before they waste more build time.

Questions to ask:

- What should automatically fail a design?
- What needs human review?
- What screenshots are required?
- What text scans should run?
- Should QA compare against reference screenshots?
- Should schema validation and image validation be separate required checks or part of a combined pre-deploy command?
- What third-party loading and render-blocking script checks should fail QA?

Output:

- QA checklist.
- Internal-copy blocker list.
- Screenshot requirements.
- Schema validation requirements.
- Image validation requirements.
- Third-party loading validation requirements.
- Reviewer-agent instructions.
- Rendered visible-text scan rules.

### 7. Green State Test Prompt

Goal:

- Test the harness on Green State after the rules are updated.

Questions to ask:

- Which archetype should Green State use?
- What should the final Green State messaging pack say?
- Which approved claims should appear?
- Which component variants should be selected?
- Which new pages should enter header, footer, sidebar, hub listings, sitemap only, or no visible nav?
- Which schema families and optimized image components should be used?
- Which third-party widgets/maps/videos/tracking scripts are needed and how should they load?

Output:

- Green State messaging pack.
- Green State design recipe.
- Green State navigation/schema/image handoff.
- Green State third-party loading handoff.
- Green State rebuild prompt.
- QA rubric for that test.

## Recommended Next Step

Start with `Visual Evidence Pack`, then immediately turn that into the first version of `Homepage Quality Standard`.

Reason:

- If we cannot define the quality bar from actual examples, every later artifact will still rely on vague taste words.

The next conversation should begin with:

> Let's build the Visual Evidence Pack and Homepage Quality Standard. Ask me questions one section at a time, using Romexterra as the good reference and Green State as the bad reference.

## Open Decisions

- Whether style boards should be optional or required for new clients.
- Whether the first version of the component library should be built inside Romexterra, Green State, or a new agency starter repo.
- Whether QA should be a separate agent/skill.
- Whether visual examples should be stored as screenshots, reference pages, or component demo routes.
- Whether each industry gets its own archetype pack.
- Whether the first harness MVP should be restoration-only until Green State passes.
- Whether `Design Recipe` validation should be a simple schema file, a script, or both.
- Where the canonical starter components should live.

## Important Principle

The system should make the easy path the good path.

Agents should not have to `be a good designer` from scratch. They should have to select the right approved messaging, archetype, recipe, and components, then prove the result passes visual QA.
