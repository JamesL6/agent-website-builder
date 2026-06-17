# Agency Website Agent System Plan

Status: Working plan
Last updated: 2026-06-04

## How To Resume After Context Reset

Start here, then read:

- `ASTRO_SANITY_AGENCY_SITE_FACTORY_PLAN.md` for the technical stack direction.
- `AGENCY_WEBSITE_AGENT_EXECUTION_SPECS.md` for agent-specific execution rules, handoff contracts, approval gates, and failure behavior.
- `ROMEXTERRA_SERVICE_PAGE_GENERATION.md` for the current Romexterra service-page generation pattern.
- `ROMEXTERRA_CONTENT_RULES.md` and `ROMEXTERRA_RULES.md` for restoration copy, claims, CTA, and form rules.
- Google Sheet `restoration-seo-master-template` for the current restoration master page map and content brief links:
  - `https://docs.google.com/spreadsheets/d/1lGvFQHzioF3C7cu9dj4M3hkXqDEzwwaj53nbqVCw7aE/edit`

This file is the durable planning artifact for the agency website agent system. Update this file as decisions change.

## Current Verdict

Build an opinionated but flexible agency website production pipeline, not a single freeform website agent.

The system should make account managers' work easier by asking fewer, better questions, pre-filling what can be discovered automatically, and using industry defaults. It should still force the right information before build, QA, tracking, and launch.

## Core Principle

Ask only questions that change a build decision.

Bad intake asks account managers and clients to fill out every possible field manually. The better system should:

- Pre-fill from the current website, sitemap, GBP, social profiles, existing assets, and the master industry template.
- Use defaults from the industry pack.
- Ask the account manager to confirm or correct important assumptions.
- Show unresolved blockers clearly.
- Generate client-friendly review summaries instead of exposing raw technical sheets.

## Source Of Truth Model

Use two layers.

### 1. Master Industry Template

The master template stores reusable agency knowledge.

For restoration, the current master is `restoration-seo-master-template`.

It should contain:

- Universal service/page taxonomy.
- Recommended URLs.
- Parent hubs and child service pages.
- Page type.
- Default status.
- Onboarding triggers.
- SEMrush data.
- Internal link rules.
- Page creation rules.
- Approved reusable Google Doc content briefs.
- Industry-specific claim and licensing constraints.

Master statuses should describe template readiness, not client build progress.

Recommended master statuses:

- `Brief Ready`
- `Needs Brief`
- `Optional`
- `Do Not Build By Default`
- `Requires License/Partner Verification`

### 2. Client Website Build Sheet

Each client should get a generated working sheet or workspace.

It should contain:

- Client intake answers.
- Services offered.
- Service areas and priority cities.
- Approved claims.
- Client-requested pages.
- Active selected page map.
- Existing website crawl.
- Gap analysis.
- Redirect map.
- Brief assignments.
- Content status.
- Design requests and exceptions.
- Build status.
- QA status.
- Launch and handoff status.

Client statuses should describe operational progress.

Recommended client statuses:

- `Proposed`
- `Client Requested`
- `Approved`
- `Needs Info`
- `Ready For Content`
- `Ready To Build`
- `Built`
- `QA Passed`
- `Launched`
- `Redirect Verified`
- `Do Not Build`

## Account Manager Workflow

The account manager should not work directly from a giant technical page-map sheet unless needed.

The preferred workflow is a guided intake and review flow:

1. Create/select client.
2. Choose industry pack: restoration first, then plumbing, roofing, and future verticals.
3. Enter or confirm business basics.
4. Let the agent crawl the current website and import obvious data.
5. Let the agent propose services, service areas, pages, and redirects.
6. Account manager reviews a short decision dashboard.
7. Client reviews a plain-English recommendation packet.
8. Approved decisions generate the client build sheet.
9. Agents build, QA, launch, and hand off from the client build sheet.

## What Simplified Means For Account Managers

Simplified does not mean collecting less important information. It means the account manager should not have to manually organize technical data that the system can infer, crawl, generate, or maintain.

### Current Manual-Heavy Model

In the manual-heavy model, the account manager may have to:

- Ask the client every question from scratch.
- Remember which services imply which SEO pages.
- Manually compare the old website to the new sitemap.
- Decide which old URLs need redirects.
- Know which pages need content briefs.
- Remember which claims are risky or unsupported.
- Track assets, forms, tracking, QA, and launch items across separate conversations.
- Explain a giant technical spreadsheet to the client.

This creates too much human memory load and too many places for mistakes.

### Simplified Model

In the simplified model, the account manager works from a short decision dashboard.

The system should:

- Crawl the current website and pre-fill existing pages, title tags, phone numbers, services, locations, forms, and visible claims.
- Pull defaults from the industry master template.
- Convert service toggles into recommended pages.
- Convert city/service inputs into page-map recommendations.
- Compare the current site to the proposed site.
- Generate redirect recommendations.
- Assign existing approved briefs automatically.
- Flag only the unresolved decisions.
- Create a client-friendly recommendation packet.
- Maintain the technical build sheet in the background.

The account manager should mostly answer:

- Is this business info correct?
- Which services do they actually offer?
- Which cities matter most?
- Are these claims approved?
- Are these recommended pages approved?
- Are these client-requested exceptions approved?
- Do we have the tracking, form, domain, and asset access needed to launch?

### Account Manager Dashboard Example

The first working surface should be a dashboard with sections like this:

```text
Client: Example Restoration
Industry: Restoration
Build Stage: Intake Review

Needs Your Review
- 4 service toggles need confirmation.
- 2 claims need proof before copy can use them.
- 11 old URLs need redirect approval.
- 6 priority cities are missing confirmation.
- GA4, GTM, and call tracking access are still missing.

Recommended Pages
- 28 core/recommended pages selected from the master template.
- 14 optional pages available but not selected.
- 3 client-requested pages need SEO review.

Content Briefs
- 28 approved master briefs assigned.
- 0 new briefs required.

Launch Readiness
- Forms: Not ready
- Tracking: Not ready
- Redirects: Needs approval
- Assets: Needs photos
- DNS: Owner unknown
```

The detailed tabs still exist, but the account manager should not need to live in them.

### Client Review Packet Example

The client should see a plain-English packet, not the internal sheet.

Recommended sections:

- `Recommended Website Pages`
- `Optional Pages We Can Add Later`
- `Pages We Do Not Recommend`
- `Current Website Pages We Will Redirect`
- `Services And Cities We Are Targeting`
- `Claims We Need You To Verify`
- `Photos, Logos, And Access Still Needed`

This lets the client approve decisions without needing to understand the technical build system.

## Intake Should Be Simple

The account manager-facing intake should be grouped into a few sections.

### Business Basics

Required:

- Company name.
- Website domain.
- Primary phone number.
- Primary market/city/state.
- Main service area.
- Emergency availability.
- CRM/form destination.
- Main client contact.

Useful if available:

- GBP URL.
- Social profiles.
- Review widget/source.
- Logo and brand assets.
- Current hosting/CMS.
- Domain/DNS access owner.

### Intake Source Reconciliation

The system should expect conflicting information from different sources.

Common sources:

- Raw client onboarding form from GoHighLevel.
- Current client website.
- Onboarding call notes.
- GBP/social profiles.
- Account manager corrections.
- Account-manager-verified post-call intake.

Recommended source priority for service availability:

1. Account-manager-verified post-call intake.
2. Explicit client confirmation from the onboarding call.
3. Account manager correction after client follow-up.
4. Raw GoHighLevel onboarding form as pre-call context only.
5. Current website as a candidate signal only.
6. Industry master template as a recommendation only.

The raw onboarding form and current website are useful for pre-fill and discovery, but neither one is proof that the client currently offers a service. The onboarding call should resolve conflicts, and the account manager should create or confirm the final intake snapshot after the call.

Example:

```text
Website says: Biohazard Cleanup
Raw GoHighLevel form says: No biohazard cleanup
Onboarding call says: Trauma cleanup only, no drug lab cleanup

System result:
- Parent category: Biohazard Cleanup = Limited
- Trauma Cleanup = Yes
- Drug Lab Cleanup = No
- General biohazard hub = Optional, needs account-manager approval
```

### Simple MVP Intake Flow

Do not over-engineer the first version with a required live GoHighLevel integration.

The simplest useful workflow:

1. Client fills out the GoHighLevel onboarding form.
2. Account manager opens that form before the onboarding call.
3. Account manager reviews and corrects the answers live with the client.
4. Account manager enters the final verified answers into the website build intake.
5. The system uses the final verified intake to select services, sub-services, pages, briefs, claims, city pages, and blockers.

The raw GoHighLevel form can be pasted, exported, or manually summarized into the system later, but the MVP source of truth is the verified post-call intake.

Future improvement:

- Add a GoHighLevel import if it saves enough time.
- Keep the same rule even with import: imported form data stays `Unverified` until the account manager confirms it after the onboarding call.

### GoHighLevel Form Scope

The GoHighLevel onboarding form should stay lightweight. It should collect baseline client information, not force the client to make detailed SEO/page-map decisions.

Good GHL form fields:

- Business name.
- Current website.
- Primary phone.
- Main contact.
- Primary service area.
- Main services in the client's own words.
- Emergency availability.
- Existing logo/photos/assets.
- Social profile links.
- Tracking/CRM/access notes.
- Competitors or sites they like.
- Any special page or design requests.

