# Fresh Homepage Rebuild Prompt

Use this prompt in the Green State Restoration Codex project.

```text
We need to restart the Green State Restoration homepage from scratch.

Do not continue the current homepage. Do not create UI kits. Do not create text-only mockups. Do not reuse the rejected homepage composition, rejected UI-kit route, rejected standalone preview, oversized typography, weak spacing, placeholder proof modules, or sitemap-like card layouts.

Use the agency system and skills exactly:

1. Read `/Users/jameslarosa/.agents/skills/agency-website-design-builder/SKILL.md`.
2. Use `Fresh Homepage Rebuild Mode`.
3. Read `docs/agency-website-system/CURRENT_BUILD_STATE.md`.
4. Read `docs/design/GREEN_STATE_RESTORATION_ASTRO_HOMEPAGE_DESIGN_BRIEF.md`.
5. Read `docs/agency-website-system/AGENCY_WEBSITE_AGENT_EXECUTION_SPECS.md`.
6. Read the source docs:
   - `docs/client-intake/CLIENT_INTAKE_SOURCE_EXTRACT.md`
   - `docs/client-intake/BRAND_GUIDELINES_SOURCE_EXTRACT.md`
   - `docs/client-intake/ACTIVE_PAGE_MAP_RECOMMENDATION.md`
   - `docs/client-intake/SERVICE_PAGE_BRIEF_INVENTORY.md`

The homepage route and rejected visual files were intentionally removed. Rebuild a new Astro homepage from a clean route:

- Create a new `src/pages/index.astro`.
- Create or replace the needed layout, components, and CSS.
- Keep `src/data/site.ts` only as a reusable data source, and verify important facts against the docs before using them.
- Build in Astro, not standalone HTML/CSS.

Design target:

- Premium emergency restoration company website for Seattle / Western Washington.
- Romexterra-level visual depth, but do not copy Romexterra's brand, exact layout, copy, badges, or proof.
- Use the Green State brand palette from the brand PDF: `#3F3F3F`, `#5C5C5C`, `#3AA156`, `#21472A`.
- Do not use neon yellow/lime or unrelated emergency colors unless explicitly approved.
- Use strong, readable typography. No clipped mobile H1. No oversized sparse hero.
- Phone-first conversion is the priority.

Required homepage structure:

- Premium header with logo, nav, phone CTA, and request-service CTA.
- Strong hero with H1, subhead, call-now CTA, request-service CTA, 4-6 verified-safe trust bullets, and a substantial request-service panel/form.
- Near-hero emergency/proof band using only verified-safe claims.
- Short company intro.
- Rich main service cards for the approved restoration service groups.
- Three-step process section.
- Designed why-choose/differentiator section.
- Proof/review section with a polished reserved state unless a real widget/source is verified.
- Service-area/map section for Snohomish, King, Whatcom, Skagit, Island, and San Juan Counties.
- FAQ section.
- Large phone-first final CTA.
- Complete footer with service links, service-area links, company/contact links, and candidate NAP/location cards.

Mobile sticky CTA:

- Must be implemented from a shared layout/shell component, not only the homepage.
- Hidden while the hero is in view.
- Visible after scrolling past the hero.
- Uses a `tel:` call button from the approved/current candidate phone source.
- Must not create horizontal overflow or cover forms/footer content.

Claims rules:

- Do not invent ratings, review counts, testimonials, certifications, badges, response times, insurance approvals, guarantees, or direct billing promises.
- Do not show certification/review/response-time proof unless the source docs verify it.
- Keep form routing/tracking non-final unless verified.

After implementation:

- Run `npm run check`.
- Run `npm run build`.
- Start the local dev server.
- Capture/inspect screenshots:
  - Desktop `1440x1100`
  - Tablet `1024x900`
  - Mobile initial `390x844`
  - Mobile scrolled `390x844`
- Verify no horizontal overflow.
- Verify sticky CTA is hidden in the hero and visible after hero scroll.
- Report exactly what files changed, what QA passed, and what still needs human approval.

Do not call the homepage done if any Premium Visual Acceptance Rubric area is `Fail`.
```
