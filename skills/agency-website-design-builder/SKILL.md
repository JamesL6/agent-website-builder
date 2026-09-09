---
name: agency-website-design-builder
description: Creates reusable visual design briefs for agency-built local service websites, especially restoration, plumbing, roofing, and home-service sites. Use when planning homepage, inner-page, city-page, service-area, contact-page, review, team, CTA, sidebar, and footer design patterns before Astro build work.
---

# Agency Website Design Builder

Create a build-ready visual design brief from verified intake, brand assets, page map, final copy, and approved agency patterns.

This skill designs the website structure and visual direction. It does not write final SEO copy and does not build production code.

## Production Boundary

The design builder produces a `Design Brief`, not the production homepage.

Production implementation should be handled by the Astro Build Agent in Astro using the agency starter, reusable components, shared forms, shared CTA/footer/header patterns, structured data, schema utilities, shared navigation data, and optimized image components.

Rules:

- Do not build production pages as standalone HTML/CSS.
- Do not hand-code production forms, nav, footer, or final CTA inside a one-off HTML file.
- Do not treat schema, image optimization, or navigation inclusion as optional post-build cleanup.
- A temporary HTML/CSS mockup is allowed only when the human explicitly asks for a throwaway visual preview. Label it `Non-production mockup`.
- Do not create exploratory UI kit preview pages by default. If the homepage is rejected, use `Fresh Homepage Rebuild Mode` and rebuild from the premium blueprint instead of generating multiple mockup directions.
- If a visual preview is needed for the real build, implement it in Astro from the approved design brief.
- The design brief must state `Implementation Target: Astro`.
- In rebuild mode, the design builder produces a `Premium Homepage Quality Audit` and revised `Design Brief`; the Astro Build Agent performs the code rebuild after approval.

## Source Order

Use the most specific approved source first:

1. An **approved Homepage Messaging Pack** — required before homepage design work. See `Homepage Messaging Pack Gate` below.
2. Verified client intake and approved claims.
3. Active page map and page types.
4. Final page copy or approved content briefs.
5. Brand assets, photos, videos, logo, colors, and reference sites.
6. Agency default design patterns.
7. Current website only as supporting context.

Do not invent claims, badges, ratings, certifications, locations, response times, review counts, or services through design.

## Living Wireframes — Reference Implementations (look before you design)

