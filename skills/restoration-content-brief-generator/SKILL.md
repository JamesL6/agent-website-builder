---
name: restoration-content-brief-generator
description: Creates execution-ready SEO content briefs for restoration service, city, and city-service pages using SEMrush, web/SERP research, and a restoration master page map. Use for water, fire, mold, biohazard, storm, commercial, reconstruction, contents, environmental, and restoration-adjacent pages when the brief must be research-driven, localized with {{city}}/{{state}}, mapped to parent/child/city URLs, and built for writers/designers/SEO implementers.
---

# Restoration Content Brief Generator

## Where the master brief library lives (read this before anything else)

`docs/agency-website-system/REFERENCES.md` in the canonical checkout
(`/Users/jameslarosa/Documents/agent-website-builder`): the Master Restoration SEO Template sheet,
tab **`Content Briefs`**, links one Google Doc per master service page. Before drafting ANY brief,
open that tab, find the page's Doc URL, open the Doc (record its title). If it exists, the job is
assignment, not authoring — never draft a duplicate. Status columns, Page Map rows, and local
markdown exports are not briefs. If the sheet or a Doc cannot be opened, stop and say so.

Create restoration service-page briefs that are specific enough for SEO execution and flexible enough to match the actual SERP intent. Do not force a fixed H2 template across every page.

## Inputs

Collect or infer:

1. Main keyword / page topic.
2. Target URL or page-map row if available.
3. Page type / role: parent hub, child service, event page, commercial page, specialty cleanup, environmental, FAQ/section-only.
4. Client or output folder.
5. Primary service page target area for root/non-city service pages.
6. Local placeholders: default to `{{city}}` and `{{state}}` unless the user provides a real market.
7. Existing page URL, optional.

If working in a project with a master restoration map, check it before outlining. Useful filenames include:

- `restoration-seo-master-page-map.csv`
- `restoration-industry-page-map.md`
- `build-restoration-seo-master.mjs`

## Research Workflow

Use SEMrush when available:

1. `keyword_research`
   - `phrase_this` for the main keyword.
   - `phrase_related` for secondary terms.
   - `phrase_questions` for FAQ candidates.
   - `phrase_organic` for top ranking URLs.
2. `url_research`
   - `url_organic` for the strongest non-directory competitor pages.
   - Identify the keyword footprint of each ranking page.
3. Web search / page review
   - Review top ranking pages and major restoration brands.
   - Use official or standards sources when relevant, such as IICRC/ANSI for restoration process and terminology.

Do not copy competitor wording. Use competitor pages to identify topics, not prose.

## Required Brief Decisions

Every brief must state:

- Recommended URL.
- Page role in the architecture.
- Search intent.
- SERP intent classification.
- Primary keyword.
- Secondary keyword themes.
- Question/FAQ targets.
- Query-to-section map.
- Competitor/SERP patterns.
- What the page should rank for.
- What the page must not cannibalize.
- Internal links out.
- Internal links that should point back.
- Schema recommendations.
- Client/onboarding toggles.
- Primary service page target area or placeholder strategy.
- City-page hub behavior when creating a city page brief.
- Claims that require verification, such as 24/7 response, IICRC certification, licensed/insured, plumbing, biohazard licensing, asbestos/lead licensing, or insurance coordination.

## Outline Rules

Build the H2/H3 outline from the research. Do not use generic headings just because they fit a template.

Allowed patterns depend on intent:

- Parent hubs usually need service scope, emergency intent, process, common causes/situations, related services, residential/commercial coverage, and conversion sections.
- Event pages usually need the specific cause/event, immediate risks, process, affected materials, related services, and conversion sections.
- General city pages should introduce restoration support in the city, briefly summarize approved city-service pages for that location, and link to those city-service pages instead of duplicating their full copy.
- Commercial/property pages usually need facility-specific risks, continuity, documentation, containment, coordination, and vertical-specific trust signals.
- Sensitive cleanup pages need discretion, safety, compliance, process, what not to do, and compassionate conversion language.
- Environmental pages need licensing/partner disclaimers and should avoid unsupported claims.

## Service And City Targeting Rules

For root/non-city service pages, ask for or confirm the `Primary Service Page Target Area` before finalizing the brief. The default recommendation is the largest approved area the client services, because those pages usually sit closest to the root domain and target the strongest market.

Do not guess the target market from:

- The first city in a sheet.
- The current website.
- The GBP address.
- The office location.

For city pages, use this default H1 pattern unless a reviewed SEO strategy overrides it:

```text
Restoration Services in {{city}}, {{state_abbreviation}}
```

The visible page should use the state abbreviation, such as `IL`, unless the approved page map says otherwise.

City page briefs should:

- Position the page as a general city hub.
- Include concise summaries for approved city-service pages in that location.
- Require links from each summary to its matching city-service page.
- Avoid full duplication of service-page or city-service-page copy.
- Avoid mentioning unapproved city-service pages.

## SERP Intent Classification

Classify the SERP before outlining. Use one or more labels:

- Emergency service SERP: searchers need immediate help and phone-call CTAs.
- Local provider SERP: searchers are comparing nearby companies.
- National franchise SERP: SERP is dominated by large restoration brands.
- Informational guide SERP: searchers need education before choosing a provider.
- Directory-heavy SERP: Yelp, BBB, Angi, HomeAdvisor, or similar directories dominate.
- Mixed intent SERP: service pages, guides, directories, videos, and forums all appear.

Explain what the classification means for the page structure. Example: if the SERP is emergency + local provider, the brief should prioritize fast response, local proof, service scope, phone CTAs, and FAQs over long educational background.