Avoid putting the full parent/sub-service page selection matrix into the client-facing form. Clients often answer too quickly, misunderstand service names, or select services they do not actually want to promote.

The detailed service and sub-service confirmation should happen during the onboarding call with the account manager.

### Account Manager Call Decision Sheet

The best MVP handoff to the agents is a client-specific Google Sheet with one clean account-manager-facing tab:

`AM Verified Website Intake`

This tab should be filled or corrected after the onboarding call. It is the simplest source for agents to read.

### Where The Verified Intake Should Live

Default recommendation:

Put `AM Verified Website Intake` inside the existing per-client `Local SEO Sheet`.

Reason:

- Account managers already set up and use the Local SEO Sheet.
- It already stores client operational details like NAP, Google Ads info, and related local SEO data.
- The website build depends on the same client facts: business name, phone, address, service areas, tracking, and access.
- Keeping the verified website intake in the same client workbook reduces places to check.
- Agents can receive one Google Sheet URL instead of multiple artifacts.

Standalone website-intake sheets should be used only when:

- The client does not have a Local SEO Sheet yet.
- The website project is being handled separately from local SEO.
- The Local SEO Sheet has restricted visibility and the website team needs a separate workspace.
- A temporary pilot needs isolation before the tab is rolled into the standard Local SEO Sheet.

### Template And Versioning Model

The tab should not be hand-built from scratch for every client.

Use a master tab/template:

`AM Verified Website Intake - Template`

The template should include:

- Standard sections.
- Column names.
- Dropdown values.
- Required fields.
- Notes/help text.
- Version number.
- Last updated date.

Each new client Local SEO Sheet should get the latest version of this tab automatically when the sheet is created.

Recommended version fields:

```text
Template Version: 1.0
Generated Date: 2026-06-03
Client Name:
Verified Intake Status: Draft / Verified / Needs Follow-Up
AI Intake Validation Status: Not Checked / Passed / Blocked / Warnings
```

When the process improves:

- Update the master template.
- New clients receive the new version automatically.
- Existing client sheets are not silently changed in a way that could corrupt active work.
- If an existing sheet needs the new version, run a migration/update step that preserves existing answers.

Key rule:

The master template updates future clients. Existing client sheets should be updated intentionally, not accidentally.

Recommended sections:

```text
Client Basics
Service Decisions
City / Service Area Decisions
Primary Service Page Target Area
Required Pages
Client-Requested Pages
Claims And Proof
Design Requests
Tracking And Access
Assets Needed
Call Notes
```

The account manager should not manually build the full sitemap from scratch. They should confirm decisions. The system can then convert those decisions into the active page map.

Verification ownership:

- The account manager controls `Verified Intake Status`.
- The AI controls `AI Intake Validation Status`.
- Final downstream build work requires both `Verified Intake Status = Verified` and `AI Intake Validation Status = Passed`.

### Service Decision Matrix

Inside `AM Verified Website Intake`, service decisions should be structured enough for the agent to read reliably.

Recommended columns:

```text
Service Category
Sub-Service
Offer Status
In-House / Partner
Residential / Commercial
Promote On Website
Build Dedicated Page
Build City-Service Pages
Notes
Verified By
Verified Date
```

Allowed `Offer Status` values:

- `Yes`
- `No`
- `Limited`
- `Partner`
- `Unknown`
- `Needs Follow-Up`

Allowed `Promote On Website` values:

- `Yes`
- `Mention Only`
- `No`
- `Future`

Allowed `Build Dedicated Page` values:

- `Yes`
- `No`
- `Use Parent Page`
- `Needs SEO Review`

This gives the account manager control without requiring them to understand every downstream build rule.

Example:

```text
Service Category: Biohazard Cleanup
Sub-Service: Trauma Cleanup
Offer Status: Yes
In-House / Partner: In-House
Promote On Website: Yes
Build Dedicated Page: Yes
Build City-Service Pages: No
Notes: Client wants this promoted, but not as a main nav item.
```

### What The Account Manager Actually Does

The account manager should use `AM Verified Website Intake` as a call worksheet and final verification surface.

During or immediately after the onboarding call, the account manager should:

1. Confirm client basics.
2. Confirm required default pages and note exceptions.
3. Confirm parent service categories.
4. Confirm sub-services only inside the selected parent categories.
5. Mark whether each service should be promoted, mentioned only, or not used.
6. Mark whether a dedicated page should be built.
7. Mark whether city-service pages should be built.
8. Confirm service areas and priority cities.
9. Confirm the largest approved service area to target on root/non-city service pages.
10. Confirm claims and proof.
11. Add client-requested pages or special homepage/design requests.
12. Mark tracking/access/assets as ready, missing, or needs follow-up.
13. Set `Verified Intake Status` to `Verified` only when the call decisions are complete enough for the website agent to proceed.

The account manager should not:

- Write the final sitemap manually.
- Pick content briefs manually.
- Write SEO titles or meta descriptions manually.
- Decide every internal link manually.
- Create redirect maps manually, unless correcting agent recommendations.
- Edit generated technical tabs unless they are reviewing an exception.

### AM Intake UI Shape

The tab should be easy to use during a call. Prefer dropdowns, checkboxes, and notes over freeform paragraphs.

Useful sections:

```text
1. Call Status
2. Client Basics
3. Default Pages
4. Parent Service Categories
5. Conditional Sub-Service Matrix
6. City / Service Area Decisions
7. Primary Service Page Target Area
8. Claims And Proof
9. Client-Requested Pages
10. Design Requests
11. Tracking And Access
12. Assets Needed
13. Final Verification
```

Recommended call statuses:

- `Draft`
- `In Call`
- `Needs Follow-Up`
- `Verified`
- `Blocked`

### How The AI Interprets The Tab

The AI should treat `AM Verified Website Intake` as structured instructions, not as loose notes.

Interpretation rules:

- If `Verified Intake Status` is not `Verified`, the AI can draft recommendations but should not proceed to final page build.
- If `AI Intake Validation Status` is not `Passed`, the AI should not proceed to final page build.
- Required default pages are included automatically unless marked as an exception.
- Parent services with `Offer Status = Yes` activate the parent hub recommendation.
- Parent services with `Offer Status = No` block the parent hub and child pages unless a child has a clear exception.
- Child services with `Offer Status = Yes` and `Build Dedicated Page = Yes` become candidate service pages.
- Child services with `Promote On Website = Mention Only` can be mentioned on parent/related pages but should not get a standalone page.
- Child services with `Offer Status = Partner` require partner/disclaimer language and should not imply in-house service.
- Child services with `Offer Status = Limited`, `Unknown`, or `Needs Follow-Up` become blockers or review items, not final build instructions. The MVP should not proceed with `Unknown` values on build-critical rows.
- `Build City-Service Pages = Yes` allows city-service generation only when the service and city are both approved.
- Root/non-city service pages use `Primary Service Page Target Area`, which should be the largest approved area the client services unless the AM or SEO owner approves a different strategy.
- Client-requested pages should be compared against the master page map before being accepted.
- Claims should be used only when they are marked verified or proof is supplied.

### AI Outputs From The Verified Intake

After reading the tab, the AI should generate:

- `Active Page Map`: final proposed pages for this client.
- `Primary Service Page Target Area`: largest approved market used for root/non-city service-page localization.
- `Brief Assignments`: which master brief or new brief is used for each page.
- `AM Internal Summary`: plain-English internal summary for the account manager and website team.
- `Build Blockers`: missing claims, services, cities, access, assets, tracking, or proof.
- `Redirect Audit Request`: current-site crawl needed or old URLs to map.
- `Design Exceptions`: custom homepage/inner-page requests that need approval.
- `QA Requirements`: tracking, forms, schema, sitemap, redirects, and launch checks for this client.

Future roadmap:

- Add an optional client-facing intake/sitemap summary after the internal AM workflow is tested.

### Example AI Interpretation

Input:

```text
Service Category: Water Damage Restoration
Sub-Service: Sewage Cleanup
Offer Status: Yes
Promote On Website: Yes
Build Dedicated Page: Yes
Build City-Service Pages: No
```

AI result:

```text
Add /water-damage-restoration/sewage-cleanup/ to Active Page Map.
Assign Sewage Cleanup master brief.
Mention sewage cleanup from Water Damage Restoration parent page.
Do not generate city-service pages for sewage cleanup.
```

Input:

```text
Service Category: Biohazard Cleanup
Sub-Service: Drug Lab Cleanup
Offer Status: No
Promote On Website: No
Build Dedicated Page: No
```

AI result:

```text
Do not build Drug Lab Cleanup page.
Do not mention drug lab cleanup as an offered service.
If old site has a drug lab cleanup URL, flag redirect/noindex decision.
```

### Required Page Defaults

Some pages should be automatically included unless the project scope says otherwise:

- Home.
- Contact.
- About.
- Reviews.
- Main services overview.
- Service area page.
- Privacy policy.
- Terms or legal page when required.

The account manager should only need to flag exceptions or special requests for these pages.

### Best Way To Get Information To The Agents

Best MVP handoff:

1. Account manager completes the onboarding call.
2. Account manager updates the client-specific Google Sheet tab `AM Verified Website Intake`.
3. Account manager sends the agent the Google Sheet URL and says: `Use AM Verified Website Intake as the source of truth.`
4. Agent reads that tab and generates:
   - Active page map.
   - Brief assignments.
   - Client review packet.
   - Redirect audit needs.
   - Build blockers.