The wireframe is code, not this document. Every pattern described below already exists as a
starter component, and the approval surfaces are `noindex` preview routes that render those
components with realistic service-shaped placeholder data (§17). Before writing any brief, run
the starter (`npm run dev` inside the canonical checkout's `starter/`) and LOOK at the relevant
route. A brief specifies which variant, tokens, copy, and photography fill these templates —
never a new layout. If a client genuinely needs something these cannot express, propose a new
variant for the registry (`design-recipe.yaml` → BUILT/PLANNED) instead of briefing a one-off.
No external UI component kits (Tailwind UI, shadcn, Flowbite, DaisyUI…) — never imported, never
proposed; the starter is the design system (§17, owner decision 2026-09-09).

| Page type / pattern | Reference implementation (under `starter/src/`) | Preview route |
|---|---|---|
| Homepage (`emergency_split_hero`) | `pages/index.astro` composition | `/templates/homepage/` |
| Service, child, and city hub pages | `components/templates/InnerPageTemplate.astro` | `/templates/inner-page/` |
| City hub pages (generated) | `pages/[citySlug].astro` — copy from `data/cities.ts` `cityHubCopy` | build output only |
| City-service pages (generated) | `components/templates/CityServicePage.astro` via `pages/[citySlug]/[hub].astro` — content from `data/cityServiceContent.ts` | `/templates/city-service/` |
| Contact page (§13) | `components/templates/ContactPageTemplate.astro` | `/templates/contact-page/` |
| Services grid + differentiator | `ServiceGrid.astro`, `DifferentiatorVS.astro` | `/templates/sections-a/` |
| Process + reviews | `ProcessSection.astro`, `ReviewSection.astro` | `/templates/sections-b/` |
| Service-area map + FAQ | `ServiceAreaMap.astro`, `FAQSection.astro` | `/templates/sections-c/` |
| Footer (three bands, tap-to-call first) | `SiteFooter.astro` | `/templates/sections-d/` |
| Alternate variants: icon cards, stepper, regional explorer | `ServiceGridIcons`, `ProcessStepper`, `RegionalServiceExplorer` | `/templates/variants-b1/`, `/templates/variants-b2/` |
| Mobile sticky CTA (§10) | `StickyMobileCTA.astro` | `/templates/sticky-cta-options/` |
| Grouped mega-menu header | `MegaMenuHeader.astro` | `/templates/mega-menu/` |

Canonical checkout: `/Users/jameslarosa/Documents/agent-website-builder`. The starter's root
(`/`) is a directory of these routes. Verify a route renders before citing it in a brief; the variant
registry in `agency-astro-site-builder` is the authority on which enums are BUILT.

## Homepage Messaging Pack Gate

The exact customer-facing homepage copy — H1, subhead, CTA labels, trust bullets, section headings, final CTA, footer summary — must be locked in an **approved** Homepage Messaging Pack before homepage design work starts. This is what stops the design step from inventing positioning while it arranges the UI.

- If no approved pack exists, do not proceed with homepage design. Request the missing fields from the copywriting step or the account manager and stop.
- Non-homepage pattern work (inner-page, contact-page, service-area, brand tokens) may proceed as `Draft` while the pack is pending, but must be labeled as such.
- The design brief arranges and places the pack's approved copy. It may request missing fields. It must never invent new customer-facing wording.
- Every claim-bearing item in the pack (and everywhere else it appears in the design) must carry a claim state. See `Claim States` below.

## Claim States

Every visible or schema-adjacent claim must be tagged with one of these states before it can appear in a design brief:

- `visible_preview_allowed` — may appear in preview/customer-facing mockup copy.
- `launch_proof_required` — may appear in preview, but needs proof before launch.
- `badge_asset_required` — text may be approved, but badge/logo graphics need supplied or verified assets.
- `never_without_explicit_approval` — do not use unless the human/client explicitly approves it.

Common defaults: 24/7 availability, free estimates, locally owned, and approved certifications/response-time claims are `visible_preview_allowed` only when the AM/page map explicitly approves them. Exact review ratings/counts, certification badge graphics, carrier logos, warranties, and guarantees default to `launch_proof_required` or `badge_asset_required`. Insurance claim approval, guaranteed coverage, reimbursement promises, and direct billing promises default to `never_without_explicit_approval`.

## Build-Handoff Contracts

Every design brief must give the Astro Build Agent enough structure to build without guessing.

Astro-first contract:

- `Implementation Target: Astro` is required.
- Production pages, layouts, navigation, footers, forms, schema, SEO, galleries, and reusable sections should be built through Astro pages, layouts, components, data files, content collections, and utilities.
- Standalone HTML/CSS can exist only as a non-production preview unless the human explicitly says otherwise.
- Any unavoidable raw/static HTML must still be generated or controlled by Astro code and validated from the final build output.

Navigation inclusion contract:

- For every new page or page type, specify whether it belongs in header nav, footer nav, sidebar/related nav, service hub/city hub listings, XML sitemap only, or intentionally hidden from visible nav.
- SEO landing pages should have an approved internal-link path even when they do not belong in the main header.
- Navigation should be controlled by shared data/config/components, not hard-coded one-off markup.

Schema contract:

- For every page type, specify the expected schema family before build.
- Common schema families include `LocalBusiness`, `Organization`, `Service`, `FAQPage`, `BreadcrumbList`, `ContactPage`, `AboutPage`, `Person`, `ImageObject`, `Review`, and `AggregateRating`.
- Use `Review` or `AggregateRating` only when the review/rating source is verified and supported by visible or defensible source data.
- NAP, phone, location, service-area, URL, and sameAs details in schema must match approved intake and shared site data.
- Do not create schema-only claims that are not approved in visible copy or verified intake.

Image optimization contract:

- Raw client images start in an intake/source folder, not the production public image folder.
- Standard images should use `OptimizedImage.astro`.
- Gallery images should use `GalleryImage.astro`.
- Above-the-fold hero/LCP images should use `HeroImage.astro`.
- All meaningful content images must render through Astro-compatible optimized image components or explicit `<picture>`/`<img>` markup.
- Hero/LCP images must never be CSS backgrounds.
- Hero/LCP images must render as responsive AVIF plus WebP fallbacks with explicit `width`/`height`, correct `alt`, `decoding="async"`, `fetchpriority="high"`, and no lazy loading.
- Use Astro `Image`, `Picture`, and `getImage` wherever possible.
- Use Sharp pre-compression for CSS backgrounds, legacy generated markup, migrated gallery data, or anything Astro image tools cannot handle.
- Design briefs should define image roles and approximate size needs, not one universal max size for every asset.
- Generate right-sized AVIF and WebP variants for logos, badges, thumbnails, gallery images, hero images, and service-card images.
- Never reference raw `.png` or `.jpg` client uploads directly in production pages unless there is a documented exception.
- CSS backgrounds are only for decorative or below-the-fold imagery and still need stable layout space.
- Final build output must not ship oversized, unoptimized, missing-dimension, missing-useful-alt, lazy-loaded LCP, stale/raw URL, or workflow-bypassing images.

Performance and third-party loading contract:

- Build performance into the initial architecture, not as cleanup.
- Third-party scripts, review widgets, maps, social embeds, videos, chat, and tracking must declare a loading strategy.
- Use `defer`/`async` and preconnect where appropriate.
- Maps/Leaflet must never rely only on scroll/IntersectionObserver triggers. Load without blocking initial render, with a `load`/`DOMContentLoaded` fallback that auto-initializes the map — see `Service-Area Map Pattern` below. An IntersectionObserver-only map can leave users staring at a permanent `Interactive service area map` placeholder if the trigger never fires.
- Review widgets above the fold may load immediately after `window.load` if trust proof is required, but should not be render-blocking in the head.
- Prefer static first-party facades for instant trust/reviews/maps/videos, then hydrate third-party widgets after load or near viewport.
- Any component that adds media or third-party scripts should specify the loading strategy in the design/build notes.

## Brand Intake And Token Generation

Before creating a design brief or homepage visuals, ask for brand inputs:

- Brand guidelines, if available.
- Logo files, preferably SVG or high-resolution PNG.
- Approved colors and colors to avoid.
- Approved fonts or font rules.
- Existing website/print/signage examples.
- Photo/video assets.
- Any required visual tone, such as premium, emergency-first, commercial, family-owned, clean, bold, modern, or industrial.

If the human says there are no brand guidelines and only a logo is available, use the logo as the brand seed.

Logo-derived color rules:

- Extract a practical color palette from the logo.
- Choose a `primary` color from the most brand-defining saturated logo color.
- Choose a `secondary` color from a supporting logo color or a darker/lighter companion color.
- Choose an `accent` color for CTAs that has strong contrast and fits emergency/local-service conversion. This can be the primary brand color, a high-contrast companion, or a controlled emergency accent when the brand palette is too weak for CTAs.
- Define neutral tokens: `dark`, `surface`, `muted`, `border`, and `white`.
- Include hover/darker variants for buttons and section accents.
- Check contrast for buttons, hero text, nav, forms, and footer. Do not use a logo color if it fails readability.
- Do not force every section into the logo color. Use neutrals, dark sections, and accent bands to create rhythm.

Font rules:

- If brand guidelines provide web-safe or licensed fonts, use them.
- If the logo uses a distinctive font, treat it as brand inspiration, not the automatic website font.
- Do not use the logo font for body copy unless it is explicitly provided and readable at paragraph sizes.
- Do not default to the lightest font weight. Light weights often look weak and hurt readability.
- Use a readable UI/body font at 400/500 weight and strong heading weights at 700-900.
- All production fonts must be self-hosted or system fonts.
- If Google Fonts are used during design selection, the approved font files must be downloaded and self-hosted before production.
- Do not ship remote Google Fonts stylesheets, `fonts.googleapis.com` / `fonts.gstatic.com` preconnects, Adobe font kits, CDN font files, or third-party font scripts in production unless the human explicitly approves a documented exception.
- Prefer WOFF2 files, `@font-face`, `font-display: swap`, and only the weights/styles actually used.
- For restoration/emergency home-service sites, prefer sturdy, modern sans-serif systems that feel professional and high-trust.
- Good default pairings: `Barlow Condensed` headings with `Barlow` or `Inter` body; `Archivo` headings with `Inter` body; `Sora` headings with `Inter` body; `Manrope` headings/body for a cleaner softer brand.
- If self-hosting a custom font is not worth the overhead, use a strong system stack and specify weights clearly.

The design brief should include the inferred tokens and mark them as `Needs Human Approval` when they were derived from logo/assets instead of supplied brand guidelines.

## Visual Quality Bar

The output must describe a finished, premium local-service homepage, not a flat wireframe or styled strategy document.

The design rules below are the codified premium standard distilled from the Romexterra reference build. The agent should be able to follow these rules without opening Romexterra on every project.

Live Romexterra inspection is optional and should be used only when the human explicitly asks for direct comparison, when the agent cannot understand the standard from the skill, or when repeated rebuilds keep failing.

Match this level of visual depth while customizing the brand, imagery, copy, service mix, proof, and assets to the client:

- Strong hero composition with real or service-relevant imagery.
- High-contrast overlay or another polished premium treatment.
- Large, confident headline with intentional line breaks.
- Visible phone-first CTA and secondary request-service CTA.
- Proof close to conversion points.
- Layered form card or polished service-request panel.
- Rich service cards with imagery, iconography, intent labels, and strong hierarchy.
- Alternating light/dark/brand-accent section rhythm.
- Comparison or differentiator section that feels designed, not just listed.
- Process section with strong card/timeline treatment.
- Review/proof section that is visually designed, not a placeholder.
- Service-area/map module that feels interactive and scalable.
- Large final CTA and complete footer with real NAP/location information.

Fail the design if it looks like:

- A wireframe.
- A sitemap rendered as blocks.
- Mostly text on blank backgrounds.
- Same two-column layout repeated section after section.
- Small CTAs buried inside content.
- Placeholder review widgets or proof cards with no visual treatment.
- Generic cards with no imagery, icon system, labels, hierarchy, or hover/interaction plan.
- A logo/color swap of another client.

## Fresh Homepage Rebuild Mode

Use this mode when the human rejects the current homepage, rejects generated UI mockups, or says the site needs to go back to the drawing board.

The goal is not to create more directions. The goal is to build one serious homepage from the approved agency pattern and verified client inputs.

Rules:

- Treat rejected homepages, UI kits, and standalone previews as negative examples only.
- Do not reuse rejected compositions, oversized typography, weak spacing, placeholder proof sections, or sitemap-like card layouts.
- Do not generate exploratory UI kits unless the human explicitly asks for mockups again.
- Start from a clean homepage route or explicitly remove the rejected route before rebuilding.
- Keep verified data, page-map decisions, brand tokens, service-area data, and approved claims.
- Produce one build-ready `Design Brief` and one Astro homepage implementation plan.
- The Astro Build Agent may implement the fresh homepage after the human approves the rebuild scope.
- The new homepage must pass the `Premium Visual Acceptance Rubric` and required visual QA evidence before it is considered acceptable.

## Premium Visual Acceptance Rubric

Before handing a design brief to the Astro Build Agent, score the homepage against this rubric.

Required scoring format: `Pass`, `Needs Revision`, or `Fail`.

## Mobile-First Design Priority

Design every local-service website mobile-first. The priority order is:

1. Mobile phone experience.
2. Desktop experience.
3. Tablet experience.

This is a build philosophy, not just a QA step. Start layouts, section density, heading behavior, CTA placement, forms, review widgets, maps, accordions, service cards, sidebars, final CTAs, and footer behavior from phone-width constraints first, then expand to desktop and tablet.

For restoration, plumbing, roofing, and other phone-first service businesses, mobile must keep the call path obvious: tap-to-call in the header, primary phone CTA reachable in the hero, trust bullets visible without awkward wrapping, form fields usable, review widgets contained, and the shared sticky mobile CTA appearing after the hero. No page or component is acceptable if it creates horizontal overflow, clipped text, tiny tap targets, hidden phone actions, or third-party widgets running off the screen on phone widths.

Desktop can add sticky headers, sticky inner-page sidebars, wider card grids, richer imagery, and larger section rhythm after the mobile version works. Tablet is the final adaptation layer and should not be treated as the default design canvas.

| Area | Pass Standard |
|---|---|
| Hero Composition | First viewport feels like a premium service company, uses real/service-relevant imagery or a strong visual system, has controlled density, and does not rely only on huge text. |
| Headline / Density | H1 has intentional line breaks, no clipping/overflow, readable hierarchy, and mobile fit. Spacing feels designed, not empty. |
| CTA Hierarchy | Phone-first CTA is dominant, request-service is secondary, CTAs repeat at natural decision points, and proof sits near conversion points. |
| Form / Request Panel | Form or request panel feels substantial, layered, and trustworthy without overwhelming the hero. |
| Service Cards | Cards use strong hierarchy, labels/icons/media treatment, concise copy, and links. They do not look like plain boxes. |
| Section Rhythm | Page alternates dark/light/brand/media-backed sections and avoids repeating the same two-column layout. |
| Differentiator / Process | Why-choose-us and process sections are visually designed, not generic bullet lists. |
| Proof / Reviews | Real widget is used when available; otherwise the reserved state looks intentional and does not invent ratings or quotes. |
| Service Area | Map/list behavior scales without dumping hundreds of links. |
| Footer / Final CTA | Final CTA is substantial and phone-first; footer has complete links and exact NAP/location behavior. |
| Mobile | No horizontal overflow, no clipped H1, primary CTA reachable, sticky CTA appears after hero, and tap targets are usable. |

Failing any of these areas blocks handoff to the Astro Build Agent unless the human explicitly accepts the risk.

## Premium Homepage Blueprint

Use this blueprint for restoration and emergency home-service clients unless the human approves a different direction.

First viewport:

- Utility/proof strip above the header or equivalent high-trust header treatment.
- Header with logo, nav, visible phone CTA, and request-service CTA.
- For restoration and urgent local-service businesses, the desktop header must stay sticky/fixed while scrolling and must keep the phone CTA prominent. The phone CTA should visually outrank the secondary `Request Service` action.
- Mobile header must use this compact conversion layout: tap-to-call button on the left, logo centered, and menu button on the right. Do not hide the phone action behind the menu, and do not place the logo off-center to make room for buttons.
- Hero should feel cinematic, high-contrast, and urgent.
- Desktop hero should usually use a two-column composition: large copy/proof/CTAs on the left and a substantial form/request card on the right.
- Hero should usually be at least 620px tall on desktop.
- H1 should be display-scale with intentional line breaks, not a normal content heading. Important service phrases should not accidentally split across lines on desktop, such as `Emergency` on one line and `Restoration` on another unless that break is intentionally designed and approved.
- Use explicit headline line groups, no-wrap spans for protected desktop phrases, and breakpoint/container rules to control wrapping. Do not rely on uncontrolled browser wrapping or viewport-width font scaling that changes the headline into awkward four-line layouts on large monitors.
- Include 4-6 verified trust/conversion bullets in a 2-column or highly scannable layout.
- Trust/conversion bullets must be short, specific, and visible in the first viewport on both desktop and mobile. Place them directly below the H1 or immediately below the hero subhead/tagline, before lower-priority supporting copy.
- Place review/proof close to the H1/CTA area when available.
- Use primary call CTA as the strongest button; request-service is secondary.
- Desktop and tablet phone CTAs must display the actual approved phone number inside the button or immediately attached CTA text, not only generic copy like `Call now`. Desktop users may need to dial manually. Mobile tap-to-call CTAs may show either the phone number or compact copy like `Call now`, but must use the approved `tel:`/DNI phone source.
- Use real or service-relevant imagery with a dark/high-contrast overlay when assets allow.

Request-service form:

- Use the shared request-service form component or approved form renderer.
- Required visible fields by default: name, phone, email, service needed, city or ZIP, and additional information/message.
- The form must explain that emergency service is available by phone and that online form requests are normally returned within one business day.
- The phone number must be visible inside or directly beside the form for emergency users.
- Do not leave single short fields floating awkwardly in a half-width row. If a field has no natural row partner, make it full width.
- Form copy should reinforce phone-first behavior: if the situation is active, spreading, unsafe, or urgent, call now.
- Form CTA hierarchy stays phone-first for emergencies; request-service is first-choice only for non-emergency form users.
- Form notices and support copy must be easy to read. Do not use muted gray text on black, green, or dark gradient backgrounds. Use high-contrast text, clear hierarchy, and enough spacing so emergency instructions are readable at a glance.

Near-hero conversion band:

- Add a stats/proof band under the hero when verified claims exist.
- Add an emergency CTA band near the top when the industry has urgent intent.
- These bands should be visually bold, not small text rows.

Services:

- Use rich service cards, usually 3x2 on desktop for main service categories.
- Each service card should have a visual top/media area, icon or service marker, short intent labels/tags, strong title, concise description, and link.
- Do not render services as tiny plain boxes or a dense list unless the page is intentionally a compact index.

Differentiators:

- Include a designed why-choose-us or comparison section.
- Prefer a dark or brand-accent section with side-by-side contrast, proof rows, or an advantage board.
- Avoid generic bullet lists that could appear on any company site.

Process:

- Use a designed three-step or four-step process with cards/timeline/connecting visual treatment.
- Adapt steps to verified services. Do not promise reconstruction, claims handling, or response times unless verified.

Proof and reviews:

- Use a real review widget when available.
- If the human provides a review widget snippet, embed source, widget app ID, or approved review source, the homepage must include a real dedicated review section using that source. Do not replace it with a generic trust/proof block.
- Homepage review widgets should normally take the full content row width. Put the review-section intro/copy above the widget, then render the real widget full width below it. Do not default to a split-column layout where the widget is squeezed beside copy.
- Review sections must be mobile-contained. The section, panel, widget wrapper, and iframe/embed container must use `min-width: 0`, `max-width: 100%`, safe wrapping, and overflow containment where needed so third-party reviews and review copy cannot run off the right side on phone widths.
- If the review widget is not available yet, design a polished reserved widget area with clear copy that does not invent ratings or quotes.
- Reserved review states are temporary only. They must be clearly marked in the design/build notes as awaiting review source, and they must be replaced before launch once the source exists.
- The review section should use customer-facing copy such as `Customer reviews` or `What property owners say`, not internal labels like `proof plan`, `widget-ready`, or `review source reserved`.
- Elfsight and similar widgets should load with a non-render-blocking strategy, such as an async platform script and lazy widget container, unless a stricter project integration is approved.
- Do not add `Review` or `AggregateRating` schema from a widget alone unless the rating/review data is verified, visible, and defensible in the final page output.
- Place proof near CTAs throughout the page.

Service area:

- Include a scalable service-area/map module when local SEO matters.
- Use map/list/accordion/state/county behavior based on the service-area model.
- Do not dump hundreds of links visibly at once.
- For large city/city-service maps, do not use a lopsided two-column section where short copy sits beside a very tall accordion. Default to a stacked layout: intro copy above, map/explorer below, county/city service links below or inside the explorer.
- Expanded counties and city-service groups must have controlled height, scrolling, filtering, pagination, or progressive disclosure so opening one county does not make the section feel broken.

Final CTA and footer:

- Use a large final CTA band with phone-first emergency copy.
- Footer should feel complete: logo, description, services, service areas, company links, social links when approved, and exact NAP/location cards.

Mobile sticky CTA bar:

- Every local service website should include a shared mobile sticky CTA bar unless the human explicitly excludes it for a specific project.
- This is a site-shell or shared-layout component, not a one-off homepage component. It must be available on homepage, service, city, city-service, contact, review, team, and other published pages.
- On mobile/tablet, keep the bar hidden while the hero is still in view, then slide or fade it in after the visitor scrolls past the hero or past roughly 35-50% of the first viewport.
- Keep the copy short and urgent, such as `Need help now? Call now.` or `Active damage? Call now.`
- Primary action is always a `tel:` call button using the approved tracking/DNI-capable phone number. A secondary `Request Service` action is optional only if it fits without crowding.
- Add subtle attention treatment: pulse dot, soft glow, shadow lift, or slide-up motion. Avoid aggressive flashing or distracting loops.
- Respect `prefers-reduced-motion`.
- Use high contrast, a minimum 44px tap target, safe-area inset padding, and enough bottom page padding so the bar does not cover content or forms.
- QA must verify that the bar appears after the hero, does not appear over the first hero viewport, does not create horizontal overflow, and works on every page type.

Astro implementation contract for the build agent:

- Component name: `StickyMobileCTA.astro` or equivalent shared starter component.
- Mount location: shared layout/shell, not a single page route.
- Hero marker: the first hero on each page should expose a stable selector such as `[data-page-hero]`.
- CTA marker: the sticky component should expose `[data-mobile-sticky-cta]`.
- Visibility state: add/remove an `is-visible` class after the hero threshold is passed.
- Motion state: support `prefers-reduced-motion` by disabling pulse/slide animation while preserving visibility.
- Layout state: add mobile-only bottom padding through the shared shell so the bar does not cover forms, footer links, cookie banners, chat widgets, or other fixed elements.
- Tracking state: use the approved phone/DNI source from shared site data, not hard-coded page text.

## Premium Emergency Homepage Rebuild Mode

Use this mode when the human says the homepage is not modern, professional, big-company, premium, or strong enough.

In this mode, use the codified premium homepage standard in this skill as the benchmark. Do not require the agent to look at Romexterra unless the human explicitly asks for direct comparison.

Required sequence:

1. Inspect the current client homepage/preview.
2. Produce a `Premium Homepage Quality Audit` before redesigning.
3. Identify exact misses by component: hero, typography/density, header, form, proof, stats, emergency CTA band, mobile sticky CTA, service cards, dark sections, comparison/differentiator section, process, reviews, service area, FAQ, final CTA, footer, mobile.
4. Produce a revised `Design Brief` with concrete rebuild changes.
5. Do not edit production code in this mode unless the human explicitly switches to build work.
6. If screenshots already exist, compare them against the audit. If no screenshots exist, specify the required screenshot evidence for the Astro Build Agent and QA Agent.
7. If the revised design direction still looks materially weaker than the premium standard, continue revising the design brief before handing off.

Minimum homepage composition for this mode:

- Top utility/proof strip or equivalent premium header proof treatment.
- Sticky/header area with logo, nav, visible phone CTA, and request-service CTA.
- Cinematic first viewport: dark or high-contrast hero, real/service-relevant image treatment, large H1, trust bullets, review/proof widget, primary call CTA, secondary request CTA, and a substantial form/request card.
- Stats/proof band directly under the hero when verified claims allow it.
- High-contrast emergency CTA band near the top.
- Service cards in a rich 3x2 or equivalent layout with image panels, icons/labels, descriptions, and links.
- At least one dark premium section after services, such as differentiators, advantage comparison, or process.
- A designed comparison/why-choose-us module, not a simple bullet list.
- Process cards or timeline with visual depth.
- Review/proof module with a real widget when available or a polished reserved widget state when not.
- Service-area module with map/list behavior that feels interactive and scalable.
- Large final CTA band with phone-first copy.
- Complete footer with service links, company links, social links where approved, and exact NAP/location cards.

Visual implementation standards:

- Use strong section padding, usually 72-110px on desktop.
- Use a container around 1120-1240px unless the project design system says otherwise.
- Use display-scale H1 and H2 sizes; do not make the page feel like a dashboard.
- Large does not mean oversized. H1s, buttons, forms, cards, and section gaps must feel controlled and intentional.
- No headline may be clipped, cropped, or create horizontal overflow on desktop or mobile.
- Mobile hero copy must fit the viewport cleanly with intentional line breaks and the primary call CTA visible without forcing the visitor through an oversized headline first.
- Avoid sparse sections where the only visual idea is large text plus a lot of blank space.
- Use clear contrast rhythm across sections: dark, light, brand-accent, image-backed, and neutral sections.
- Use real shadows, borders, image overlays, badges, labels, and component states.
- Prefer one or two strong accent colors instead of a weak one-color pale palette.
- Avoid tiny cards, thin borders, low-contrast pale sections, and excessive whitespace with little visual content.

Required `Premium Homepage Quality Audit` format:

```markdown
## Premium Homepage Quality Audit

Reference Standard: Codified premium emergency homepage pattern from $agency-website-design-builder
Optional Live Reference: Only if explicitly requested
Client Preview:

| Area | Premium Standard | Current Client Miss | Required Change |
|---|---|---|---|
| Hero | ... | ... | ... |
| Header / CTA | ... | ... | ... |
| Typography / Density | ... | ... | ... |
| Mobile Sticky CTA | ... | ... | ... |
| Services | ... | ... | ... |
| Proof / Reviews | ... | ... | ... |
| Section Rhythm | ... | ... | ... |
| Footer | ... | ... | ... |

Verdict:
Rebuild Required: Yes/No
Build Handoff Approved: Yes/No
```

## Design Philosophy

Standardized means proven conversion information appears in proven places. It does not mean every client should look identical.

Keep consistent:

- Phone-first conversion strategy.
- Homepage section logic.
- Inner-page two-column logic.
- Contact form placement.
- Review/proof placement.
- Service-area/map presence when local SEO matters.
- FAQ placement.
- Final CTA and footer function.

Customize per client:

- Color system.
- Typography choices within the brand direction.
- Photography and video usage.
- Icon style.
- Section visual treatments.
- Card treatments.
- Texture, spacing, rhythm, and composition.
- Proof-point presentation.
- Client-specific sections when approved.

If the human asks for a nonstandard design choice, advise on tradeoffs first. Adapt when the request is client-specific and reasonable. Require approval or reject the change if it hurts SEO, conversion, accessibility, performance, tracking, forms, or compliance.

## Homepage Pattern

Default homepage order:

1. Header with visible phone number and primary CTA.
2. Hero with H1, subhead/slogan, phone number, 4-6 trust/conversion bullets, review proof, main visual asset, primary call CTA, secondary request-service CTA, and form when appropriate.
3. Optional hero stats or emergency CTA bar, such as years in business, response window, BBB/proof, or emergency message, only when verified.
4. Short company intro/about section with image or video, 1-2 concise paragraphs, benefits, and phone-first CTA.
5. Main parent services generated from the active page map.
6. Three-step process section, adapted to what the client actually provides.
7. Why choose us / differentiators section.
8. Optional client-priority section when intake, assets, current-site evidence, or human direction justifies it.
9. Review widget section.
10. Service-area section with map and city/county/state/multi-state behavior.
11. FAQ section.
12. Large final CTA.
13. Footer with logo, short description, service links, service-area links, company links, socials, and exact NAP/GBP locations.
14. Shared mobile sticky CTA bar across all page types.

Restoration and emergency home-service sites should emphasize call conversion. The primary CTA is call now; request-service/form is secondary.

## Navigation Architecture Requirements

The design brief must define the intended navigation architecture before Astro build work begins. Do not leave navigation decisions for SEO QA to discover later.

Required navigation surfaces:

- Desktop header navigation.
- Mobile menu navigation.
- Footer navigation.
- Inner-page sidebar/related navigation.
- Parent service hub listings.
- City hub service listings.
- Service-area map/explorer links.
- Breadcrumb behavior.
- Sitemap-only or intentionally hidden/noindex routes.

### Mega-Menu Requirement For Multi-Service Restoration Sites (REQUIRED)

When a client has more than one service category with child pages, the desktop header MUST use
grouped mega-menus rather than a flat list of top-level links. A flat header cannot expose a
33-page service tree, and burying child services behind a hub page costs both discovery and
internal-link equity.

Two mega-menus are required:

**1. `Services` — one top-level item, not one item per category.**

- The dropdown is organised into COLUMN GROUPS, one per service category (Water Damage, Fire
  Damage, Mold, Biohazard, Reconstruction/Remodeling, Commercial, and so on).
- Each column header is the category hub name and LINKS to that hub URL. The header is a link,
  never a dead label.
- Beneath each column header, list that category's approved child service pages, in the order
  the page map defines.
- List EVERY approved child. Columns scroll (see below); they do not truncate.
- Categories with no child pages still get a column with the hub link.

**2. `Service Areas` — one top-level item, grouped by county.**

- Column groups are counties. Each county header is plain text or links to the service-area
  page; individual cities link to their city hubs.
- List every approved city. The column scrolls at ~15rem so a 40-city county cannot take over
  the viewport.
- When approved city-service pages exist, the city link goes to the city hub — the city hub
  routes deeper (§14). Do NOT expand city-service pages inside the header menu.
- Never link a city or city-service URL from the menu before that route exists (§15).

Panel styling (REQUIRED — a bare link grid reads as unfinished):

- **Two-zone layout.** A dark intro rail (~260px) on the left of the panel, then the column grid.
  The rail carries the menu title, a one-line description, a link to the overview page, and the
  phone CTA. This is what separates a designed mega-menu from a dropdown.
- **Accent top border** on the panel so it reads as attached to the header, not floating.
- **Hover states on every interactive element.** Links get both a color change AND a surface
  tint — color alone is too subtle at 13px. Column headings get a color change. Top-level nav
  items get a background tint so the open menu is obvious.
- Column headings: display font, uppercase, accent underline.

**Per-column scrolling — REQUIRED, and it replaces truncation.**

- Each column list gets `max-height` (~15rem) with `overflow-y: auto` and a thin styled
  scrollbar. A 40-city county scrolls inside its own column instead of stretching the panel.
- The panel itself gets `max-height: 70vh; overflow-y: auto` as a second guard.
- **Do NOT cap columns and add a "View all" link.** Scrolling keeps every approved page
  reachable from the header; truncation hides pages and creates a maintenance trap where the
  cap and the real count silently disagree.

**Hover intent — the gap bug (READ THIS, it is not obvious).**

There is a vertical gap between a top-level trigger and the panel below it. A `mouseleave`
listener on the trigger closes the menu the instant the pointer enters that gap, so the menu
vanishes while the user is reaching for it. This is the single most common mega-menu defect.

The fix is ownership, not delay:

- `mouseenter` on the trigger OPENS.
- The trigger's own `mouseleave` must NOT close.
- **`mouseleave` on the HEADER element closes** (with a ~200ms grace timer). The panel is a
  descendant of the header, so the gap, the trigger, and the panel are all inside one region.
- Clicking an already-hover-open panel PINS it open rather than closing — a click that closes
  what hover just opened reads as the menu fighting the user.

**Mobile is a LIST, not a panel. Do not port desktop styling into the drawer.**

This is the mistake to avoid: the desktop panel's column headings (display font, uppercase,
accent underline) and its multi-column layout look correct on desktop and look bolted-on inside
a phone drawer. The drawer must read as one consistent list at every depth. Owner correction,
2026-08-28.

