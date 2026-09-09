#!/usr/bin/env node
/**
 * Layer-2 validators for the pipeline's handoff artifacts (PIPELINE.md,
 * Rejection Encoding Rule: component > validator > schema > prose).
 *
 * Validates, when present in the artifacts dir:
 *   messaging-pack.yaml   (schema: docs/.../schemas/messaging-pack.yaml)
 *   design-recipe.yaml    (schema: docs/.../schemas/design-recipe.yaml)
 *   active-page-map.yaml  (schema: docs/.../schemas/active-page-map.yaml)
 *
 * Usage:
 *   node scripts/validate-artifacts.mjs [dir]
 * With no dir: validates ./artifacts if any artifact exists there, otherwise
 * ./artifacts/examples (the fixtures), so `npm run check` always exercises
 * this machinery. Client builds put real artifacts in ./artifacts/.
 *
 * Exit 1 on any ERROR. WARNINGs print but do not fail.
 *
 * Born from a real failure (2026-08-28, first pilot): the homepage H2 rule
 * lived in the copywriter skill (Stage 4b) while the homepage H2 was produced
 * as a Messaging Pack field (Stage 4a), and nothing bridged them. 37k words of
 * prose rules, zero automated checks. These ~250 lines are the bridge.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const warnings = [];
const err = (file, msg) => errors.push(`${file}: ${msg}`);
const warn = (file, msg) => warnings.push(`${file}: ${msg}`);

// ---------------------------------------------------------------- shared

// §7 hard-block phrases — internal planning language that must never render.
const BANNED = [
  'service architecture', 'approved rollout', 'source reserved',
  'review source reserved', 'widget-ready', 'launch input', 'proof plan',
  'page map', 'page targets', 'target cities',
  'city-service pages are deferred', 'lorem ipsum', 'placeholder',
];
// §7 soft-flag words — legitimate English; warn, never fail.
const SOFT = ['brief', 'candidate', 'deferred', 'mockup', 'targets'];

const CLAIM_STATES = [
  'visible_preview_allowed', 'launch_proof_required',
  'badge_asset_required', 'never_without_explicit_approval',
];

/**
 * Variants that exist as BUILT starter components. A recipe naming anything
 * else selects a component that does not exist (design-recipe.yaml rule #2).
 * UPDATE THIS MAP IN THE SAME COMMIT THAT SHIPS A NEW VARIANT COMPONENT.
 */
const BUILT_VARIANTS = {
  header: ['utility_strip_sticky_header', 'mega_menu_grouped_services'],
  hero: ['image_backed_split_form', 'premium_full_bleed'],
  proof_band: ['transition_strip'],
  service_cards: ['image_overlay_grid', 'icon_plus_media_cards'],
  process: ['dark_timeline_cards', 'numbered_connector_steps'],
  differentiator: ['dark_advantage_board'],
  reviews: ['real_widget_stacked', 'reserved_polished_state'],
  service_area: ['map_with_county_accordions', 'regional_service_explorer'],
  faq: ['premium_cards_sticky_intro'],
  final_cta: ['dark_phone_first_band'],
  footer: ['full_nap_service_footer'],
  mobile_sticky_cta: ['show_after_hero'],
};

const isBlank = (v) => v === undefined || v === null || String(v).trim() === '';

/** Walk every string in an object tree; call fn(path, string). */
function walkStrings(node, fn, path = '') {
  if (typeof node === 'string') fn(path, node);
  else if (Array.isArray(node)) node.forEach((v, i) => walkStrings(v, fn, `${path}[${i}]`));
  else if (node && typeof node === 'object')
    for (const [k, v] of Object.entries(node)) walkStrings(v, fn, path ? `${path}.${k}` : k);
}

function scanLanguage(file, doc) {
  walkStrings(doc, (path, s) => {
    const lower = s.toLowerCase();
    for (const phrase of BANNED)
      if (lower.includes(phrase)) err(file, `§7 banned phrase "${phrase}" at ${path}`);
    for (const word of SOFT)
      if (new RegExp(`\\b${word}\\b`, 'i').test(s)) warn(file, `§7 soft-flag word "${word}" at ${path} — reviewer judgment needed`);
  });
}

// ------------------------------------------------------- messaging pack

