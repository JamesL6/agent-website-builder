# Core Contracts

Status: Active — single source of truth for shared rules
Last updated: 2026-08-25

## 1. How To Use This File

This file holds every rule that applies to two or more agents. Each rule lives here exactly once.

- Agent specs in `docs/agency-website-system/agents/` reference these sections by number (for example, `see CORE_CONTRACTS.md §10`). They must not restate the rules.
- When a rule changes, change it here only. Do not copy rules into other docs.
- If any other document disagrees with this file, this file wins. Fix the other document.
- `AGENCY_WEBSITE_AGENT_SYSTEM_PLAN.md` and `AGENCY_WEBSITE_DESIGN_HARNESS_PLAN.md` are strategy/rationale documents. They explain why these rules exist; they are not agent-facing instructions.

## 2. Shared Agent Contract

Every agent must be specific, scoped, and evidence-driven. No agent may silently invent missing facts, skip an approval gate, overwrite another agent's work, or treat a previous artifact as current without checking its source snapshot.

Every agent produces these items when relevant:

- `Source Snapshot`: sheet/document/repo URLs, tab names, read date, key rows/files used.
- `Assumptions`: anything inferred rather than directly verified.
- `Blockers`: missing information that prevents safe completion, with a named owner (default owner: account manager).
- `Decisions Made`: what the agent selected, rejected, or changed.
- `Handoff Output`: the artifact the next agent should use, in the format defined in `docs/agency-website-system/schemas/` when a schema exists.
- `Residual Risks`: known risks that remain after the agent's work.

Every agent must refuse or pause when:

- The required source of truth is missing.
- The source says `Needs Follow-Up`, `Unknown`, or equivalent for a build-critical field.
- A requested action conflicts with client-approved services, approved claims, tracking requirements, or project rules.
- The handoff from the previous agent is stale, incomplete, or fails its schema.

## 3. Source-Of-Truth Order

Use the most specific verified source first:

1. Account-manager-verified post-call intake (`AM Verified Website Intake`).
2. Explicit client confirmation from onboarding call notes.
3. Account manager correction after client follow-up.
4. Raw GoHighLevel onboarding form — pre-call context only.
5. Current website — candidate signal only.
6. Industry master template — recommendation only.

For restoration service pages specifically:

1. `AM Verified Website Intake` controls what the client actually offers.
2. `Content Briefs` and `Brief Queue` control brief readiness until the master sheet status mismatch is reconciled.
3. `Page Map` controls canonical URL schema, parent hub, page type, keyword, onboarding trigger, internal-link direction, and notes.
4. Google Doc content briefs are the execution contract for service-page copy and structure.
5. Repo rules control implementation, forms, shared sections, validation, and launch checks.

Verification ownership: the account manager controls `Verified Intake Status`; the AI controls `AI Intake Validation Status`. Final downstream build work requires `Verified Intake Status = Verified` AND `AI Intake Validation Status = Passed`.

## 4. Handoff Statuses

Use these statuses unless a later system replaces them:

`Draft` · `Needs Follow-Up` · `Ready For Review` · `Approved` · `Ready For Next Agent` · `Blocked` · `Complete`

## 5. Planning Vs Implementation Boundary

When the human is discussing patterns, agent behavior, prompts, SOPs, wireframes, or delivery-system design, agents update planning artifacts only.

Client website repo changes are allowed only when all of these are true:

- The human explicitly asks to edit, build, push, deploy, or publish the client site.
- The agent identifies the exact repo, branch, and files that will be touched.
- The requested change has a clear implementation target, not just a planning discussion.
- Unrelated local changes are identified and left unstaged unless explicitly included.

Reference sites (for example, Romexterra) may be inspected and summarized as pattern evidence without changing their source code. Implementing a pattern in a reference/client repo requires explicit approval first.

## 6. Claims And Claim States

Every customer-visible claim must carry one of these states:

