/**
 * City hub data + city-hub copy — the Copy Sprint's deliverable for city pages (§14).
 *
 * `cities`: every APPROVED service-area city from the Active Page Map. Every field is factual and
 * verifiable: county, geographic zone relative to the client's base, and neighbouring cities that
 * are ALSO in the approved service area. Nothing invented — no landmarks, no local-colour filler.
 *
 * `cityHubCopy`: the customer-facing copy for the generated city hub pages (pages/[citySlug].astro),
 * written ONCE with tokens and interpolated per city. Tokens: {city} {county} {state} {near} {zone} {an}.
 * The values below are template examples — a client build replaces them with approved copy.
 */
export interface City {
  slug: string;
  name: string;
  county: string;
  /** Geographic position relative to the client's base — drives honest response framing (zoneCopy). */
  zone: 'home' | 'near' | 'outer';
  /** Other APPROVED service-area cities nearby (by name). Real internal-link routing value. */
  near: string[];
}

/** Empty in the starter. A client build fills this from the approved page map. */
export const cities: City[] = [];

/** Honest response framing per zone — never a promised arrival window. */
export const zoneCopy: Record<City['zone'], string> = {
  home: 'Our crews are based here, so dispatch is a short drive rather than a cross-metro run.',
  near: 'This is close to our base, so it is among the faster areas for us to reach; we will give you a realistic arrival window on the phone.',
  outer: 'This is the outer part of our coverage area. We serve it fully, and we will be straight with you about timing rather than promising a window we cannot hold.',
};

export interface CityHubCopy {
  title: string;
  metaDescription: string;
  h1: string;
  heroIntro: string;
  serviceAreasLabel: string;
  serviceAreasUrl: string;
  openingH2: string;
  opening: string[];
  emergencyCta: { heading: string; support: string };
  handleH2: string;
  handleIntro: string;
  /** Keyed by service id (site.services[].id). One-sentence summary that routes deeper. */
  serviceSummaries: Record<string, string>;
  serviceSummaryFallback: string;
  everyServiceH2: string;
  everyServiceIntro: string;
  whyH2: string;
  why: string[];
  nearbyH2: string;
  nearbyIntro: string;
  /** Extra token: {nearCity}. */
  nearbyLinkLabel: string;
  closingH2: string;
  closing: string;
  closingCta: { heading: string; support: string };
  reviews: { eyebrow: string; heading: string; intro: string };
  faq: { eyebrow: string; heading: string; support: string; items: { q: string; a: string }[] };
}

export const cityHubCopy: CityHubCopy = {
  title: 'Restoration Services in {city}, {state} | Example Restoration Co.',
  metaDescription: 'Water, fire, and mold restoration for {city}, {state} homes and businesses, with the rebuild afterwards. Call any time.',
  h1: 'Restoration Services in {city}, {state}',
  heroIntro: 'Water, fire, and mold damage handled for {city} homes and businesses — with the rebuild afterwards.',
  serviceAreasLabel: 'All service areas',
  serviceAreasUrl: '/service-area/',
  openingH2: 'Restoration and Cleanup for {city}, {county} County',
  opening: [
    'We handle water, fire, and mold damage for property owners in {city} and across {county} County, and we rebuild what the damage took out. A real person answers the phone whenever you call.',
  ],
  emergencyCta: {
    heading: 'Damage at {an} {city} property right now?',
    support: 'Call and a real person answers. We can dispatch a crew from that call.',
  },
  handleH2: 'What We Handle in {city}',
  handleIntro: 'Each service is covered in full on its own page — the summaries below point you at the right one.',
  serviceSummaries: {
    'water-damage-restoration': 'Burst pipes, appliance leaks, flooding, and hidden moisture. Extraction, structural drying, and moisture verification, documented throughout.',
    'fire-damage-restoration': 'Fire cleanup, smoke and soot removal, odor treatment, and the water left behind by firefighting.',
    'mold-remediation': 'Containment, HEPA filtration, controlled removal, and moisture correction — starting with what is keeping the material wet.',
  },
  serviceSummaryFallback: 'Covered in full on its own {city} page, with what the work involves and what we document along the way.',
  everyServiceH2: 'Every Service We Offer in {city}, {state}',
  everyServiceIntro: 'Each of these has its own {city} page covering what the work involves here and what we document along the way.',
  whyH2: 'Why {city} Property Owners Call Us',
  why: [
    'We document from the first visit — photographs before anything is moved, moisture readings across the drying period, and an itemised scope. That record is what your insurer works from. What we will not do is tell you what your policy covers; that decision belongs to your carrier.',
  ],
  nearbyH2: 'Nearby Areas We Also Serve',
  nearbyIntro: 'Our {city} crews also cover {near}. If your property sits between two of these, call and we will tell you straight whether we can reach you and how quickly.',
  nearbyLinkLabel: 'Restoration services in {nearCity}, {state}',
  closingH2: 'Get Help in {city}, {state}',
  closing: 'Whether it is water spreading right now, smoke damage after a fire, or mold you have just found, we will come and look and give you a straight account of what it involves.',
  closingCta: {
    heading: 'Book an inspection in {city}',
    support: 'Call to speak to someone now, or send the form and we will respond within one business day.',
  },
  reviews: {
    eyebrow: 'What our customers say',
    heading: 'What our customers say',
    intro: 'Most of our work comes from referrals and repeat customers.',
  },
  faq: {
    eyebrow: 'Common questions',
    heading: 'Restoration in {city} — Common Questions',
    support: 'Still have questions? Call any time.',
    items: [
      { q: 'Do you actually serve {city}?', a: 'Yes — {city} is inside our approved service area in {county} County, along with {near}.' },
      { q: 'How quickly can you get to {an} {city} property?', a: '{zone} Call and we will give you a realistic arrival window rather than an optimistic one.' },
      { q: 'Will my insurance cover it?', a: 'That depends on your policy and the cause of loss, and it is a decision for your carrier rather than for us. What we do is document the loss thoroughly so your claim is supported — photographs, moisture readings, and an itemised scope.' },
    ],
  },
};