Fallback handoff:

- If Drive access is unavailable, export or paste the `AM Verified Website Intake` tab as CSV.

Do not use long chat messages as the primary handoff once this system exists. Chat is too easy to lose, misread, or under-specify. A structured sheet is easier for both humans and agents.

### Services

Use industry-specific toggles, not open-ended page lists.

For restoration:

- Water damage restoration.
- Flood/basement cleanup.
- Sewage cleanup.
- Appliance leak cleanup.
- Leak detection.
- Plumbing in-house or partner.
- Mold remediation/removal.
- Mold testing/inspection.
- Fire/smoke restoration.
- Board-up or roof tarping.
- Biohazard cleanup.
- Commercial restoration.
- Reconstruction/build-back.
- Contents restoration/packout.
- Asbestos/lead/environmental services.

Each answer should map to page recommendations through the master template.

### Parent And Sub-Service Model

Parent services should not automatically activate every child service page.

The account manager should first confirm parent categories, then the system should show conditional sub-service checklists only for selected parents.

Recommended answer values:

- `Yes`
- `No`
- `Limited`
- `Partner`
- `Commercial Only`
- `Residential Only`
- `Unknown`
- `Needs Client Confirmation`

Example parent categories:

- Water Damage Restoration
- Mold Remediation
- Fire Damage Restoration
- Storm Damage Restoration
- Biohazard Cleanup
- Commercial Restoration
- Reconstruction
- Contents Restoration
- Environmental Services

Example water sub-services:

- Flood damage restoration.
- Basement flooding.
- Water extraction.
- Water mitigation.
- Sewage cleanup.
- Burst pipe cleanup.
- Appliance leak cleanup.
- Sump pump failure cleanup.
- Structural drying.
- Moisture mapping.
- Water damage inspection.
- Leak detection.

Example biohazard sub-services:

- Crime scene cleanup.
- Trauma cleanup.
- Blood cleanup.
- Suicide cleanup.
- Unattended death cleanup.
- Hoarding cleanup.
- Feces cleanup.
- Drug lab cleanup.
- Tear gas cleanup.
- Hazardous material cleanup.

Sub-service answers should control:

- Whether the page is recommended.
- Whether the page is blocked.
- Whether the page can be mentioned only as a related service.
- Whether copy needs partner/disclaimer language.
- Whether a content brief is assigned.
- Whether a city-service page can be generated.

If a parent is `Yes` but sub-services are unknown, the system should not assume all sub-services are offered. It should select only the parent hub and route child pages to `Needs Client Confirmation`.

### Service Bundle Behavior

Service bundles should speed up intake, not replace confirmation.

Example:

```text
Bundle selected: Restoration Core
Pre-selected parent categories:
- Water Damage Restoration
- Mold Remediation
- Fire Damage Restoration

System then asks conditional child-service questions:
- Do they handle sewage cleanup?
- Do they handle appliance leaks?
- Do they offer board-up?
- Do they offer smoke odor removal?
```

The bundle should be treated as a pre-fill shortcut. The account manager still confirms important child services on the onboarding call.

### Service Areas

The system should accept:

- Primary city.
- State.
- Full city list.
- Priority cities.
- Excluded cities.
- County/region names.
- Whether city pages are approved.
- Whether city-service pages are approved.

The agent should normalize city names and generate a service-area matrix.

### Claims And Proof

Required before writing copy:

- Licenses/certifications.
- Insurance status.
- Years in business.
- Review count/rating only if verified.
- Emergency response claim.
- Warranty/guarantee claims.
- Insurance claim support language.
- In-house versus partner-provided services.

Unknown claims should block copy that depends on them.

### Design Preferences

Keep this simple for account managers:

- Brand style: clean, premium, bold, local, commercial, emergency-first.
- Competitor sites liked/disliked.
- Must-use photos.
- Team page needed.
- Review/social sections needed.
- Client-specific homepage request.

The agent should recommend the standard design pattern first, then adapt when a real client requirement exists.

### Tracking And Launch

Required:

- GA4/GTM access.
- Meta Pixel.
- Google Ads/LSA tracking requirements.
- Call tracking/DNI provider.
- Swapping number rules.
- Form destination.
- Thank-you page or inline confirmation.
- Search Console access.
- DNS/domain owner.
- Production launch date.

Tracking requirements should be captured during intake, not on launch day.

## Client-Facing Simplicity

Clients should not be asked to review a technical build sheet.

The system should generate a client-facing packet:

- Recommended sitemap.
- Pages we recommend building.
- Optional pages we can add later.
- Pages we do not recommend and why.
- Existing pages being moved or redirected.
- Services and cities we are targeting.
- Claims we need them to verify.
- Assets/photos still needed.
- Tracking/access still needed.

The client should approve decisions, not manage implementation fields.

## Agent System

### 1. Client Intake Agent

Purpose:

Collect and verify the data needed to create a client site.

Inputs:

- Account manager answers.
- Raw GoHighLevel onboarding form, if available.
- Onboarding call notes.
- Account-manager-verified post-call intake.
- Client website.
- GBP/social/profile URLs.
- Uploaded assets.
- Industry master template.

Outputs:

- Client profile.
- Approved claims list.
- Parent service toggles.
- Sub-service selections.
- Service-area matrix.
- Source conflict list.
- Missing info list.
- Client review packet.

Key rule:

Pre-fill first, then ask for confirmation. Use the verified post-call intake as the MVP source of truth. Do not let a parent service automatically approve every child service.

### 2. Current Site Audit, Sitemap And Redirect Agent

Purpose:

Compare the current website to the proposed new website.

Inputs:

- Current website crawl.
- Current XML sitemap.
- Existing URLs from Search Console if available.
- Proposed page map.
- Client-requested pages.

Outputs:

- Existing URL inventory.
- Proposed sitemap.
- Gap analysis.
- Content conflict notes.
- Keep/rewrite/merge/delete/noindex decisions.
- 301 redirect map.

Key rule:

No launch without redirect decisions for old important URLs.

### 3. Content Brief Agent

Purpose:

Assign existing approved briefs, classify no-brief operational pages, and route true brief gaps to the technical/SEO decision owner.

Default behavior:

- Use approved master briefs.
- Localize placeholders like `{{client_name}}`, `{{city}}`, `{{state}}`, services, claims, and phone.
- For root/non-city service pages, use the verified `Primary Service Page Target Area`, normally the largest approved area the client services.
- For city pages, use the general city-hub pattern with H1 `Restoration Services in {{city}}, {{state_abbreviation}}` and links to approved city-service pages for that location.
- Preserve the brief's H1, H2/H3 sequence, FAQ questions, title/meta direction, URL, and internal-link plan.
- For MVP, do not adapt approved SEO briefs beyond mechanical placement into the fixed page template. The H1 can live in the hero, main written content can live in the standard left column, and forms/reviews/navigation can live in the right column, but the brief structure and required content stay intact.
- Do not require SEO briefs for operational pages such as About, Reviews, Contact, Privacy, Terms, and utility pages; use structured page requirements instead.

New brief behavior:

- Use `$restoration-content-brief-generator` for restoration SEO-money pages when the master template does not already contain an approved brief.
- Pull SEMrush and SERP data when required.
- Draft the brief.
- Require human review.
- Store approved brief links back into the master restoration SEO template.

Key rule:

Do not create new briefs just because a page feels unique. Create them only when the master template does not cover a page that needs to rank for valuable keywords, and only after the technical person or SEO specialist approves the brief request.

### 4. Copywriting And Localization Agent

Purpose:

Turn approved briefs and structured page requirements into final page copy.

Default behavior:

- Use `$restoration-page-copywriter` for restoration website copy.
- Write in first person as the client company: `we`, `our team`, `we respond`, `we handle`, and the company name when useful.
- Preserve approved brief H1/H2/H3 structure, FAQ questions, title/meta direction, URL, and internal-link direction.
- Use verified intake and approved claims only.
- Write clear, professional, helpful copy that a property owner can understand quickly.
- Keep emergency CTAs phone-first.
- Add page-specific CTA copy when useful.
- Ask for or block on the verified `Primary Service Page Target Area` before writing root/non-city service pages.
- For city pages, write concise city-service summaries and link to the approved city-service pages instead of duplicating full service-page copy.

Outputs:

- `Final Page Copy`
- `Full Body Copy By H2/H3`
- `CTA Copy`
- `FAQ Answers`
- `Internal Link Notes`
- `Unsupported Claim Flags`

Key rule:

Do not invent services, cities, claims, certifications, response times, review ratings, licensing, insurance outcomes, warranties, or office locations. If the page needs a new SEO brief, hand it back to the Content Brief Agent.

Final page copy must include the full body content under every approved H2/H3. The copywriter should not hand off outline notes, key points, or prompts as if they are finished page copy.

### 5. Template And Brand Adaptation Agent

Purpose:

Use proven design patterns while adapting the site to the client brand.

Default behavior:

- Use `$agency-website-design-builder` for homepage, inner-page, city-page, service-area, contact-page, final CTA, footer, and visual design-brief planning.
- Produce a build-ready `Design Brief`.
- Set `Implementation Target: Astro`; production pages should be built by the Astro Build Agent, not as standalone HTML/CSS.
- Recommend the standard pattern first, then adapt when the client need is real and the human approves the exception.

