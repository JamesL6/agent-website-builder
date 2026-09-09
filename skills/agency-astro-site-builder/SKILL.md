---
name: agency-astro-site-builder
description: Assembles a production client website from the agency Astro starter, an approved Design Recipe, an approved Homepage Messaging Pack, and Final Page Copy. Use when building, assembling, or implementing a client site (homepage, service, city, city-service pages) after design and copy approval. Never designs from scratch — it is the assembly step, not the design step.
---

# Agency Astro Site Builder

Assemble a client website from finished, approved parts. This skill is Stage 6 (Astro Build
Agent) of the agency pipeline. It makes zero design decisions and writes zero customer-facing
copy — every visual decision was made once in the starter and the Design Recipe; every word
comes from the approved copy artifacts.

The governing rules live in the `agent-website-builder` repo (canonical checkout: `/Users/jameslarosa/Documents/agent-website-builder`):
`docs/agency-website-system/CORE_CONTRACTS.md` (shared rules §1-§24),
`docs/agency-website-system/agents/06-astro-build-agent.md` (this stage's full spec), and
`docs/agency-website-system/schemas/` (the input artifact formats). Read CORE_CONTRACTS
before the first build in a session. Where this skill and those files disagree, those files win.

## Rule Zero — Start From The Starter

Every production build starts by copying the agency starter
(the canonical checkout's `starter/` directory). Never build a client site from scratch,
from this skill's prose, from a mockup, or from another client's repo.

The starter already contains the agency's design craft — condensed display typography, layered
dark sections, the white form card, single-accent discipline, sticky CTA, capped sidebar
navigation, the inner-page template. Building from anything else silently discards all of it.
A site built without the starter is a non-production preview, whatever else it looks like.

## Required Inputs (hard gates — stop and list blockers if missing)

1. **Approved Design Recipe** (`schemas/design-recipe.yaml` format): archetype, one variant per
   section, brand tokens with `token_source`, per-page schema/navigation decisions, third-party
   loading strategies. Invalid or `Draft` recipe → stop.
2. **Approved Homepage Messaging Pack** (`schemas/messaging-pack.yaml` format): the exact
   homepage copy. Missing/unapproved → the homepage cannot be built.
3. **Final Page Copy artifacts** (`schemas/final-page-copy.yaml` format) for every inner page in
   scope. A page without approved copy does not get built — no placeholder pages in production.
4. **Active Page Map**: which pages exist, their URLs, parent hubs, navigation inclusion.
5. **Site facts**: business name, approved DNI/tracking phone, locations (exact GBP NAP),
   services, service areas, social links — from the verified intake.
6. **Brand assets**: logo files, photos (in an intake/source folder, never used raw).

Never invent, improve, or "fill in" any of these. Missing input = blocker, not creativity. Missing
Final Page Copy is the most common temptation: NEVER write page copy at build time — hand
back to the Stage 4 copy sprint and keep building the pages whose approved copy exists.

## Build Procedure

### 1. Create the client project
Copy `starter/` to the client's own project/repo (e.g. `coastal-restoration-website`).
Exclude `node_modules`, `dist`, `.astro`. The starter's `src/pages/index.astro` is a
noindex DIRECTORY of the `/templates/` preview routes, not a homepage — replace it with the real
homepage in step 4. KEEP the `/templates/` preview routes (noindex approval surfaces). The
starter ships with `site.previewMode: true`, empty `cities`/`cityServiceContent`/`footerAreaLinks`,
and empty tracking/review/router IDs — every one of those is filled from the verified intake,
approved page map, and Copy Sprint artifacts, never invented. Run `npm install`; verify `npm run build` passes before changing anything.

### 2. Apply the theme — one file only
Paste the recipe's approved brand tokens into `src/styles/theme.css`. This is the ONLY file
that changes for branding. Never edit component files to restyle them for a client — if a
component looks wrong for this brand, that is a design-stage problem or a new-variant
proposal, not a build-stage patch. Fonts follow the recipe's hosting plan (self-hosted via
Fontsource packages or system stacks — §20; no remote font requests in production).

### 3. Fill shared site data
`src/data/site.ts`: name, legal name, `phoneDisplay` + `phoneHref` (approved DNI-capable
number ONLY — every phone action site-wide reads from here, §9), nav, services (from the page
map), claims WITH their claim states (§6), locations (exact GBP NAP, §13), social links,
footer blurb (from approved copy).

**Every customer-facing string in this file is placeholder wording and MUST be replaced from
the approved Messaging Pack** — including `footerCta.heading`/`footerCta.support`,
`stickyCtaLabel`, and `form.responseNotice`. These render in the shared shell, so on EVERY
page of the site. Shipping the starter's placeholder wording is how sites start reading as
mass-produced; treat leftover placeholder copy as a build blocker, not a cosmetic detail.
(`form.responseNotice` is also a real client commitment — confirm the response window.)

Shared UI microcopy is deliberately NOT per-client: field labels, `Send Service Request`,
`Request Service` button verbs, and `Learn More` stay consistent across all builds. Do not
"customize" those — consistency there is a feature, and rewriting them invents copy (§ Never Do).

### 4. Assemble the homepage
Compose `src/pages/index.astro` from the recipe's section order and variant selections, using
this registry (enum → starter component):

| Recipe enum | Component |
|---|---|
| `hero: image_backed_split_form` | `Hero.astro` (+ `RequestServicePanel` in its panel slot) |
| `hero: premium_full_bleed` | `HeroFullBleed.astro` (+ `RequestServicePanel` in the section after) |
| `proof_band: transition_strip` / emergency band | `EmergencyCTABand.astro` |
| `service_cards: image_overlay_grid` | `ServiceGrid.astro` |
| `service_cards: icon_plus_media_cards` | `ServiceGridIcons.astro` |
| `differentiator: dark_advantage_board` | `DifferentiatorVS.astro` |
| `process: dark_timeline_cards` | `ProcessSection.astro` |
| `process: numbered_connector_steps` | `ProcessStepper.astro` |
| `reviews: real_widget_stacked` | `ReviewSection.astro` with the client's widget snippet in the `widget` slot |
| `reviews: reserved_polished_state` | `ReviewSection.astro` with no slot (temporary only — must be replaced before launch, §16) |
| `service_area: map_with_county_accordions` | `ServiceAreaMap.astro` |
| `service_area: regional_service_explorer` | `RegionalServiceExplorer.astro` |
| `faq: premium_cards_sticky_intro` | `FAQSection.astro` |
| `final_cta: dark_phone_first_band` | `FinalCTA.astro` |
| footer / sticky CTA / header | inherited from `BaseLayout` — never mounted per page |

Every heading, bullet, and CTA label comes from the Messaging Pack. If the recipe names a
variant not in this registry, stop — do not approximate it with custom markup.

### 5. Generate the inner pages
For each page in the Active Page Map with approved Final Page Copy: create the route feeding
that copy into `templates/InnerPageTemplate.astro`. The copy artifact's structure maps
directly: H1/hero fields → template props; body sections in brief order in the default slot;
modules where the copy artifact says (`content-alert-list` → `ContentAlertList`,
`included-panel` → `IncludedPanel`, `inner-subsections` → `InnerSubsections`); the two
required `InlineCTA`s (after the first body section and closing the last narrative section —
both, always, §12); sidebar nav props from the page map (parent hub, related pages, core
hubs — the component enforces the caps); post-body sections per the recipe. §12 precedence:
if the page's approved copy already includes its own process section (most parent-hub briefs
do), OMIT the shared post-body process section on that page — post-body becomes
reviews → service area. A page never renders two process narratives.