Structure — three levels, same row treatment throughout:

- **Level 1:** `Services` and `Service Areas` — standard drawer rows with a chevron.
- **Level 2:** one row per category / per county. **Same row component as level 1**, indented
  one step, slightly smaller type, chevron on the right. Not a heading — a row.
- **Level 3:** the children, indented one step further, single column, muted colour, same
  vertical rhythm as the rows above.

Rules:

- Tapping a group reveals **ALL** its children. Never truncate, never cap, never add a
  "View all" row inside the drawer.
- **Single column.** Multi-column child lists are a desktop-panel idea; in a drawer they break
  the list rhythm and shrink tap targets.
- Do NOT add a separate "All {group} →" link row above the children. It duplicates the group
  row directly above it and reads as noise.
- Indentation alone carries the hierarchy. No underlines, no uppercase, no display font, no
  background fills.
- The expanded group row takes the accent colour so the open branch is obvious.
- The drawer scrolls (`max-height: ~75vh; overflow-y: auto`); nothing inside it scrolls.
- Tap targets ~37-40px. WCAG 2.2 AA requires 24px and Apple HIG wants 44pt — at 50+ links,
  44px adds roughly 200px of scroll for a few px of target. Never go below 24px.

Mega-menu rules:

- Both menus are driven by SHARED NAV DATA generated from the active page map, never hand-authored
  link lists. A hand-authored menu drifts from the page map the first time a page is added.
