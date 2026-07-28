# Emergency Split Hero — Homepage Archetype

Status: Active — derived from live reference builds
Last updated: 2026-07-07
Evidence: live inspection of `https://www.romexterra.com/` (primary reference) and `https://www.greenstaterestoration.com/` (second worked example), 2026-07-07.

This is the approved homepage skeleton for restoration and urgent local-service clients. It was extracted from the two live agency builds, not invented. Both sites already follow it with different brands — proof that the structure carries the brand, not the other way around.

Shared contracts apply throughout: phone CTA (§9), sticky CTA (§10), forms (§11), service area (§15), reviews (§16), images (§18), third-party loading (§19), fonts (§20). This file defines composition — what each section looks like and why it works.

## Section Skeleton

Required sections, in order. `[optional]` modules have fixed insertion points and need intake/human justification to appear.

```text
 1. Utility strip          — thin dark bar: 3-4 proof chips with accent dot separators
 2. Header                 — logo · nav · phone CTA (dominant, №9) · request-service CTA (outline)
 3. Hero (split)           — left: eyebrow badge, display H1 with accent word, letterspaced
                             service list, 2x2 trust bullets, dual CTA, certification badge row
                             right: request-service form card with brand-color header
 4. Emergency CTA band     — high-contrast accent band: "Experiencing an emergency right now?"
                             + big phone CTA; diagonal-stripe or equivalent texture; pulse dot
 5. [optional] Intro       — short company intro, 1-2 paragraphs (Green State uses; Romexterra folds
                             this into the hero eyebrow/trust content)
 6. Services grid          — eyebrow + H2 + intro copy, then rich cards: real photo panel with
                             residential/commercial chips, bold title, 2-3 line description,
                             accent "Learn More →". 3-column grid, 5-7 cards.
 7. Differentiator (VS)    — dark section. Two-panel comparison: muted left panel "what property
                             owners often run into" with ✗ rows VS raised light card with brand
                             logo header and green ✓ rows. A designed module, never a bullet list.
 8. Process                — dark section, dimmed real-photo background (branded trucks/crew).
                             Eyebrow + H2 + one-line promise. 3 numbered cards with connector
                             arrows/animation between steps (hidden on mobile, reduced-motion safe).
 9. [optional] Insurance   — dark band: "We work with all major insurance companies" + white logo
                             cards + "All others accepted" chip. Only with verified carrier logos
                             (§6 badge_asset_required).
10. Reviews                — light section. Eyebrow + H2 (locality claim only if verified),
                             then REAL widget full row width below the copy (§16): per-source rating
                             tabs, overall rating, review cards.
11. [optional] Video       — customer video testimonial cards + "view all" (Romexterra).
12. [optional] Commercial  — property-type cards (office/retail, industrial, multifamily,
                             insurance documentation) for clients with commercial mix.
13. Service area           — "Where we work" + H2. Real Leaflet map with shaded service polygon
                             (dark-themed tiles on dark sections) beside/above expandable
                             city/county rows with per-city service links (§15). Caption labels
                             the shaded area.
14. FAQ                    — centered eyebrow + H2 + reassurance line. Accordion cards; open item
                             gets accent border; first item answers the 24/7 question with the
                             phone number inline.
15. [optional] Social      — first-party profile cards (YouTube/TikTok/Instagram/Facebook):
                             platform icon tile, eyebrow, title, 2-line description, arrow link.
                             Outbound links only — no embedded feeds without approval (§19).
16. Final CTA              — dark, urgency-led: "Don't wait — damage gets worse every hour" pattern,
                             phone-first CTA with number visible (§9), secondary request CTA.
17. Footer                 — full NAP/location cards, service links, service-area links, company
                             links, approved social links (§13 NAP exactness applies).
18. Sticky mobile CTA      — shared shell component (§10).
```

Section rhythm rule: alternate dark / light / accent deliberately. Romexterra runs `dark hero → accent band → white services → dark VS+process → light reviews → dark commercial-adjacent → light FAQ → dark final CTA`. Thin accent-colored borders (2-3px) separate dark sections from each other. Never two identical treatments back to back; never more than two dark sections in a row.

## Composition Rules Observed From The References

These are the specific moves that make the references feel premium. Components must bake these in.

Hero:

- H1 is 3-4 controlled lines of condensed 700-900 display type, one line rendered in the accent color (`Chicago's / Most Trusted / **Restoration** / Company`). Line groups are explicit markup (§24).
- Above the H1: a small eyebrow badge with star icon + one-line positioning claim + "since {year}" when verified.
- Directly under the H1: a letterspaced all-caps service list separated by dots (`WATER · FIRE · MOLD · STORM · BIOHAZARD · RECONSTRUCTION`) in muted color.
- Trust bullets: 2x2 grid, accent-colored check circles, 4-6 short verified facts.
- CTA row: filled accent phone button (number visible) + outline request-service button.
- Below CTAs: certification badge row (BBB, IICRC) — only with verified assets (§6).
- Right form card: brand-color header block with "Request Service" + expectation copy ("Non-emergency requests are returned within one business day"), emergency callout box with phone link above the fields (§11 field set), accent full-width submit with arrow.
- Hero background: near-black with subtle texture (grid/photo), not flat black, not a bright photo.

Cards (services, FAQ, social, property types):

- White cards on light sections, `--radius-md` corners, subtle border + shadow, real photo panels with small metadata chips, generous padding, accent link with arrow.
- Never text-only gray boxes. Every card has an image, icon tile, or designed number.

Dark sections:

- Use the 3-step dark scale (base / raised / borders), not one flat black.
- Photo backgrounds are real company photos dimmed to ~20-30% with the dark base.
- White display headings; body copy at high-contrast light gray — never muted gray below readability (§24).

## What Varies Per Client (anti-cookie-cutter layer)

- All brand tokens (see `DESIGN_TOKENS.md`): accent ramp, dark scale temperature, surface tints, fonts.
- Photography: client's real trucks, crews, jobs — this changes the feel more than any layout choice.
- Optional modules on/off and their order within the allowed insertion points (Green State: reviews before process, insurance band, social; Romexterra: videos, commercial, community, partners).
- Section treatments within the variant registry (`schemas/design-recipe.yaml`).
- Copy voice via the Messaging Pack.
- Icon style, texture treatments, card accents.

What never varies without approval: phone-first CTA hierarchy, form placement in hero, proof near conversion points, the fixed insertion-point skeleton, mobile call path (§8-§10).

## How Two Clients Avoid Looking Alike

Differentiation is layered. Each layer is applied per client by the design recipe:

1. **Content shape** — step counts (3-5), card counts, chips on/off, which optional modules appear, section order within the allowed insertion points.
2. **Variant selection** — each section has structurally different designs to choose from (see the registry in `schemas/design-recipe.yaml`). A client on `premium_full_bleed` + `numbered_connector_steps` + `icon_plus_media_cards` + `regional_service_explorer` produces a visibly different page from one on `image_backed_split_form` + `dark_timeline_cards` + `image_overlay_grid` + `map_with_county_accordions` — different bones, not just different paint.
3. **Brand tokens** — accent ramp, dark-scale temperature, surface tints, fonts (`DESIGN_TOKENS.md`).
4. **Photography and copy** — the client's real jobs/crews and their own Messaging Pack wording.

Worked demo of layers 1-4 applied together: `starter/src/pages/index.astro` (variant set A, red tokens) vs. `starter/src/pages/demo-client-b.astro` (variant set B, green tokens).

Catalog rule: the differentiation is only as deep as the variant catalog. Keep adding variants as real client needs surface — each approved exception becomes a reusable variant, so the catalog compounds instead of producing one-off client code.

## Worked Examples

| Slot | Romexterra (Chicago) | Green State (Seattle) |
|---|---|---|
| Accent | Red ramp `#cc2a2a / #a82020 / #e03535` | Green ramp `#3aa156 / #2f8b49`, deep `#21472a` |
| Dark scale | `#0c0f14 / #141820 / #1e2530` (cool) | `#111613 / #2a332d` (green-tinted ink) |
| Light surfaces | Warm `#f5f2ee`, gray ramp 50-800 | Green-tinted `#f4f7f1 / #e7eee4` |
| Display font | Barlow Condensed 600/700 (self-hosted WOFF2) | Helvetica Neue Condensed Bold stack (system) |
| Body font | Barlow 400-700 (self-hosted WOFF2) | Avenir Next / Segoe UI stack (system) |
| Optional modules | videos, commercial, community, partners, social | intro, insurance, social |
| Secondary color | Blue `#1b5e8a` (informational accents) | Charcoal/gray `#3f3f3f / #5c5c5c` |

Same skeleton, visibly different sites. This is the standard the starter components must reproduce by default.
