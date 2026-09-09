/**
 * City-service page content registry.
 *
 * City-service pages are generated from the entries here × every approved city. Writing them as
 * individual files would be unmaintainable and would guarantee drift; the content lives once per
 * service and the city variables are interpolated at render.
 *
 * TOKENS available in every string — the renderer substitutes them:
 *   {city}    → "Irving"
 *   {county}  → "Dallas"
 *   {near}    → "Coppell, Carrollton, Grand Prairie"
 *   {zone}    → honest response-framing sentence for that city's geographic zone
 *
 * CLAIM RULES (CORE_CONTRACTS §6) — same as every other page on this site:
 *   · Never say insurance will cover / pay / approve. Document only; carrier decides.
 *   · Never guarantee an outcome, never say "mold free", never give a dollar figure.
 *   · No medical claims. No licences beyond IICRC.
 *   · Only link URLs that exist.
 */
export interface CitySubsection { h3: string; body: string[] }
export interface CitySection {
  h2: string;
  body: string[];
  /** Optional H3 subsections, where the master brief's outline specifies them. */
  subsections?: CitySubsection[];
}
export interface CityFaq { q: string; a: string }

export interface CityServiceContent {
  /** URL segment(s). hub only for a category page; hub + child for a service page. */
  hub: string;
  child?: string;
  /** Display name, e.g. "Water Extraction". */
  name: string;
  /** H1. Must contain {city} and end ", TX". */
  h1: string;
  /** One-line hero intro. */
  heroIntro: string;
  /** Meta description, under ~155 chars once {city} resolves. */
  metaDescription: string;
  /** First H2 — must contain {city} per the local-SEO heading rule. */
  openingH2: string;
  /** Opening body paragraphs, under the first H2. */
  opening: string[];
  /** Further sections, following the master brief's H2 sequence and order. */
  sections: CitySection[];
  /** FAQs from the master brief. Answers may contain <a href> to EXISTING pages only. */
  faqs: CityFaq[];
  /** Closing paragraph before the final CTA. */
  closing: string;
}