- Keyboard accessible: the top-level item is a `button` with `aria-expanded`, the panel is
  dismissible with `Escape`, and every link is tabbable in DOM order.
- Open on hover AND on click/focus for pointer users; click/tap only on touch.
- The mega-menu panel must not cover the header's phone CTA.
- On mobile the same tree renders as a nested accordion inside the menu drawer — category rows
  expand to reveal children. The tap-to-call button stays outside the drawer (§9).
- Reference implementation pattern: romexterra.com — `Services` grouped by damage category with
  child services listed under each, `Service Areas` grouped by county with cities beneath.

Recipe enum: `header: mega_menu_grouped_services` (PLANNED — requires the starter component;
`utility_strip_sticky_header` remains the flat-nav BUILT variant). Selecting the mega-menu
variant before the component ships makes the recipe invalid — build the component first.

Design rules:

- Desktop header should stay concise and conversion-focused. For emergency service businesses, the phone CTA must remain visible and more prominent than request service.
- Top-level header items should stay at or below 7. Service and city depth belongs inside the two mega-menus above, not as additional top-level entries.
- Mobile header must keep tap-to-call visible on the left, logo centered, and menu button on the right. The phone action must not live only inside the menu.
- Mobile menu should expose the same primary user paths as desktop header plus request-service access.
- Footer should include curated groups for core services, service areas, company/trust pages, locations/NAP, and socials. Do not dump large generated page sets into the footer.
- Inner-page sidebar navigation should follow capped smart navigation and should not outlast the article by a large amount.
- Parent service hubs and city hubs should carry the heavier discovery work for child service and city-service pages.
- Service-area modules should expose county/city/city-service paths with progressive disclosure so the UI stays usable.

