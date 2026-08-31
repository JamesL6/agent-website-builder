#!/usr/bin/env node
/**
 * validate-built-html.mjs — layer-2 validator against the BUILT site (dist/).
 *
 * Catches the failure class that only exists in the assembled artifact, where
 * two upstream authorities are each correct in isolation (added 2026-08-28
 * after the pilot rendered duplicate process sections on all four parent hubs:
 * §12 mandates the shared post-body process section, the master briefs mandate
 * an in-article process H2, and nothing reconciled them).
 *
 * Checks per page:
 *   1. §12 precedence — a page never carries two process narratives:
 *      - the shared process section (data-section="process") mounted more than once
 *      - the shared process section present AND an in-article H2 naming a process
 *   2. §7 banned / placeholder language in rendered VISIBLE text (attribute
 *      text like input placeholders is ignored — only what a visitor reads).
 *   3. §15 dead internal links — every internal <a href="/..."> must resolve to
 *      a built route or file in dist/. Added 2026-08-28 after a build shipped
 *      mega-menu and service-area links to ~50 city hubs that did not exist yet,
 *      404ing on every page. Never wire nav to routes that are not built.
 *
 *   4. §17 index state — /templates/ routes must ALWAYS be noindex; every other
 *      page must be indexable at launch. Pre-launch, site.previewMode noindexes
 *      the whole site (one switch, never per-page markup) — that's a WARNING in
 *      default mode and an ERROR with --launch (`npm run validate:launch`), which
 *      also requires /robots.txt and /sitemap.xml in the build. Added 2026-08-28
 *      after a build pasted noindex into 54 page files with no rule mandating it
 *      and no stage removing it — the site could have launched invisible.
 *
 * Usage: node scripts/validate-built-html.mjs [distDir] [--launch]
 * Run AFTER `astro build` — `npm run check:built` does both; `npm run
 * validate:launch` is the pre-launch gate.
 * /templates/ preview routes are checked ONLY for required noindex.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const argv = process.argv.slice(2);
const LAUNCH = argv.includes('--launch');
const DIST = argv.find((a) => !a.startsWith('--')) || 'dist';

// Keep in sync with BANNED in validate-artifacts.mjs (§7).
const BANNED = [
  'service architecture', 'approved rollout', 'source reserved',
  'review source reserved', 'widget-ready', 'launch input', 'proof plan',
  'city-service pages are deferred', 'lorem ipsum', 'placeholder', 'todo:',
];

let errors = 0;
let warnings = 0;
const err = (file, msg) => { errors++; console.error(`  ✗ ${file}: ${msg}`); };
const warn = (msg) => { warnings++; console.warn(`  ⚠ ${msg}`); };

if (!existsSync(DIST)) {
  console.error(`✗ ${DIST}/ not found — run \`npm run build\` first (or \`npm run check:built\`).`);
  process.exit(1);
}

function* htmlFiles(dir) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) yield* htmlFiles(p);
    else if (entry.endsWith('.html')) yield p;
  }
}

const stripTags = (s) => s.replace(/<[^>]+>/g, ' ');

// --- §15: index everything the build produced, so links can be resolved -----
const routes = new Set(); // page URLs, '/foo/' style
const built = new Set();  // every emitted file, '/logos/x.png' style
function* allFiles(dir) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) yield* allFiles(p);
    else yield p;
  }
}
for (const f of allFiles(DIST)) {
  const rel = '/' + relative(DIST, f).split('\\').join('/');
  built.add(rel);
  if (rel.endsWith('/index.html')) routes.add(rel.slice(0, -'index.html'.length));
  else if (rel.endsWith('.html')) routes.add(rel);
}
const resolves = (href) => {
  const h = href.replace(/[?#].*$/, '');
  if (h === '' || h === '/') return true;
  return routes.has(h) || routes.has(h.endsWith('/') ? h : `${h}/`) || built.has(h);
};
const EXTERNAL = /^(https?:)?\/\/|^(tel:|mailto:|sms:|javascript:|#)/;
const deadLinks = new Map(); // href -> Set of pages linking it
const noindexPages = [];

let checked = 0;
for (const filePath of htmlFiles(DIST)) {
  const file = relative(DIST, filePath);
  const html = readFileSync(filePath, 'utf8');
  const noindexed = /<meta(?=[^>]*name="robots")[^>]*noindex[^>]*>/i.test(html);
  if (file.startsWith('templates/')) {
    // approval surfaces: ALWAYS noindex, before and after launch (§17)
    if (!noindexed) err(file, 'template preview route missing noindex,nofollow (§17)');
    continue;
  }
  checked++;
  if (noindexed) noindexPages.push(file);

  // --- 1. §12 precedence: one process narrative per page -------------------
  const mounts = (html.match(/data-section="process"/g) ?? []).length;
  if (mounts > 1)
    err(file, `shared process section mounted ${mounts}× — it renders once per page at most (§12)`);

  const article = html.match(/<article[^>]*class="[^"]*\barticle\b[^"]*"[^>]*>([\s\S]*?)<\/article>/)?.[1];
  if (mounts >= 1 && article) {
    for (const h2 of article.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)) {
      const text = stripTags(h2[1]).replace(/\s+/g, ' ').trim();
      if (/\bprocess\b/i.test(text)) {
        err(file, `two process narratives: in-article H2 "${text}" plus the shared post-body process section — omit the post-body process on this page (§12 precedence; recipe post_body_sections.process)`);
        break;
      }
    }
  }

  // --- 2. §7 banned / placeholder language in visible text ------------------
  const visible = stripTags(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<!--[\s\S]*?-->/g, ' '),
  ).replace(/\s+/g, ' ').toLowerCase();
  for (const phrase of BANNED)
    if (visible.includes(phrase))
      err(file, `§7 banned phrase "${phrase}" in rendered visible text`);

  // --- 3. §15 dead internal links (aggregated across pages below) ----------
  for (const m of html.matchAll(/<a\s[^>]*href="([^"]*)"/g)) {
    const href = m[1];
    if (EXTERNAL.test(href) || !href.startsWith('/')) continue;
    if (!resolves(href)) {
      if (!deadLinks.has(href)) deadLinks.set(href, new Set());
      deadLinks.get(href).add(file);
    }
  }
}

for (const [href, pages] of [...deadLinks.entries()].sort()) {
  err(
    `${pages.size} page(s), e.g. ${[...pages][0]}`,
    `dead internal link "${href}" — no built route or file at that path (§15: never publish links to routes that don't exist)`,
  );
}

if (noindexPages.length) {
  const detail = `${noindexPages.length} of ${checked} page(s) noindex (e.g. ${noindexPages[0]})`;
  if (LAUNCH)
    err('launch gate', `${detail} — a launched site must be indexable: set site.previewMode to false, rebuild, re-run (§17)`);
  else
    warn(`${detail} — expected while site.previewMode is true; launch requires ZERO (npm run validate:launch)`);
}
if (LAUNCH) {
  for (const required of ['/robots.txt', '/sitemap.xml'])
    if (!built.has(required)) err('launch gate', `${required} missing from the build (§21)`);
}

if (errors) {
  console.error(`\n✗ validate:built failed — ${errors} error(s) across ${checked} page(s). Fix the page composition or the upstream artifact; do not ship.`);
  process.exit(1);
}
console.log(`✓ validate:built passed${LAUNCH ? ' (LAUNCH mode)' : ''} — ${checked} page(s): one process narrative each, no §7 banned language, no dead internal links${LAUNCH ? ', all pages indexable, robots.txt + sitemap.xml present' : ''}.${warnings ? ` ${warnings} warning(s) above.` : ''}`);
