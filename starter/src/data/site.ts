/**
 * Shared site data — single source for phone/DNI, NAP, navigation, and claims-bearing values.
 * Every component reads from here; nothing hard-codes a phone number or address (§9, §22).
 * Values below are realistic example data for the template preview routes ONLY (§17).
 * A client build (Rule Zero) fills this file from the verified intake + approved copy artifacts —
 * it is THE per-client swap point together with theme.css.
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
  /**
   * Header utility links and footer legal links — the shell reads these, never hardcodes them.
   * A client without one of these pages REMOVES the entry (no dead links, §15); the operational
   * page templates under components/templates/ build the pages themselves.
   */
  utilityNav: [
    { id: 'about', label: 'About', url: '/about/' },
    { id: 'reviews', label: 'Reviews', url: '/reviews/' },
    { id: 'contact', label: 'Contact', url: '/contact/' },
  ],
  legalLinks: [
    { label: 'Privacy Policy', url: '/privacy-policy/' },
    { label: 'Terms', url: '/terms/' },
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
      address: '123 Example Ave, Example City, ST 00000',
      phone: '(555) 000-1234',
      gbpUrl: 'https://maps.google.com/?q=Example+Restoration+Example+City',
      hours: 'Open 24 hours',
      lat: 41.8781,
      lng: -87.6298,
    },
    {
      name: 'Example Restoration Co. of Northtown',
      address: '456 Sample Street, Northtown, ST 00001',
      phone: '(555) 000-5678',
      gbpUrl: 'https://maps.google.com/?q=Example+Restoration+Northtown',
      hours: 'Open 24 hours',
      lat: 42.0451,
      lng: -87.6877,
    },
    {
      name: 'Example Restoration Co. of Southville',
      address: '789 Example Blvd, Southville, ST 00002',
      phone: '(555) 000-9012',
      hours: 'Open 24 hours',
      lat: 41.6,
      lng: -87.85,
    },
  ] as {
    name: string;
    address: string;
    phone: string;
    gbpUrl?: string;
    hours?: string;
    /**
     * Map pin coordinates for this location, from its Google Business Profile.
     * The service-area map renders markers ONLY from this array — the same
     * source the footer NAP cards and LocalBusiness schema use — so pins,
     * printed addresses, and structured data cannot drift apart (§15, §22).
     * A location without coords renders no pin (and is a QA flag, not a guess).
     */
    lat?: number;
    lng?: number;
  }[],
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
  // ---------------------------------------------------------------- launch + platform config

  /**
   * PRE-LAUNCH SWITCH (§17). While true, every page emits <meta name="robots" content="noindex,nofollow">
   * and postbuild writes a Disallow-all robots.txt. Launch = set false, rebuild, and pass
   * `npm run validate:launch`. /templates/ routes pass noindex explicitly and stay noindex regardless.
   */
  previewMode: true,
  /** Production origin — canonical URLs, sitemap, robots, and schema all derive from it (§21, §22). No trailing slash. */
  siteUrl: 'https://example.com',
  /** Full state + regional label used by schema areaServed (§22). */
  stateName: 'Example State',
  regionName: 'Example City metro area',
  /** City-hub links for the footer areas band — from the approved page map's city hubs (§15). */
  footerAreaLinks: [] as { label: string; url: string }[],
  /** LeadConnector DNI scripts (§9). Empty = not loaded. */
  callTracking: { numberPoolUrl: '', userSessionUrl: '' },
  /** Review widget IDs per placement (§16). Empty = ReviewSection renders its reserved state — must be real before launch. */
  reviews: { homepage: '', inner: '', reviewsPage: '' },
  /** GTM preferred; GA4 only when not using GTM. Empty = nothing loads. */
  analytics: { gtmId: '', ga4Id: '' },
  /**
   * Agency lead router (§11). submitUrl is agency infrastructure shared by every client;
   * clientId / siteId / turnstileSiteKey are per client and stay EMPTY until the router row exists.
   * RequestServicePanel disables the form until submitUrl + clientId are set — an unconfigured
   * router fails loudly instead of swallowing leads.
   */
  leadRouter: {
    submitUrl: 'https://agency-lead-router-production.login-cce.workers.dev/submit',
    clientId: '',
    siteId: '',
    turnstileSiteKey: '',
  },
};

export type Site = typeof site;
