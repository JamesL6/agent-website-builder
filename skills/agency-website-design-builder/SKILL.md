---
name: agency-website-design-builder
description: Creates reusable visual design briefs for agency-built local service websites, especially restoration, plumbing, roofing, and home-service sites. Use when planning homepage, inner-page, city-page, service-area, contact-page, review, team, CTA, sidebar, and footer design patterns before Astro build work.
---

# Agency Website Design Builder

Produce a build-ready **Design Recipe** (machine-checkable) and **Design Brief** (prose companion)
from verified intake, brand assets, the approved page map, approved copy, and the agency starter.
This skill decides how the starter's templates are filled for THIS client — variant per section,
brand tokens, imagery, proof placement. It does not write customer-facing copy and does not build
production code.

Shared rules: `docs/agency-website-system/CORE_CONTRACTS.md` (§1–§24) in the canonical checkout
`/Users/jameslarosa/Documents/agent-website-builder`. Where this skill and that file disagree, that
file wins. Rules that a component or validator enforces are stated here once as a pointer, not
re-explained — the code is the specification.

## Production Boundary

- Output is a Design Recipe + Design Brief, never production HTML/CSS. `Implementation Target: Astro`.
- A throwaway mockup exists only when the human explicitly asks; label it `Non-production mockup`.
- If the homepage is rejected, use Rebuild Mode (below) — one serious rebuild from the blueprint,
  not multiple exploratory directions or UI kits.

## Source Order

1. Approved Homepage Messaging Pack (required before homepage design — see the gate below).
2. Verified client intake and approved claims.
3. Active page map and page types.
4. Final page copy or approved content briefs.
5. Brand assets: logo, photos, video, colors, guidelines.
6. Agency default patterns (the starter).
7. Current website — supporting context only.

Never invent claims, badges, ratings, certifications, locations, response times, review counts, or
services through design.

## Living Wireframes — Reference Implementations (look before you design)

The wireframe is code, not this document. Every pattern below exists as a starter component, and
the approval surfaces are `noindex` preview routes rendering those components with realistic
example data (§17). Before writing a brief, run the starter (`npm run dev` in `starter/`) and LOOK
at the route. A brief specifies which variant, tokens, copy, and photography fill these templates —
never a new layout. A need the starter cannot express becomes a new registry variant
(`design-recipe.yaml` → BUILT/PLANNED), built in-house. No external UI component kits (Tailwind UI,
shadcn, Flowbite, DaisyUI…) — never imported, never proposed (§17, owner decision 2026-09-09).

| Page type / pattern | Reference implementation (under `starter/src/`) | Preview route |
|---|---|---|
| Homepage (`emergency_split_hero`) | `pages/index.astro` composition | `/templates/homepage/` |
| Service, child, and city hub pages | `components/templates/InnerPageTemplate.astro` | `/templates/inner-page/` |
| City hub pages (generated) | `pages/[citySlug].astro` — copy from `data/cities.ts` `cityHubCopy` | build output only |
| City-service pages (generated) | `components/templates/CityServicePage.astro` via `pages/[citySlug]/[hub].astro` — content from `data/cityServiceContent.ts` | `/templates/city-service/` |
| Contact page (§13) | `components/templates/ContactPageTemplate.astro` | `/templates/contact-page/` |
| About page | `InnerPageTemplate` + `GalleryImage.astro` grid | `/templates/about/` |
| Reviews page (§16) | `components/templates/ReviewsPageTemplate.astro` | `/templates/reviews/` |
| Service-area index (§14, §15) | `components/templates/ServiceAreaIndexTemplate.astro` | `/templates/service-area/` |
| Legal pages (privacy, terms) | `components/templates/LegalPageTemplate.astro` | `/templates/legal/` |
| Blog index / post | `components/templates/BlogIndexTemplate.astro`, `BlogPostTemplate.astro` | `/templates/blog/`, `/templates/blog-post/` |
| Services grid + differentiator | `ServiceGrid.astro`, `DifferentiatorVS.astro` | `/templates/sections-a/` |
| Process + reviews | `ProcessSection.astro`, `ReviewSection.astro` | `/templates/sections-b/` |
| Service-area map + FAQ | `ServiceAreaMap.astro`, `FAQSection.astro` | `/templates/sections-c/` |
| Footer (three bands, tap-to-call first) | `SiteFooter.astro` | `/templates/sections-d/` |
| Alternate variants: icon cards, stepper, regional explorer | `ServiceGridIcons`, `ProcessStepper`, `RegionalServiceExplorer` | `/templates/variants-b1/`, `/templates/variants-b2/` |
| Mobile sticky CTA (§10) | `StickyMobileCTA.astro` | `/templates/sticky-cta-options/` |
| Grouped mega-menu header | `MegaMenuHeader.astro` | `/templates/mega-menu/` |

