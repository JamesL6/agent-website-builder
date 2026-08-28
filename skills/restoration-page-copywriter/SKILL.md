---
name: restoration-page-copywriter
description: Writes final first-person website copy for restoration service, city, city-service, homepage, contact, and operational pages from an approved content brief, verified client intake, active page map, and approved claims. Use after a brief exists; do not use to create new SEO briefs.
---

# Restoration Page Copywriter

Write final restoration website copy that sounds like the restoration company is speaking directly to the property owner.

## Source Order

Use the most specific approved source first:

1. Approved content brief.
2. AM-verified client intake.
3. Approved claims/proof.
4. Active page map and internal-link opportunities.
5. Brand/design brief.
6. Current website only as supporting context.

Do not invent services, cities, certifications, response times, review ratings, licensing, insurance outcomes, warranties, or office locations.

## Voice

Write in first person from the company's perspective.

Use:

- `we`
- `our team`
- `we respond`
- `we handle`
- `we help`
- `[Company Name]` when the brand needs to be reinforced

Avoid detached third-person phrasing:

- `the company`
- `this business`
- `the contractor`
- `the site should`
- `the page should`

## Tone

The reader likely has property damage and needs a clear next step.

The copy should be:

- Professional.
- Direct.
- Helpful.
- Trustworthy.
- Easy for a homeowner, property manager, or business owner to understand.
- Confident without sounding corporate or inflated.

Avoid:

- Corporate filler.
- Overly sophisticated words.
- Generic marketing hype.
- Fearmongering.
- Keyword stuffing.
- Unsupported guarantees.

## Page Copy Rules

- Preserve the approved H1/H2/H3 structure from the brief.
- Keep the first body paragraph under the first H2, not directly under the H1.
- For local SEO pages, confirm the approved first H2 includes the approved local target area/city. If it does not, flag a `Copy Blocker` / `Brief Issue` before writing instead of silently rewriting the approved brief.
- Explain restoration terms in plain English.
- Use concise paragraphs and practical details.
- Add internal links naturally where the brief/page map calls for them.
- Keep local language natural; do not stuff city/state terms.
- Use page-specific CTA language where practical.
- Keep emergency restoration CTAs phone-first.
- Match the fixed page template: main written copy belongs in the left column; forms/reviews/navigation are handled by the layout.
- Treat internal-link, cannibalization, and page-map notes as writer guidance, not customer-facing sentences. Do not write awkward routing copy like `see our X page for the clean-water version of the problem`, `for the broader category`, `this page supports`, or `this child page should`.
- Internal links must sound like natural help inside the section. Good internal-link copy explains the current topic first, then links from a useful phrase. Bad internal-link copy announces SEO architecture or tells the reader to leave the page for another "version" of the issue.
- Treat NAP, GBP, office-location, sitemap, and service-area segmentation rules as implementation/QA guidance only. Never expose internal location-management language in visible copy, including phrases like `verified office locations`, `GBP locations`, `service-area communities`, `broader coverage`, `local service information`, or explanations that a city is separate from an office/GBP record. Customer-facing service-area copy should simply say where the company serves, what help is available there, and what the property owner should do next.
- Convert brief bullets into polished final copy and reusable content modules when useful. Do not leave a section as a thin one-paragraph summary if the brief expects process, safety, timing, documentation, or affected-material depth.
- When using an existing approved client site as a quality benchmark, match the level of depth, rhythm, and naturalness without copying its exact wording.
- Output internal-link candidates for the Internal Linking Agent when useful. Do not treat link candidates as final body-link instructions before the target routes exist and the built site has been audited.

## Service And City Targeting

For root/non-city service pages, confirm the `Primary Service Page Target Area` before writing. Use the largest approved area the client services, because those pages usually target the strongest market closest to the root domain.

Rules:

- If the target area is missing or unclear, ask the AM/SEO owner before writing.
- Do not guess from the current website, first city in a sheet, GBP address, or office location.
- Do not use a smaller suburb/city unless the AM/SEO owner explicitly approves that strategy.
- Use the verified target area naturally in the H1, intro, local trust copy, title/meta direction, and CTA closeout when the brief calls for localization.
- If an approved root/non-city service brief is missing the verified target area from the first H2, stop and route the brief back for correction or human approval. Do not quietly change the H2 in final copy because the brief is the source of truth.

For city pages, use the general city-hub pattern:

- H1: `Restoration Services in {{city}}, {{state_abbreviation}}`. The visible page should use the state abbreviation, such as `IL`, unless the approved page map says otherwise.
- Introduce the company's restoration support in that city.
- Briefly summarize approved city-service pages for that location.
- Link each summary to its matching city-service page.
- Keep summaries concise so the city page routes users deeper instead of duplicating the city-service pages.
- Do not mention or link unapproved city-service pages.

For city-service pages, follow the approved brief/page map for the specific service plus city. Do not let the general city page cannibalize the city-service pages.

## CTA Style

CTAs should be urgent and useful, not exaggerated.

Good:

- `Call us now for 24/7 water damage help.`
- `Our team can inspect the damage, explain the next steps, and begin cleanup quickly.`
- `Need help now? Call our restoration team for emergency service.`

Bad:

- `We guarantee your claim will be approved.`
- `The company provides world-class solutions.`
- `Experience unmatched excellence in property recovery.`