Design output:

- Include a `Navigation Architecture Notes` section in the design brief.
- Identify which pages belong in desktop header, mobile menu, footer groups, sidebar rules, hub listings, service-area modules, sitemap only, or intentionally hidden/noindex states.
- Flag any navigation exception that requires human approval.

### Homepage Visual Requirements

The homepage design brief must specify:

- Hero background approach: real photo, approved client asset, generated service-relevant image, or premium non-photo treatment with a clear reason.
- Hero overlay/contrast approach.
- Hero proof elements and exact placement.
- Hero form or service-request panel behavior.
- CTA hierarchy and repeat locations.
- Service card visual treatment, including image/icon/label behavior.
- At least one high-impact dark or brand-accent section after the hero.
- At least one designed comparison, differentiator, or proof section.
- Section rhythm across the page so adjacent sections do not all look the same.
- Mobile hero stacking, no-clipping typography behavior, and shared sticky/tap-to-call behavior after the hero.

If verified assets are weak or missing, recommend an asset plan. Do not lower the visual quality bar because assets are incomplete.

## Inner-Page Pattern

Use this pattern for service pages, city pages, city-service pages, and most reusable content pages unless an approved exception exists.

Component-first workflow:

- Build the approved inner-page design as a reusable Astro component/template from the beginning, not as a standalone page that gets converted later.
- The review/approval route should be a noindex template route, such as `/templates/inner-page/`, that renders the same Astro component production pages will use.
- The template route must be blocked from indexing with page-level robots metadata such as `noindex,nofollow` / `noindex/nofollow` and should not appear in header/footer navigation or XML sitemaps.
- Use realistic placeholder content that behaves like real restoration/service copy. Do not use pure Lorem Ipsum because it fails to test long H1s, H2/H3 density, bullets, inline CTAs, FAQs, sidebar navigation, internal links, and mobile wrapping.
- Once approved, real service, city, and city-service pages should pass structured page data/final copy into the approved component instead of redesigning each page.
- The noindex template route is for visual approval only; it should not be treated as the production content source of truth.