- `visible_preview_allowed`: may appear in preview/customer-facing mockup copy.
- `launch_proof_required`: may appear in preview, but requires proof before launch.
- `badge_asset_required`: text may be approved, but badge/logo graphics require supplied or verified assets.
- `never_without_explicit_approval`: do not use unless the human/client explicitly approves it.

Defaults:

- 24/7 availability, free estimates, locally owned, approved certifications, and approved response-time claims can be `visible_preview_allowed` only when the AM/page map explicitly approves them.
- Exact review rating/count, certification badge graphics, carrier logos, warranties, and guarantees default to `launch_proof_required` or `badge_asset_required`.
- Insurance claim approval, guaranteed coverage, reimbursement promises, and direct billing promises default to `never_without_explicit_approval`.

Never invent: services, cities, claims, certifications, response times, review ratings or counts, testimonials, licensing, insurance outcomes, warranties, badges, or office locations. Unknown claims block the copy that depends on them.

Schema-only claims are also claims: do not add structured-data claims (ratings, reviews, certifications) that are not approved in visible copy or verified intake (see §22).

## 7. Banned Customer-Facing Language

Internal planning language must never render to customers. The scan inspects rendered visible page text from final build output — not markdown docs, code comments, schema fields, or hidden metadata.

Hard-block phrases (exact match, case-insensitive — automatic QA failure):

- `service architecture`
- `approved rollout`
- `source reserved` / `review source reserved`
- `widget-ready`
- `launch input`
- `proof plan`
- `page map`
- `page targets` / `target cities`
- `city-service pages are deferred`
- `lorem ipsum`
- `placeholder` (when visible to customers)

Soft-flag words (common English words that are usually fine in real copy — flag for reviewer judgment instead of hard failure, because words like "brief" and "candidate" appear in legitimate sentences):

- `brief`
- `candidate`
- `deferred`
- `mockup`
- `targets`

Use customer-facing vocabulary instead: `communities`, `service cities`, `counties served`, `service areas`.

## 8. Mobile-First Design Priority

Build every local-service website from the phone experience first, then desktop, then tablet. This is a design and implementation philosophy, not only a QA step.

- Start section density, heading behavior, CTA placement, forms, review widgets, maps, accordions, service cards, sidebars, final CTAs, and footer behavior from phone-width constraints before expanding to larger screens.
- Mobile must keep the call path obvious: tap-to-call in the header, primary phone CTA reachable in the hero, trust bullets visible without awkward wrapping, form fields usable, review widgets contained, sticky mobile CTA appearing after the hero.
- No page or component is acceptable if it creates horizontal overflow, clipped text, tiny tap targets, hidden phone actions, or third-party widgets running off the screen at phone widths.
- Desktop adds sticky headers, sticky sidebars, wider grids, richer imagery, and larger section rhythm only after mobile works. Tablet is the final adaptation layer.

## 9. Phone CTA Contract

- Desktop and tablet phone CTAs must visibly include the approved phone number inside the CTA or immediately adjacent to it. `Call now` alone fails QA on desktop/tablet.
- Mobile tap-to-call CTAs may use `Call now` or the number, but must use the approved `tel:`/DNI phone source.
- Desktop header for urgent local-service sites: sticky/fixed during scroll, with the phone CTA visually stronger than the request-service/contact CTA.
- Mobile header layout: tap-to-call button on the left, logo centered (not pushed off-center), menu button on the right. Do not hide the phone action inside the mobile menu.
- All phone actions site-wide use the approved tracking/DNI-capable phone source from shared site data.

Dynamic number insertion (DNI) mechanics — verified against the deployed LeadConnector
`number_pool.js` on 2026-08-25:

- **Every phone number on the page is a `tel:` link and is swappable by default.** Numbers
  render as tap-to-call anchors everywhere, and the swapper is allowed to replace all of them.
- The swapper finds numbers by **pattern-matching rendered text and `href` values** — it does
  not use CSS selectors or data attributes. It recognizes only these formats:
  `5550001234`, `555-000-1234`, `555.000.1234`, `(555) 000-1234`, `(555)000-1234`, and the
  URL-encoded `(555)%20000-1234` / `%28555%29%20000-1234`.