The starter's root (`/`) is a directory of these routes. Verify a route renders before citing it;
the variant registry in `agency-astro-site-builder` is the authority on which enums are BUILT.

## Homepage Messaging Pack Gate

The exact homepage copy — H1, subhead, CTA labels, trust bullets, section headings, footer summary —
must be locked in an **approved** Messaging Pack before homepage design starts. No pack → request the
fields and stop. Non-homepage pattern work may proceed labeled `Draft`. The brief ARRANGES approved
copy; it never writes new customer-facing wording. Every claim it places carries a claim state.

## Claim States

Every visible or schema-adjacent claim is tagged before it appears in a brief:
`visible_preview_allowed` · `launch_proof_required` · `badge_asset_required` ·
`never_without_explicit_approval`. Defaults: 24/7, free estimates, locally owned, certifications and
response times are `visible_preview_allowed` only when the AM/page map approves them; exact ratings,
counts, badge graphics, carrier logos, warranties, guarantees default to `launch_proof_required` /
`badge_asset_required`; insurance approval, guaranteed coverage, reimbursement, and direct-billing
promises default to `never_without_explicit_approval` (§6).

## Build-Handoff Contracts (what the brief must still decide)

The starter enforces the mechanics; the brief records the decisions.

- **Navigation inclusion (§23):** for every page type, which surfaces it appears in — header,
  footer group, sidebar/related, hub listings, sitemap-only, or intentionally hidden. Nav is data
  (`site.ts`, `megaNav.ts` generated from the page map), never hand-authored markup.
- **Schema (§22):** the schema family per page type. `SchemaOrg.astro` emits the business entity on
  every page plus what the page passes it; `Review`/`AggregateRating` only from a verified live
  source; never a schema-only claim.
- **Images (§18):** image ROLES and the asset plan — which asset is hero/LCP, card, gallery, team,
  logo — and what is still missing. Rendering, formats, dimensions, lazy/eager, and raw-upload
  rules are enforced by `HeroImage`, `OptimizedImage`, `GalleryImage` and `validate:built`; do not
  re-specify them. Hero imagery is never a CSS background.
- **Third-party loading (§19):** a declared strategy for every widget, map, video, chat, and
  tracking script. Maps and widgets already load non-blocking with fallbacks in their components;
  the brief lists what is present and any client-specific script.
- **Fonts (§20):** self-hosted WOFF2 (Fontsource) or a system stack; no remote font requests.

## Brand Intake And Token Generation

Ask for: brand guidelines, logo (SVG or high-res PNG), approved colors and colors to avoid, fonts or
font rules, existing print/signage/site examples, photos/video, and the required tone (premium,
emergency-first, commercial, family-owned…). With only a logo, the logo is the brand seed.

Logo-derived color rules: `primary` from the most brand-defining saturated color; `secondary` from a
supporting or companion color; `accent` for CTAs with strong contrast that fits conversion (may be the
primary, a companion, or a controlled emergency red/orange); neutrals `dark`, `surface`, `muted`,
`border`, `white`; hover variants for buttons and accent bands. Check contrast on buttons, hero text,
nav, forms, footer — a logo color that fails readability does not become a text or button color
(use an AA-safe `-text` variant). Do not force every section into the logo color; neutrals, dark
sections, and accent bands create rhythm.

Font rules: use supplied brand fonts when licensed and readable; a distinctive logo font is
inspiration, not the body font; never default to the lightest weight; body at 400/500, headings at
700–900; sturdy modern sans-serif systems for restoration/emergency. Good pairings: `Barlow Condensed`
+ `Barlow`/`Inter`; `Archivo` + `Inter`; `Sora` + `Inter`; `Manrope` throughout. Or a strong system
stack with explicit weights.

Tokens derived from logo/assets rather than a supplied brand guide are marked `Needs Human Approval`.

## Visual Quality Bar

