# Agency Website Agent Execution Specs

Status: Working spec
Last updated: 2026-06-04

## Purpose

This file defines how each website-build agent should execute its part of the agency website production workflow.

The main strategy lives in `AGENCY_WEBSITE_AGENT_SYSTEM_PLAN.md`. This file turns that strategy into agent-specific instructions, handoff contracts, approval gates, and failure behavior.

## Core Rule

Each agent must be specific, scoped, and evidence-driven.

No agent should silently invent missing facts, skip an approval gate, overwrite another agent's work, or treat a previous artifact as current without checking the source snapshot.

## Planning vs Implementation Boundary

When the human is discussing patterns, agent behavior, prompts, SOPs, wireframes, or the delivery-system design, agents should update planning artifacts only.

Client website repo changes are allowed only when all of these are true:

- The human explicitly asks to edit, build, push, deploy, or publish the client site.
- The agent identifies the exact repo, branch, and files that will be touched.
- The requested change has a clear implementation target, not just a planning discussion.
- Unrelated local changes are identified and left unstaged unless the human explicitly includes them.

Reference sites such as Romexterra can be inspected, summarized, and used as pattern evidence without changing their source code. If an agent wants to implement a pattern in a reference/client repo as an example, it must ask for explicit approval first.

## Shared Agent Contract

Every agent should produce these items when relevant:

- `Source Snapshot`: sheet/document/repo URLs, tab names, read date, key rows/files used.
- `Assumptions`: anything inferred rather than directly verified.
- `Blockers`: missing information that prevents safe completion.
- `Decisions Made`: what the agent selected, rejected, or changed.
- `Handoff Output`: the artifact the next agent should use.
- `Residual Risks`: known risks that remain after the agent's work.

Every agent should refuse or pause when:

- The required source of truth is missing.
- The source says `Needs Follow-Up`, `Unknown`, or equivalent for a build-critical field.
- A requested action conflicts with client-approved services, approved claims, tracking requirements, or project rules.
- The handoff from the previous agent is stale or incomplete.

## Shared Source-Of-Truth Order

Use the most specific verified source first:

1. Account-manager-verified post-call intake.
2. Explicit client confirmation from onboarding call notes.
3. Account manager correction after client follow-up.
4. Raw GoHighLevel onboarding form as pre-call context only.
5. Current website as a candidate signal only.
6. Industry master template as recommendation only.

For Romexterra-style restoration service pages:

1. `AM Verified Website Intake` controls what the client actually offers.
2. `Content Briefs` and `Brief Queue` control brief readiness until the master sheet status mismatch is reconciled.
3. `Page Map` controls canonical URL schema, parent hub, page type, keyword, onboarding trigger, internal-link direction, and notes.
4. Google Doc content briefs are the execution contract for service-page copy and structure.
5. Repo rules control implementation, forms, shared sections, validation, and launch checks.

## Common Handoff Statuses

Use these statuses unless a later system replaces them:

- `Draft`
- `Needs Follow-Up`
- `Ready For Review`
- `Approved`
- `Ready For Next Agent`
- `Blocked`
- `Complete`

## 1. Client Intake Agent

### Purpose

Convert the account-manager-verified intake into a reliable client profile and website-build instruction set.

### Owner

The account manager is the only role responsible for filling out and changing the `AM Verified Website Intake` tab during the MVP.

Other roles may review, comment, or ask for clarification, but they should not change verified intake decisions unless the account manager confirms the update.

### Inputs

- Client Local SEO Sheet URL.
- `AM Verified Website Intake` tab.
- Raw GoHighLevel onboarding form, if pasted/exported.
- Onboarding call notes, if available.
- Current website URL.
- Industry master template.

### Required Checks

- Confirm `Verified Intake Status`.
- Confirm `AI Intake Validation Status`, if present.
- Read template version and generated date.
- Confirm required client basics are present.
- Confirm at least one parent service is selected.
- Confirm child service rows do not contradict parent service rows.
- Confirm service area and priority city fields are present when city pages are requested.
- Confirm `Primary Service Page Target Area` is present for root/non-city service pages.
- Confirm claims have proof or are marked not allowed in copy.
- Confirm tracking/access/assets status.

### Verification Model

Use a two-part verification model:

1. `Verified Intake Status` is controlled by the account manager.
2. `AI Intake Validation Status` is controlled by the AI.

Recommended statuses:

- `Verified Intake Status`: `Draft`, `In Call`, `Needs Follow-Up`, `Verified`, `Blocked`
- `AI Intake Validation Status`: `Not Checked`, `Passed`, `Blocked`, `Warnings`

Recommended rule:

The account manager marks the intake `Verified` when they believe the client decisions are final enough to proceed. The AI then validates the tab. Final downstream build work requires both:

- `Verified Intake Status = Verified`
- `AI Intake Validation Status = Passed`

If the AI finds missing or contradictory data, it should set the validation result to `Blocked` or `Warnings` and produce exact follow-up questions for the account manager.

### Execution Steps

1. Read the `AM Verified Website Intake` tab.
2. Create a source snapshot.
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

### Current Website Crawl Behavior

The Client Intake Agent may crawl the current website before or after the onboarding call.

Allowed uses:

- Suggest services the AM may want to verify.
- Detect current phone numbers, locations, service areas, forms, claims, reviews, and existing pages.
- Surface conflicts between current website copy and AM-verified answers.

Not allowed:

- Do not override AM-verified answers.
- Do not treat website copy as proof that the client still offers a service.
- Do not approve claims found on the website without verification.
- Do not final-select pages from the website crawl alone.

### Unknown Handling

The MVP should not proceed with `Unknown` values for build-critical decisions.

Rules:

- If a selected parent service is `Unknown`, block the handoff.
- If a selected child service is `Unknown` or `Needs Follow-Up`, block dedicated pages and city-service pages for that child service.
- If `Primary Service Page Target Area` is unknown, block root/non-city service page copy until the AM or SEO owner confirms it.
- If a claim required for copy is `Unknown`, block claim usage and list the follow-up question.
- If tracking, form routing, or launch-critical access is `Unknown`, flag it as a launch blocker.
- Optional unselected services can remain `No`, `Not Applicable`, or blank if the template clearly marks them as not selected.

The blocker report should say who needs to resolve the issue. Default owner: account manager.

### Outputs

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

### Approval Gate

Downstream agents can draft recommendations from incomplete intake, but final build work requires:

- `Verified Intake Status = Verified`
- `AI Intake Validation Status = Passed`

The AI should not mark `Verified Intake Status`; that is owned by the account manager.

### Future Roadmap

- Auto-generate a client-facing intake/sitemap summary after the internal intake workflow is proven.
- Consider direct GoHighLevel import if it saves enough AM time.

### Never Do

- Do not treat the raw GoHighLevel form as final truth.
- Do not approve child service pages because a parent category is approved.
- Do not use unsupported claims in copy.
- Do not infer licenses, certifications, response times, review ratings, or partner relationships.
- Do not proceed past intake validation when required values are `Unknown` or contradictory.
- Do not generate a client-facing intake summary in the MVP unless explicitly requested.

## 2. Current Site Audit, Sitemap And Redirect Agent

### Purpose

Protect SEO and migration continuity by comparing the existing website against the proposed site.

This agent should run for every website build. If the client has no existing website, the agent records that there is no current site to crawl and outputs a no-existing-site audit result.

### Inputs

- `Existing Website?` value from `AM Verified Website Intake`.
- AM-confirmed current live website URL, when one exists.
- Current website URL.
- Current XML sitemap, if available.
- Existing URLs from crawl.
- Search Console URL/export, if available and intentionally provided.
- Active page map from the intake/page-map process.
- Client-requested pages.
- Existing pages discussed during the onboarding call, if captured.

### Required Checks

- Confirm `Existing Website? = Yes` or `No`.
- If `Yes`, confirm the account manager verified the current live site URL with the client.
- If `No`, record no current-site crawl needed and skip crawl/redirect discovery.
- If `Yes`, crawl current site when available.
- Discover XML sitemap if available.
- Identify indexable pages, redirects, 404s, canonical URLs, titles, and major content types.
- Compare current URLs against proposed URLs.
- Flag old URLs with no destination.
- Flag crawled URLs that were not listed in the sitemap or discussed during onboarding.

### Execution Steps

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

### Crawl Behavior

The agent should handle the crawl itself for MVP.

It should attempt to collect:

- XML sitemap URLs.
- Linked pages found from navigation, footer, body links, and crawl traversal.
- Status codes.
- Canonicals.
- Titles.
- Meta descriptions.
- H1s when practical.
- Obvious service/location intent.
- Pages not present in the sitemap.

SEMrush may still be used by the team, but the MVP should not depend on SEMrush for basic crawl discovery.

### Onboarding Call Fields

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

### Unknown URL Handling

If the crawl finds old URLs with no obvious matching new page:

1. Ask the SEO specialist to classify the URL.
2. SEO specialist can decide if the mapping is obvious.
3. Escalate to the account manager when the decision depends on client intent, service availability, legal/compliance, or whether the page should still exist.
4. Do not silently delete, noindex, or redirect to the homepage unless approved.

Default status for no-match URLs:

`Needs SEO Review`

### Search Console Export Behavior

For MVP, Search Console exports are optional, not required.

If available, they should be used to find URLs Google has seen that a normal crawl may miss, such as:

- Old pages no longer linked from the site.
- URLs with clicks or impressions.
- Indexed pages missing from the sitemap.
- URLs that need high-priority redirect decisions.
- Legacy URLs, parameter URLs, or 404s with search visibility.

If unavailable, the agent should proceed with the live crawl and sitemap inventory, then mark Search Console as a future/optional enhancement.

### Outputs

- `Existing Site Crawl`
- `Current Sitemap Inventory`
- `Gap Analysis`
- `Redirect Map`
- `Page Conflict Notes`
- `Redirect Approval Needs`
- `No Current Site Audit Result`, when no existing website exists
- `SEO Specialist Review Queue`

### Approval Gate

The proposed sitemap and redirect map must be approved before continuing to launch. For rebuilds, do not launch until redirect decisions exist for important old URLs or the risk is explicitly accepted.

For the MVP, the redirect map should live in the same client Local SEO Sheet as a `Redirect Map` tab.

### Never Do

- Do not delete or ignore old URLs without a decision.
- Do not assume a 301 destination when page intent does not match.
- Do not let client-requested URLs override canonical URL rules without SEO review.
- Do not crawl or map an unverified website URL as the source of truth.
- Do not treat Search Console as required for MVP.

## 3. Content Brief Agent

### Purpose

Assign approved master content briefs to selected SEO/content pages, classify pages that do not need SEO briefs, and route true brief gaps to the technical/SEO decision owner.

### Inputs

- Active page map.
- Restoration master `Content Briefs`.
- Restoration master `Brief Queue`.
- Restoration master `Page Map`.
- Agency content brief SOP.
- `$restoration-content-brief-generator` skill for restoration SEO-money pages with no approved master brief.
- SEMrush data when new brief creation is needed.
- Page type classification from active page map.
- Technical person or SEO specialist decision when a page has no brief.

### Required Checks

- Confirm page URL exists in active page map.
- Classify the page as `Brief Required`, `Structured Page - No Brief`, or `Needs Technical/SEO Decision`.
- Confirm whether a generated brief exists in `Content Briefs` or `Brief Queue`.
- Confirm the brief Google Doc URL.
- Confirm brief priority and parent hub.
- Confirm the page is supported by verified service/sub-service decisions.
- Confirm operational pages have required structured information even when no SEO brief is required.

### Page Type Rules

Use approved content briefs by default for SEO/content pages.

Pages that usually require approved briefs:

- Parent service hubs.
- Child service pages.
- City pages intended to rank.
- City-service pages intended to rank.
- Commercial/property-type pages intended to rank.
- Any page targeting keywords that can make the client money.

Pages that usually do not require SEO briefs:

- Home page, if handled by design/content strategy instead of a service brief.
- About Us.
- Meet the Team.
- Reviews.
- Contact.
- Privacy policy.
- Terms/legal pages.
- Simple thank-you pages.
- Utility pages.

No-brief pages still need structured requirements. They are not freeform.

Examples:

- Contact page should include correct name, address, phone, form, service area/contact notes, and office/location segmentation when multiple locations or GBPs exist.
- Reviews page should use approved review widgets/sources and should not invent review quotes or exact ratings.
- About page should use verified company facts, team/history/service positioning, and approved claims only.
- Multiple-office pages must match each office's GBP name, address, and phone exactly when GBP data is being used.

### Service And City Targeting Rules

Root/non-city service pages should target the largest approved area the client services. These pages usually sit closest to the root domain and should target the strongest local market, not a smaller suburb or arbitrary office city.

Required behavior:

- Ask the AM or SEO owner for `Primary Service Page Target Area` when it is not already verified.
- Use the largest approved service area for service-page H1s, title/meta direction, intro copy, CTA closeout, and local trust sections.
- Do not choose the target area by guessing from the current website, GBP address, or first city in a sheet.
- Do not use a smaller city on root service pages unless the AM or SEO owner explicitly approves that strategy.

City pages are general city hubs. The default city-page H1 pattern is:

```text
Restoration Services in {{city}}, {{state_abbreviation}}
```

The visible page should use the state abbreviation, such as `IL`, not the full state name, unless the approved page map says otherwise.

City page behavior:

- Introduce the company and its restoration support in that city.
- Briefly explain the major service categories available in that city.
- List approved city-service pages for that location with concise summaries and links.
- Keep each city-service summary short enough to route the user deeper instead of duplicating the full city-service page.
- Do not mention or link city-service pages that are not approved in the active page map.
- Do not let the general city page cannibalize dedicated city-service pages.

### Strict Brief Fidelity For MVP

For pages that use approved SEO briefs, do not adapt the brief in the MVP.

The agent must preserve:

- H1.
- H2/H3 sequence.
- Section order.
- Required section intent.
- FAQ questions.
- FAQ answer intent.
- Title/meta direction.
- URL.
- Internal-link direction.
- Schema direction.

Allowed mechanical placement:

- Place the brief H1 in the page hero.
- Place the brief's main written content in the standard inner-page left column.
- Place standard form, review widget, and related navigation in the right column.
- Map a brief section into the matching approved template block only when the section meaning, order, and required content stay intact.

Not allowed without explicit technical/SEO approval:

- Reordering sections.
- Dropping sections.
- Combining sections in a way that changes emphasis.
- Changing H1/H2/FAQ wording because it sounds better.
- Replacing required internal links.
- Turning a required standalone section into a minor sidebar mention.
- Changing the URL, title/meta direction, or page intent.

If the approved website template cannot cleanly support a brief section, the agent should flag a template/support issue instead of adapting the brief.

### Execution Steps

1. Match active pages to approved master briefs by canonical URL or stable page ID.
2. Assign brief URLs and note localization placeholders for pages with approved briefs.
3. Classify pages with no matching brief.
4. For operational/no-brief pages, create structured page requirements instead of a content brief.
5. For SEO-money pages with no approved brief, ask the technical person or SEO specialist what to do.
6. If approved for a restoration page, draft a new brief with `$restoration-content-brief-generator` using the agency SOP, master page map, SEMrush data, and SERP research.
7. Require human review before marking a new brief reusable.
8. Store approved new brief links back into the master restoration SEO template.

### No-Brief Page Handling

The agent should not block common operational pages just because there is no SEO brief.

Instead, produce a structured requirement checklist.

Example contact-page requirements:

```text
Page: Contact
Brief Required: No
Required Content:
- Business name
- Primary phone
- Contact form
- Main address or service-area note
- Office sections when multiple GBP locations exist
- Each GBP office NAP must match exactly
- Emergency phone CTA when applicable
- Map/embed only if approved
```

### New Brief Decision Flow

When a selected page needs to rank for valuable keywords and no approved brief exists:

1. Ask the technical person or SEO specialist.
2. Recommended question:

```text
This page has no approved master brief. Should I use the agency SEO brief SOP and SEMrush data to draft a new content brief for SEO review?
```

3. For restoration pages, use `$restoration-content-brief-generator` after approval.
4. Human reviews and edits.
5. Once approved, add it to the master restoration SEO template's relevant tabs, including the content brief link.
6. Only then can the build agent use it as an approved brief.

### Outputs

- `Brief Assignment Matrix`
- `New Brief Needed List`
- `No-Brief Structured Requirements`
- `Technical/SEO Decision Queue`
- `Brief Blockers`
- `Approved New Brief Links`, if created

### Approval Gate

New briefs are not reusable until human-approved and added to the master restoration SEO template.

### Never Do