Default structure:

- Page-specific hero similar to homepage, with H1 and emergency phone-first CTA.
- Two-column body.
- Left column: final page copy, H2/H3 sections, paragraphs, bullets, internal links, approved images/video, page-specific CTA blocks, and FAQ when required.
- Right column: sticky sidebar on desktop/tablet with contact form first, review/proof element, capped related navigation, and trust elements. Mobile stacks the sidebar below the article.
- Reusable post-body sections when approved: process, benefits, insurance/support, reviews, service area, FAQ, final CTA, footer.

Inner-body reusable modules:

- Keep the left-column body primarily editorial. Do not turn every H2 into a card or a marketing panel.
- Use a small set of approved modules to add visual rhythm inside long SEO copy: `content-alert-list` for urgency/safety signs, `included-panel` for scoped service-includes lists, `inner-subsections` for H3 support cards, and `inline-cta` for page-specific phone-first conversion.
- Subsection cards may include internal links and a compact `Learn more` action when the brief calls for child-page routing. Do not create link cards for unrelated pages just to fill space.
- Alert rows should be short, scannable, and tied to user risk or urgency. Use them for symptoms, unsafe conditions, contamination warnings, or “call now” decision points.
- Keep these modules restrained: no excessive icons, no nested cards, no oversized decorative blocks, and no repeated card grid after card grid.
- Article H3 treatment (standard, decided 2026-08-28): subsection H3s in the left column carry a 3px accent-colored left rule with a ~14px indent — no icons, no cards. This is the approved way to make long editorial copy scannable while keeping the column editorial; it is baked into `InnerPageTemplate.astro` and inherits the client accent token automatically. Do not spec icon-led or card-led H3s in design briefs; a client request for them is an exception, not a default.
- Future service, city, and city-service pages should reuse these body modules instead of inventing one-off body layouts.
- The first left-column body section must place a page-specific `inline-cta` after the full opening body section, not between the opening section's paragraphs. The final left-column narrative section must end with the same `inline-cta` component/format before the template moves into post-body sections such as process, reviews, service area, or FAQ.
- Both in-body CTAs must use the exact same reusable component and visual format on a given page: client logo, eyebrow, heading, support copy, phone-first `Call` action, and secondary `Request service` action. Do not create one-off first/final CTA layouts.
- The CTA should tell urgent users to call now for immediate or 24/7 help, show the phone number on desktop/tablet CTAs, and keep spacing responsive so the logo, copy, and buttons do not crowd or overflow.