Best input format:

- Use a `Design Input Packet` with brand guidelines, logo files, approved colors/fonts, reference sites, liked/disliked elements, brand adjectives, must-use assets, homepage priorities, inner-page priorities, service-area/map requirements, review requirements, and design exceptions.
- Reference sites should be treated as inspiration and pattern evidence, not copied directly.
- Wireframes should lock conversion structure and required information, not every pixel.

Brand intake:

- Ask whether the client supplied brand guidelines, approved colors, approved fonts, logo files, and styles/colors/fonts to avoid.
- If brand guidelines exist, follow them unless they conflict with accessibility, readability, contrast, or conversion.
- If only a logo is available, extract practical color tokens from the logo: `primary`, `secondary`, `accent`, `dark`, `surface`, `muted`, `border`, `white`, and hover variants.
- Logo-derived colors should be marked as `Needs Human Approval`.
- Do not blindly copy the logo font into the website. Use it only as inspiration unless the font is provided, licensed/web-safe, and readable.
- Do not default to ultra-light fonts. Use readable body fonts at 400/500 weight and strong headings at 700-900.

Production boundary:

- The design agent does not build production pages.
- The design agent can create or review a non-production HTML/CSS mockup only when the human explicitly asks for one.
- Do not create exploratory UI kit preview pages by default. If the homepage or mockups are rejected, use fresh homepage rebuild mode and rebuild from the premium blueprint instead of generating more mockup directions.
- Real website implementation should be Astro routes/components using the agency starter and shared components.
- In rebuild mode, the design agent produces the audit and revised design brief; the Astro Build Agent performs the production code rebuild after approval.

Visual quality bar:

- Use the codified premium emergency homepage standard as the benchmark. This standard was distilled from the Romexterra reference build, but the agent should not need to open Romexterra on every project.
- Live Romexterra inspection is optional and should be used only when the human explicitly requests direct comparison, when the agent cannot understand the standard from the docs, or when repeated rebuilds keep failing.
- The homepage should feel like a finished premium local-service site, not a wireframe or lightly styled outline.
- Hero, CTAs, form/request panel, service cards, proof/reviews, process, service-area/map, mobile sticky CTA, final CTA, and footer all need real visual treatments.
- Reject designs that look like a sitemap rendered as blocks, repeat the same two-column layout, bury CTAs, use placeholder proof modules, use oversized type/spacing as a substitute for design, clip mobile text, or only swap logo/colors.
- For restoration and emergency home-service homepages, follow the `Premium Homepage Blueprint` in `$agency-website-design-builder` so the agent can create a high-end customized homepage from rules without opening Romexterra.

Fresh homepage rebuild mode:

- Trigger this mode when the human rejects the current homepage, rejects generated UI mockups, or says the site needs to go back to the drawing board.
- Treat rejected homepages, UI kits, and standalone previews as negative examples only.
- Do not reuse rejected compositions, oversized typography, weak spacing, placeholder proof sections, or sitemap-like card layouts.
- Do not generate exploratory UI kits unless the human explicitly asks for mockups again.
- Start from a clean homepage route or explicitly remove the rejected route before rebuilding.
- Keep verified data, page-map decisions, brand tokens, service-area data, and approved claims.
- Produce one build-ready `Design Brief` and one Astro homepage implementation plan.
- The Astro Build Agent may implement the fresh homepage after the human approves the rebuild scope.
- The new homepage must pass the `Premium Visual Acceptance Rubric` and required visual QA evidence before it is considered acceptable.

Mobile-first design priority:

- Build every local-service website from the phone experience first, then desktop, then tablet.
- This is a design and implementation philosophy, not only a QA step.
- Start section density, heading behavior, CTA placement, forms, review widgets, maps, accordions, service cards, sidebars, final CTAs, and footer behavior from phone-width constraints before expanding to larger screens.
- For restoration, plumbing, roofing, and other phone-first service businesses, mobile must keep the call path obvious: tap-to-call in the header, primary phone CTA reachable in the hero, trust bullets visible without awkward wrapping, form fields usable, review widgets contained, and the shared sticky mobile CTA appearing after the hero.
- No page or component is acceptable if it creates horizontal overflow, clipped text, tiny tap targets, hidden phone actions, or third-party widgets running off the screen on phone widths.
- Desktop can add sticky headers, sticky inner-page sidebars, wider card grids, richer imagery, and larger section rhythm only after the mobile version works. Tablet is the final adaptation layer.

Premium visual acceptance rubric:

- Score the homepage as `Pass`, `Needs Revision`, or `Fail` for hero composition, headline/density, CTA hierarchy, form/request panel, service cards, section rhythm, differentiator/process, proof/reviews, service area, final CTA/footer, and mobile.
- Any `Fail` blocks handoff to the Astro Build Agent unless the human explicitly accepts the risk.
- `Needs Revision` items need concrete fixes before implementation starts.

Premium emergency homepage rebuild mode:

- Trigger this mode when the human says the homepage is not modern, professional, big-company, premium, or strong enough.
- The agent must produce a `Premium Homepage Quality Audit` before rebuilding.
- The audit must compare hero, typography/density, header/CTA, form, proof, stats, emergency CTA band, mobile sticky CTA, services, dark sections, differentiators, process, reviews, service area, FAQ, final CTA, footer, and mobile.
- The design agent must not rebuild production code. It must revise the design brief, define required implementation changes, and hand the approved brief to the Astro Build Agent.
- The Astro Build Agent must rebuild from the approved Astro structure, not lightly tweak the rejected page.
- The build and QA agents must capture mobile initial, mobile scrolled, desktop, and tablet screenshots and compare the rebuild against the audit before calling it done.
- If the rebuilt homepage still looks materially weaker than the premium standard, continue revising.
- Subjective promises like `more cinematic` or `more polished` are not enough; the agent must identify component-level misses and changes.

Standard homepage pattern:

- Header with phone and primary CTA.
- Hero with phone, H1, subhead/slogan, 4-6 trust or conversion bullets, review proof, visual asset, primary call CTA, secondary request-service CTA, and form when appropriate.
- On desktop and tablet, phone-first CTAs must show the approved phone number inside the CTA or immediately next to it; do not use `Call now` alone. On mobile, tap-to-call CTAs may use `Call now` or the phone number, but must use the approved `tel:`/DNI phone source.
- Short company intro/about section with image or video, 1-2 paragraphs, benefits, and phone-first CTA.
- Main parent services, generated from the approved active page map.
- Three-step process section, adapted to what the client actually provides.
- Why choose the company.
- Review widget with section intro/copy above and the real widget full width below. Do not default to a split-column review layout.
- Optional client-priority section when the client, intake, or discovered source material justifies it and the human approves it.
- Service-area map/explorer with city, county, state, or multi-state behavior depending on the service-area model. For large city/city-service lists, use a stacked intro-above-map layout and controlled-height/progressive-disclosure lists so one open county does not take over the page.
- FAQ.
- Final CTA.
- Footer.
- Shared mobile sticky CTA bar on every page type.

Homepage flexibility rule:

- This is the default 80-90% homepage pattern, not a rigid one-to-one copy of Romexterra.
- The agent may recommend client-specific additions when intake, client-folder material, current-site evidence, or human direction supports them.
- The agent should advise on tradeoffs before changing the structure, then adapt with human approval when the exception is reasonable.

Standard inner page pattern:

- Hero similar to homepage but page-specific.
- Two-column body layout.
- Left column: SEO copy, images, sections, FAQs.
- Right column: sticky sidebar on desktop/tablet with contact form first, review widget, capped related navigation, and trust elements. Mobile stacks the sidebar below the article.
- Final CTA and footer.

Inner-page body behavior:

- The left column follows the approved content brief exactly for SEO-money pages.
- Page-specific CTA blocks can be inserted in the left column when they support conversion and fit the brief.
- On desktop/tablet, inner pages must use a Romexterra-style sticky sidebar pattern unless the human explicitly approves an exception: apply `position: sticky` directly to the sidebar `aside`/right-column element, with an offset below the sticky header, `display: grid`, and standard card gaps. Do not put sticky behavior on a nested wrapper unless there is a proven browser/layout reason. Do not create an internally scrollable sidebar, do not add a sidebar scrollbar, and do not cap the sidebar with viewport-height overflow. The page itself scrolls; the right column sticks naturally and then releases with the two-column body.
- Avoid ancestor overflow rules that break sticky positioning. Use `overflow-x: clip` rather than `overflow-x: hidden` on root/page wrappers when the goal is horizontal bleed control.
- On mobile, the sidebar should return to normal static flow below the article.
- The right column should not use a full uncapped navigation list.
- The sidebar should never substantially outlast the written content; reduce or collapse navigation when needed.
- Reusable sections after the two-column body can include process, benefits, insurance/support, reviews, service area, FAQ, final CTA, and footer.

City page hub pattern:

- Use H1 `Restoration Services in {{city}}, {{state_abbreviation}}`; visible copy should use the state abbreviation, such as `IL`, unless the page map says otherwise.
- Introduce the company's restoration support in that city.
- Briefly summarize approved city-service pages for that location.
- Link each summary to the matching city-service page.
- Keep the city page as a routing hub; do not duplicate full city-service copy or mention unapproved city-service pages.

