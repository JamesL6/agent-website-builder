/**
 * Shared site data — single source for phone/DNI, NAP, navigation, and claims-bearing values.
 * Every component reads from here; nothing hard-codes a phone number or address (§9, §22).
 * Values below are realistic placeholders for the template preview routes ONLY (§17).
 */
export const site = {
  name: 'Example Restoration Co.',
  legalName: 'Example Restoration Company LLC',
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
  /** NAP cards — must match approved GBP data exactly on real builds (§13). */
  locations: [
    {
      name: 'Example City Office',
      address: '123 Placeholder Ave, Example City, ST 00000',
      phone: '(555) 000-1234',
    },
  ] as { name: string; address: string; phone: string; gbpUrl?: string }[],
  footerBlurb:
    'Emergency restoration for homes and businesses across the Example City area — mitigation through rebuild, one call.',
};

export type Site = typeof site;