- Do not create new briefs when an approved master brief already covers the intent.
- Do not rewrite or omit the brief's required H1, H2/H3 sequence, FAQ questions, title/meta direction, URL, or internal-link plan.
- Do not adapt approved SEO briefs in the MVP beyond mechanical placement into the fixed page template.
- Do not build pages from vibes without a brief or explicit no-brief approval.
- Do not require SEO briefs for operational pages that are governed by structured page requirements.
- Do not use a draft brief as an approved build source.
- Do not add a new brief to the master template before human approval.

### Future Roadmap

- Add Search Console integration to support content decisions with URLs Google has seen, clicks, impressions, indexed pages, and high-priority redirect/content opportunities.

## 4. Copywriting And Localization Agent

### Purpose

Write final website copy from approved briefs, structured no-brief page requirements, verified intake, approved claims, and active page-map/internal-link rules.

### Skill

Use `$restoration-page-copywriter` for restoration website copy.

### Inputs

- Approved content brief or structured no-brief page requirements.
- AM-verified client intake.
- Approved claims/proof.
- Active page map.
- Internal-link plan.
- Brand/design brief.
- Voice and CTA rules.

### Required Checks

- Confirm an approved brief exists for SEO-money pages.
- Confirm operational/no-brief pages have structured requirements.
- Confirm root/non-city service pages have a verified `Primary Service Page Target Area`.
- Confirm city pages have an approved list of city-service pages to summarize and link.
- Confirm services, cities, response claims, certifications, licensing, review ratings, and insurance language are approved before writing them.
- Confirm H1/H2/H3 structure, FAQ questions, URL, title/meta direction, and internal-link direction are preserved.
- Confirm copy is written in first person from the company's perspective.

### Execution Steps

1. Read the approved brief or structured page requirements.
2. Pull approved client facts and claims from verified intake.
3. Write page-ready copy in first person using `$restoration-page-copywriter`.
4. Add page-specific CTA copy where useful.
5. Add natural internal-link notes without changing the approved link plan.
6. Produce `Final Page Copy` for design/build review.

### Outputs

- `Final Page Copy`
- `Full Body Copy By H2/H3`
- `CTA Copy`
- `FAQ Answers`
- `Internal Link Notes`
- `Unsupported Claim Flags`
- `Copy Blockers`

### Final Page Copy Format

The output should be one page-ready writing artifact:

- `Page URL`
- `Brief Used`
- `Page Type`
- `Primary Service Page Target Area`, for root/non-city service pages
- `Linked City-Service Pages`, for city pages
- `H1`
- `Hero / Intro Copy`
- `Body Copy`: full written content under every approved H2/H3, including paragraphs, bullets, and subsection copy.
- `CTA Block Copy`
- `Frequently Asked Questions`
- `Internal Link Placement Notes`
- `Claims Used`
- `Claims Avoided Or Needs Approval`

### Approval Gate

Page copy is not build-ready until unsupported claims are removed or approved and the final page copy is reviewed by the assigned human/editor when required.

### Never Do

- Do not create a new SEO brief; hand that back to the Content Brief Agent.
- Do not invent services, cities, claims, certifications, response times, review ratings, licensing, insurance outcomes, warranties, or locations.
- Do not write detached third-person copy like `the company` or `this business`.
- Do not rewrite the approved brief structure because a different outline sounds better.
- Do not stuff city/state terms.
- Do not write service pages against an unverified target city/market.
- Do not turn city-page service summaries into full duplicated city-service copy.

## 5. Template And Brand Adaptation Agent

### Purpose

Apply the agency's standard website design patterns while adapting the site to the client's brand, assets, audience, and approved exceptions.

### Skill

Use `$agency-website-design-builder` for homepage, inner-page, city-page, service-area, contact-page, final CTA, footer, and visual design-brief planning.

The design agent produces a `Design Brief`; it does not build production pages. Production implementation belongs to the Astro Build Agent and should be built in Astro, not standalone HTML/CSS. Standalone HTML/CSS is allowed only as an explicitly approved non-production mockup. Exploratory UI kit preview pages should not be created by default; when a homepage or mockups are rejected, use fresh homepage rebuild mode instead.

For reusable page templates, the design/build workflow should be component-first:

- Design the inner-page pattern, contact-page pattern, city-page pattern, and other repeatable page types as reusable Astro components/templates from the beginning.
- Use a noindex/nofollow preview route, such as `/templates/inner-page/`, only to render and review the real component with realistic placeholder data.
- Do not build a standalone static mockup and later convert it into Astro as the normal workflow.
- Do not use pure Lorem Ipsum for template approval. Use realistic service-shaped placeholder content that tests long headings, body sections, H3s, bullet lists, inline CTAs, FAQs, sidebar navigation, review widgets, forms, and mobile wrapping.
- After approval, production service, city, and city-service routes should pass structured final copy/data into the approved component instead of redesigning each page.

### Inputs

- Client profile.
- Approved claims.
- Brand assets.
- Brand guidelines, if available.
- Logo files.
- Approved colors/fonts, if available.
- Photos/videos.
- Competitor preferences.
- Design requests.
- Active page map.
- Standard homepage and inner-page patterns.
- Design input packet, if provided.
- Reference website examples, if provided.

### Required Checks

- Confirm required brand assets or mark placeholders.
- Ask whether the client supplied brand guidelines, approved colors, and approved fonts.
- If only a logo is available, extract practical color tokens from the logo and mark them as needing approval.
- Confirm font choices are readable web fonts and not blindly copied from the logo.
- Confirm client-specific design requests.
- Separate conversion/structure requirements from visual styling preferences.
- Identify requests that affect SEO, conversion, accessibility, performance, forms, tracking, or maintainability.
- Confirm the design brief states `Implementation Target: Astro`.
- Confirm the design agent is producing design artifacts only; code rebuilds belong to the Astro Build Agent after approval.
- Confirm the homepage design meets the visual quality bar before any build work starts.
- Confirm the `Premium Visual Acceptance Rubric` is complete before handoff.
- Record exceptions and approvals.

### Best Way To Communicate Design Direction

Use a `Design Input Packet`.

The packet can be written by the user, account manager, designer, or AI after a discovery call.

Recommended fields:

```text
Client:
Industry:
Primary audience:
Brand adjectives:
Brand guidelines:
Must-use colors:
Colors to avoid:
Approved fonts:
Logo files:
Logo/assets:
Photo/video assets:
Reference sites:
What we like from each reference:
What we do not want copied:
Homepage priorities:
Inner-page priorities:
Trust/proof points:
Service-area/map requirements:
Review/testimonial requirements:
Client-specific sections:
Known design exceptions:
```

Reference websites are useful, but the AI must treat them as inspiration and pattern evidence, not as a design to copy.

For each reference website, capture:

```text
Reference URL:
Liked elements:
Disliked elements:
Why it fits this client:
What should not be copied:
```

### Brand Intake And Token Generation

Ask for brand guidelines before designing.

Required setup questions:

- Do we have brand guidelines?
- Do we have approved colors?
- Do we have approved fonts?
- Do we have logo files?
- Are there colors, fonts, or styles the client dislikes or has prohibited?

If brand guidelines exist, follow them unless they conflict with accessibility, contrast, readability, or conversion.

If the only reliable brand asset is a logo:

- Extract a practical color palette from the logo.
- Define `primary`, `secondary`, `accent`, `dark`, `surface`, `muted`, `border`, and `white`.
- Add darker/hover variants for CTAs.
- Use the strongest high-contrast color for primary CTA when it fits the brand; otherwise use a controlled emergency/home-service accent.
- Check button, hero, form, footer, and card contrast.
- Mark logo-derived tokens as `Needs Human Approval`.

Font rules:

- Use supplied brand fonts only when they are web-safe/licensed and readable.
- Do not use the logo font as the site font unless explicitly provided and readable at body sizes.
- Do not default to ultra-light font weights.
- Use a readable UI/body font at 400/500 and strong heading weights at 700-900.
- Choose fonts from brand personality: industrial/urgent brands can use condensed display headings with a readable sans body; softer residential brands can use cleaner rounded sans systems.

### Production Boundary

Design planning and production implementation are separate steps.

Rules:

- The Template And Brand Adaptation Agent outputs a build-ready `Design Brief`.
- The Astro Build Agent implements the approved brief in Astro.
- In rebuild mode, the design agent produces the audit and revised design brief; it does not perform the production code rebuild.
- Do not create production homepages, templates, forms, navigation, final CTAs, or footers as standalone HTML/CSS files.
- A standalone HTML/CSS file is acceptable only when the human explicitly asks for a throwaway visual mockup. It must be labeled `Non-production mockup`.
- If the human wants the preview to become the real site, implement it in Astro from the start.

