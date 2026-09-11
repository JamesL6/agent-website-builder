# Copy Spec — <Client Name>

The one-page brief every parallel copywriter reads before its page. Written by the Copy Sprint
lead from the verified intake, the approved page map, and the approved Messaging Pack. Nothing
below may be invented; every claim carries its state (§6).

## Client facts (from verified intake — verbatim)
- Business name / legal name:
- Phone (display exactly as site.ts):
- Locations (exact GBP NAP):
- Availability claim + state:
- Service area summary (counties, primary target area):

## Claim matrix
| Claim | State | Proof / note |
|---|---|---|
| e.g. "24/7 emergency response" | visible_preview_allowed | approved in intake |
| e.g. "IICRC certified" | launch_proof_required | certificate pending |

**Forbidden in all copy:** insurance will cover / pay / approve; guaranteed outcomes ("mold-free",
"like new"); medical claims; dollar figures; credentials beyond the matrix; review counts or
ratings not from the live widget; §7 banned phrases.

## Approved URL list (from the active page map — link ONLY these)
- /water-damage-restoration/
- …

## Voice
- First person plural, plain, specific, calm. No hype, no filler, no "we understand how stressful".
- Headings follow the brief exactly (order and wording). First H2 carries the page's local target.
- Sentences short. One idea each.

## Per-page targets come from the BRIEF DOC, not this spec
Word count, H2 sequence, internal-link plan, FAQ set, cannibalization rules, and the brief's
"Client Onboarding Toggles / Claim Restrictions" are read from each page's brief Google Doc
(`brief_ref` in the page map) and override anything here. This spec carries only what the briefs
cannot know: this client's facts, claim states, approved URLs, and voice.

## Word-count discipline
Every brief states a target. First drafts come in short — count against the BRIEF's target before
returning, then expand with substance (process detail, what is documented, what to expect), never
padding.

## City pages are data, not per-page copy
Write each service's city-service content ONCE with `{city}`/`{county}` tokens (from the brief's
`{{city}}`/`{{state}}` placeholders) into `cityServiceContent`; the city hub copy once into
`cityHubCopy`; the per-city table into `cities.ts` with intent-relevant fields only (county, state,
nearby approved towns, response framing — no local trivia). Never one artifact per city page.
Optional `localIntro` per town ONLY for a client-confirmed operational fact, attributed in
`localIntroSource`; list the towns that have one below, with the source.

## Towns with a confirmed local fact (localIntro)
| Town | Fact | Confirmed by / date |
|---|---|---|

## Reference implementation
Read this finished page first: <path or URL of one approved page>

## Page-type notes
- Biohazard / trauma: non-graphic; discretion is the trust signal; no credential claims.
- Remodeling: planned-purchase voice; form-first CTAs.
- City hubs: routing pages — short summaries that link deeper; factual local differentiation only.