function validateMessagingPack(file, doc) {
  const req = (path, v) => { if (isBlank(v)) err(file, `required field empty: ${path}`); };

  req('meta.client', doc.meta?.client);
  req('meta.primary_service_page_target_area', doc.meta?.primary_service_page_target_area);
  req('hero.h1', doc.hero?.h1);
  req('hero.subhead', doc.hero?.subhead);
  req('hero.primary_cta_label', doc.hero?.primary_cta_label);
  req('hero.secondary_cta_label', doc.hero?.secondary_cta_label);
  req('form.emergency_notice', doc.form?.emergency_notice);

  const lines = doc.hero?.h1_line_groups ?? [];
  if (!Array.isArray(lines) || lines.length < 2)
    err(file, `hero.h1_line_groups needs >= 2 explicit lines (§24 line control), found ${lines.length ?? 0}`);

  const bullets = doc.hero?.trust_bullets ?? [];
  if (bullets.length < 4 || bullets.length > 6)
    err(file, `hero.trust_bullets must have 4-6 entries, found ${bullets.length}`);
  bullets.forEach((b, i) => {
    if (isBlank(b?.text)) err(file, `trust_bullets[${i}].text empty`);
    if (!CLAIM_STATES.includes(b?.claim_state))
      err(file, `trust_bullets[${i}].claim_state "${b?.claim_state}" not a valid §6 state`);
  });

  for (const h of ['intro_heading', 'services_heading', 'process_heading',
    'differentiator_heading', 'review_heading', 'service_area_heading',
    'faq_heading', 'final_cta_heading', 'footer_summary'])
    req(`sections.${h}`, doc.sections?.[h]);

  // THE SEAM FIX: the first content heading is a local-SEO H2 and must carry
  // the primary target area (rule previously lived only in the copywriter
  // skill, scoped to "local SEO pages", and never reached this artifact).
  const target = doc.meta?.primary_service_page_target_area;
  const intro = doc.sections?.intro_heading;
  if (!isBlank(target) && !isBlank(intro) &&
      !intro.toLowerCase().includes(String(target).toLowerCase()))
    err(file, `sections.intro_heading must contain the primary target area "${target}" (homepage local-H2 rule)`);

  if (!isBlank(doc.hero?.h1) && !isBlank(intro) &&
      doc.hero.h1.trim().toLowerCase() === intro.trim().toLowerCase())
    err(file, 'sections.intro_heading duplicates the H1 — first H2 must differ from H1');

  (doc.claims_register ?? []).forEach((c, i) => {
    if (!CLAIM_STATES.includes(c?.claim_state))
      err(file, `claims_register[${i}].claim_state "${c?.claim_state}" not a valid §6 state`);
  });

  if (doc.banned_confirmed !== true)
    err(file, 'banned_confirmed must be true — producer must confirm the §7 scan');

  scanLanguage(file, { hero: doc.hero, proof_band: doc.proof_band, sections: doc.sections, form: doc.form });
}

// -------------------------------------------------------- design recipe

function validateRecipe(file, doc) {
  if (isBlank(doc.meta?.messaging_pack_ref))
    err(file, 'meta.messaging_pack_ref empty — recipe is invalid without an approved pack');

  for (const [slot, value] of Object.entries(doc.variants ?? {})) {
    const built = BUILT_VARIANTS[slot];
    if (!built) { warn(file, `unknown variant slot "${slot}"`); continue; }
    if (!built.includes(value))
      err(file, `variants.${slot}: "${value}" is not a BUILT variant (built: ${built.join(', ')})`);
  }

  const pbp = doc.variant_options?.post_body_sections?.process;
  if (pbp !== undefined && !['auto', 'always', 'never'].includes(pbp))
    err(file, `variant_options.post_body_sections.process must be auto|always|never, found "${pbp}"`);

  const count = doc.variant_options?.process_step_count;
  if (count !== undefined) {
    if (!Number.isInteger(count) || count < 3 || count > 5)
      err(file, `variant_options.process_step_count must be an integer 3-5, found ${count}`);
    else if (count !== 3) {
      const justified = (doc.exceptions ?? []).some((e) =>
        JSON.stringify(e).toLowerCase().includes('step'));
      if (!justified)
        err(file, `process_step_count=${count} deviates from the default (3) with no recorded justification in exceptions[] — deviations are allowed but must be deliberate`);
    }
  }

  const tokens = doc.brand?.tokens ?? {};
  for (const t of ['primary', 'accent', 'dark', 'surface'])
    if (isBlank(tokens[t])) err(file, `brand.tokens.${t} empty`);
  if (!['brand_guidelines', 'logo_derived_needs_approval'].includes(doc.brand?.token_source))
    err(file, `brand.token_source "${doc.brand?.token_source}" invalid`);
  if (!['self_hosted_woff2', 'system_fonts'].includes(doc.brand?.typography?.hosting_plan))
    err(file, `brand.typography.hosting_plan "${doc.brand?.typography?.hosting_plan}" invalid (§20)`);

  (doc.pages ?? []).forEach((p, i) => {
    if (isBlank(p?.url)) err(file, `pages[${i}].url empty`);
    if (!Array.isArray(p?.schema_plan) && isBlank(p?.schema_plan)) err(file, `pages[${i}].schema_plan missing (§22)`);
    if (isBlank(p?.navigation_inclusion)) err(file, `pages[${i}].navigation_inclusion missing (§23)`);
  });

  if (doc.meta?.status === 'Approved' &&
      !['Pass', 'Fail Accepted By Human'].includes(doc.meta?.rubric_result))
    err(file, `Approved recipe requires rubric_result Pass or Fail Accepted By Human, found "${doc.meta?.rubric_result}"`);
}