## Claim Safety

Only use a claim when it is verified in intake, approved source material, or the content brief.

Examples that require proof:

- 24/7 service.
- Response time.
- IICRC certification.
- Licensed and insured.
- Biohazard licensing.
- Asbestos, lead, or environmental licensing.
- Insurance coordination.
- Years in business.
- Review counts or ratings.

For insurance, talk about documentation and coordination. Do not promise coverage, claim approval, or reimbursement.

## Copy Sprint — Default Execution Shape

Once briefs are approved, write ALL remaining pages in one parallel sprint — never serially,
page-by-page across conversation turns. Serial writing at real depth (~15k tokens/page)
stalls a 26-page site for hours and invites mid-run scope re-negotiation.

1. **Lead writes `copy-spec.md` first** (per client, ~1 page). It locks everything parallel
   writers must not decide for themselves:
   - the claim matrix: approved claims listed explicitly WITH claim states; forbidden ones
     enumerated (no insurance-will-cover, no outcome guarantees, no medical claims, no
     dollar figures, no credentials beyond what the verified intake supports)
   - the approved URL list from the Active Page Map — writers may only link URLs on it
   - voice rules and the word-count warning: first drafts always come in short — verify
     against the brief's count before returning
   - one finished page as the reference implementation
2. **Fan out one subagent per page** (Sonnet, medium effort is the default — page copy is
   brief-execution, not judgment work). Each reads its own approved brief plus the spec and
   returns a Final Page Copy artifact (`schemas/final-page-copy.yaml`) into `artifacts/copy/`.
   Pages with unusual stakes get extra briefing in the fan-out prompt (biohazard/trauma:
   non-graphic, discretion as the trust signal; remodeling: planned-purchase voice,
   form-first CTAs).
3. **Lead verifies every page centrally** — `npm run validate:artifacts` (it validates
   `artifacts/copy/*.yaml`), word count against the brief, claim scan, heading structure
   matches the brief exactly. Never take an agent's word for it.

City hub and city-service pages are copy too — but their deliverable is DATA, not hand-written
pages. They render from per-city data files (localized from the master briefs' {{city}}/{{state}}
patterns plus genuinely local, verifiable facts per §14: county, neighborhoods, service-area
specifics — never invented landmarks or fake local color). The sprint produces and verifies
that per-city dataset alongside the service-page artifacts, and it is approved BEFORE build.
The builder must never invent city content at build time; 50 near-identical city pages with a
swapped city name is thin content, and 50 pages of fabricated local detail is worse.

Scope is the approved Active Page Map. Never propose depth tiers, sampling, or skipping
approved pages mid-run — a page with an approved brief gets written to brief, whether it has
90,500 searches/mo or 40. Work in search-volume order so the highest-value pages land first,
and raise capacity concerns in the handoff summary while the sprint keeps going.

## Output: Final Page Copy

Produce a `Final Page Copy` artifact. This is the finished written content for one page, organized so the build agent can place it into the approved template without guessing or rewriting.

Required format:

```markdown
# Final Page Copy

Page URL:
Brief Used:
Page Type:
Primary Service/City:
Primary Service Page Target Area:
Linked City-Service Pages:

## H1
[Final H1 from the approved brief.]

## Hero / Intro Copy
[Short hero support copy if the template needs it. Keep phone-first CTA intent.]

## Body Copy

### H2: [Exact approved H2]
[Full body copy for this section. Include finished paragraphs and approved bullets. Mention related services naturally only where it helps the reader.]

#### H3: [Exact approved H3, if any]
[Full body copy for this subsection.]

### H2: [Next exact approved H2]
[Full body copy for this section.]

## CTA Block Copy
[Page-specific CTA copy. Keep emergency pages phone-first.]

## Frequently Asked Questions

### [Exact approved FAQ question]
[Final answer.]

## Internal Link Candidates
- Source section: [H2/H3]
- Suggested target: [Target URL or page]
- Suggested anchor: [Natural anchor text]
- Why it helps the user: [Brief reason]
- Confidence: [High / Medium / Low]

## Claims Used
- [Claim] -> [Source/proof]

## Claims Avoided Or Needs Approval
- [Unsupported claim or missing proof]
```

The `## Body Copy` section is the core deliverable. It must include the full written content under every approved H2/H3, not just notes or bullet prompts.

Do not create a new content brief. If no approved brief exists for an SEO-money page, hand off to the Content Brief Agent.

## Quality Check

Before finalizing, verify:

- The copy sounds like the company wrote it.
- Every claim is supported.
- The brief structure is preserved.
- Local SEO pages have the approved local target in the first H2, or the missing local target is listed as a `Copy Blocker` / `Brief Issue`.
- The `Final Page Copy` includes full body copy under each approved H2/H3.
- Root/non-city service pages use a verified target area.
- City pages include concise summaries and links for approved city-service pages.
- CTAs are phone-first where emergency intent exists.
- Internal links are natural and relevant.
- Internal links do not expose SEO/page-map language or awkward "see this page for another version" phrasing.
- Brief notes have been transformed into customer-facing copy, not pasted or summarized mechanically.
- The copy is clear to a property owner under stress.
- No unsupported services, cities, claims, ratings, or guarantees were added.