- Therefore **phone formatting is functional, not cosmetic**. A number rendered in any other
  format (for example space-separated `555 000 1234`) is silently skipped: no error, no visible
  problem, and call attribution for that CTA is lost. Display numbers as `(555) 000-1234` and
  hrefs as `tel:+15550001234` (the bare 10 digits inside the href are what the swapper matches).
- Opt-out: the swapper skips any anchor whose class list contains `noswap`. This is the ONLY
  exclusion mechanism available. Use it only for a deliberate exception — for example, keeping a
  GBP-listed location number exactly as Google has it — and record the reason. Default is swap.
- Load order: the number-pool script runs at body end so it can inspect rendered phone links
  after the markup exists (§19).
- Pre-launch QA must confirm swapping actually fires on the production host: load the live page
  with a tracking source and verify the rendered number and `tel:` href both changed. Script
  presence is not proof (§24).

## 10. Mobile Sticky CTA Contract

Every local-service website includes a shared mobile sticky CTA bar unless explicitly excluded.

Behavior:

- Available on every published page type (homepage, service, city, city-service, contact, review, team, etc.).
- Hidden while the hero is in view; revealed after the user scrolls past the hero (or roughly 35-50% of the first viewport).
- Approved design (owner decision 2026-08-25): a dark floating card containing a short reassurance line with a pulse indicator above ONE full-width call button showing the approved number. Deliberately a single action — at the moment someone needs an emergency crew, a competing "Request" button splits attention away from the call. The copy line persuades; the button does one thing.
- Primary action is a `tel:` call button using the approved DNI-capable number. Copy is short and urgent, and comes from per-client site data (never invented in the component).
- A secondary request-service action is optional only when it fits without crowding.
- Subtle attention treatment (pulse dot, glow, shadow lift, or slide-up) that respects `prefers-reduced-motion`.
- Safe-area inset padding, minimum 44px tap target, high contrast, and enough bottom page padding that the bar never covers content, forms, footer interactions, cookie banners, or chat widgets.

Implemented by `StickyMobileCTA.astro`, mounted from `BaseLayout` so every page inherits it; selectors `[data-page-hero]` and `[data-mobile-sticky-cta]` are stable for QA. Do not re-implement per page.

## 11. Shared Request-Service Form Contract

- All lead forms use the shared form component/renderer. Never hand-code one-off form markup in individual pages; duplicated custom form markup is a QA failure.
- Default visible fields: name, phone, email, service needed, city or ZIP, additional information/message.
- Form copy must explain that emergency service is available by phone and that online form requests are normally returned within one business day.
- The approved phone number must be visible inside or directly beside the form.
- Layout: if a field has no natural same-row partner, make it full width. Never leave a lone short field floating half-width.
- Form notices must use high-contrast text. Muted gray support text on dark, green, or gradient backgrounds fails QA.
- Interactive controls meet a 44px minimum touch height — form inputs, selects, and any phone link presented as an action. A bare inline `tel:` link renders ~20px tall, which is too small to hit reliably on a phone; render location/office numbers as call buttons, not body text.
- The form panel's visible title is a UI label, not a document section: render it as a non-heading element and give the `<form>` its accessible name via `aria-labelledby`. The shared panel mounts more than once per page (hero/sidebar + footer + contact), so a heading there produces duplicate headings in the page outline.
- Form CTA hierarchy stays phone-first for emergencies and request-service-first only for non-emergency form users.
- Forms use standard routing/tracking fields; form destination and tracking are captured at intake, not launch day.

## 12. Inner-Page Layout Contract

Fixed two-column layout for service, city, city-service, and most content pages unless an exception is explicitly approved.

Structure:

- Page-specific hero.
- Left column: SEO copy following the approved brief exactly — H2/H3 sections, paragraphs, bullets, internal links, media, page-specific CTA blocks, FAQ content when the brief calls for it. Keep the left column primarily editorial; do not turn every section into a card.
- Approved reusable body modules for rhythm inside long copy: `content-alert-list` (urgency/safety signs), `included-panel` (scoped service-includes lists), `inner-subsections` (H3 support cards), `inline-cta` (page-specific phone-first conversion). Keep body modules restrained: no nested cards, no excessive icons, no repeated card grid after card grid.
- Every service, city, and city-service page places a page-specific `inline-cta` immediately after the first body paragraph, and ends the final left-column narrative section with the same `inline-cta` component before post-body sections. Both in-body CTAs use the exact same reusable component and format.
- Right column: sticky sidebar on desktop/tablet with contact form first, review/proof widget, capped related navigation, and trust elements. On mobile the sidebar is static and stacks below the article.
- After the two-column body: reusable process, benefits, insurance/support, reviews, service area, FAQ, and footer sections as approved. Default inner-page post-body order: **process → reviews → service area**.
- Precedence (owner decision 2026-08-28): a page never carries two process narratives. When a page's approved copy already includes its own process section — most parent-hub master briefs require an in-article process H2 — the shared post-body process section is OMITTED on that page and its post-body order becomes **reviews → service area**. The Design Recipe records this per build (`post_body_sections.process: auto`), and `npm run validate:built` fails any built page that renders two.
- Post-body sections must be the SAME sections the homepage renders, from the same shared client data — not re-specified per page (owner decision 2026-08-25). In particular: the process section uses the client's one chosen process variant with identical content on every page, and the service-area module (counties → city hubs → city-service links) appears on inner pages directly below reviews. Passing per-page copy to these sections is how two pages drift out of sync; keep their content in shared site data so every page inherits one source.

Sticky sidebar mechanics (sticky on the `aside`, no inner scroll, `overflow-x: clip` on ancestors, static below the article on mobile) are implemented in `InnerPageTemplate.astro` and `global.css`. Do not re-implement.

Capped sidebar navigation (`SidebarNav.astro` enforces the caps):

- Never render a full uncapped sibling list.
- Always include the parent hub (or `View all [Parent Service] services` link) and the current page, highlighted.
- Include the 6-8 closest related child/sibling pages and a compact group of 5-7 core parent-service hubs. Total: ~14-16 links maximum.
- Selection priority: content-brief/internal-link-plan links → parent hub → current page → closest service-intent siblings → priority siblings → main parent hubs.
- Dedupe links, render only approved active pages, keep selection deterministic across builds. The sidebar must never substantially outlast the article; shorten or collapse when needed.

## 13. Contact Page Contract

- Phone-first hero: main phone number visible, tap-to-call CTA, secondary `Request Service` anchor to the form.
- The request-service form is the first body section after the hero. Do not place locations, maps, or general contact copy before the form without explicit approval.
- That request section is two columns on desktop (modeled on the approved Green State contact page): a support panel on the left framing **when to call vs. when the form is fine**, carrying the phone number, the online-response expectation, and the email address; the shared request-service form on the right. On mobile the form stacks below the support copy.
- Location/NAP cards below the form. Every approved GBP location appears, visually segmented, each with name, address, phone, hours where known, and a directions link — matching the verified GBP business name, address, and phone exactly. Multi-location clients show all locations; a single location renders as one card, not a stretched row.
- The footer conversion band closes the page (§17); no separate final CTA above it.

## 14. City Page Hub Contract

- H1 pattern: `Restoration Services in {{city}}, {{state_abbreviation}}` — visible copy uses the state abbreviation unless the page map says otherwise.
- The city page is a routing hub: introduce the company's support in that city, briefly summarize each approved city-service page, and link each summary to its page.
- Do not duplicate full service-page copy, and do not mention or link city-service pages that are not approved in the active page map.

## 15. Service-Area Module Contract

