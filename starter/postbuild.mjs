#!/usr/bin/env node
/**
 * Post-build: satisfy CORE_CONTRACTS §21.
 *
 * @astrojs/sitemap emits `sitemap-index.xml`, but §21 requires `/sitemap.xml` itself to be a
 * REAL XML endpoint — never a redirect shell or meta-refresh page. Astro's `redirects` would
 * produce `dist/sitemap.xml/index.html`, which §21 explicitly rejects. So the index is copied
 * to `sitemap.xml` as a real file, and `robots.txt` is written to point at it.
 */
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const dist = 'dist';
const index = join(dist, 'sitemap-index.xml');
if (!existsSync(index)) {
  console.error('[postbuild] FAIL: sitemap-index.xml missing — did the sitemap integration run?');
  process.exit(1);
}

// §21: /sitemap.xml is a real XML file containing the sitemap index.
writeFileSync(join(dist, 'sitemap.xml'), readFileSync(index));

const children = readdirSync(dist).filter((f) => /^sitemap-\d+\.xml$/.test(f));
const urls = children.reduce(
  (n, f) => n + (readFileSync(join(dist, f), 'utf8').match(/<loc>/g) ?? []).length,
  0,
);

// Read the launch posture from the same single switch the pages use.
const siteSrc = readFileSync('src/data/site.ts', 'utf8');
const preview = /previewMode:\s*true/.test(siteSrc);

writeFileSync(
  join(dist, 'robots.txt'),
  preview
    ? `# PRE-LAUNCH. site.previewMode is true, so every page is noindex,nofollow.\n` +
      `# Flip site.previewMode to false to launch; this file regenerates on the next build.\nUser-agent: *\nDisallow: /\n\nSitemap: https://superiorrestorationems.com/sitemap.xml\n`
    : `User-agent: *\nAllow: /\n\nSitemap: https://superiorrestorationems.com/sitemap.xml\n`,
);

console.log(
  `[postbuild] sitemap.xml written (${children.length} child file(s), ${urls} URLs) · ` +
    `robots.txt written (${preview ? 'PRE-LAUNCH: Disallow /' : 'live: Allow /'})`,
);
