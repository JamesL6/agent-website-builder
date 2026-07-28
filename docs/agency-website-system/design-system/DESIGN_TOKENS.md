# Design Token Contract

Status: Active
Last updated: 2026-07-07

Every client site is the same component library wearing a different token set. This file defines the token slots, how they map to Tailwind v4, and the rules for filling them. The two live reference builds are the worked examples (see `EMERGENCY_SPLIT_HERO_ARCHETYPE.md` for the full comparison table).

## Token Slots

Every client theme must fill all slots. Slots, not values, are the contract.

```css
/* starter/src/styles/theme.css — Tailwind v4 @theme block, one file per client */
@theme {
  /* Brand accent — the conversion color (CTAs, checks, accents, borders) */
  --color-accent: #cc2a2a;          /* Romexterra red; Green State: #3aa156 */
  --color-accent-hover: #a82020;    /* darker pressed/hover state */
  --color-accent-bright: #e03535;   /* lighter variant for text on dark */

  /* Secondary brand color — informational accents, links on light */
  --color-brand-2: #1b5e8a;         /* Green State: #21472a */

  /* Dark scale — 3 steps minimum; tint toward the brand temperature */
  --color-dark: #0c0f14;            /* section base */
  --color-dark-2: #141820;          /* raised cards/panels on dark */
  --color-dark-3: #1e2530;          /* borders/highest layer on dark */

  /* Light surfaces — tinted, never pure gray */
  --color-surface: #f5f2ee;         /* section background */
  --color-surface-2: #f0ede8;       /* cards/panels on surface */
  --color-border: #e2ddd6;

  /* Text */
  --color-ink: #2e2a26;             /* body on light */
  --color-ink-muted: #5a534c;       /* secondary on light — must pass AA on surface */
  --color-on-dark: #f5f2ee;         /* body on dark — high contrast, never mid-gray (§24) */

  /* Type — condensed display + readable body is the house pairing */
  --font-display: "Barlow Condensed", sans-serif;   /* headings 600-800 */
  --font-body: "Barlow", sans-serif;                /* body 400/500, UI 600/700 */

  /* Depth and shape */
  --shadow-sm: 0 1px 3px rgb(0 0 0 / 0.12);
  --shadow-md: 0 4px 16px rgb(0 0 0 / 0.14);
  --shadow-lg: 0 8px 32px rgb(0 0 0 / 0.18);
  --shadow-xl: 0 16px 60px rgb(0 0 0 / 0.25);
  --radius-sm: 4px;
  --radius-md: 8px;

  /* Motion */
  --transition-base: 0.22s ease;
}
```

## Rules

- **Fonts** follow §20: self-hosted WOFF2 (Romexterra pattern: 8 faces, weights actually used only) or system stacks (Green State pattern). The house pairing is a bold condensed display font over a clean readable sans — both references converge on it independently. Deviate only with brand justification in the design recipe.
- **Dark scale temperature follows the brand**: Romexterra's darks are cool blue-black; Green State's are green-tinted ink. Never flat `#000`, never an untinted gray ramp.
- **Light surfaces are tinted** toward the brand (warm cream vs green-tinted off-white in the references). Pure `#fff` is for cards on surfaces, not section backgrounds.
- **Accent needs all three states** (base/hover/bright-on-dark). Logo-derived accents are marked `Needs Human Approval` (design agent spec).
- **Contrast**: `--color-ink-muted` on `--color-surface` and `--color-on-dark` on `--color-dark` must pass WCAG AA. This is checked in QA (§24) — muted-on-dark failures were the single most repeated Green State feedback item.
- **Tailwind discipline**: arbitrary values (`p-[13px]`, `text-[#ff0000]`) are banned in components — everything comes off the token scale or Tailwind's default spacing/type scale. Enforced by lint in the starter.

## Per-Client Workflow

1. Design agent fills the slot table in the design recipe (`brand.tokens`), marking `token_source`.
2. Build agent copies `theme.css` from the starter, replaces slot values, and touches nothing else.
3. QA validates contrast pairs and that no component overrides tokens locally.

Changing a client's entire look = editing one file. That is the point.