### Visual Quality Bar

The design should feel like a finished premium local-service website, not a lightly styled outline.

The design rules below are the codified premium standard distilled from the Romexterra reference build. The agent should be able to follow these rules without opening Romexterra on every project.

Live Romexterra inspection is optional and should be used only when the human explicitly asks for direct comparison, when the agent cannot understand the standard from the skill/docs, or when repeated rebuilds keep failing.

Mobile-first design priority:

- Build every local-service website from the phone experience first, then desktop, then tablet.
- This is a design and implementation philosophy, not only a QA step.
- Start section density, heading behavior, CTA placement, forms, review widgets, maps, accordions, service cards, sidebars, final CTAs, and footer behavior from phone-width constraints before expanding to larger screens.
- For restoration, plumbing, roofing, and other phone-first service businesses, mobile must keep the call path obvious: tap-to-call in the header, primary phone CTA reachable in the hero, trust bullets visible without awkward wrapping, form fields usable, review widgets contained, and the shared sticky mobile CTA appearing after the hero.
- No page or component is acceptable if it creates horizontal overflow, clipped text, tiny tap targets, hidden phone actions, or third-party widgets running off the screen on phone widths.
- Desktop can add sticky headers, sticky inner-page sidebars, wider card grids, richer imagery, and larger section rhythm only after the mobile version works. Tablet is the final adaptation layer.

Match this level of polish while customizing the brand, imagery, copy, service mix, proof, and assets to the client:

- Strong hero composition with real or service-relevant imagery.
- High-contrast overlay or another premium treatment with clear hierarchy.
- Large headline with intentional line breaks.
- Visible phone-first CTA and secondary request-service CTA.
- Proof near conversion points.
- Layered form card or polished request-service panel.
- Rich service cards with imagery, iconography, labels, and strong hierarchy.
- Alternating light/dark/brand-accent section rhythm.
- Designed comparison/differentiator section.
- Strong process section.
- Designed review/proof section.
- Scalable service-area/map module.
- Large final CTA and complete footer with exact NAP/location information.
- Shared mobile sticky CTA bar that appears after the hero on every page type.

Reject or revise the design before build if:

- It looks like a wireframe.
- It looks like a sitemap rendered as blocks.
- Most sections are plain text on blank backgrounds.
- Every section uses the same two-column layout.
- CTAs are small, weak, or buried.
- Proof/review areas are placeholders instead of designed modules.
- Service cards lack imagery, icons, labels, hierarchy, or interaction notes.
- The page feels like a logo/color swap of another client.
- Headline scale, section gaps, or cards are oversized without enough visual/content density.
- Mobile headlines clip, crop, overflow, or push the primary call action too far down the page.

For restoration and emergency home-service homepages, follow the `Premium Homepage Blueprint` in `$agency-website-design-builder`. The blueprint defines the first viewport, near-hero conversion bands, services, differentiators, process, proof/reviews, service area, final CTA, and footer without requiring live Romexterra inspection.

### Fresh Homepage Rebuild Mode

Use this when the human rejects the current homepage, rejects generated UI mockups, or says the site needs to go back to the drawing board.

Required behavior:

- Treat rejected homepages, UI kits, and standalone previews as negative examples only.
- Do not reuse rejected compositions, oversized typography, weak spacing, placeholder proof sections, or sitemap-like card layouts.
- Do not generate exploratory UI kits unless the human explicitly asks for mockups again.
- Start from a clean homepage route or explicitly remove the rejected route before rebuilding.
- Keep verified data, page-map decisions, brand tokens, service-area data, and approved claims.
- Produce one build-ready `Design Brief` and one Astro homepage implementation plan.
- The Astro Build Agent may implement the fresh homepage after the human approves the rebuild scope.
- The new homepage must pass the `Premium Visual Acceptance Rubric` and required visual QA evidence before it is considered acceptable.

### Premium Visual Acceptance Rubric

Before the design agent hands a homepage brief to the Astro Build Agent, score each area as `Pass`, `Needs Revision`, or `Fail`.

Required areas:

- Hero composition.
- Headline / density.
- CTA hierarchy.
- Form / request panel.
- Service cards.
- Section rhythm.
- Differentiator / process.
- Proof / reviews.
- Service area.
- Footer / final CTA.
- Mobile.

Any `Fail` blocks build handoff unless the human explicitly accepts the risk. `Needs Revision` items require concrete implementation fixes in the design brief.

### Premium Emergency Homepage Rebuild Mode

Use this stricter mode when the human says the homepage is not modern, professional, big-company, premium, or strong enough.

Use the codified premium homepage standard in this spec and `$agency-website-design-builder` as the benchmark. Do not require the agent to look at Romexterra unless the human explicitly asks for direct comparison.

Required sequence:

1. Inspect the current client homepage/preview.
2. Produce a `Premium Homepage Quality Audit`.
3. Identify exact misses by component: hero, typography/density, header, form, proof, stats, emergency CTA band, mobile sticky CTA, service cards, dark sections, comparison/differentiator section, process, reviews, service area, FAQ, final CTA, footer, and mobile.
4. Produce a revised `Design Brief` with concrete rebuild changes.
5. Do not edit production code in this mode unless the human explicitly switches to build work.
6. Specify the required visual QA evidence for the Astro Build Agent and QA Agent.
7. If the revised design direction still looks materially weaker than the premium standard, continue revising before handoff.

Minimum homepage composition for this mode:

- Top utility/proof strip or equivalent premium header proof treatment.
- Header with logo, nav, visible phone CTA, and request-service CTA.
- For restoration and urgent local-service businesses, the desktop header must remain sticky/fixed during scroll. The phone CTA must be more visually prominent than the secondary request-service/contact action.
- Desktop and tablet phone CTAs must visibly include the approved phone number in the button or immediately adjacent CTA text. Generic-only labels like `Call now` are acceptable only for mobile tap-to-call CTAs or when the phone number is already visibly attached to that same CTA.
- Mobile header must use this exact conversion layout: tap-to-call button on the left, logo centered, and menu button on the right. Do not hide the phone action inside the mobile menu, and do not offset the logo to fit the buttons.
- Cinematic first viewport: dark or high-contrast hero, real/service-relevant image treatment, large H1, trust bullets, review/proof widget, primary call CTA, secondary request CTA, and a substantial form/request card.
- Hero trust/conversion bullets must be short, specific, visually prominent, and visible above the fold on desktop and mobile. Place them directly below the H1 or directly below the hero subhead/tagline, before lower-priority supporting copy.
- Stats/proof band directly under the hero when verified claims allow it.
- High-contrast emergency CTA band near the top.
- Rich 3x2 or equivalent service-card section with image panels, icons/labels, descriptions, and links.
- At least one dark premium section after services.
- Designed comparison/why-choose-us module, not a simple bullet list.
- Process cards or timeline with visual depth.
- Review/proof module with a real widget when available or a polished reserved widget state when not.
- If a review widget snippet, app ID, embed source, or approved review source is provided, the homepage must render a dedicated real review section from that source. Do not substitute generic trust/proof content.
- Homepage review widgets should normally take the full content row width. Put the review-section intro/copy above the widget, then render the real widget full width below it instead of squeezing it into a split column beside copy.
- Reserved review states are temporary only and must be replaced before launch once the widget/source exists.
- Review section copy must be customer-facing. Do not show internal labels such as `proof plan`, `widget-ready`, or `review source reserved`.
- Elfsight-style review widgets should use non-render-blocking loading, such as async platform script plus lazy app container.
- Do not add `Review` or `AggregateRating` schema from the widget alone unless the rating/review data is verified, visible, and defensible.
- Service-area module with map/list behavior that feels interactive and scalable.
- Large final CTA band with phone-first copy.
- Complete footer with service links, company links, social links where approved, and exact NAP/location cards.
- Shared mobile sticky CTA bar that is hidden during the first hero viewport and appears after hero scroll.
- Desktop hero headlines must use intentional line groups and protected phrases. Do not allow important service phrases to accidentally split into awkward four-line layouts. Use markup spans, no-wrap phrase groups, and breakpoint/container rules instead of uncontrolled wrapping or viewport-width font scaling.
- Text on dark, green, or image-backed backgrounds must be comfortably readable. Muted gray support copy on dark/brand backgrounds fails visual QA when it reduces legibility.