- Use a real, scalable map provider — typically Leaflet/OpenStreetMap — unless another provider is approved. Never ship a fake decorative map in production.
- Map loading and stacking are implemented in `ServiceAreaMap.astro` / `RegionalServiceExplorer.astro`: non-blocking near-viewport load with a mandatory ~2.5s auto-init fallback (never IntersectionObserver-only — a permanent placeholder is a defect), and `isolation: isolate` on the container so Leaflet's panes never paint over the sticky header. Do not re-implement.
- The section is an internal-link module, not just a visual: default hierarchy is county/state selector → city hub link → expandable city-service links. The city name links to the city hub; a separate expander reveals that city's approved city-service pages.
- Do not duplicate cities as decorative pills when the accordion/list already exposes them.
- For large city/city-service builds: stacked layout — intro copy above, map/explorer below, county/city lists inside or below the explorer with controlled height. Never place a short copy column beside a very tall accordion.
- Expanded lists need max-height scrolling, filtering, pagination, or progressive disclosure so one open county cannot take over the page.
- Alternate for very large builds: `Regional Service Explorer` — map plus segmented county/state browser with optional city search/filter.
- Production must not publish active links to city or city-service URLs until those routes exist or the generated-route plan is approved. Preview builds may show planned route links only when the page-generation plan is explicit. Enforced in code: `npm run validate:built` fails any built page containing an internal link that does not resolve to a built route or file (added 2026-08-28 after a build shipped ~50 dead city-hub links in the site-wide mega-menu and service-area map). Build targets before or with the nav entries that point at them.
- Labels are customer-facing only (see §7).

## 16. Review / Proof Section Contract

- When a review widget snippet, app ID, embed source, or approved review source exists, the build must render a real dedicated review section from that source. A reserved review module is valid only while the source is missing, and must be replaced before launch.
- Homepage review widgets use a stacked layout: intro copy above, real widget full row width below. No default split-column review layouts.
- Inner pages: sidebar review widgets belong in the sidebar; homepage/full-width widget snippets belong in large review sections. If separate snippets/app IDs are provided per placement, preserve that mapping exactly. When the real widget is too heavy for the sidebar, use a compact proof card linking to the full-width section — never present the card as the widget itself.
- Phone-width overflow containment and non-render-blocking widget loading are implemented in `ReviewSection.astro`; widget IDs per placement come from `site.reviews`.
- Review section copy is customer-facing only (see §7). No fake reviews, ratings, badges, or claims (see §6).

## 17. Astro-First Production Contract

- Production output comes from Astro pages, layouts, components, data files, content collections, and utilities. Standalone static HTML is never the production source of truth.
- Any unavoidable raw/static HTML must be generated or controlled by Astro and validated from final build output.
- Standalone HTML/CSS is allowed only as an explicitly requested, clearly labeled `Non-production mockup`. Never convert a mockup directly into production; rebuild it as Astro components/routes.
- Repeatable page designs are component-first: build the reusable component/template from the beginning, review it through a `noindex,nofollow` template preview route with realistic service-shaped placeholder data (never pure Lorem Ipsum), then have production pages pass approved copy/data into the approved component.
- Template preview routes are excluded from header/footer navigation, service listings, generated page maps, XML sitemaps, and Search Console submissions.
- Pre-launch index state is ONE switch, never per-page markup: `site.previewMode` in `src/data/site.ts` (true → every page emits `noindex,nofollow`; `/templates/` routes pass `noindex` explicitly and stay noindex after launch). Launch = set it false, rebuild, and pass `npm run validate:launch`, which FAILS while any non-template page is noindex or `/robots.txt`/`/sitemap.xml` is missing. Added 2026-08-28 after a build pasted noindex into 54 separate page files with no rule mandating it and no stage removing it — the site could have launched invisible and nothing would have caught it.
- Navigation, footers, forms, CTAs, and schema are controlled through shared data/config/components, never one-off hard-coded markup.
- Icons (owner decision 2026-09-09): Lucide is the ONLY icon set, rendered inline at build via `astro-icon` (`<Icon name="lucide:…" />` from `astro-icon/components`) — zero runtime JS, only used icons ship. No hand-drawn SVG icons, no other sets, no emoji-as-icon. Sanctioned slots only: check bullets/trust rows, contact actions (phone, clock, map pin), header phone/menu/chevrons, alert lists, process connectors, the reserved review state, and the `icon_plus_media_cards` service variant. Stroke weight is Lucide's default 2, except check marks inside colored circles which use 3. A client-specific icon override requires an explicit human instruction recorded in the recipe's `exceptions[]`.
- No external UI component kits (owner decision 2026-09-09): Tailwind UI, shadcn, Flowbite, DaisyUI, and similar are not used, imported, or proposed. The starter's own components ARE the design system; styling is Tailwind utilities + the client token file only. A need the starter cannot express becomes a new registry variant, built in-house. External kits may be looked at for inspiration when designing a new variant, never imported.