Rules:

- The left column owns the content brief structure.
- Production pages must preserve the approved content brief's exact heading hierarchy. Do not normalize every body section into an H2 or invent heading levels because the template preview used placeholder headings.
- The right-column form stays high on the page.
- On desktop/tablet, inner pages must use a Romexterra-style sticky sidebar pattern unless the human explicitly approves an exception: apply `position: sticky` directly to the sidebar `aside`/right-column element, with an offset below the sticky header, `display: grid`, and standard card gaps. Do not put sticky behavior on a nested wrapper unless there is a proven browser/layout reason. Do not create an internally scrollable sidebar, do not add a sidebar scrollbar, and do not cap the sidebar with viewport-height overflow. The page itself scrolls; the right column sticks naturally and then releases with the two-column body.
- Do not place `overflow: hidden`, `overflow-y: auto`, or `overflow-x: hidden` on the inner-page body ancestors in a way that breaks sticky positioning. Use `overflow-x: clip` for horizontal bleed control when supported.
- On mobile, the sidebar must return to normal static flow below the article. Do not create sticky sidebars on mobile.
- If an approved third-party review widget exists, the page must include the real widget in a dedicated review section. Use it in the sidebar only when it fits the sidebar cleanly without overflow, cramped tabs, or broken mobile behavior.
- When the real widget is too wide or heavy for the sidebar, use a compact sidebar review/proof card that links to the full-width real widget section. Do not present the card as the actual widget.
- If separate widget snippets/app IDs are provided for sidebar versus full-width/homepage use, preserve that mapping exactly. Do not reuse the homepage/full-width review widget inside the sidebar and do not use the sidebar widget as the large review section.
- The sidebar should not outlast the article by a large amount. Shorten or collapse navigation when needed.
- Page-specific CTA blocks are required at key decision points: first, after the full opening body section; and second, as a final body closeout CTA after the last narrative paragraph. Both must use the same reusable component/format with the client logo. Example: `Need Water Damage Cleanup Help Now?`.
- Do not change the fixed inner-page structure for MVP without explicit approval.

## Sidebar Navigation

Use capped smart navigation, not a full sibling dump.

Default rules:

- Include the parent hub or `View all [Parent Service] services`.
- Include the current page, highlighted when applicable.
- Include 6-8 closest related child/sibling pages.
- Include 5-7 compact core parent-service hubs.
- Keep total sidebar navigation around 14-16 links maximum.
- Dedupe links.
- Do not link inactive, excluded, or unapproved pages.
- Keep selection deterministic across rebuilds.

## City Page Hub Pattern

Use the inner-page layout, but treat a city page as a general location hub.

Default city-page structure:

- H1: `Restoration Services in {{city}}, {{state_abbreviation}}`.
- Intro about the company's restoration support in that city.
- Brief summaries of approved city-service pages for that location.
- Link each summary to its matching city-service page.
- Phone-first CTA.
- Right-column form, proof widget, capped navigation, and trust elements.
- Reusable service-area, FAQ, final CTA, and footer sections when approved.

Do not duplicate full service-page or city-service-page copy on the city hub. Do not mention city-service pages that are not approved in the active page map.

## Service-Area Map Pattern

Use a compact service-area section that can scale.

Default behavior:

- Show a map using the approved map provider or starter pattern.
- For local-service sites, default to a real scalable Leaflet/OpenStreetMap-style module unless the human approves another map provider. Do not use a fake decorative map as the production service-area module.
- Load Leaflet/map JavaScript without blocking the initial render, but do not rely only on scroll/IntersectionObserver triggers. Service-area maps must have a load/DOMContentLoaded fallback that initializes the map automatically, so users do not get stuck seeing a permanent `Interactive service area map` placeholder.
- Highlight the service area in a visual way when possible.
- Treat the service-area section as an internal-link module, not only a map.
- Default hierarchy for restoration/local-service sites: county or state selector -> city hub link -> expandable city-service links.
- City hub link pattern: the city name links to the general city page, usually `Restoration Services in {{city}}, {{state_abbreviation}}`.
- City-service dropdown pattern: a separate arrow/control expands the approved service pages for that city, such as `{{city}} Water Damage Restoration`, `{{city}} Fire Damage Restoration`, and other approved city-service pages.
- Show city and city-service links without overwhelming the page.
- Use accordions/dropdowns for large city and city-service lists.
- Default visual layout for large service-area modules: text intro row above the module, real map/explorer row below the intro, and county/city/city-service links below the map or in a controlled-height panel. Avoid a short left copy column beside a tall expanded accordion.
- Expanded accordions must not create uncontrolled page length. Use max-height scrolling, search/filtering, pagination, or staged disclosure for long county and city-service lists.
- Use state or county pickers when the client serves multiple states, counties, or large regions.
- Link only approved city and city-service pages.
- For production, do not publish active links to city or city-service URLs until those pages exist or the generated-route plan is approved. In preview, planned route links may be shown only when clearly part of the build plan.
- Do not render internal SEO/page-map language to customers anywhere in the design, not only in the service-area section. Hard-blocked phrases (any of these fails QA automatically): `service architecture`, `approved rollout`, `source reserved` / `review source reserved`, `widget-ready`, `launch input`, `proof plan`, `page map`, `page targets` / `target cities`, `city-service pages are deferred`, `lorem ipsum`, `placeholder` (when customer-visible). Soft-flag words needing judgment because they can appear in legitimate copy: `brief`, `candidate`, `deferred`, `mockup`, `targets`. Use customer-facing labels like `communities`, `service cities`, `counties served`, or `service areas`.
- Do not add decorative city pills above or beside the map when the county/city accordion already exposes the service-area structure. Avoid duplicate city lists.

Second design option for large service-area builds:

- Use a `Regional Service Explorer` layout: left side is a real map with highlighted state/county coverage; right side is a tabbed or segmented county/state browser.
- Each county/state tab shows a compact search/filter input, city hub links, and expandable city-service rows.
- This option is better when a client has many counties, multiple states, or hundreds of city-service pages and the default accordion becomes too long.

## Contact Page Pattern

Use a dedicated contact page pattern, not the generic inner-page pattern.

Default structure:

- Phone-first hero with the primary phone number, tap-to-call button, and secondary `Request Service` anchor to the form.
- Request-service form as the first body section after the hero.
- Optional support panel beside the form explaining when to call versus submit online.
- Location/NAP cards below the form.
- Reusable final CTA.
- Reusable footer.

Rules:

- The form must use the shared lead form and standard routing/tracking fields.
- Emergency visitors should be told to call immediately.
- Non-emergency form copy should set the expected response window approved by the agency/client.
- Every approved GBP location must appear on the contact page.
- GBP location cards must match verified name, address, and phone exactly.
- Multiple GBP locations must be visually segmented.
- Do not put locations, maps, or general contact copy before the form unless explicitly approved.

## Output: Design Recipe + Design Brief