Inner-page sidebar navigation rule:

- Use a capped smart navigation, not a full uncapped sibling list.
- Always include the parent hub or an equivalent `View all [Parent Service] services` link.
- Always include the current page, highlighted when applicable.
- Include the most relevant 6-8 sibling/service-family pages, prioritizing content-brief/internal-link-plan links, parent hub, closest service intent, priority pages, and approved client services.
- Include a compact core-services group with 5-7 main parent service hubs.
- Keep total sidebar navigation around 14-16 links maximum.
- Do not let dense service families create a sidebar that substantially outlasts the written article content.
- Dedupe sidebar links and avoid rendering excluded or inactive pages.
- Keep the sidebar deterministic so repeated builds do not randomly change internal linking.

Design-spec review sequence:

1. Homepage pattern.
2. Inner-page pattern for service, city, city-service, and most reusable content pages.
3. Contact page pattern after the inner-page instructions are reviewed and approved.

Standard contact page pattern:

- Hero should be phone-first with the primary phone number visible, tap-to-call button, and secondary `Request Service` anchor to the form.
- The first section after the hero should be the request-service form, because visitors who scroll past the hero are usually looking for a form.
- The contact form should use the shared lead form, standard routing/tracking fields, emergency phone messaging, and one-business-day expectation for non-emergency requests.
- Location/NAP cards should appear below the form and must include every approved GBP location.
- GBP location cards must match the approved business name, address, and phone exactly.
- If multiple GBPs exist, each location should be visually separated and easy to scan.
- The page should still include the reusable final CTA and footer.
- Do not place location cards, maps, or general contact copy before the form unless the human explicitly approves the exception.

Mobile sticky CTA pattern:

- Every local-service website should include a shared mobile sticky CTA bar unless explicitly excluded.
- The Astro Build Agent should implement it in the shared shell/layout or equivalent starter component, not as a one-off homepage element.
- It should be available on homepage, service, city, city-service, contact, review, team, and other published pages.
- On mobile/tablet, keep it hidden while the hero is still in view, then reveal it after the user scrolls past the hero or past roughly 35-50% of the first viewport.
- Primary action is a `tel:` call button using the approved tracking/DNI-capable phone number.
- Copy should be short and urgent, such as `Need help now? Call now.` or `Active damage? Call now.`
- A secondary request-service action is optional only when it fits without crowding.
- Use a subtle pulse dot, glow, shadow lift, or slide-up animation to draw the eye; respect `prefers-reduced-motion`.
- Include safe-area inset padding, a minimum 44px tap target, high contrast, and enough bottom page padding so the bar does not cover content, forms, or footer interactions.
- QA must verify the bar on every page type, including initial hero hidden state, after-hero visible state, correct phone link, no horizontal overflow, no form overlap, and reduced-motion behavior.

Astro sticky CTA implementation contract:

- Use a shared `StickyMobileCTA.astro` component or equivalent starter component.
- Mount it from the shared layout/shell so all published page types inherit it.
- Mark the first hero with a stable selector such as `[data-page-hero]`.
- Mark the CTA with `[data-mobile-sticky-cta]`.
- Toggle an `is-visible` class after the hero threshold is passed.
- Use the approved phone/DNI value from shared site data.
- Apply mobile-only bottom padding in the shared shell so the CTA does not cover forms, footer links, cookie banners, chat widgets, or other fixed elements.

MVP rule:

- Keep the fixed inner-page structure unless explicitly approved otherwise.
- Make clients feel unique through brand, imagery, spacing, colors, card treatments, icons, proof points, and visual composition, not by changing core conversion structure on every build.

Outputs:

- `Design Brief`
- `Implementation Target: Astro`
- `Premium Homepage Quality Audit`, when premium emergency homepage rebuild mode applies
- `Fresh Homepage Rebuild Plan`, when the current homepage or mockups were rejected
- `Premium Visual Acceptance Rubric`
- `Brand Source`
- `Brand Tokens`
- `Homepage Section Plan`
- `Inner Page Pattern`
- `City Page Hub Pattern`
- `Contact Page Pattern`
- `Service Area / Map Behavior`
- `Mobile Sticky CTA Behavior`
- `Asset Plan`
- `Image Optimization Plan`
- `Third-Party Loading Plan`
- `Schema Plan`
- `Navigation Inclusion Plan`
- `Design Exceptions`
- `Build Notes`
- `Visual QA Evidence Required`
- `Open Questions / Blockers`

Exception policy:

- If the user requests a nonstandard section, advise on tradeoffs.
- If it is reasonable and client-specific, adapt the design.
- If it harms SEO, accessibility, performance, tracking, forms, or compliance, require explicit approval or reject it.
- If it fails the visual quality bar, revise the design before sending it to the Astro Build Agent.
- Do not send a homepage to build when any premium rubric area is `Fail`.
- Do not send a rejected homepage back to build as a light tweak. Use fresh homepage rebuild mode and require the revised brief to explain exactly how the new implementation avoids the rejected composition.

### 6. Astro Build Agent

Purpose:

Build the approved site using the agency Astro starter and reusable components.

Responsibilities:

- Generate routes from structured data.
- Use shared layouts, navigation, footer, CTA, forms, and schema components.
- Use the shared mobile sticky CTA component across every page type.
- Implement approved design briefs in Astro, not standalone HTML/CSS.
- Keep production source in Astro pages, layouts, components, data files, content collections, and utilities.
- Place approved page copy into the approved page templates without rewriting it.
- Use content collections or structured data for services, cities, blogs, FAQs, and team content.
- Use shared optimized image components and image utilities instead of raw production image references.
- Keep large programmatic page sets out of a freeform CMS.
- Add Vercel support.
- Keep forms and tracking centralized.

Key rule:

Do not hand-code one-off forms, footers, CTAs, or page shells unless the reusable template itself needs to be expanded.

Astro-first production rule:

- Build production websites in Astro-compatible source code.
- Do not use standalone static HTML files as the production source of truth.
- Pages, layouts, navigation, footers, forms, schema, SEO, galleries, and reusable sections should be built through Astro pages, layouts, components, data files, and utilities.
- Any unavoidable raw/static HTML must still be generated or controlled by Astro code and validated from the final build output.

New-page navigation rule:

- Whenever a new page is created, the build agent must ask or record whether the page belongs in the header navigation, footer navigation, sidebar/related navigation, service hub listings, sitemap only, or no visible navigation yet.
- SEO-money pages should not be orphaned unless the human explicitly approves that risk.
- Navigation changes should be made through shared data/config/components, not one-off hard-coded page markup.

Schema rule:

- Schema is a required build decision for every page type, not a post-launch cleanup item.
- The build agent should use shared Astro schema utilities/components for JSON-LD.
- Typical schema options include `LocalBusiness`, `Organization`, `Service`, `FAQPage`, `BreadcrumbList`, `ContactPage`, `AboutPage`, `Person`, `ImageObject`, `Review`, and `AggregateRating`.
- `Review` and `AggregateRating` should be used only when verified and supported by visible or defensible source data.
- NAP, location, service-area, phone, URL, and sameAs data in schema must match the approved intake/site data.
- Do not add schema claims that are not approved in visible copy or verified intake.

Sitemap and robots rule:

- Every Astro website must ship `/sitemap.xml` as a real XML endpoint that returns HTTP `200` and an XML content type.
- `/sitemap.xml` must never be an HTML redirect page, meta-refresh page, branded redirect shell, or normal site page.
- For larger or growing sites, prefer `/sitemap.xml` as an XML sitemap index that points to child sitemap files such as `/sitemap-0.xml`, `/sitemap-1.xml`, and later chunks.
- Child sitemap files must return HTTP `200`, an XML content type, and canonical production URLs.
- If using `@astrojs/sitemap`, do not rely on an Astro page-style redirect from `/sitemap.xml` to `/sitemap-index.xml` if it generates `dist/sitemap.xml/index.html`. Use a post-build alias/copy step or equivalent deployment-safe method so `/sitemap.xml` is an actual XML file.
- `robots.txt` should reference the preferred sitemap entry point, normally `https://www.clientdomain.com/sitemap.xml`.
- Google Search Console should use `/sitemap.xml` as the primary submitted sitemap. `/sitemap-index.xml` may also exist, but `/sitemap.xml` must work.
- Build/launch audit must fail if `/sitemap.xml` is missing, returns HTML, is a redirect shell or meta-refresh page, does not parse as a valid sitemap or sitemap index, has missing/non-XML child sitemap files, contains non-canonical URLs, or `robots.txt` does not reference the preferred sitemap.

Image optimization-first rule:

- Never upload raw client images directly into the production public image folder and reference them as final assets.
- Original images should go into an intake/source folder first.
- Use Astro image tools wherever possible: `Image` for standard images, `Picture` for hero/art-directed/responsive images, and `getImage` for data-driven or programmatic rendering.
- The starter should include shared `OptimizedImage.astro`, `GalleryImage.astro`, and `HeroImage.astro` components.
- All meaningful content images must render through Astro-compatible optimized image components or explicit `<picture>`/`<img>` markup.
- Hero/LCP images must never be CSS backgrounds.
- Hero/LCP images must render as responsive AVIF plus WebP fallbacks with explicit `width`/`height`, correct `alt`, `decoding="async"`, `fetchpriority="high"`, and no lazy loading.
- For CSS backgrounds, legacy generated markup, migrated gallery data, or anything that cannot use Astro image tools, pre-compress with Sharp before production use.
- CSS backgrounds are allowed only for decorative imagery or below-the-fold imagery.
- Prefer WebP/AVIF/JPG output with role-based sizing, not one universal max size.
- Generate right-sized AVIF and WebP variants for logos, badges, thumbnails, galleries, hero images, and service-card images.
- Never reference raw `.png` or `.jpg` client uploads directly in production pages unless there is a documented exception.
- Every rendered `img` element in final output must include explicit `width` and `height` attributes, either manually or through Astro image metadata.
- CSS background image containers must reserve stable layout space using `aspect-ratio`, `min-height`, or fixed layout constraints.
- Future client starters should provide `npm run optimize:images` and `npm run validate:images`.
- Image validation must be part of standard pre-deploy QA.
- The validator must fail builds if images are oversized, unoptimized, missing width/height, missing useful alt text where applicable, likely LCP images are lazy-loaded, stale/raw image URLs are used, or images bypass the approved workflow.

Performance architecture rule:

- Build performance into the initial architecture, not as cleanup.
- Third-party scripts, review widgets, maps, social embeds, videos, chat, and tracking must declare a loading strategy before implementation.
- Use `defer`/`async` and preconnect where appropriate.
- Maps/Leaflet should load without blocking the initial render, but must not rely only on scroll/IntersectionObserver triggers. Service-area maps need a load/DOMContentLoaded fallback that initializes the map automatically, so users do not get stuck seeing a permanent `Interactive service area map` placeholder.
- Review widgets above the fold may load immediately after `window.load` if trust proof is required, but should not be render-blocking in the head.
- Prefer static first-party facades for reviews, maps, social embeds, and videos, then hydrate third-party widgets after load or near viewport.
- All production fonts must be self-hosted or system fonts. If Google Fonts are used during design selection, download/self-host the approved font files before production use.
- Do not ship remote font CSS, Google Fonts stylesheets, `fonts.googleapis.com` / `fonts.gstatic.com` preconnects, Adobe font kits, CDN font files, or third-party font kit scripts in production unless the human explicitly approves a documented exception.
- Self-host custom fonts as WOFF2 where possible, define them with `@font-face`, use `font-display: swap`, and keep font weights/styles limited to what the design actually uses.
- Every reusable component that adds media or third-party scripts must define its loading strategy as part of the component contract.
- Pre-deploy QA must fail for render-blocking noncritical scripts, duplicated custom form markup, and unapproved remote font loading.

Pattern implementation rules:

- Inner pages must use the fixed two-column contract unless an approved exception exists.
- Contact pages must use the phone-first hero and form-first body contract.
- Sidebar navigation must use capped smart navigation, not full service-family dumps.
- Mobile sticky CTA must live in the shared shell/layout or starter component layer so new pages inherit it automatically.
- Build outputs should make these patterns reusable in the starter, not trapped in a single client implementation.
- Builds must include stable selectors for QA: `[data-page-hero]` and `[data-mobile-sticky-cta]` or documented equivalents.
- New pages must have a navigation-inclusion decision and schema plan before build handoff is considered complete.
- New image assets must go through the approved image pipeline before build handoff is considered complete.

### 7. SEO, Tracking And QA Agent

Purpose:

Run quality gates before and after build, before launch, and after launch.

Pre-build QA:

- Intake completeness.
- Service/page eligibility.
- Claim verification.
- Brief availability.
- Sitemap approval.
- Redirect plan.
- Tracking requirements.
- Contact-page form order and exact GBP/NAP output.
- Inner-page sidebar cap and active-page link eligibility.
- New-page navigation-inclusion decisions.
- Page-type schema requirements.
- Image asset source, optimization, alt text, and dimension requirements.
- LCP/hero image rendering strategy and no-lazy-loading requirement.
- Third-party script/widget/map/video/tracking loading strategies.
- Self-hosted font plan or system-font decision.
- Shared form, CTA, footer, and tracking component usage.
- Shared mobile sticky CTA behavior across page types.

Pre-launch QA:

- Build passes.
- Image optimization/validation passes.
- Forms validate.
- Generated-page validation passes.
- Launch audit passes.
- `/sitemap.xml` returns HTTP `200`, XML content type, and valid sitemap or sitemap-index XML.
- Child sitemap files return HTTP `200`, XML content type, and canonical production URLs.
- `/sitemap.xml` is not an HTML redirect shell, meta-refresh page, branded redirect page, or normal HTML page.
- `robots.txt` references the preferred `/sitemap.xml` URL.
- Links resolve.
- Titles and meta descriptions exist.
- Canonicals exist.
- OG/Twitter images exist.
- Favicons exist.
- Schema exists, matches approved visible/verified claims, and validates.
- Sitemap and robots are valid.
- Redirects are configured.
- Desktop and mobile screenshots pass.
- Mobile sticky CTA appears after the hero, uses the approved phone/DNI source, and does not cover forms/content.
- Visual QA evidence follows the mobile-first priority order: mobile initial `390x844`, mobile scrolled `390x844`, desktop `1440x1100`, and tablet `1024x900`, plus a no-horizontal-overflow check.
- Page speed is acceptable.
- Tracking scripts are present and use approved loading strategy.
- Noncritical third-party scripts are not render-blocking.
- No unapproved remote font loading exists in production output.
- No duplicated custom form markup exists outside shared form components.

Post-launch QA:

- Live pages crawl.
- 301 redirects return correct status.
- Forms submit to the correct destination.
- Call tracking/DNI works.
- GA4/GTM/Meta Pixel events fire.
- Search Console sitemap submitted.
- Search Console primary sitemap submission uses `/sitemap.xml`.
- 404s monitored.

Key rule:

QA must run for both full launches and individual page updates.

### 8. Launch, Tracking And Handoff Agent

Purpose:

Make sure the site is not just built, but operational.

Responsibilities:

- Hosting/Vercel setup.
- Domain/DNS.
- SSL.
- Environment variables.
- GA4/GTM/Meta Pixel.
- Call tracking/DNI.
- Form routing.
- Redirects.
- Live `/sitemap.xml` and `robots.txt` verification.
- Search Console.
- Client/admin access.
- Handoff packet.
- Post-launch monitoring.

Key rule:

Tracking and lead routing cannot wait until launch day.

Sitemap launch rule:

- Before handoff, verify the live production domain serves `/sitemap.xml` as real XML with HTTP `200` and an XML content type.
- Verify `/sitemap.xml` is not a redirect shell, meta-refresh page, branded redirect page, or normal HTML page.
- Verify child sitemap files, when present, return HTTP `200`, XML content type, and canonical production URLs.
- Verify `robots.txt` references the preferred production sitemap URL, normally `https://www.clientdomain.com/sitemap.xml`.
- Submit `/sitemap.xml` as the primary sitemap in Google Search Console. `/sitemap-index.xml` may also exist, but `/sitemap.xml` must work.

## Client Build Sheet Tabs

Recommended tabs for a client-specific sheet:

- `Dashboard`
- `AM Verified Website Intake`
- `Intake Answers`
- `Approved Claims`
- `Service Area Matrix`
- `Active Page Map`
- `Existing Site Crawl`
- `Gap Analysis`
- `Redirect Map`
- `Brief Assignments`
- `Design Requests`
- `Build Tracker`
- `QA Tracker`
- `Launch Handoff`
- `Assets Needed`

The account manager should mostly use `Dashboard`, `AM Verified Website Intake`, `Design Requests`, and `Assets Needed`. The agents can maintain the technical tabs.

For rebuilds, `AM Verified Website Intake` should include:

- `Existing Website?`
- `AM-Confirmed Current Live Site URL`
- `Existing Pages Discussed On Call`
- `Known Pages To Keep`
- `Known Pages To Remove`
- `Known Pages Client Cares About`

The `Redirect Map` tab should live in the same client Local SEO Sheet for MVP.

## Additional Simplifications To Build

### 1. Use Confirmation Questions Instead Of Blank Forms

Bad:

```text
List every service the client provides.
```

Better:

```text
Based on the current website, this client appears to offer:
- Water damage restoration
- Mold remediation
- Fire damage restoration
- Reconstruction

Confirm, remove, or add services.
```

### 2. Use Service Bundles

Most local-service sites do not need service selection from a blank list. The system should offer bundles:

- `Restoration Core`
- `Restoration Core + Mold`
- `Restoration Core + Fire`
- `Restoration Full Service`
- `Commercial Restoration`
- `Environmental Add-On`

The account manager can pick a bundle, then adjust exceptions.

### 3. Use Confidence Scores

Every pre-filled field should show how confident the system is.

Example:

```text
Primary phone: (312) 549-9620
Confidence: High
Source: Website header and footer match
```

Low-confidence fields should be routed to the account manager.

### 4. Use Blockers Instead Of Huge Checklists

The account manager should see only what prevents the next stage.

Examples:

- `Cannot generate final copy until asbestos service scope is confirmed.`
- `Cannot launch until DNS owner is identified.`
- `Cannot QA tracking until GTM access is provided.`

### 5. Use Stage Gates

The workflow should move through simple stages:

- `Intake`
- `Sitemap Review`
- `Content`
- `Design`
- `Build`
- `Pre-Launch QA`
- `Launch`
- `Post-Launch QA`
- `Handoff`

Each stage should have a short pass/fail checklist and a clear owner.

### 6. Use Exception Records

When an account manager or client asks for something outside the standard pattern, the system should create an exception record:

```text
Request: Add financing calculator to homepage.
Standard recommendation: Keep homepage focused on emergency service and lead capture.
Risk: Could distract from emergency conversion if too prominent.
Approved implementation: Add calculator below services, not in hero.
Owner approval: Required
```

This lets the system adapt without losing discipline.

### 7. Hide Technical Tabs By Default

The client build sheet can have many tabs, but the account manager should mostly see:

- `Dashboard`
- `Intake`
- `Client Review`
- `Assets Needed`

Technical tabs can be maintained by agents:

- `Existing Site Crawl`
- `Redirect Map`
- `Brief Assignments`
- `Build Tracker`
- `QA Tracker`

### 8. Auto-Generate The Client Build Sheet

The account manager should not manually copy the master template.

The system should create the client build sheet from:

- Industry master template.
- Intake answers.
- Current website crawl.
- Client-requested pages.
- Approved service areas.

### 9. Auto-Generate The First Client Email

After intake review, the system should draft a client-facing message:

```text
We reviewed your current website and prepared the recommended sitemap for the new build.
Please confirm the services, cities, claims, and access items below.
```

This turns the technical workflow into a client communication workflow.

### 10. Keep Human Approval At Critical Points

Automation should not silently approve:

- Claims.
- Licensed services.
- Page deletions.
- Redirect decisions for valuable old URLs.
- Client-requested custom pages.
- Tracking setup.
- Launch.

### 11. Keep Planning Separate From Client-Site Implementation

When the agency team is designing the delivery system, agents should update system docs, templates, wireframes, prompts, SOPs, and sheet schemas.

Agents should not edit a real client website repo unless the human explicitly asks for an implementation, push, deploy, or live-site change.

Required implementation approval details:

- Which client repo or starter repo is being changed.
- Which branch should be used.
- Whether the change should go to a PR, preview deployment, or production branch.
- Which files are in scope.
- Which local or unrelated changes must stay out of scope.

This prevents a reference-site discussion from accidentally becoming a production code change.

## Pilot Improvements To Test Live

These are the next improvements to test while running a real client through the workflow.

### 1. One-Page AM Summary

After the AM completes `AM Verified Website Intake`, the AI should generate a one-page internal summary:

```text
Client:
Verified status:
Pages selected:
Pages blocked:
New briefs needed:
Claims missing proof:
Tracking/access missing:
Design exceptions:
Next action:
```

This gives the AM a quick sanity check before the build starts.

### 2. Client Approval Packet Before Build

Future suggestion: before building the site, the AI may generate a client-facing approval packet from the verified intake:

- Recommended sitemap.
- Services and cities being targeted.
- Pages not being built and why.
- Claims needing confirmation.
- Asset/access needs.
- Design exceptions.

Do not include this in the MVP by default. First prove the internal AM workflow, then decide whether client-facing packet generation saves time and avoids confusion.

### 3. Red/Yellow/Green Build Readiness

Use simple status colors or labels:

- `Green`: ready to proceed.
- `Yellow`: can proceed with caveats.
- `Red`: blocked.

Examples:

- Service pages: `Green`
- City pages: `Yellow - city priority list incomplete`
- Tracking: `Red - GTM access missing`

### 4. Master-To-Client Diff

The AI should show how the client differs from the master template:

- Master recommends page, client approved it.
- Master recommends page, client does not offer service.
- Client requested page, master has no matching page.
- Master marks service as licensed/partner-sensitive, client needs proof.

This makes exceptions visible.

### 5. Source Snapshot

When the AI reads the verified intake, it should save or generate a source snapshot:

- Sheet URL.
- Tab name.
- Read date.
- Verified status.
- Key rows used.

This prevents confusion later when someone edits the sheet after the agent started building.

### 6. Required Field Validation

Before the AI uses the intake, it should validate the tab:

- Required client basics present.
- At least one parent service selected.
- Required default pages not accidentally removed.
- Every selected child page has an approved parent or explicit exception.
- City-service pages have both approved cities and approved services.
- Partner services have partner/disclaimer status.
- Claims with copy impact are verified.

### 7. Process Feedback Loop

After each pilot build, record:

- Questions the AM still had to ask manually.
- Fields that were confusing.
- Pages the AI recommended incorrectly.
- Services the client misunderstood.
- QA failures that could have been caught earlier.
- New template rules to add.

This is how the system gets better without making the first version too complex.

## Plan-Checker Hardening Before Pilot

The current strategy is directionally sound, but it is not ready to be treated as a repeatable production workflow until these loopholes are closed or explicitly accepted.

### 1. Concrete Tab Schema

Risk:

If `AM Verified Website Intake` is only described in prose, each account manager may fill it out differently and the AI may interpret it inconsistently.

Fix:

Create the actual `AM Verified Website Intake - Template` with:

- Locked section headers.
- Fixed columns.
- Dropdown values.
- Required fields.
- Example rows.
- Help text for ambiguous services.
- Template version and generated date.

### 2. Master Brief Status Mismatch

Risk:

The restoration master `Page Map` can show `Brief Status = Not started` while `Content Briefs` and `Brief Queue` already contain generated Google Doc briefs. If the AI trusts the wrong tab, it may falsely block pages.

Fix:

Until the master sheet is reconciled, use `Content Briefs` and `Brief Queue` as the brief-readiness source of truth. Use `Page Map` for URL structure, parent hub, page type, keyword, internal-link direction, onboarding trigger, and notes.

### 3. Stable Service And Page IDs

Risk:

Service names can drift across tabs, client sheets, briefs, and generated code. A label like `Sewage Cleanup` may need to map exactly to a canonical page URL and brief.

Fix:

Add stable IDs or canonical URL keys to service/sub-service rows in the client intake and master template. The AI should map by stable ID or canonical URL first, then by display name only as a fallback.

### 4. Real Local SEO Sheet Inspection

Risk:

The plan assumes the verified intake tab can live inside the existing Local SEO Sheet, but the real sheet may have protected ranges, formulas, permissions, naming conventions, or workflow expectations that affect placement.

Fix:

Before finalizing the template, inspect one real Local SEO Sheet and confirm:

- Existing tab structure.
- Naming conventions.
- Protected ranges.
- Who edits which tabs.
- Whether AMs can comfortably use a new tab during onboarding calls.
- Whether agents can access the sheet reliably.

### 5. Manual Entry Validation

Risk:

AM-entered values can contain typos, blank cells, inconsistent city names, or unsupported combinations like a child page approved while the parent service is marked `No`.

Fix:

Use dropdowns, validation, locked headers, and AI preflight validation before generating the page map. The AI should produce a blocker report instead of guessing when required fields are missing or contradictory.

### 6. Redirect Workflow

Risk:

A rebuild can lose existing SEO value if old URLs are not crawled and mapped before launch.

Fix:

Require `Existing Site Crawl` and `Redirect Map` for rebuilds. If the current site cannot be crawled, document that as a launch risk and get approval before proceeding.

### 7. Claims And Proof Fields

Risk:

The intake can say a client offers a service, but copy may still need proof for licenses, certifications, response times, insurance language, review claims, partner-provided services, and regulated services.

Fix:

Add explicit fields for:

- `Claim`
- `Claim Status`
- `Proof Source`
- `Copy Allowed`
- `Notes`

Only use claims marked verified or explicitly approved.

### 8. Client-Specific QA Requirements

Risk:

Generic QA can pass while client-specific requirements fail, such as call tracking, DNI, form routing, service-specific schema, or redirect verification.

Fix:

Generate `QA Requirements` from the verified intake. QA should include the site's selected forms, tracking stack, phone numbers, page types, redirects, schema types, and approved services.

### 9. Template Update Process

Risk:

The plan says future clients should receive the latest template, but it does not yet define how Local SEO Sheets are created or updated.

Fix:

Define the sheet creation/update mechanism before scaling:

- Manual copy from a master template.
- Scripted tab insertion.
- Google Apps Script.
- Drive/Sheets connector workflow.
- Internal app workflow later.

Existing client sheets should not be silently overwritten. Updates to active sheets need a migration step that preserves answers.

### Hard Blockers To 100% Confidence

Do not claim the workflow is fully production-ready until these are resolved:

- Inspect a real Local SEO Sheet.
- Build the actual `AM Verified Website Intake - Template`.
- Add stable service/page IDs or canonical URL keys.
- Define the sheet creation/update mechanism.
- Run one live pilot and update the plan from the misses.

## Data Sync Rules

The system should detect mismatches like:

- Page map says `Needs Brief`, but the brief exists.
- Brief exists, but no page map row points to it.
- Page selected for build, but no approved client service toggle supports it.
- Child service page selected for build, but the matching sub-service is `No`, `Unknown`, or `Needs Client Confirmation`.
- Child service page selected for build, but `Build Dedicated Page` is not approved in `AM Verified Website Intake`.
- Selected service row has no stable ID or canonical URL mapping.
- `Page Map` and `Content Briefs` disagree on brief readiness.
- Page selected for build, but required claim/license is unknown.
- Client-requested page conflicts with an existing canonical page.
- Old URL has traffic/value, but no redirect decision exists.
- Existing-site rebuild has no crawl snapshot or redirect-map status.
- Existing-site rebuild has `Existing Website? = Yes` but no AM-confirmed live site URL.
- Current-site crawl found URLs not in sitemap/onboarding notes and they have not been reviewed by the SEO specialist.
- Root/non-city service page is selected for build, but `Primary Service Page Target Area` is missing or unverified.
- City page is selected for build, but approved city-service pages for that city are missing, inactive, or not linked from the city page.
- Page is built, but QA status is missing.