Request-service form rules:

- Use the shared form component/renderer rather than one-off page form markup.
- Required visible fields by default: name, phone, email, service needed, city or ZIP, and additional information/message.
- Form copy must explain that emergency service is available by phone and that online form requests are normally returned within one business day.
- The approved phone number must be visible inside or directly beside the form for emergency visitors.
- If a field has no natural same-row partner, make it full width. Do not leave a lone short field floating on one side of the form.
- Form CTA hierarchy must stay phone-first for emergencies and request-service-first only for non-emergency form users.
- Form notices must use high-contrast text and clear spacing. Emergency instructions should be readable at a glance without eye strain.

Service-area module rules:

- For local-service sites, default to a real scalable Leaflet/OpenStreetMap-style service-area module unless the human approves another map provider.
- Do not ship a fake decorative map as the production service-area module.
- Load Leaflet/map JavaScript without blocking the initial render, but do not rely only on scroll/IntersectionObserver triggers. Service-area maps must have a load/DOMContentLoaded fallback that initializes the map automatically, so users do not get stuck seeing a permanent `Interactive service area map` placeholder.
- Highlight the service area visually and pair the map with expandable city/county/state lists when the area is large.
- Treat the service-area section as an internal-link module, not only a visual map.
- For large city/city-service modules, default to a stacked section: intro copy above, map/explorer below, then county/city/city-service links below or in a controlled-height explorer panel. Do not place a short copy column beside a very tall accordion.
- Expanded counties and city-service groups must have controlled height, scrolling, filtering, pagination, or progressive disclosure so opening one county does not break the page rhythm.
- Default restoration/local-service hierarchy: county or state selector -> city hub link -> expandable city-service links.
- The city name should link to the general city hub page, usually `Restoration Services in {{city}}, {{state_abbreviation}}`.
- A separate dropdown/arrow beside the city should expand the approved city-service pages for that city, such as `{{city}} Water Damage Restoration`, `{{city}} Fire Damage Restoration`, and other approved city-service pages.
- Do not duplicate the same cities as decorative pills when the county/city accordion already exposes them.
- For production, do not publish active links to city or city-service URLs until those routes exist or the generated-route plan is approved. Preview builds may show planned route links only when the page-generation plan is explicit.
- Do not render internal SEO/page-map terms to customers, including `targets`, `target cities`, `page targets`, `page map`, `proof plan`, or `approved rollout`. Use customer-facing labels like `communities`, `service cities`, `counties served`, or `service areas`.

Second service-area design option:

- `Regional Service Explorer`: real map on one side, segmented county/state browser on the other, optional city search/filter, city hub links, and expandable city-service rows.
- Use this option when the client has many counties, multiple states, or hundreds of city-service pages and the default accordion gets too long.

Typography and density rules for premium mode:

- Large display type is required, but oversized/clipped type fails the audit.
- The desktop hero should feel cinematic without leaving obvious dead space.
- Mobile hero copy must wrap intentionally, stay inside the viewport, and keep the primary call CTA reachable.
- Do not solve weak design by simply increasing font size, padding, card height, or empty spacing.

Required `Premium Homepage Quality Audit` format:

```markdown
## Premium Homepage Quality Audit

Reference Standard: Codified premium emergency homepage pattern from $agency-website-design-builder
Optional Live Reference: Only if explicitly requested
Client Preview:

| Area | Premium Standard | Current Client Miss | Required Change |
|---|---|---|---|
| Hero | ... | ... | ... |
| Typography / Density | ... | ... | ... |
| Header / CTA | ... | ... | ... |
| Mobile Sticky CTA | ... | ... | ... |
| Services | ... | ... | ... |
| Proof / Reviews | ... | ... | ... |
| Section Rhythm | ... | ... | ... |
| Footer | ... | ... | ... |

Verdict:
Rebuild Required: Yes/No
Build Handoff Approved: Yes/No
```

### Standardized Versus Customizable

Standardized means the page communicates proven information in proven places. It does not mean every client should look identical.

Standardized for MVP:

- Homepage section logic.
- Inner-page layout logic.
- CTA placement.
- Shared mobile sticky CTA behavior.
- Contact form presence.
- Review/proof placement.
- Service-area/map presence when service areas matter.
- FAQ placement.
- Final CTA.
- Footer/header functional logic.

Customizable per client:

- Colors.
- Typography within the design system.
- Photography and video.
- Logo usage.
- Icon style.
- Background textures/patterns.
- Section visual treatments.
- Service card styling.
- Service-area map styling.
- Trust badges and proof points, when approved.
- Homepage visual composition.

Approval required:

- Removing or hiding lead forms.
- Changing CTA strategy.
- Removing review/proof sections.
- Removing service-area/map sections when local SEO matters.
- Changing the fixed inner-page two-column layout.
- Reordering or dropping brief-required content.
- Adding custom tools/calculators/widgets.
- Creating a one-off page structure outside the approved templates.

### Wireframe Guidance

Wireframes are the best way to teach the AI repeatable design intent.

Recommended artifacts:

- Homepage wireframe.
- Inner-page wireframe.
- Contact page wireframe.
- Reviews page wireframe.
- Service-area map behavior notes.

Wireframes should describe:

- Required elements.
- Relative order.
- Content priority.
- CTA placement.
- Sidebar/right-column behavior.
- Mobile stacking behavior.
- Which parts are fixed and which parts can vary visually.

Do not use wireframes to lock every pixel. Use them to lock the conversion structure and required information.

Wireframes are not sufficient for production approval. A homepage still needs a visual design brief that defines imagery, contrast, section rhythm, component treatments, CTA hierarchy, and proof placement.

### Design-Spec Review Queue

Use this sequence when developing the reusable page patterns with the human:

1. Homepage pattern.
2. Inner-page pattern for service pages, city pages, city-service pages, and most reusable content pages.
3. Contact page pattern after the inner-page instructions are reviewed and approved.
4. Reviews, team, service-area index, and other custom page patterns as needed.

The contact page should not be treated as an afterthought. It needs its own review because it controls NAP accuracy, office/GBP segmentation, emergency phone messaging, forms, map/location behavior, and tracking-critical conversion actions.

### Fixed Inner-Page Layout For MVP

Use the same inner-page layout pattern across service, city, and most content pages unless explicitly approved otherwise.

The inner-page layout must be component-first. Create or update the reusable Astro inner-page component/template first, then expose it through a noindex/nofollow approval route with realistic placeholder content. Real pages should consume the same approved component with final page copy and page-map data.

Default layout:

- Page-specific hero.
- Main written content in the left column.
- Approved images/media inside or near the left-column content.
- Right column with sticky sidebar on desktop/tablet: contact form first, review/proof widget, capped related navigation, and trust elements. Mobile stacks the sidebar below the article.
- Final CTA.
- Footer.

The page can look visually customized through brand, spacing, imagery, colors, card treatments, icons, and proof points, but the structure should stay stable.

Inner-page body rules:

- The left column owns the SEO brief structure: H2/H3 sections, paragraph copy, bullets, internal links, media, page-specific CTA blocks, and FAQ content when the brief calls for it.
- The left-column body should stay primarily editorial. Do not turn every section into a card or a marketing panel.
- Use approved reusable body modules for visual rhythm inside long SEO copy: `content-alert-list` for urgency/safety signs, `included-panel` for scoped service-includes lists, `inner-subsections` for H3 support cards, and `inline-cta` for page-specific phone-first conversion.
- Subsection cards may include internal links and a compact `Learn more` action when the brief calls for child-page routing. Do not create unrelated link cards just to fill the design.
- Alert rows should be short, scannable, and tied to real user risk or urgency, such as symptoms, unsafe conditions, contamination warnings, or “call now” decision points.
- Keep body modules restrained: no nested cards, no excessive icons, no oversized decorative panels, and no repeated card grid after card grid.
- CTA blocks inside the left column should be page-specific, such as `Need Water Damage Cleanup Help Now?`, while still using the approved phone-first conversion behavior.
- Every service, city, and city-service page must place a page-specific `inline-cta` immediately after the first body paragraph in the left column.
- Every service, city, and city-service page must end the final left-column narrative section with the same `inline-cta` component/format before the template moves into post-body sections such as process, benefits, reviews, service area, or FAQ.
- Both in-body CTAs must use the exact same reusable component and visual format on a given page: client logo, eyebrow, heading, support copy, phone-first `Call` action, and secondary `Request service` action. Do not create one-off first/final CTA layouts.
- The CTA should tell urgent users to call now for immediate or 24/7 help, show the phone number on desktop/tablet CTAs, and keep spacing responsive so the logo, copy, and buttons do not crowd or overflow.
- The right-column form should stay high on the page and should not be replaced by a custom page-specific form.
- On desktop/tablet, inner pages must use a Romexterra-style sticky sidebar implementation unless the human explicitly approves an exception: apply `position: sticky` directly to the sidebar `aside`/right-column element, with an offset below the sticky header, `display: grid`, and standard card gaps. Do not put sticky behavior on a nested wrapper unless there is a proven browser/layout reason. Do not create an internally scrollable sidebar, do not add a sidebar scrollbar, and do not cap the sidebar with viewport-height overflow. The page itself scrolls; the right column sticks naturally and then releases with the two-column body.
- Avoid ancestor overflow rules that break sticky positioning. Use `overflow-x: clip` rather than `overflow-x: hidden` on root/page wrappers when the goal is horizontal bleed control.
- On mobile, the sidebar should be static and stack below the article.
- If an approved third-party review widget exists, the page must include the real widget in a dedicated review section. Use it in the right-column sidebar only when it fits cleanly without overflow, cramped tabs, or broken mobile behavior.
- When the real widget is too wide or heavy for the sidebar, use a compact sidebar review/proof card that links to the full-width real widget section. Do not present that card as the actual widget.
- If separate widget snippets/app IDs are provided for sidebar versus full-width/homepage use, preserve that mapping exactly. Sidebar widgets belong in the sidebar; homepage/full-width widgets belong in homepage or large inner-page review sections.
- Review sections must pass phone-width overflow QA. The review section, copy panel, widget wrapper, and iframe/embed container must be constrained with `min-width: 0`, `max-width: 100%`, safe text wrapping, and overflow containment where needed so third-party reviews and review copy cannot run off the right side.
- The right column should never become the dominant content column. If navigation or widgets outlast the written article by a large amount, shorten or collapse the sidebar content.
- After the two-column body, reusable sections may return, such as process, benefits, insurance/support, reviews, service area, FAQ, final CTA, and footer.

### City Page Hub Pattern

Use the inner-page layout for city pages, but treat the city page as a general hub for that location.

Default city-page structure:

- Page-specific hero with H1 `Restoration Services in {{city}}, {{state_abbreviation}}`.
- Left-column intro about the company's restoration support in that city.
- Brief service-category or city-service summaries.
- Links to every approved city-service page for that location.
- Phone-first CTA.
- Right-column form, review/proof widget, capped navigation, and trust elements.
- Reusable service-area, FAQ, final CTA, and footer sections when approved by the design/page map.

The city page should help users choose the right service page. It should not duplicate the full water, fire, mold, reconstruction, commercial, or specialty cleanup copy that belongs on dedicated city-service pages.

### Inner-Page Sidebar Navigation

Use capped smart navigation for service, city, city-service, and reusable content pages.

Default rules:

- Do not render a full uncapped sibling list.
- Always include the parent hub or an equivalent `View all [Parent Service] services` link.
- Always include the current page, highlighted when applicable.
- Include 6-8 closest related child/sibling pages.
- Include 5-7 compact core parent-service hubs.
- Keep total sidebar navigation around 14-16 links maximum.

Selection priority:

1. Content-brief/internal-link-plan links, when provided.
2. Parent hub.
3. Current page.
4. Closest service-intent siblings.
5. Priority/P1 sibling pages.
6. Main parent service hubs.

If a service family has many child pages, link to the parent hub as `View all [Parent Service] services` instead of listing every child page. This prevents the right column from outlasting the article content on pages with short or medium-length copy.

Build contract:

- The sidebar generator should dedupe links before rendering.
- The sidebar should prefer approved active pages and should not link to pages excluded from the active page map.
- The current page should not be rendered as a normal duplicate link.
- The capped list should be deterministic so repeated builds produce stable navigation.
- For short pages, the build agent may use fewer links, but it should not expand beyond the cap without human approval.

### Contact Page Pattern

Use a dedicated contact page pattern instead of treating contact as a generic inner page.

Default structure:

- Phone-first hero with the main phone number, tap-to-call CTA, and secondary `Request Service` anchor.
- Request-service form as the first body section after the hero.
- Optional short support panel beside the form explaining when to call versus submit online.
- Location/NAP cards below the form.
- Reusable final CTA.
- Reusable footer.

Rules:

- The form must use the shared lead form and standard tracking/routing fields.
- Non-emergency form copy should say online requests are returned within one business day.
- Emergency copy should direct users to call immediately.
- The `Request Service` hero CTA should anchor to the form section.
- Do not put locations, maps, general contact copy, or office cards before the form unless the human explicitly approves the exception.
- Every approved GBP location must appear on the contact page.
- GBP location cards must match the verified business name, address, and phone exactly.
- Multiple GBP locations must be visually segmented so users understand they are separate locations.

### Execution Steps

1. Recommend the standard design pattern first.
2. Map client assets into homepage, inner page, service, city, team, and contact patterns.
3. Run fresh homepage rebuild mode when the current homepage or mockups were rejected.
4. Convert the selected direction and design input packet into a design brief.
5. Identify which requested changes are visual customization versus structural exceptions.
6. Produce or update the premium quality audit when evaluating a rejected build.
7. Complete the premium visual acceptance rubric.
8. Propose deviations only when client-specific need justifies them.
9. Create exception records for nonstandard requests.
10. Produce a design brief for the build agent only when build handoff is approved.

### Outputs

- `Design Brief`
- `Homepage Section Plan`
- `Fresh Homepage Rebuild Plan`, when required
- `Premium Visual Acceptance Rubric`
- `Inner Page Pattern`
- `City Page Hub Pattern`
- `Contact Page Pattern`
- `Service Area / Map Behavior`
- `Mobile Sticky CTA Behavior`
- `Asset Needs`
- `Image Optimization Plan`
- `Third-Party Loading Plan`
- `Schema Plan`
- `Navigation Inclusion Plan`
- `Design Exceptions`
- `Reference Site Notes`
- `Wireframe Requirements`
- `Visual QA Evidence Required`

### Design Brief Format

The output should be one build-ready design artifact:

- `Client`
- `Industry`
- `Design Status`
- `Approved Pattern Version`
- `Implementation Target: Astro`
- `Reference Quality Benchmark`
- `Brand Source`
- `Brand Direction`
- `Brand Tokens`
- `Homepage Section Plan`
- `Fresh Homepage Rebuild Plan`, when required
- `Premium Visual Acceptance Rubric`
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
- `Premium Homepage Quality Audit`, when premium emergency homepage rebuild mode applies

### Approval Gate

Nonstandard sections that affect conversion, SEO, forms, tracking, or performance need explicit approval before build.

Homepage design also needs visual-quality approval before build. Do not pass a flat wireframe-style homepage to the Astro Build Agent.

If premium emergency homepage rebuild mode applies, do not pass the homepage to the Astro Build Agent until the quality audit is complete and the design direction explicitly says how it will close the visual gap.

Do not pass the homepage to the Astro Build Agent when any premium visual rubric area is `Fail`, unless the human explicitly accepts that risk.

Do not pass a rejected homepage back to the Astro Build Agent as a light tweak. Use fresh homepage rebuild mode and require the revised brief to explain exactly how the new implementation avoids the rejected composition.

### Never Do

- Do not let client-specific requests break forms, tracking, SEO basics, accessibility, or page speed.
- Do not make unsupported claims through design badges, stats, review scores, or trust icons.
- Do not create a separate one-off page system when a reusable template can handle the need.
- Do not copy a reference website's design wholesale.
- Do not make clients look cookie cutter by changing only logo/colors while leaving all visual treatments identical.
- Do not change the fixed inner-page structure in the MVP without explicit approval.
- Do not build production pages in standalone HTML/CSS.
- Do not hand off a homepage design that fails the visual quality bar.
- Do not respond to a rejected homepage with only subjective promises like `more cinematic`, `more polished`, or `closer to the reference`; produce the premium homepage quality audit and concrete rebuild changes.
- Do not treat a design audit as permission to code. Design audit approval and build approval are separate.

## 6. Astro Build Agent

### Purpose

Build the approved website using Astro, structured data, shared components, shared forms, and validated page generation.

### Inputs

- Active page map.
- Brief assignment matrix.
- Design brief.
- Approved final page copy.
- Approved claims.
- Service area matrix.
- Tracking/form requirements.
- Repo rules and existing Astro starter.