// ------------------------------------------------------------- page map

function validatePageMap(file, doc) {
  if (isBlank(doc.meta?.client)) err(file, 'meta.client empty');
  if (isBlank(doc.meta?.primary_service_page_target_area))
    err(file, 'meta.primary_service_page_target_area empty — root service pages cannot be localized without it');

  const pages = doc.pages ?? [];
  const urls = new Set(); const ids = new Set();
  const cityHubs = new Set(
    pages.filter((p) => p.page_type === 'city_hub').map((p) => String(p.city ?? '').toLowerCase()));

  pages.forEach((p, i) => {
    const at = `pages[${i}] (${p?.url ?? p?.page_id ?? '?'})`;
    if (isBlank(p?.page_id)) err(file, `${at}: page_id empty — stable IDs are required`);
    else if (ids.has(p.page_id)) err(file, `${at}: duplicate page_id`);
    else ids.add(p.page_id);

    if (isBlank(p?.url)) err(file, `${at}: url empty`);
    else {
      if (urls.has(p.url)) err(file, `${at}: duplicate url`);
      urls.add(p.url);
      if (!p.url.startsWith('/') || !p.url.endsWith('/'))
        err(file, `${at}: urls must start and end with "/"`);
      if (p.url.startsWith('/services/'))
        err(file, `${at}: /services/... prefix is forbidden for generated restoration pages (build spec)`);
    }

    if (p?.page_type === 'city_service' && !cityHubs.has(String(p.city ?? '').toLowerCase()))
      err(file, `${at}: city_service page has no approved city_hub for "${p.city}" in this map`);

    if (p?.brief?.required === true && isBlank(p?.brief?.brief_status))
      err(file, `${at}: brief.required is true but brief_status is unset`);

    if (isBlank(p?.navigation_inclusion) ||
        (Array.isArray(p?.navigation_inclusion) && p.navigation_inclusion.length === 0))
      err(file, `${at}: navigation_inclusion missing (§23 — no accidental orphans)`);

    if (p?.status === 'Ready To Build' && (p?.blockers ?? []).length > 0)
      err(file, `${at}: status Ready To Build with open blockers`);
  });

  (doc.excluded_pages ?? []).forEach((p, i) => {
    if (isBlank(p?.reason)) err(file, `excluded_pages[${i}]: reason empty — exclusions feed the client review packet`);
  });
}

// ------------------------------------------------- final page copy (sprint)

// Copy Sprint output: one final-page-copy artifact per page in <dir>/copy/.
// Validated so the sprint's parallel writers get mechanical verification —
// the lead never takes an agent's word for claim safety or completeness.
function validatePageCopy(file, doc) {
  if (isBlank(doc.meta?.page_id)) err(file, 'meta.page_id empty — must match the active page map');
  if (isBlank(doc.meta?.page_url)) err(file, 'meta.page_url empty');
  if (isBlank(doc.meta?.brief_used)) err(file, 'meta.brief_used empty — copy without a brief source is unreviewable');
  if (!['Draft', 'Ready For Review', 'Approved'].includes(doc.meta?.status))
    err(file, `meta.status "${doc.meta?.status}" invalid`);
  if (isBlank(doc.copy?.h1) && isBlank(doc.copy?.body)) err(file, 'copy.h1 and copy.body both empty');
  scanLanguage(file, doc.copy ?? {});
  (doc.claims_used ?? []).forEach((c, i) => {
    if (isBlank(c?.state)) err(file, `claims_used[${i}] missing claim state (§6)`);
  });
}

// ---------------------------------------------------------------- redirect map

