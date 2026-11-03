# 07 · Maintaining the site

Posts are done in Obsidian. Everything else is code: do it with Claude Code on the Anamnesis repo (it can push straight to `main` in this repo).

## What to change, and where
| I want to change… | File | How |
|---|---|---|
| GitHub / LinkedIn / other profile links | `src/lib/site.ts` | Ask Claude Code, or edit the list |
| Mind map topics and links | `src/lib/mindmap.ts` | Ask Claude Code |
| Menu and button text (es/en) | `src/lib/i18n.ts` | Ask Claude Code |
| Colors and fonts | `src/styles/tokens.css` | See `docs/DESIGN-SYSTEM.md` |
| The tools on the Stack page | `src/pages/[lang]/stack.astro` | Ask Claude Code |
| Post properties (new field, new kind) | `src/content.config.ts` + `_templates/` | Ask Claude Code |

## Good prompts for Claude Code
- "Add a YouTube link to the profile links."
- "Add a new kind of post called `art` with its own pastel color."
- "Update all packages, run the checks and push to main."
- "The last publish failed, here is the error: …"

## Routine (once a month, ~10 minutes)
1. Ask Claude Code: *"Update dependencies, run lint, tests and build, and push to main if everything passes."*
2. Open cjtech.dev on your phone and computer and check the home page, one post and the games page.
3. Delete or update anything marked `sample`.

## Where things live
| What | Where |
|---|---|
| Code and posts | GitHub: `ctorres345/Anamnesis` |
| Hosting and build logs | Cloudflare dashboard → Workers & Pages → anamnesis |
| Which branch publishes | `main` only (Settings → Build → Branch control). If pushes stop showing up on the site, check this first |
| Domain | Cloudflare → cjtech.dev |
| Docs for developers | `docs/` folder in the repo |
