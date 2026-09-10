# References — where the agency's live sources live

Agent-facing. These are the ONLY authoritative locations for the shared libraries the pipeline
reads. Added 2026-09-10 after a build asserted "briefs exist" / "77 briefs missing" without ever
opening a brief: the system named the master library but never said where it was.

## Master Restoration SEO Template (Google Sheet)

- URL: https://docs.google.com/spreadsheets/d/1lGvFQHzioF3C7cu9dj4M3hkXqDEzwwaj53nbqVCw7aE/edit
- Drive fileId: `1lGvFQHzioF3C7cu9dj4M3hkXqDEzwwaj53nbqVCw7aE` · owner `info@restorationgrowthpartners.com` (RGP shared drive)
- Tabs that matter:
  - **`Content Briefs`** — one row per master service page: page URL → **Google Doc URL of the brief**. This is the brief library. A brief exists if and only if its Doc URL is here and the Doc opens.
  - `Page Map` — the master restoration URL schema, page types, P1–P4 priorities, keyword volumes. A ROW here is NOT a brief.
  - `Brief Queue` — requested/new briefs awaiting SEO approval.
- Status columns in this sheet are NOT evidence of anything. The Doc is the evidence: read its metadata (title, modifiedTime) and record the title in the artifact.

## Brief documents (Google Docs)

- Canonical form: the Google Doc linked from the `Content Briefs` tab (`https://docs.google.com/document/d/<id>`). Read via the Drive connector; a successful metadata read proves access, a content read is required before copy is written from it.
- Local markdown exports (for example under `~/Desktop/romexterra/content-briefs/`) are DERIVATIVES — older, duplicated, and unversioned. Never treat them as the source; never map a page to one.

## Client Local SEO Sheet

- Per client, supplied by the AM at kickoff. Must be a NATIVE Google Sheet (an uploaded `.xlsx` — `rtpof=true` in the URL — cannot be read reliably; ask for conversion or a CSV).
- Required tab `AM Verified Website Intake` — does not exist on the template yet (open item; interim: intake facts in chat, recorded verbatim).

## Access-proof rule (all stages)

Before a stage claims to have used any external source, it records in the Source Snapshot WHAT it opened: fileId, title, tab names or page count, modifiedTime. "I read the sheet" without those is an assertion, not evidence, and a Blocked handoff. A source that cannot be opened is a hard stop — ask for CSV, pasted text, or access; never infer its contents from something else.