// Stage 2 output (schemas/redirect-map.yaml). Rebuilds only. Every old URL that mattered gets
// a decision; internal destinations must exist in the page map so no redirect lands on a 404.
function validateRedirectMap(file, doc, pageMapUrls) {
  if (isBlank(doc.meta?.client)) err(file, 'meta.client empty');
  if (isBlank(doc.meta?.source_site)) err(file, 'meta.source_site empty — the old domain being redirected');
  if (!['Draft', 'Ready For Review', 'Approved'].includes(doc.meta?.status))
    err(file, `meta.status "${doc.meta?.status}" invalid`);
  const froms = new Set();
  const rows = doc.redirects ?? [];
  rows.forEach((r, i) => {
    const at = `redirects[${i}] (${r?.from ?? '?'})`;
    if (isBlank(r?.from) || !String(r.from).startsWith('/')) err(file, `${at}: from must be an old-site path starting with "/"`);
    else if (froms.has(r.from)) err(file, `${at}: duplicate from`);
    else froms.add(r.from);
    if (![301, 410].includes(r?.status)) err(file, `${at}: status must be 301 or 410, found ${r?.status}`);
    if (r?.status === 301) {
      if (isBlank(r?.to)) err(file, `${at}: 301 needs a destination`);
      else if (String(r.to).startsWith('/')) {
        if (pageMapUrls && !pageMapUrls.has(r.to)) err(file, `${at}: destination ${r.to} is not in the active page map — a redirect must never land on a 404`);
      } else if (!/^https?:\/\//.test(r.to)) err(file, `${at}: destination must be a site path or absolute URL`);
    }
    if (isBlank(r?.reason)) err(file, `${at}: reason empty — record why this mapping (rankings, backlinks, equivalent page)`);
  });
  rows.forEach((r, i) => {
    if (r?.status === 301 && froms.has(r.to)) err(file, `redirects[${i}]: ${r.from} → ${r.to} chains into another redirect — point at the final destination`);
  });
  (doc.unmapped_old_urls ?? []).forEach((u, i) => {
    if (isBlank(u?.url) || isBlank(u?.reason)) err(file, `unmapped_old_urls[${i}] needs url + reason (deliberate 404s are decisions, not omissions)`);
  });
}

// ---------------------------------------------------------------- runner

const VALIDATORS = {
  'messaging-pack.yaml': validateMessagingPack,
  'design-recipe.yaml': validateRecipe,
  'active-page-map.yaml': validatePageMap,
};

let dir = process.argv[2] ? resolve(process.argv[2]) : join(ROOT, 'artifacts');
const hasReal = existsSync(dir) &&
  readdirSync(dir).some((f) => Object.keys(VALIDATORS).includes(f));
if (!process.argv[2] && !hasReal) dir = join(ROOT, 'artifacts', 'examples');

let ran = 0;
for (const [name, fn] of Object.entries(VALIDATORS)) {
  const p = join(dir, name);
  if (!existsSync(p)) continue;
  ran++;
  try { fn(name, parse(readFileSync(p, 'utf8'))); }
  catch (e) { err(name, `failed to parse: ${e.message}`); }
}

const rm = join(dir, 'redirect-map.yaml');
if (existsSync(rm)) {
  ran++;
  let pageMapUrls = null;
  const pm = join(dir, 'active-page-map.yaml');
  if (existsSync(pm)) { try { pageMapUrls = new Set((parse(readFileSync(pm, 'utf8')).pages ?? []).map((p) => p.url)); } catch { /* reported above */ } }
  try { validateRedirectMap('redirect-map.yaml', parse(readFileSync(rm, 'utf8')), pageMapUrls); }
  catch (e) { err('redirect-map.yaml', `failed to parse: ${e.message}`); }
}

const copyDir = join(dir, 'copy');
if (existsSync(copyDir)) {
  for (const f of readdirSync(copyDir).filter((f) => f.endsWith('.yaml') || f.endsWith('.yml'))) {
    ran++;
    try { validatePageCopy(`copy/${f}`, parse(readFileSync(join(copyDir, f), 'utf8'))); }
    catch (e) { err(`copy/${f}`, `failed to parse: ${e.message}`); }
  }
}

if (ran === 0) {
  console.error(`validate-artifacts: no artifacts found in ${dir}`);
  process.exit(1);
}
console.log(`validate-artifacts: ${ran} artifact(s) checked in ${dir}`);
warnings.forEach((w) => console.warn(`  WARN  ${w}`));
errors.forEach((e) => console.error(`  ERROR ${e}`));
console.log(`  ${errors.length} error(s), ${warnings.length} warning(s)`);
process.exit(errors.length ? 1 : 0);