### Required Checks

- Confirm build should happen in Astro under `src/`.
- Confirm the approved design brief says `Implementation Target: Astro`.
- Confirm production pages, layouts, navigation, footer, forms, schema, SEO, galleries, and reusable sections will be controlled through Astro pages, layouts, components, data files, and utilities.
- Confirm generated service URLs follow the master sheet URL schema.
- Confirm forms use shared form sources.
- Confirm shared CTA/footer/header patterns are used.
- Confirm the shared mobile sticky CTA bar is implemented in the shared layout or shell so every page type inherits it.
- Confirm the sticky CTA has stable selectors for QA, such as `[data-page-hero]` and `[data-mobile-sticky-cta]`, or documented equivalents.
- Confirm repeatable templates are implemented as reusable Astro components from the beginning, not standalone pages converted later.
- Confirm noindex/nofollow template approval routes are excluded from header navigation, footer navigation, generated page maps, and XML sitemaps.
- Confirm service/city/city-service pages pass structured copy/data into the approved component rather than duplicating or redesigning page markup.
- Confirm inner pages use the fixed two-column contract unless an approved exception exists.
- Confirm inner-page sidebars use capped smart navigation.
- Confirm contact pages use the phone-first hero, form-first body, segmented GBP/NAP locations below the form, and reusable final CTA/footer.
- Confirm every new page has a documented navigation-inclusion decision.
- Confirm every new page has a page-type schema plan.
- Confirm `/sitemap.xml` will be a real XML endpoint or file at that exact path, not an HTML redirect shell.
- Confirm `robots.txt` will reference the preferred `/sitemap.xml` URL.
- Confirm image sources, optimization path, dimensions, and alt-text requirements are defined before production use.
- Confirm hero/LCP images are rendered as responsive image markup, not CSS backgrounds.
- Confirm every third-party script, review widget, map, social embed, video, and tracking script has a declared loading strategy.
- Confirm font choices use self-hosted WOFF2 files or system fonts in production.
- Confirm no unsupported one-off pages are being added.
- Confirm the task is an approved implementation task, not a planning-only discussion.

### Astro-First Production Contract

- Build production websites in Astro-compatible source code.
- Do not use standalone static HTML files as the production source of truth.
- Pages, layouts, navigation, footers, forms, schema, SEO, galleries, and reusable sections must be built through Astro pages, layouts, components, data files, content collections, and utilities.
- Any unavoidable raw/static HTML must still be generated or controlled by Astro code and validated from the final build output.
- Temporary standalone HTML/CSS previews are non-production artifacts and must be rebuilt as Astro before launch.
- Repeatable page designs should be approved through noindex/nofollow Astro template routes that render the actual reusable component with realistic placeholder data.
- Template approval routes are not production pages. They must not be included in main navigation, footer navigation, service-area listings, generated XML sitemaps, or Search Console submissions.

### New Page Navigation Contract

When a new page is created, the build agent must ask or record:

- Should this page appear in the header navigation?
- Should this page appear in the footer navigation?
- Should this page appear in sidebar/related navigation?
- Should this page appear in parent service hub or city hub listings?
- Should this page be XML sitemap only?
- Is there an approved reason to keep it out of visible navigation for now?

Default rule: revenue/SEO landing pages should be reachable through an approved internal-link path. They do not all belong in the header, but they should not become accidental orphan pages.

Navigation must be controlled through shared data/config/components, not hard-coded one-off markup.

### Schema Contract

- Schema is part of the build contract for every page, not a post-launch task.
- Use shared Astro schema utilities/components to generate JSON-LD from structured data.
- Common page-type schemas: `LocalBusiness`, `Organization`, `Service`, `FAQPage`, `BreadcrumbList`, `ContactPage`, `AboutPage`, `Person`, `ImageObject`, `Review`, and `AggregateRating`.
- Use `Review` or `AggregateRating` only when the rating/review source is verified and supported by visible or defensible data.
- NAP, location, phone, URL, service-area, sameAs, and service data must match approved intake and shared site data.
- Do not add schema-only claims that are not approved in visible copy or verified intake.
- QA must validate final rendered JSON-LD from the built output.

### Sitemap And Robots Contract

- Every Astro website must ship `/sitemap.xml` as a real XML endpoint that returns HTTP `200` and an XML content type.
- `/sitemap.xml` must never be an HTML redirect page, meta-refresh page, branded redirect shell, or normal site page.
- For larger or growing sites, prefer `/sitemap.xml` as an XML sitemap index that points to child sitemap files such as `/sitemap-0.xml`, `/sitemap-1.xml`, and later chunks.
- Child sitemap files must return HTTP `200`, an XML content type, and canonical production URLs.
- If using `@astrojs/sitemap`, do not rely on an Astro page-style redirect from `/sitemap.xml` to `/sitemap-index.xml` if it generates `dist/sitemap.xml/index.html`. Use a post-build alias/copy step or equivalent deployment-safe method so `/sitemap.xml` is an actual XML file.
- `robots.txt` must reference the preferred sitemap entry point, normally `https://www.clientdomain.com/sitemap.xml`.
- Google Search Console should use `/sitemap.xml` as the primary submitted sitemap. `/sitemap-index.xml` may also exist, but `/sitemap.xml` must work.
- Build/launch audit must fail if `/sitemap.xml` is missing, returns HTML, is a redirect shell or meta-refresh page, does not parse as a valid sitemap or sitemap index, has missing/non-XML child sitemap files, contains non-canonical URLs, or `robots.txt` does not reference the preferred sitemap.

### Image Optimization Contract

- Never upload raw client images directly into the production public image folder and reference them as final assets.
- Original images go into an intake/source folder first.
- Use Astro image tools wherever possible:
  - `Image` for normal images.
  - `Picture` for hero, art-directed, or responsive images.
  - `getImage` for data-driven or programmatic image rendering.
- All meaningful content images must render through Astro-compatible optimized image components or explicit `<picture>`/`<img>` markup.
- Future client starters should include:
  - `OptimizedImage.astro` for standard images.
  - `GalleryImage.astro` for galleries.
  - `HeroImage.astro` for above-the-fold hero/LCP images.
- Hero/LCP images must never be CSS backgrounds.
- Hero/LCP images must render as responsive AVIF plus WebP fallbacks with explicit `width`/`height`, correct `alt`, `decoding="async"`, `fetchpriority="high"`, and no lazy loading.
- For CSS backgrounds, legacy generated markup, migrated gallery data, or anything that cannot use Astro image tools, pre-compress with Sharp before production use.
- CSS backgrounds are allowed only for decorative imagery or below-the-fold imagery.
- Prefer WebP/AVIF/JPG output with role-based sizing, not one universal max size.
- Generate right-sized AVIF and WebP variants for logos, badges, thumbnails, gallery images, hero images, and service-card images.
- Never reference raw `.png` or `.jpg` client uploads directly in production pages unless there is a documented exception.
- Every rendered `img` element in final build output must include explicit `width` and `height`, either manually or through Astro image metadata.
- CSS background image containers must reserve stable layout space using `aspect-ratio`, `min-height`, or fixed layout constraints.
- Future client starters must provide `npm run optimize:images` and `npm run validate:images`.
- The standard pre-deploy QA command must include image validation.
- The image validator must fail builds if images are oversized, unoptimized, missing width/height, missing useful alt text where applicable, likely LCP images are lazy-loaded, stale/raw image URLs are used, or images bypass the approved workflow.

### Third-Party Loading Contract

- Third-party scripts, review widgets, maps, social embeds, videos, chat, and tracking must declare a loading strategy before implementation.
- Use `defer`/`async` and preconnect where appropriate.
- Maps/Leaflet should load only when near viewport unless the map is above the fold.
- Review widgets above the fold may load immediately after `window.load` when trust proof is required, but must not be render-blocking in the head.
- Prefer static first-party facades for reviews, maps, social embeds, and videos, then hydrate third-party widgets after load or near viewport.
- Every reusable component that adds media or third-party scripts must define its loading strategy as part of the component contract.
- The build must not add render-blocking noncritical scripts.
- Tracking scripts must be verified by the QA agent; script presence alone is not proof that events fire.

### Font Performance Contract