The brief describes a finished, premium local-service site, not a wireframe or a styled strategy doc.
The bar: strong hero composition with service-relevant imagery and a high-contrast treatment; a
large, confident H1 with intentional line groups; phone-first primary CTA and secondary request CTA;
proof near conversion points; a substantial, layered form card; rich service cards; alternating
light/dark/accent section rhythm; a designed differentiator and process; a real review widget (or an
honest reserved state); a scalable service-area module; a complete footer with exact NAP.

Fail the design if it reads as: a wireframe; a sitemap rendered as blocks; mostly text on blank
backgrounds; the same two-column layout repeated; small CTAs buried in content; placeholder proof
with no treatment; generic cards without imagery, icon system, labels, or hierarchy; a logo/color swap
of another client.

## Mobile-First Priority

Design order: phone → desktop → tablet (§8). Mobile keeps the call path obvious: tap-to-call in the
header, phone CTA in the hero, trust bullets above the fold, no clipped H1, sticky CTA after the
hero (§10). Desktop adds sticky header, sticky sidebar, wider grids, richer imagery. Tablet adapts last.

## Premium Visual Acceptance Rubric

Score before handing off — and this is the same rubric the Review Agent scores the BUILD against.
Review targets (owner decision 2026-09-09): the starter's `/templates/*` previews (baseline), the
approved Design Recipe + Brief, and this rubric + CORE_CONTRACTS — never live reference sites.
Format: `Pass` / `Needs Revision` / `Fail`. Any `Fail` blocks handoff unless the human accepts the risk.

| Area | Pass standard |
|---|---|
| Hero composition | Reads as a premium service company: real/service-relevant imagery or a strong visual system, controlled density, not just huge text. |
| Headline / density | Intentional line groups, no clipping or overflow, readable hierarchy, mobile fit; spacing feels designed, not empty. |
| CTA hierarchy | Phone-first CTA dominant, request-service secondary, CTAs repeat at decision points, proof near conversion. Desktop/tablet phone CTAs show the number. |
| Form / request panel | Substantial, layered, trustworthy; phone visible beside it; does not overwhelm the hero. |
| Service cards | Strong hierarchy, media/icon/label treatment, concise copy, links — not plain boxes. |
| Section rhythm | Alternates dark/light/brand/media-backed sections; no repeated two-column layout. |
| Differentiator / process | Designed modules, not generic bullet lists. |
| Proof / reviews | Real widget when available; reserved state looks intentional and invents nothing. |
| Service area | Map/list scales without dumping hundreds of links. |
| Footer / final CTA | Phone-first close; complete links; exact NAP behavior. |
| Mobile | No horizontal overflow, no clipped H1, primary CTA reachable, sticky CTA after hero, usable tap targets. |

## Homepage Blueprint (restoration / emergency home services)

The section order is built — see `/templates/homepage/`. Default order: header (visible phone +
request CTA) → split hero with form panel → proof/emergency band → intro/about → services (from the
page map) → differentiator → process (default 3 steps; deviations recorded in `exceptions[]`) →
reviews widget → service-area map (counties → city hubs → city-service links) → FAQ → footer close
(tap-to-call first on mobile + form). Shared mobile sticky CTA on every page type (§10). Final CTA
band is OFF by default — the footer band is the close.

What the brief decides per section:

- **Hero:** background approach (client photo, approved asset, service-relevant image, or a premium
  non-photo treatment with a reason) and overlay; H1 line groups and protected no-wrap phrases (§24);
  which 4–6 verified trust bullets appear directly below the H1/subhead; proof placement near the CTA.
- **Proof band:** only from verified claims; bold, not a small text row. Emergency band when intent is urgent.
- **Services:** which variant (`image_overlay_grid` default; `icon_plus_media_cards`), card count and
  imagery per card, intent chips.
- **Differentiator and process:** variant; steps adapted to verified services — never promise
  reconstruction, claims handling, or response times that are not verified.
- **Reviews (§16):** the real widget source per placement (homepage / inner / reviews page); full
  content-row width on the homepage with the intro above; customer-facing labels only. The reserved
  state is temporary and must be replaced before launch.
- **Service area (§15):** `map_with_county_accordions` or `regional_service_explorer` (many counties,
  multiple states, hundreds of city-service pages); the county/state model; only approved links.
- **Footer:** curated groups (services, areas, company, locations/NAP, approved socials) — never a
  generated page dump. Approved footer copy from the Messaging Pack.

