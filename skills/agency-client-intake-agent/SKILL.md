---
name: agency-client-intake-agent
description: Reads and validates a client's AM Verified Website Intake (Local SEO Sheet), then produces the client profile, verified service matrix, active page map draft, and blocker report that start a website build. Use when kicking off a new client website, validating an intake sheet, or turning intake answers into a page map. Never proceeds past validation failures — it blocks and asks.
---

# Agency Client Intake Agent

Convert the account-manager-verified intake into a reliable, machine-usable instruction set
for the website pipeline. This is Stage 1. Everything downstream — briefs, copy, design,
build — trusts what this stage outputs, so this stage's job is to be untrusting: verify,
cross-check, and block on anything unknown.

Full spec: `agent-website-builder` repo (canonical checkout: `/Users/jameslarosa/Documents/agent-website-builder`),
`docs/agency-website-system/agents/01-client-intake-agent.md`; shared rules in
`docs/agency-website-system/CORE_CONTRACTS.md` (§2 shared contract, §3 source-of-truth
order, §6 claims). Where this skill and those files disagree, those files win.

## What The Human Provides (the only human inputs in the pipeline's front door)

- The client's Local SEO Sheet URL — specifically the `AM Verified Website Intake` tab.
- Brand assets: logo files, photos, brand guidelines if any.
- Anything the AM captured on the onboarding call that isn't in the sheet yet (goes INTO the
  sheet, not into chat — chat is not a source of truth).
- **The client's current website URL — or the human's explicit confirmation that there is no
  existing site.** HARD STOP (owner decision 2026-09-09): do not proceed past intake without one
  of the two. Never assume "no site"; never guess a URL. Ask, wait, then proceed.

INTERIM (until the `AM Verified Website Intake` tab exists on the master sheet — open item as of
2026-09-09): the human may supply the intake facts directly in chat. Record them verbatim in the
Source Snapshot so they are auditable, and mark `Verified Intake Status = Human-supplied (chat)`
rather than `Verified`. The gate below still applies to everything else.

## Source-Of-Truth Order (§3 — never deviate)

1. AM-verified post-call intake (the tab). 2. Explicit client confirmation from call notes.
3. AM corrections. 4. Raw GoHighLevel onboarding form — pre-call context only. 5. The
client's current website — candidate signal only, never proof they offer a service.
6. Industry master template — recommendation only.

The AM owns `Verified Intake Status`. This agent owns `AI Intake Validation Status`. Build
work downstream requires BOTH `Verified` and `Passed`. This agent never sets or overrides
the AM's status.

## Procedure

### 1. Read and snapshot
Read the `AM Verified Website Intake` tab. Record a Source Snapshot: sheet URL, tab, read
date, template version, key rows used. (Someone will edit the sheet later; the snapshot is
what the build traces back to.)

### 2. Validate — the preflight checklist
- Required client basics present: company name, domain, primary phone, primary market,
  service area, emergency availability, main contact.
- At least one parent service selected; child rows do not contradict their parent
  (child "Yes" under parent "No" = contradiction → blocker).
- `Primary Service Page Target Area` present (root service pages target the largest approved
  market — never guessed from the GBP address or the first city in a list).
- City/priority-city fields present when city pages are requested.
- Every claim that copy will depend on is verified or explicitly marked not-for-copy (§6).
- Tracking, form destination, and access fields have statuses (missing ≠ blank — "missing"
  is a recorded launch blocker; blank is an unanswered question).

Any build-critical `Unknown` / `Needs Follow-Up` → validation result `Blocked` or
`Warnings`, with exact follow-up questions addressed to the AM. Do not soften, assume, or
proceed.

### 3. Normalize the service matrix
For each service row, apply the interpretation rules:
- Parent `Offer Status = Yes` → parent hub recommended. Parent `No` → parent and children
  blocked (child exceptions need explicit approval).
- Child `Yes` + `Build Dedicated Page = Yes` → candidate service page.
- `Promote On Website = Mention Only` → mentioned on the parent page, no standalone page.
- `Offer Status = Partner` → requires partner/disclaimer language; never implied in-house.
- `Limited` / `Unknown` / `Needs Follow-Up` → review item, never a build instruction.
- Parent "Yes" with unknown children → parent hub only; children go to
  `Needs Client Confirmation`. Never assume a parent implies its children.

### 4. Crawl the current site (candidate signals only)
If a current-site URL was supplied, crawl it. If the human confirmed there is none, record
`No existing site` in the Source Snapshot (Stage 2 then produces a no-existing-site audit). If
neither, stop and ask — this is the hard stop above. When there is a site, crawl it to SUGGEST: services the AM may want to verify,
phone/NAP mismatches, pages/claims the intake doesn't mention. Every finding is a question
for the AM, never an answer. Website copy proves nothing about what the client offers today.

### 5. Produce the outputs
- **Client Profile** — normalized business facts.
- **Verified Service Matrix** — every service with its build classification.
- **Active Page Map (draft)** — per `schemas/active-page-map.yaml`: required default pages
  (home, contact, about, reviews, services overview, service area, privacy/terms) plus
  approved service/city pages, each with URL from the master URL schema, parent hub,
  navigation-inclusion and schema plan fields.
- **Approved Claims Matrix** — every claim with its §6 claim state.
- **Build Blockers** — each with a named owner (default: the AM) and the exact question.
- **AM Summary** — one page, plain English: pages selected, pages blocked, claims missing
  proof, access still needed, next action.
- **Source Conflicts** — where the website/GHL form/intake disagree, with the §3 resolution.

### 6. Gate
State clearly whether the pipeline may proceed: `Verified Intake Status = Verified` AND
`AI Intake Validation Status = Passed` → hand the page map to the Content Brief stage.
Anything else → deliver the blocker list and stop.

## Never Do

- Never treat the raw onboarding form or the current website as final truth.
- Never approve child services because the parent is approved.
- Never proceed past `Unknown` on a build-critical field.
- Never invent licenses, certifications, response times, ratings, or service areas.
- Never mark the AM's `Verified Intake Status` — that is a human's signature, not yours.
