# Agent Website Builder — Shared Working Tree Rules

Multiple Claude sessions work in this checkout at the same time (system work and client
site builds). These rules exist because sessions have destroyed each other's work:

1. **Never write a shared file from memory.** Before editing anything under
   `starter/scripts/`, `starter/package.json`, `starter/src/components/`, or `docs/`,
   run `git diff <file>` and re-read the file AS IT IS ON DISK NOW. Three times a session
   has rewritten shared files from stale context and silently reverted committed work
   (deleting `scripts/validate-built-html.mjs`, stripping `package.json` script entries).
   Preserve every line you did not write.
2. **Never delete, weaken, or bypass a validator.** `scripts/validate-artifacts.mjs`,
   `scripts/validate-built-html.mjs`, and the `validate:*`/`check*` npm scripts are
   committed enforcement (PIPELINE.md → Rejection Encoding Rule). When a validator fails,
   fix the defect it names. If you believe a check itself is wrong, leave it in place and
   raise it with the human.
3. **Commit only your own paths** with targeted `git add <paths>` — never `git add -A` /
   `git commit -a`. `git pull --rebase` before pushing.
4. Authorities: `docs/agency-website-system/CORE_CONTRACTS.md` (§1–24) governs all builds;
   `PIPELINE.md` governs stage order and gates. Where a skill and these files disagree,
   these files win.
5. Validation commands (run from `starter/`): `npm run check` (artifacts),
   `npm run check:built` (build + built-HTML checks), `npm run validate:launch`
   (pre-launch gate: no stray noindex, robots + sitemap present).