Header, form fields, sticky CTA behavior, review-widget containment, map loading, and mega-menu
mechanics are implemented in the components and are not design decisions.

## Navigation Architecture

- Clients with more than one service category and child pages REQUIRE
  `header: mega_menu_grouped_services` (`MegaMenuHeader.astro`, BUILT): `Services` grouped by
  category with every approved child listed, `Service Areas` grouped by county with cities linking
  to city hubs (never to city-service pages, §14). The tree comes from `megaNav.ts`, GENERATED from
  the page map. Panel layout, scrolling columns, hover intent, keyboard access, and the mobile list
  drawer are the component's job — do not re-specify them. Flat nav (`utility_strip_sticky_header`)
  is the fallback for single-category clients.
- Top-level header items ≤ 7. Service and city depth lives inside the two menus.
- Mobile header: tap-to-call left, logo centered, menu right; the phone action never hides in the menu.
- Footer: curated groups only. Sidebar: capped smart navigation (`SidebarNav.astro` enforces the caps:
  parent hub, current page, 6–8 related, 5–7 core hubs, ~14–16 links). Hubs carry discovery depth.
- Never link a city or city-service route before it exists (§15 — `validate:built` fails dead links).
- The brief includes `Navigation Architecture Notes`: which pages sit in which surface, and any
  exception needing approval.

## Inner-Page Pattern (§12)

`InnerPageTemplate.astro` renders every service, child, and city page: compact hero → two columns
(editorial article left; sticky sidebar right with the shared form FIRST, proof card, capped nav,
trust rows) → the SAME post-body sections the homepage renders (process → reviews → service area,
from shared site data). Sticky mechanics, mobile stacking, and overflow rules live in the template
and `global.css`.

Design decisions that remain:

- The left column follows the approved brief's heading hierarchy exactly. Body modules for rhythm,
  used sparingly: `content-alert-list` (urgency/safety), `included-panel` (scoped includes),
  `inner-subsections` (H3 support cards), `inline-cta`. No nested cards, no icon parades, no card
  grid after card grid — the column stays editorial.
- Icons: Lucide only, via `astro-icon`, in sanctioned slots (§17, decided 2026-09-09). Article H3s
  carry the 3px accent left rule, not icons or cards (decided 2026-08-28) — both baked into the template.
- Two page-specific `inline-cta`s: after the full opening body section, and closing the last
  narrative section. Same component, phone-first, number visible on desktop/tablet.
- Post-body process is OMITTED when the page's copy already includes its own process section (§12
  precedence — `validate:built` fails two process narratives).
- Review widget per placement mapping is preserved exactly (sidebar vs. full-width IDs).
- Do not change the fixed inner-page structure without explicit human approval.

## City Pages (§14)

City hubs render from `pages/[citySlug].astro` with ALL copy from `cityHubCopy`; city-service pages
from `CityServicePage.astro` with content from `cityServiceContent.ts` — both Copy Sprint
deliverables, interpolated per city. H1 `Restoration Services in {city}, {ST}`. Hubs are routing
pages: short summaries linking to that city's own service pages; factual differentiation only
(county, state, real neighboring approved cities, honest response framing) — never waterways, landmarks, housing stock, or local color (padded local pages read as doorway pages),
never links to unapproved routes. The brief records which cities and which services per city (from
the page map), nothing more.

## Service-Area Module (§15)

`ServiceAreaMap.astro` / `RegionalServiceExplorer.astro` implement Leaflet + OpenStreetMap, the
approved polygon, GBP-only pins from shared location data, non-blocking load with fallback, and the
county → city → city-service accordion. The brief chooses the variant and the county/state model,
confirms the approved link set, and never adds decorative city pills or a second city list. Internal
planning language never reaches customers (§7 — `validate:built` fails banned phrases).

## Contact Page (§13)

`ContactPageTemplate.astro` fixes the order: phone-first hero → request section FIRST (support panel
beside the shared form) → every approved GBP location, exact NAP. The brief supplies the approved
copy and confirms the location list. Locations or maps never precede the form.

## Operational Pages

About (`InnerPageTemplate` + `GalleryImage` grid), Reviews (`ReviewsPageTemplate`), service-area
index (`ServiceAreaIndexTemplate`), Privacy/Terms (`LegalPageTemplate`), Blog
(`BlogIndexTemplate`/`BlogPostTemplate`). The brief lists which exist for this client (from the page
map) so `site.utilityNav` / `site.legalLinks` carry no dead entries.