## 18. Image Optimization Contract

- Raw client images go into an intake/source folder first — never directly into the production public image folder.
- Use Astro image tools wherever possible: `Image` (standard), `Picture` (hero/art-directed/responsive), `getImage` (data-driven). Shared components: `OptimizedImage.astro`, `GalleryImage.astro`, `HeroImage.astro`.
- Hero/LCP images: never CSS backgrounds; render as responsive AVIF + WebP fallbacks with explicit `width`/`height`, correct `alt`, `decoding="async"`, `fetchpriority="high"`, and no lazy loading.
- CSS backgrounds only for decorative or below-the-fold imagery, pre-compressed with Sharp, with containers reserving stable layout space (`aspect-ratio`, `min-height`, or fixed constraints).
- Right-sized AVIF/WebP variants per role (logo, badge, thumbnail, gallery, hero, service card) — not one universal max size.
- Every rendered `img` in final output has explicit `width` and `height`.
- Never reference raw `.png`/`.jpg` client uploads in production pages without a documented exception.
- Enforced by `npm run validate:built` on the built HTML: every `img` has width/height and alt (or is marked decorative), no raw `.jpg`/`.png`/`.gif` outside the optimized `/_astro/` output (agency assets under `/logos/` excepted), and no lazy-loaded image inside the hero or marked `fetchpriority="high"`. `HeroImage`, `OptimizedImage`, and `GalleryImage` produce compliant output by construction.

## 19. Third-Party Loading Contract

- Every third-party script, review widget, map, social embed, video, chat, and tracking script must declare a loading strategy before implementation. Every reusable component that adds media or third-party scripts defines its loading strategy as part of its component contract.
- Use `defer`/`async` and preconnect where appropriate. Prefer static first-party facades for reviews, maps, social embeds, and videos, then hydrate after load or near viewport.
- Maps: see §15 (non-blocking load with automatic initialization fallback).
- Review widgets above the fold may load immediately after `window.load` when trust proof is required, but must never be render-blocking in the head.
- The build must not add render-blocking noncritical scripts — this is a QA failure.
- Tracking script presence alone is not proof that events fire; QA verifies events.

## 20. Font Contract

- All production fonts are self-hosted or system fonts. If Google Fonts are used during design selection, download and self-host the approved files before production.
- Never ship remote font CSS, `fonts.googleapis.com`/`fonts.gstatic.com` preconnects, Adobe font kits, CDN font files, or third-party font scripts without an explicitly approved, documented exception. Unapproved remote font loading is a pre-deploy QA failure.
- Prefer WOFF2, `@font-face`, `font-display: swap`, and only the weights/styles actually used.
- Do not default to ultra-light weights: readable body fonts at 400/500, strong headings at 700-900. Do not copy the logo font into the site unless it is provided, licensed/web-safe, and readable at body sizes.

## 21. Sitemap, Robots And llms.txt Contract

