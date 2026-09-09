#!/usr/bin/env node
/**
 * Post-build — CORE_CONTRACTS §21: /sitemap.xml, robots.txt, and /llms.txt.
 *
 * All three are DERIVED from the finished build and from src/data/site.ts, so they cannot drift
 * from what actually shipped. Runs automatically inside `npm run build`; a client build configures
 * NOTHING here — `site.siteUrl` and `site.previewMode` drive everything.
 *
 * - @astrojs/sitemap emits sitemap-index.xml; §21 requires /sitemap.xml itself to be a REAL XML
 *   endpoint (never a redirect shell or meta-refresh page), so the index is copied to /sitemap.xml.
 * - robots.txt follows site.previewMode: Disallow-all pre-launch; Allow + Disallow /templates/ live.
 * - /llms.txt (llmstxt.org format): business facts from site.ts — approved copy only, never
 *   invented — and links ONLY to routes that exist in dist/, discovered after the build.
 */
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { site } from './src/data/site.ts';
import { cities } from './src/data/cities.ts';

const dist = 'dist';
const index = join(dist, 'sitemap-index.xml');
if (!existsSync(index)) {
  console.error('[postbuild] FAIL: sitemap-index.xml missing — did the sitemap integration run? (astro.config `site` must be set)');
  process.exit(1);
}
// Origin: site.siteUrl, else the origin the sitemap was built with (astro.config `site`).
const ORIGIN = (
  site.siteUrl ?? readFileSync(index, 'utf8').match(/<loc>(https?:\/\/[^/<]+)/)?.[1] ?? 'https://example.com'
).replace(/\/$/, '');

// --- §21: /sitemap.xml as a real XML file --------------------------------------------------
writeFileSync(join(dist, 'sitemap.xml'), readFileSync(index));
const children = readdirSync(dist).filter((f) => /^sitemap-\d+\.xml$/.test(f));
const urls = children.reduce(
  (n, f) => n + (readFileSync(join(dist, f), 'utf8').match(/<loc>/g) ?? []).length,
  0,
);

// --- robots.txt, from the same single launch switch the pages use (§17) --------------------
const preview = site.previewMode === true;
writeFileSync(
  join(dist, 'robots.txt'),
  preview
    ? `# PRE-LAUNCH: site.previewMode is true, so every page is noindex,nofollow.\n` +
      `# Set site.previewMode to false and rebuild to launch; this file regenerates every build.\n` +
      `User-agent: *\nDisallow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`
    : `User-agent: *\nAllow: /\n\n` +
      `# Internal component-preview routes: noindex,nofollow and excluded from the sitemap (§17).\n` +
      `Disallow: /templates/\n\nSitemap: ${ORIGIN}/sitemap.xml\n`,
);

// --- /llms.txt -----------------------------------------------------------------------------
const built = (route) => existsSync(join(dist, route.replace(/^\//, ''), 'index.html'));
const titleOf = (route) => {
  const f = join(dist, route.replace(/^\//, ''), 'index.html');
  if (!existsSync(f)) return null;
  const m = readFileSync(f, 'utf8').match(/<title>([^<]*)<\/title>/);
  return m ? m[1].split('|')[0].trim().replace(/&amp;/g, '&') : null;
};
const childrenOf = (route) => {
  const dir = join(dist, route.replace(/^\//, ''));
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && existsSync(join(dir, d.name, 'index.html')))
    .map((d) => `${route}${d.name}/`);
};
const link = (route, label) => `- [${label ?? titleOf(route) ?? route}](${ORIGIN}${route})`;

let llms = `# ${site.name}\n\n> ${site.footerBlurb}\n\n`;
if (site.legalName && site.legalName !== site.name) llms += `Legal name: ${site.legalName}\n`;
llms += `Phone: ${site.phoneDisplay}\n`;
for (const loc of site.locations) llms += `Location: ${loc.name} — ${loc.address}\n`;
llms += `Availability: ${site.emergencyAvailability}\n\n`;

const services = site.services.filter((s) => built(s.url));
if (services.length) {
  llms += `## Services\n\n`;
  for (const s of services) {
    llms += `${link(s.url, s.label)}\n`;
    for (const c of childrenOf(s.url)) {
      const t = titleOf(c);
      if (t) llms += `  - [${t}](${ORIGIN}${c})\n`;
    }
  }
  llms += '\n';
}

const st = site.stateAbbr.toLowerCase();
const hubs = cities.filter((c) => built(`/${c.slug}-${st}/`));
if (hubs.length) {
  llms += `## Service areas\n\n`;
  const areaIndex = ['/service-area/', '/service-areas/'].find(built);
  if (areaIndex) llms += `${link(areaIndex, `All ${hubs.length} cities served`)}\n`;
  llms += `\nEach of the ${hubs.length} cities has a hub page at ${ORIGIN}/{city}-${st}/ ` +
    `(for example ${ORIGIN}/${hubs[0].slug}-${st}/), linking to that city's service pages. ` +
    `The complete inventory is in the sitemap.\n\n`;
}

const company = ['/about/', '/contact/', '/reviews/', '/blog/'].filter(built);
if (company.length) {
  llms += `## Company\n\n`;
  for (const r of company) llms += `${link(r)}\n`;
  llms += '\n';
}

llms += `## Optional\n\n- [Sitemap](${ORIGIN}/sitemap.xml)\n`;
for (const r of ['/privacy-policy/', '/terms/'].filter(built)) llms += `${link(r)}\n`;
writeFileSync(join(dist, 'llms.txt'), llms);

const llmsLinks = llms.split('\n').filter((l) => /^\s*- \[/.test(l)).length;
console.log(
  `[postbuild] sitemap.xml (${children.length} child, ${urls} URLs) · ` +
    `robots.txt (${preview ? 'PRE-LAUNCH Disallow /' : 'LIVE Allow /, templates disallowed'}) · ` +
    `llms.txt (${llmsLinks} links, ${hubs.length} city hubs, ${services.length} service hubs)`,
);