## Design Philosophy

Standardized means proven conversion elements appear in proven places — not identical sites.
Consistent across clients: phone-first strategy, homepage section logic, inner-page two-column logic,
form placement, proof placement, service-area presence, FAQ placement, footer function.
Customized per client: color system, typography within brand direction, photography/video, section
and card treatments within the registry, texture/rhythm/composition, proof presentation, approved
client-specific sections. A nonstandard request gets a tradeoff note first; adapt when reasonable and
client-specific; require approval or refuse when it hurts SEO, conversion, or brand trust.

## Rebuild Mode

Use when the human rejects the current homepage or says it is not premium/professional enough.
Rejected work is a negative example, never a base to tweak. Keep verified data, page-map decisions,
tokens, service-area data, and approved claims. Sequence: inspect the current preview → produce the
`Premium Homepage Quality Audit` (below) → revise the Design Recipe + Brief with concrete changes →
hand off after human approval of the rebuild scope. No exploratory UI kits, no production edits in
this mode.

```markdown
## Premium Homepage Quality Audit

Reference Standard: the starter's /templates/homepage/ + this skill's rubric
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

## Output: Design Recipe + Design Brief

Two paired artifacts:

- **Design Recipe** — `schemas/design-recipe.yaml`: one BUILT variant per section, brand tokens with
  `token_source`, `variant_options`, per-page schema and navigation decisions, third-party loading
  strategies, `exceptions[]`. `npm run validate:artifacts` rejects PLANNED variants, unjustified
  deviations, and missing fields. Propose a new variant for human approval rather than describing a
  section design in free text.
- **Design Brief** — the prose companion in this format:

```markdown
# Design Brief

Client:
Industry:
Design Status:
Design Recipe Ref: [path to the paired design-recipe.yaml]
Messaging Pack Ref: [path to the approved messaging-pack.yaml]
Implementation Target: Astro
Brand Source: Supplied guidelines / Logo-derived / Existing website-derived / Human-directed

## Brand Direction
[Color system, typography direction, visual tone, imagery style, icon usage (lucide:<name> in sanctioned slots), approval status.]

## Brand Tokens
[primary, secondary, accent, dark, surface, muted, border, white, hover variants, AA-safe text variants, font families/weights, hosting plan, contrast notes.]

## Homepage Section Plan
[Per section: variant, imagery, proof placement, which approved copy fills it, exceptions.]

## Premium Visual Acceptance Rubric
[Pass / Needs Revision / Fail per area, with required fixes.]

## Inner Page, City Page, Contact Page, Operational Pages
[Which variants/modules apply; review-widget placement mapping; which operational pages exist.]

## Service Area / Map
[Variant, county/state model, approved link set.]

## Asset Plan
[Which asset plays which role — hero/LCP, card, gallery, team, logo — what is missing, what is still placeholder.]

## Third-Party Loading Plan
[Widget, map, video, chat, tracking — declared strategy each.]

## Schema Plan
[Schema family per page type; rating/review restrictions.]

## Navigation Architecture Notes
[Surfaces per page type; header variant; exceptions needing approval.]

## Design Exceptions
- [Exception] -> [Reason] -> [Approval status]

## Visual QA Evidence Required
[Mobile initial, mobile scrolled, desktop, tablet — in that order — for homepage, one service page, one city hub, one city-service page, contact.]

## Open Questions / Blockers
- [...]
```

## Quality Check

Before finalizing:

- Approved Messaging Pack exists; every visible claim carries a state.
- Paired Design Recipe validates; one BUILT variant per section; deviations justified in `exceptions[]`.
- Tokens: primary/secondary/accent/neutrals/hover/AA-safe variants; logo-derived tokens marked for approval.
- Fonts: self-hosted WOFF2 or system stack; no remote font requests.
- Rubric complete, no `Fail`; the design adapts to the brand without becoming a logo/color swap.
- Hero has real composition; H1 line groups defined; trust bullets above the fold.
- Every page type has a schema family and a navigation-inclusion decision; operational pages listed.
- Asset plan separates raw intake assets from what ships; hero/LCP asset named.
- Third-party scripts each have a loading strategy.
- Reserved review states are flagged as temporary with the source still owed.
- Nonstandard exceptions documented with approval status.
- The build agent can implement everything without guessing — and nothing in the brief re-specifies
  what a component or validator already enforces.
