/**
 * City-service content registry — the Copy Sprint's deliverable for city-service pages (§14).
 * One entry per approved city-service (hub, or hub + child), written ONCE with tokens and
 * interpolated across every approved city by pages/[citySlug]/[hub].astro + CityServicePage.
 * See ./city-services/types.ts for the shape, token list, and claim rules.
 * Empty in the starter; a client build adds one module per service hub under ./city-services/.
 */
export type { CityServiceContent, CitySection, CityFaq } from './city-services/types';
import type { CityServiceContent } from './city-services/types';

export const cityServiceContent: CityServiceContent[] = [];