Produce two paired artifacts, not just prose.

- **Design Recipe** — the machine-checkable handoff. Select one variant per section from the starter's variant registry (`schemas/design-recipe.yaml` in the `agent-website-builder` repo) instead of describing a look in prose. A recipe is invalid if it names a variant that does not exist in the starter component library, if a visible claim lacks a claim state, or if the Homepage Messaging Pack reference is missing/unapproved.
- **Design Brief** — the prose companion: rationale, imagery direction, brand tokens, exceptions, and anything the recipe's enums can't express.

Do not hand the build agent a free-text description of a section design when an approved variant already covers the intent. Propose a new variant (for human approval, to be added to the registry) only when no existing variant fits — do not freeform-design a one-off.

Produce the `Design Brief` artifact for the build agent.

Required format:

```markdown
# Design Brief

Client:
Industry:
Design Status:
Approved Pattern Version:
Design Recipe Ref: [path/URL to the paired schemas/design-recipe.yaml instance]
Messaging Pack Ref: [path/URL to the approved schemas/messaging-pack.yaml instance]
Implementation Target: Astro
Reference Quality Benchmark: Codified premium emergency homepage standard.
Brand Source: Supplied guidelines / Logo-derived / Existing website-derived / Human-directed

## Brand Direction
[Colors, typography direction, visual tone, imagery style, icon/card style, and approval status.]

## Brand Tokens
[Primary, secondary, accent, dark, surface, muted, border, white, hover variants, font family choices, font weights, font hosting plan, and contrast notes.]

## Homepage Section Plan
[Ordered homepage sections, required elements, assets, CTA behavior, proof widgets, service-area behavior, custom sections, and approval notes.]

## Premium Visual Acceptance Rubric
[Pass/Needs Revision/Fail score for every rubric area, with required fixes for any non-pass.]

## Inner Page Pattern
[Hero, two-column body, left-column content behavior, right-column sidebar behavior, reusable post-body sections, mobile stacking behavior.]

## City Page Hub Pattern
[H1 pattern, city-service summary/link behavior, city hub layout notes.]

## Contact Page Pattern
[Hero, tap-to-call, request-service anchor, form-first body, GBP/NAP cards, final CTA/footer.]

## Service Area / Map Behavior
[Map, dropdowns, city/county/state/multi-state behavior, approved links.]

## Mobile Sticky CTA Behavior
[Breakpoint, show-after-hero trigger, urgent copy, call button, optional secondary action, animation, safe-area/bottom-padding behavior, tracking/DNI phone source, and page-type coverage.]

## Asset Plan
[What assets are used where, what placeholders remain, what new assets are needed, and which assets are hero/LCP, gallery, card, team, logo, inline, or CSS-background assets.]

## Image Optimization Plan
[Original intake/source location, Astro image component choice, responsive/art-directed needs, AVIF/WebP output plan, Sharp fallback needs, width/height/aspect-ratio expectations, LCP/hero image handling, alt-text rules, stale/raw URL restrictions, and validation requirements.]

## Third-Party Loading Plan
[Review widget, map, video, social embed, chat, and tracking loading strategies; defer/async/preconnect needs; facade/hydration behavior; render-blocking risks.]

## Schema Plan
[Page-type schema families, JSON-LD utility/component expectations, required verified NAP/service/location data, FAQ/Breadcrumb requirements, and rating/review restrictions.]

## Navigation Inclusion Plan
[For new pages: header nav, footer nav, sidebar/related nav, service hub/city hub listings, XML sitemap only, or intentionally excluded with approval reason.]

## Design Exceptions
- [Exception] -> [Reason] -> [Approval status]

## Build Notes
[Astro component reuse notes, responsive behavior, forms/tracking constraints, performance/accessibility constraints.]

## Visual QA Evidence Required
[Mobile-first required viewports, screenshot paths to produce, overflow checks, sticky CTA checks, and any accepted visual risks. Required order: mobile initial, mobile scrolled, desktop, tablet.]

## Open Questions / Blockers
- [Question or blocker]
```

## Quality Check

Before finalizing, verify:

- An approved Homepage Messaging Pack exists before homepage design proceeds past `Draft`.
- Every visible claim carries a claim state (`visible_preview_allowed` / `launch_proof_required` / `badge_asset_required` / `never_without_explicit_approval`).
- A paired Design Recipe exists with one registry variant selected per section; no section names a variant that doesn't exist in the starter.
- Homepage, inner-page, contact-page, city-page, service-area, final CTA, and footer behavior are specified.
- `Implementation Target: Astro` is stated.
- Astro-first production boundaries are stated for pages, layouts, navigation, footers, forms, schema, SEO, galleries, and reusable sections.
- Brand source is stated, and logo-derived colors/fonts are marked as needing approval when no brand guide exists.
- Color tokens include primary, secondary, accent, neutrals, hover variants, and contrast notes.
- Font choices prioritize readable web typography over copying logo lettering.
- Font choices include a self-hosted WOFF2 plan or a system-font decision.
- No remote Google Fonts, Adobe font kits, CDN font files, or third-party font scripts are allowed in production unless listed as an approved exception.
- The homepage design meets the codified premium emergency homepage standard.
- If premium emergency homepage rebuild mode applies, the `Premium Homepage Quality Audit` is complete; existing screenshots are compared when available, and missing screenshot evidence is listed for the Astro Build Agent and QA Agent.
- The `Premium Visual Acceptance Rubric` is complete, and no area is `Fail`.
- If the current homepage or mockups were rejected, `Fresh Homepage Rebuild Mode` is used and the rejected work is treated as a negative example, not a base to tweak.
- The design adapts to the client brand without becoming a logo/color swap.
- Required conversion elements remain visible.
- The hero has strong visual composition, not just text plus a small panel.
- Headline scale and section spacing feel premium without clipping, overflow, or oversized sparse blocks.
- A shared mobile sticky CTA bar is specified for all page types unless explicitly excluded.
- The sticky CTA implementation contract is included in build notes.
- Every new page/page type has a navigation-inclusion decision.
- Every page type has a schema plan.
- The asset plan separates raw intake/source assets from production optimized assets.
- The image optimization plan specifies Astro `Image`/`Picture`/`getImage` use or Sharp fallback, AVIF/WebP variants, explicit dimensions, stable aspect ratios, LCP/hero behavior, stale/raw URL restrictions, and alt-text expectations.
- Hero/LCP imagery is specified as responsive image markup, not CSS background imagery.
- Third-party scripts, review widgets, maps, videos, social embeds, chat, and tracking have declared loading strategies.
- Visual QA evidence requirements include mobile initial, mobile scrolled, desktop, and tablet screenshots in that priority order.
- Service cards, proof sections, process, reviews, service areas, final CTA, and footer have real visual treatments.
- Forms, tracking, NAP, review widgets, and claims are not broken by design choices.
- Design choices do not require duplicated custom form markup or render-blocking noncritical third-party scripts.
- Nonstandard exceptions are documented with approval status.
- The build agent can implement the brief without guessing the layout.
- The build agent can implement schema, navigation, and image optimization without guessing.
- The build agent can implement third-party loading behavior without guessing.