Never reorder, drop, or reword the brief's heading structure (§ strict brief fidelity).
Do not create `/services/...` URLs for generated restoration pages — URLs come from the page
map exactly.

### 6. Images, third-party, tracking
Raw client images go to an intake/source folder; production references only optimized assets
(§18 — until the shared image components ship, pre-compress with Sharp and set explicit
width/height/alt). Every third-party script (reviews widget, map, chat, GA4, call tracking)
implements the loading strategy the recipe declares (§19) — no render-blocking noncritical
scripts. Tracking IDs come from intake; script presence is not proof events fire (QA verifies).

`/sitemap.xml`, `robots.txt`, and `/llms.txt` are generated automatically by `npm run build`
(`@astrojs/sitemap` + `postbuild.mjs`, §21) from `site.siteUrl` and `site.previewMode` — there is
nothing to author. llms.txt lists only routes that exist in the build and uses only approved copy
already in `site.ts`; never hand-write, edit, or hardcode a domain into any of the three.

### 7. Validate
FIRST: place the approved artifacts in `artifacts/` (messaging-pack.yaml,
design-recipe.yaml, active-page-map.yaml) — `npm run check` runs
`scripts/validate-artifacts.mjs` against them and FAILS the build on schema
violations, banned language, unbuilt variants, or unjustified deviations. Do
not proceed past a validator error; fix the artifact upstream.
 Then run, in order: `npm run check` (0 errors), `npm run build` (passes), `npm run
validate:built` (scans `dist/` for duplicate process narratives and §7 banned/placeholder
language — failures that only exist in the assembled pages), then self-checks on the
preview: no horizontal overflow at 375 and 1440; sticky mobile CTA hidden at top / visible
after scroll; every phone action uses the approved `tel:` source; rendered visible text
contains none of the §7 banned phrases; homepage copy matches the Messaging Pack verbatim.
Capture the §24 evidence set: mobile initial, mobile scrolled, desktop, tablet screenshots.

### 8. Hand off — never self-approve
Produce a `Build Summary`: pages built, variants used, validation results, known issues,
blockers, preview URL. Hand to the QA stage and the human. The builder's own checks are
necessary but NEVER sufficient — visual approval belongs to the reviewer/human (§24).

## Never Do

- Never build without the starter, or from a rejected/other client's implementation.
- Never write, reword, or "improve" customer-facing copy — not even a button label.
- Never restyle components per client; branding is `theme.css` + assets only.
- Never use arbitrary Tailwind values (`p-[13px]`, `text-[#hex]`) — tokens and scale only.
- Never add hand-drawn or third-party icon SVGs — Lucide via `<Icon name="lucide:…" />` only (§17).
- Never hand-code one-off forms, footers, CTAs, or navigation (§11, §17).
- Never render two process narratives on one page (§12 precedence — validate:built enforces).
- Never re-negotiate scope mid-build (depth tiers, sampling, "which pages matter?") — scope
  is the approved page map, built in page-map priority order. Capacity concerns go in the
  handoff summary while the build keeps going.
- Never wire header/mega-menu, footer, or service-area links to routes that aren't built
  yet — build targets before or with the nav entries pointing at them. `validate:built`
  fails every dead internal link (§15).
- Never ship a reserved review state when a real widget source exists (§16).
- Never publish links to city/city-service routes that don't exist (§15).
- Never mark the build approved, launch-ready, or "done" — that is QA's and the human's call.
- Never store secrets, API keys, or client credentials in the repo.