- Every site ships `/sitemap.xml` as a real XML endpoint: HTTP `200`, XML content type, valid sitemap or sitemap-index XML. Never an HTML redirect page, meta-refresh page, branded redirect shell, or normal site page.
- Larger sites: `/sitemap.xml` as a sitemap index pointing to child files (`/sitemap-0.xml`, …). Child files return HTTP `200`, XML content type, and canonical production URLs.
- With `@astrojs/sitemap`, do not rely on a page-style redirect from `/sitemap.xml` to `/sitemap-index.xml` that generates `dist/sitemap.xml/index.html`. Use a post-build alias/copy step or equivalent deployment-safe method.
- `robots.txt` references the preferred sitemap entry point, normally `https://www.clientdomain.com/sitemap.xml`.
- Search Console uses `/sitemap.xml` as the primary submitted sitemap.
- Build/launch audits fail if `/sitemap.xml` is missing, returns HTML, is a redirect/meta-refresh shell, does not parse, has missing/non-XML children, contains non-canonical URLs, or `robots.txt` does not reference the preferred sitemap.
- Every site ships `/llms.txt` (llmstxt.org format). It is GENERATED at build by `starter/postbuild.mjs` from `site.ts` (name, approved footer blurb, phone, locations, availability) and from the routes that actually exist in `dist/` — never hand-authored, never listing an unbuilt route, never carrying copy that is not already approved elsewhere on the site. `npm run validate:launch` fails if it is missing.
- Sitemap, `robots.txt`, and `llms.txt` need NO per-client work (added 2026-09-09): `site.siteUrl` and `site.previewMode` drive all three via `@astrojs/sitemap` + `postbuild.mjs`, which run inside `npm run build`. A build that hand-authors any of them, or hardcodes a domain in them, is a defect.

## 22. Structured Data (JSON-LD) Contract

- Schema is a required build decision for every page type, not post-launch cleanup. The design recipe specifies the schema family per page type; the build agent implements it through shared Astro schema utilities/components.
- Common page-type schemas: `LocalBusiness`, `Organization`, `Service`, `FAQPage`, `BreadcrumbList`, `ContactPage`, `AboutPage`, `Person`, `ImageObject`, `Review`, `AggregateRating`.
- `Review`/`AggregateRating` only when the rating/review data is verified, visible, and defensible in final output — never from a third-party widget's presence alone.
- NAP, location, service-area, phone, URL, and sameAs data must match approved intake and shared site data exactly.
- QA validates final rendered JSON-LD from built output.

## 23. Navigation Inclusion Contract

Every new page requires a recorded navigation-inclusion decision before its build handoff is complete:

- Header navigation? Footer navigation? Sidebar/related navigation? Parent service hub or city hub listings? XML sitemap only? Intentionally hidden (with approval)?

Default rule: revenue/SEO landing pages must be reachable through an approved internal-link path. They do not all belong in the header, but they must not become accidental orphans unless the human explicitly approves that risk.

## 24. Visual QA Evidence And Ownership

Required evidence, in mobile-first priority order:

1. Mobile initial screenshot `390x844`.
2. Mobile scrolled screenshot `390x844`.
3. Desktop screenshot `1440x1100`.
4. Tablet screenshot `1024x900`.

Required checks on every visual QA pass:

- No horizontal overflow at any required viewport.
- Mobile H1 does not clip; hero trust bullets visible above the fold on desktop and mobile, placed directly below the H1 or the hero subhead/tagline, before lower-priority supporting copy.
- Text on dark, green, brand-accent, or image-backed backgrounds is comfortably readable. Muted gray support copy on dark/brand backgrounds fails when it reduces legibility.
- Primary call CTA visible and usable; sticky mobile CTA hidden in hero and visible after hero (§10).
- Rendered visible DOM text scan (§7).
- No oversized sparse hero, no sitemap-like card grids, no repeated identical section layouts, no placeholder proof modules, no fake claims (§6).
- Schema validates from final build output (§22); image validation passes (§18); no render-blocking noncritical scripts (§19); no unapproved remote fonts (§20).

Ownership rule: the builder can produce screenshots and run checks, but the builder is never the final visual approver. Human approval, or a separate reviewer/QA agent, is required before a design is accepted. Do not mark launch-ready while red blockers remain unless the owner explicitly accepts the risk.

Homepage H1 rule: desktop hero headlines use explicit line groups and protected no-wrap phrases — no uncontrolled wrapping, no viewport-width font scaling that clips or splits important phrases into awkward layouts.

Typography/density rule: large display type is required, but oversized or clipped type fails. Do not solve weak design by increasing font size, padding, card height, or empty spacing.
