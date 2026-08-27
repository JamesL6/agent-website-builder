/**
 * Shared site data — single source for phone/DNI, NAP, navigation, and claims-bearing values.
 * Every component reads from here; nothing hard-codes a phone number or address (§9, §22).
 * Values below are realistic placeholders for the template preview routes ONLY (§17).
 */
export const site = {
  name: 'Example Restoration Co.',
  legalName: 'Example Restoration Company LLC',
  /**
   * Display format is FUNCTIONAL, not cosmetic (§9): the call-tracking swapper
   * matches numbers by pattern, and `(555) 000-1234` is a recognized format.
   * A number formatted any other way (e.g. `555 000 1234`) is silently skipped
   * and that CTA loses call attribution. Keep this shape.
   */
  phoneDisplay: '(555) 000-1234',
  /** Approved tracking/DNI-capable tel: source — QA fails any other phone href (§9). */
  phoneHref: 'tel:+15550001234',
  emergencyAvailability: '24/7',
  primaryMarket: 'Example City',
  stateAbbr: 'ST',
  /** Claims rendered anywhere must exist here with a claim state (§6). */
  claims: [
    { text: '24/7 Emergency Service', state: 'visible_preview_allowed' },
    { text: 'Free Estimates', state: 'visible_preview_allowed' },
    { text: 'Locally Owned & Operated', state: 'visible_preview_allowed' },
    { text: 'Licensed & Insured', state: 'launch_proof_required' },
  ],
  services: [
    { id: 'water-damage-restoration', label: 'Water Damage Restoration', url: '/water-damage-restoration/' },
    { id: 'fire-damage-restoration', label: 'Fire Damage Restoration', url: '/fire-damage-restoration/' },
    { id: 'mold-remediation', label: 'Mold Remediation', url: '/mold-remediation/' },
  ],
  nav: [
    { label: 'Home', url: '/' },
    { label: 'Services', url: '/#services' },
    { label: 'Service Areas', url: '/#areas' },
    { label: 'Reviews', url: '/#reviews' },
    { label: 'Contact', url: '/contact/' },
  ],
  socialLinks: [] as { platform: string; url: string }[],
  /** Public contact email — shown on the contact page. */
  email: 'info@example-restoration.com',

  /**
   * NAP cards — must match approved GBP data EXACTLY on real builds (§13):
   * business name, address, and phone as they appear on the Google Business
   * Profile, per location. Every approved GBP location must be listed.
   */
  locations: [
    {
      name: 'Example Restoration Co. of Example City',
      address: '123 Placeholder Ave, Example City, ST 00000',
      phone: '(555) 000-1234',
      gbpUrl: 'https://maps.google.com/?q=Example+Restoration+Example+City',
      hours: 'Open 24 hours',
    },
    {
      name: 'Example Restoration Co. of Northtown',
      address: '456 Sample Street, Northtown, ST 00001',
      phone: '(555) 000-5678',
      gbpUrl: 'https://maps.google.com/?q=Example+Restoration+Northtown',
      hours: 'Open 24 hours',
    },
    {
      name: 'Example Restoration Co. of Southville',
      address: '789 Placeholder Blvd, Southville, ST 00002',
      phone: '(555) 000-9012',
      hours: 'Open 24 hours',
    },
  ] as { name: string; address: string; phone: string; gbpUrl?: string; hours?: string }[],
  footerBlurb:
    'Emergency restoration for homes and businesses across the Example City area — mitigation through rebuild, one call.',

  /**
   * ---------------------------------------------------------------------------
   * SITE-WIDE CUSTOMER-FACING COPY — REPLACE EVERY VALUE BELOW PER CLIENT.
   * ---------------------------------------------------------------------------
   * These strings appear in the shared shell (footer, sticky CTA, lead form), so
   * they render on EVERY page. They live here — in the per-client data file the
   * build agent must fill (§ build procedure step 3) — and deliberately NOT as
   * component defaults: a component default would let a build silently ship this
   * placeholder wording to a real client, which is exactly how sites start
   * reading as mass-produced. Source: the approved Homepage Messaging Pack.
   */
  footerCta: {
    heading: 'Talk to a restoration crew now',
    support:
      "Damage spreads by the hour. Call and a real person answers — or send the form and we'll respond within one business day.",
  },

  /**
   * Site-wide reusable SECTIONS. These render identically on the homepage and on
   * every inner page (owner decision 2026-08-25: "needs to be the same as the
   * home page… we'll reuse that"), so their content lives here once instead of
   * being re-passed per page — which is how two pages drift out of sync.
   * The design recipe picks ONE process variant and ONE service-area variant per
   * client; every page then uses that same choice.
   */
  process: {
    eyebrow: 'Simple process',
    heading: 'What happens after you call',
    support:
      "We've made the process simple. One call, and we handle everything — from the first response to the final nail.",
    steps: [
      { title: 'Call anytime, day or night', text: 'Tell us what happened. A real person answers, asks the right questions, and gets a crew moving.' },
      { title: 'Assess & stabilize', text: 'We stop the damage from spreading, document everything for your claim, and walk you through the plan.' },
      { title: 'Restore & rebuild', text: 'From cleanup through reconstruction, one team carries your property back to normal.' },
    ],
  },

  serviceArea: {
    eyebrow: 'Where we work',
    heading: 'Serving Example City and Surrounding Communities',
    intro: 'Fast emergency response across our core service area. Click any city to explore dedicated service pages.',
    caption: 'Shaded service area — Example City metro',
    mapCenter: [41.85, -87.75] as [number, number],
    mapZoom: 9,
    polygon: [
      [42.15, -88.2],
      [42.2, -87.7],
      [41.85, -87.55],
      [41.5, -87.8],
      [41.6, -88.25],
    ] as [number, number][],
    /** Counties → city hubs → approved city-service pages (from the page map). */
    counties: [
      {
        name: 'Example County',
        cities: [
          {
            name: 'Example City',
            url: '/service-areas/example-city/',
            services: [
              { label: 'Example City Water Damage Restoration', url: '/service-areas/example-city/water-damage-restoration/' },
              { label: 'Example City Fire Damage Restoration', url: '/service-areas/example-city/fire-damage-restoration/' },
              { label: 'Example City Mold Remediation', url: '/service-areas/example-city/mold-remediation/' },
              { label: 'Example City Reconstruction', url: '/service-areas/example-city/reconstruction/' },
            ],
          },
          {
            name: 'Northtown',
            url: '/service-areas/northtown/',
            services: [
              { label: 'Northtown Water Damage Restoration', url: '/service-areas/northtown/water-damage-restoration/' },
              { label: 'Northtown Fire Damage Restoration', url: '/service-areas/northtown/fire-damage-restoration/' },
              { label: 'Northtown Mold Remediation', url: '/service-areas/northtown/mold-remediation/' },
            ],
          },
          { name: 'Southville', url: '/service-areas/southville/' },
        ],
      },
      {
        name: 'Neighbor County',
        cities: [{ name: 'Easton' }, { name: 'Westfield' }, { name: 'Lakeside' }],
      },
    ],
  },
  form: {
    /** Response-time promise: a real client commitment — confirm before shipping. */
    responseNotice: 'Non-emergency requests are returned within one business day.',
    emergencyNoticeLead: 'Currently experiencing an emergency?',
  },
};

export type Site = typeof site;