## Query-to-Section Map

Every brief must map keyword clusters to page sections before the outline is finalized. This prevents keyword dumping and clarifies what each section is responsible for.

Use this format:

| Query / Keyword Cluster | Intent | Page Section | Treatment |
|---|---|---|---|
| Primary service terms | Core service intent | H1, first H2, title, intro | Target directly |
| Emergency terms | Urgent conversion intent | Emergency/service response section | Cover directly |
| Process terms | Evaluation/process intent | Process section | Cover directly |
| Cost terms | Price objection | FAQ or cost section | Answer briefly; avoid standalone page unless map says so |
| Insurance terms | Coverage/documentation concern | FAQ or documentation section | Answer carefully; avoid legal/coverage guarantees |
| Child-page terms | Specific service/event intent | Brief mention + internal link | Do not cannibalize child page |
| Commercial terms | Business/property intent | Commercial section or commercial child link | Match page-map role |

Customize the rows based on SEMrush and SERP findings. Do not include irrelevant clusters just because they are in this example.

## Non-Negotiable Structure Rules

- Use `{{city}}` and `{{state}}` where local SEO naturally fits: H1, first page-outline H2, intro, title tag, meta description, local trust sections, and CTA closeout.
- For root/non-city service pages in client projects, `{{city}}` should represent the verified `Primary Service Page Target Area` unless the page map says otherwise.
- The first body paragraph begins under the first H2, not directly under the H1.
- For local SEO pages, the first H2 should include the approved local target. Use `{{city}}, {{state}}` for local service and city-service pages, `{{city}}, {{state_abbreviation}}` when the approved city-page pattern requires it, and the verified `Primary Service Page Target Area` for root/non-city service pages.
- The first H2 should introduce the service/company in a way that matches the page intent. Its wording is custom, not fixed, and should combine the local target with an editorial angle such as urgency, problem type, service outcome, property type, safety, cleanup process, or company response.
- The H1 and first H2 must never be identical, near-identical, or a simple title-case/capitalization variant. If the H1 is the exact local keyword, the first H2 must keep the local target but use a different editorial angle. Example: use `### H1: Flood Damage Restoration in {{city}}, {{state}}` with `### H2: Fast Flood Cleanup and Drying for {{city}}, {{state}} Homes and Businesses`, not another `### H2: Flood Damage Restoration in {{city}}, {{state}}`.
- Every page includes FAQs.
- The CTA / "bring it home" section should be the last narrative sales section. Default placement is immediately before FAQ, with FAQ as the final utility section unless the user requests CTA after FAQ.
- Section-only or FAQ-only topics must not be turned into standalone page briefs unless the user overrides the page map.
- Avoid city/state stuffing. Localize naturally.

## Brief Output Format

Use this structure with these exact section heading labels. Do not rename, re-capitalize, abbreviate, or substitute these labels, because downstream sheet/search workflows may validate them literally.

1. `## Brief Header`
2. `## Page Intent and Audience`
3. `## SERP Intent Classification`
4. `## Keyword Research`
5. `## Query-to-Section Map`
6. `## SERP and Competitor Observations`
7. `## SEO Positioning and Cannibalization Rules`
   - Include the exact subheading `### What This Page Must Not Cannibalize`.
8. `## Content Specifications`
9. `## Research-Driven Page Outline`
   - H1.
   - Custom H2/H3 sections.
   - For each section: purpose, key points, keywords to include, internal links, CTA notes where useful.
10. `## Technical SEO`
11. `## Internal Linking Plan`
12. `## Conversion Guidance`
13. `## Client Onboarding Toggles and Claim Restrictions`
14. `## Frequently Asked Questions`
15. `## Writer Summary`

Heading normalization rules:

- Use `## Frequently Asked Questions`, never `## FAQ`, `## FAQs`, or `[Service] FAQ`.
- Use `## Query-to-Section Map`, never `## Query-To-Section Map`.
- Use `### What This Page Must Not Cannibalize`, never only `Must Not Cannibalize`, `Do Not Cannibalize`, or `Should Not Cannibalize`.
- Inside the outline, express the page H1 as `### H1: ...`; do not add a second Markdown `# ...` page title below the brief title.
- The CTA / "bring it home" closeout section stays inside `## Research-Driven Page Outline` before the FAQ section.
- Before finalizing the outline, compare the text after `### H1:` with the first `### H2:`. If they normalize to the same phrase after lowercasing and removing extra spaces, rewrite the first H2 before saving while preserving the approved local target.

## Quality Checklist

Before finishing:

- The outline is custom to the page and search intent.
- SERP intent classification is included.
- Query-to-section map is included and reflected in the outline.
- The first H2 can support an introductory paragraph about the service and company.
- For local SEO pages, the first H2 includes the approved local target area/city and is meaningfully different from the H1.
- FAQs are included.
- CTA closeout is included.
- The brief identifies cannibalization risks.
- The brief reflects the master page map when available.
- `{{city}}` and `{{state}}` are present where useful, including the first H2 for local SEO pages unless the page is a non-local operational/utility exception.
- No competitor copy is reused.

Run this literal-heading self-check before saving or reporting completion:

- `## SERP Intent Classification`
- `## Query-to-Section Map`
- `### What This Page Must Not Cannibalize`
- `## Research-Driven Page Outline`
- `## Frequently Asked Questions`
- `## Client Onboarding Toggles and Claim Restrictions`

If any are missing, fix the brief before finalizing it.