- All production fonts must be self-hosted or system fonts.
- If Google Fonts are used during design selection, download/self-host the approved font files before production use.
- Do not ship remote font CSS, Google Fonts stylesheets, `fonts.googleapis.com` / `fonts.gstatic.com` preconnects, Adobe font kits, CDN font files, or third-party font kit scripts in production unless the human explicitly approves a documented exception.
- Self-host custom fonts as WOFF2 where possible.
- Define custom fonts with `@font-face` and `font-display: swap`.
- Include only the weights/styles the design actually uses.
- Treat unapproved remote font loading as a pre-deploy QA failure because it hurts page speed and SEO.

### Execution Steps

1. Convert approved pages into structured data/routes.
2. Map briefs into approved reusable block types.
3. Record navigation-inclusion and schema decisions for every new page.
4. Add or verify `/sitemap.xml`, child sitemap files when needed, and `robots.txt`.
5. Stage and optimize approved images through the Astro/Sharp image pipeline.
6. Add or update shared components only when the need is reusable.
7. Add page-specific content without duplicating forms, CTAs, or footers.
8. Render contact, inner-page, city, and service-page patterns from the approved design contracts.
9. Add or verify declared loading strategies for third-party scripts, widgets, maps, videos, and tracking.
10. Add or verify the shared mobile sticky CTA bar with show-after-hero behavior, safe-area spacing, reduced-motion support, approved tracking/DNI phone source, and QA selectors.
11. Run required validation commands.
12. Produce a build handoff for QA.

### Outputs

- Code changes.
- `Build Summary`
- `Validation Results`
- `Known Build Issues`

### Required Validation

For Romexterra-style Astro sites:

```bash
npm run optimize:images
npm run build
npm run validate:images
npm run validate:forms
npm run validate:service-pages
npm run validate:sitemap
npm run audit:launch
```

Use `npm run validate:all` when available and appropriate.

### Never Do

- Do not build production pages by editing standalone root HTML files.
- Do not convert a non-production HTML/CSS mockup directly into production without rebuilding it as Astro components/routes.
- Do not hand-code lead forms in individual pages.
- Do not duplicate custom form markup outside shared form components/renderers.
- Do not create `/services/...` URLs for generated restoration pages unless the master sheet changes.
- Do not ship CSS-background hero/LCP images.
- Do not ship render-blocking noncritical third-party scripts.
- Do not ship unapproved remote font loading.
- Do not ship `/sitemap.xml` as HTML, an Astro redirect shell, a meta-refresh page, or a normal page.
- Do not let `robots.txt` point to a non-working sitemap URL.
- Do not ignore failed validation.
- Do not store secrets in repo files.
- Do not change a client repo while the human is only discussing delivery-system design.

## 7. SEO, Tracking And QA Agent

### Purpose

Verify the site before build, before launch, after launch, and after individual page updates.

### Inputs

- Built site or preview URL.
- Active page map.
- Redirect map.
- Tracking/access requirements.
- Form routing requirements.
- Approved claims.
- QA requirements generated from intake.

### Required Checks

- Metadata.
- Canonicals.
- OG/Twitter tags.
- Schema exists, validates, and matches approved visible/verified claims.
- Sitemap.
- Robots.
- `/sitemap.xml` returns HTTP `200`, XML content type, and valid sitemap or sitemap-index XML.
- `/sitemap.xml` is not an HTML redirect shell, meta-refresh page, branded redirect page, or normal site page.
- Child sitemap files return HTTP `200`, XML content type, and canonical production URLs.
- `robots.txt` references the preferred `/sitemap.xml` URL.
- Internal links.
- New-page navigation inclusion or intentional exclusion.
- Forms.
- Tracking scripts/events.
- Phone numbers and DNI.
- Redirects.
- Image optimization, dimensions, alt text, and approved workflow compliance.
- Hero/LCP images render through responsive image markup, use AVIF/WebP fallbacks, have explicit dimensions, use `fetchpriority="high"`, and are not lazy-loaded.
- No stale/raw image URLs are used in production output unless documented as an exception.
- Third-party scripts/widgets/maps/videos declare approved loading strategies and do not render-block the page.
- Fonts are self-hosted or system fonts; no unapproved Google Fonts, Adobe font kits, CDN font files, or third-party font scripts load in production output.
- Forms use shared form components/renderers without duplicated custom form markup.
- Inner-page sidebar cap, parent/current-page behavior, and active-page eligibility.
- Contact-page order: phone-first hero, form before locations, exact GBP/NAP cards below the form.
- Mobile sticky CTA bar appears after the hero on every page type, uses the approved `tel:`/DNI phone source, respects safe-area and reduced-motion behavior, and does not cover forms or content.
- Desktop/tablet QA must fail phone CTAs that say only `Call now` without the approved phone number visible inside or immediately attached to that CTA.
- Desktop/mobile visual QA.
- Required visual evidence follows the mobile-first priority order: mobile initial `390x844`, mobile scrolled `390x844`, desktop `1440x1100`, and tablet `1024x900`; no-horizontal-overflow check; sticky CTA hidden-in-hero and visible-after-hero checks.
- Page speed/Core Web Vitals where practical.

### Execution Steps

1. Run pre-build intake validation.
2. Run build/output validation.
3. Crawl preview or local build.
4. Verify `/sitemap.xml`, child sitemaps, canonical URLs, and `robots.txt`.
5. Verify forms and tracking setup.
6. Verify redirect configuration.
7. Produce red/yellow/green QA status.
8. List blockers separately from accepted risks.

### Outputs

- `QA Report`
- `Launch Blockers`
- `Accepted Risks`
- `Retest Checklist`

### Approval Gate

Do not mark launch ready while red blockers remain unless the owner explicitly accepts the risk.

### Never Do

- Do not treat script presence as proof that events fire.
- Do not skip form tests when forms changed.
- Do not approve exact review ratings unless the source is live/approved.
- Do not approve launch without checking redirects for rebuilds.

## 8. Launch, Tracking And Handoff Agent

### Purpose

Make the built website operational in production and give the agency/client a clean handoff.

### Inputs

- QA-approved build.
- DNS/domain requirements.
- Hosting/Vercel project.
- Environment variables.
- Tracking requirements.
- Call tracking/DNI requirements.
- Redirect map.
- Search Console access.
- Client/admin access requirements.

### Required Checks

- Production domain points correctly.
- SSL is active.
- Redirects are live and return expected status codes.
- Forms submit to the correct destination.
- GA4/GTM/Meta Pixel/call tracking are verified.
- Sitemap is submitted or ready for submission.
- Client handoff packet is complete.

### Execution Steps

1. Confirm pre-launch QA status.
2. Confirm DNS and hosting readiness.
3. Confirm secrets/environment variables are configured outside repo.
4. Launch or coordinate launch.
5. Run post-launch crawl and tracking checks.
6. Submit/verify sitemap.
7. Produce handoff packet.
8. Schedule or document post-launch monitoring.

### Outputs

- `Launch Report`
- `Post-Launch QA Report`
- `Client Handoff Packet`
- `Open Follow-Ups`

### Approval Gate

Launch requires explicit owner approval.

### Never Do

- Do not rotate, expose, or store secrets in repo files.
- Do not launch with unresolved DNS/form/tracking blockers unless explicitly approved.
- Do not mark launch complete before live form and redirect checks.

## Handoff Chain

Default sequence:

1. Client Intake Agent
2. Current Site Audit, Sitemap And Redirect Agent
3. Content Brief Agent
4. Copywriting And Localization Agent
5. Template And Brand Adaptation Agent
6. Astro Build Agent
7. SEO, Tracking And QA Agent
8. Launch, Tracking And Handoff Agent

Agents can run some work in parallel after intake, but final build should not begin until the active page map, brief assignments, final page copy, design brief, and critical blockers are resolved or accepted.

## Next Spec Work

1. Build the real `AM Verified Website Intake - Template`.
2. Add exact output formats for `Verified Intake Summary`, `Active Page Map`, `Redirect Map`, `Brief Assignments`, `Final Page Copy`, `Design Brief`, `Navigation Inclusion Plan`, `Schema Plan`, `Image Optimization Plan`, `Third-Party Loading Plan`, `Build Summary`, `QA Report`, and `Launch Report`.
3. Convert the shared spec into separate per-agent skill/spec files once the handoff formats are stable.
4. Add restoration-specific parent/sub-service decision trees.
5. Add machine-checkable pattern rules for homepage, inner page, city page hub, contact page, forms, sidebar navigation, navigation inclusion, schema, image optimization, metadata, tracking, and redirects.
6. Add examples from the first live pilot, including the service-page target-area question and city-page hub linking pattern.