## Open Decisions

- What is the exact shape of the existing Local SEO Sheet, and where should the intake tab fit?
- Should the client intake tab be copied manually from a master template, inserted by script, inserted by Google Apps Script, or generated by an agent workflow?
- What stable ID or canonical URL key should service/sub-service rows use?
- How should the sheet represent `Primary Service Page Target Area` when the largest area is a metro, county, multi-county region, or state instead of one city?
- Should each agent spec remain in one shared file or be split into individual files such as `CLIENT_INTAKE_AGENT_SPEC.md`, `CONTENT_BRIEF_AGENT_SPEC.md`, and `ASTRO_BUILD_AGENT_SPEC.md`?
- Where should the approved master briefs live long term: Google Docs only, repo markdown, or both?
- Which tracking vendors need first-class setup support beyond GA4/GTM/Meta Pixel/call tracking?
- When should Search Console URL exports become part of the standard workflow instead of an optional future enhancement?
- How much of the current Romexterra Astro implementation should become the agency starter?
- When should Sanity be included by default, if ever?

## Next Build Steps

1. Finalize the `AM Verified Website Intake` tab fields, dropdowns, examples, stable IDs, and build-blocking statuses.
2. Inspect one real Local SEO Sheet and decide whether intake is inserted into that workbook, copied from a master template, or generated by script.
3. Add `Primary Service Page Target Area` to the intake tab and active page-map handoff.
4. Define exact handoff schemas for `Verified Intake Summary`, `Active Page Map`, `Redirect Map`, `Brief Assignments`, `Final Page Copy`, `Design Brief`, `Build Summary`, `QA Report`, and `Launch Report`.
5. Reconcile the restoration master sheet's `Page Map`, `Content Briefs`, and `Brief Queue` status logic.
6. Import the Claude content brief SOP into the Content Brief Agent spec.
7. Turn `AGENCY_WEBSITE_AGENT_EXECUTION_SPECS.md` into detailed per-agent SOPs or separate skill files.
8. Add restoration parent/sub-service decision trees for the Client Intake Agent.
9. Add machine-checkable pattern rules for homepage, inner page, city page hub, contact page, forms, sidebar navigation, schema, metadata, tracking, and redirects.
10. Decide what to extract from Romexterra into the agency Astro starter components.
11. Build reusable Astro page templates, starting with `InnerPageTemplate`, and expose approval-only noindex/nofollow template routes with realistic placeholder data.
12. Build the starter workflow for generating the client build sheet and technical tabs.
13. Create the first pilot client build sheet from the master template.
14. Run one live pilot and update this plan from the misses, confusing fields, and QA findings.

## Change Log

- 2026-06-10: Added Astro-first and image-optimization-first build rules for all future client sites, including shared optimized image components, image validation scripts, schema ownership, and required navigation-inclusion decisions for new pages.
- 2026-06-11: Added Astro sitemap/robots standards requiring `/sitemap.xml` to be real XML with HTTP 200, scalable sitemap-index support, robots.txt reference, Search Console `/sitemap.xml` submission, and launch-audit failures for HTML redirect shells, missing/non-XML children, or non-canonical sitemap URLs.
- 2026-06-11: Added component-first template workflow for repeatable Astro page designs: create reusable components/templates from the beginning, review them through noindex/nofollow template routes with realistic placeholder data, exclude template routes from navigation/sitemaps, and generate real service/city/city-service pages by passing approved copy/data into the component.
- 2026-06-10: Tightened performance-first rules so LCP/hero images must be responsive AVIF/WebP image markup, third-party widgets/scripts need declared loading strategies, and QA fails stale/raw image URLs, lazy-loaded LCP images, render-blocking noncritical scripts, and duplicated custom form markup.
- 2026-06-03: Added `AGENCY_WEBSITE_AGENT_EXECUTION_SPECS.md` and linked it as the working file for agent-specific instructions, handoff contracts, approval gates, and failure behavior.
- 2026-06-03: Customized Client Intake Agent: AM owns verified intake, AI owns validation, current-site crawl is suggestion-only, unknown build-critical values block progression, and client-facing intake summaries are future roadmap.
- 2026-06-03: Customized Current Site Audit, Sitemap, and Redirect Agent: runs for every build, uses AM-confirmed existing website URL, AI handles crawl, unknown URLs go to SEO review, redirect map lives in Local SEO Sheet, Search Console exports are optional/future for MVP.
- 2026-06-03: Customized Content Brief Agent: approved master briefs by default, operational pages use structured requirements instead of SEO briefs, SEO-money pages without briefs go to technical/SEO review, approved new briefs are stored back in the master restoration SEO template, and Search Console integration is future roadmap.
- 2026-06-03: Tightened Content Brief Agent with strict brief fidelity for MVP: no adaptation beyond mechanical placement into the fixed inner-page template.
- 2026-06-03: Added Template and Brand Adaptation Agent design input packet, reference-site rules, standardized-versus-customizable rules, wireframe guidance, and fixed inner-page layout rule for MVP.
- 2026-06-03: Added plan-checker hardening section, hard blockers to full confidence, expanded data sync rules, revised open decisions, and updated next build steps.
- 2026-06-03: Added live-pilot improvements: AM summary, client approval packet, readiness status, master-to-client diff, source snapshot, validation, and feedback loop.
- 2026-06-03: Added concrete account-manager actions, AM intake UI shape, AI interpretation rules, AI outputs, and example service-row interpretations.
- 2026-06-03: Added concrete account-manager simplification model, dashboard example, client review packet example, and additional simplification ideas.
- 2026-06-03: Added onboarding form/call source reconciliation and parent/sub-service service selection rules.
- 2026-06-03: Clarified that raw GoHighLevel onboarding forms are pre-call context only; the verified post-call intake is the MVP source of truth.
- 2026-06-03: Added lightweight GoHighLevel form scope, `AM Verified Website Intake` tab, service decision matrix, required page defaults, and agent handoff rules.
- 2026-06-04: Updated the Template and Brand Adaptation Agent homepage pattern to the default 80-90% agency structure, added flexibility rules for approved client-specific sections, and queued contact-page pattern review after inner-page approval.
- 2026-06-04: Added capped smart navigation rules for inner-page sidebars so dense service families do not create oversized right-column navigation.
- 2026-06-04: Added the standard contact page pattern: phone-first hero, form-first body, exact GBP/NAP location cards below the form, and reusable final CTA/footer.
- 2026-06-04: Tightened implementation boundaries so agents update planning artifacts during system design and only edit client repos after explicit human approval; added build/QA contracts for inner-page sidebars, contact-page form order, shared forms, and reusable starter patterns.
- 2026-06-04: Added Copywriting And Localization Agent, wired `$restoration-page-copywriter` as the restoration copy skill, set `$restoration-content-brief-generator` as the default new-brief fallback for missing restoration master briefs, and renamed the copy handoff to `Final Page Copy` with full body copy by H2/H3.
- 2026-06-04: Added service-page target-area rules: root/non-city service pages must use the largest approved service area, city pages use the `Restoration Services in {{city}}, {{state_abbreviation}}` hub pattern, and city pages summarize/link approved city-service pages without duplicating them.
- 2026-06-04: Created and wired `$agency-website-design-builder` as the reusable design skill for homepage, inner-page, city-page, service-area, contact-page, final CTA, footer, and build-ready `Design Brief` planning.
- 2026-06-04: Tightened design/build boundaries and quality gates: design briefs must target Astro, standalone HTML/CSS is non-production unless explicitly approved, and homepage designs must meet the codified premium emergency homepage visual quality bar before Astro build work starts.
- 2026-06-04: Added premium emergency homepage rebuild mode with required quality audit, component-level miss list, desktop/mobile screenshot comparison, and rebuild loop for homepages rejected as not modern/professional/big-company enough; live Romexterra comparison is optional escalation, not the default requirement.
- 2026-06-04: Added design-agent brand intake and token-generation rules: ask for brand guidelines/colors/fonts/logo first, derive color tokens from the logo when guidelines are missing, require approval for inferred tokens, and choose readable web fonts instead of blindly copying logo lettering.
- 2026-06-04: Added mandatory shared mobile sticky CTA rules and premium typography/density guardrails so future builds reveal a phone-first mobile call bar after the hero without oversized/clipped homepage layouts.
- 2026-06-04: Tightened the design workflow with fresh homepage rebuild mode, a premium visual acceptance rubric, exact Astro sticky CTA implementation contract, design/build boundary cleanup, and required visual QA evidence.
- 2026-06-04: Removed default UI kit exploration after testing showed it produced weak mockups; rejected homepages now restart from the premium blueprint and clean Astro route instead of more exploratory mockups.
- 2026-06-03: Created initial working plan from the Romexterra website build workflow, the restoration master sheet review, and the agency-agent planning discussion.
