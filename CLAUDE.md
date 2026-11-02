# Anamnesis (cjtech.dev)

Cesar's personal site and journal at `cjtech.dev`: projects, psychology, games, thoughts and video ideas. Spanish and English. Style: "Mind Notebook" (see `docs/DESIGN-SYSTEM.md`).

## Commands
- `npm run dev`: local site at http://localhost:4321
- `npm run build`: `astro check` (types) + static build into `dist/`
- `npm test`: Vitest. `npm run lint`: oxlint.
- `npm run deploy`: build + `wrangler deploy` (Cloudflare Workers static assets, custom domain `cjtech.dev`).
- Run `npm run lint && npm test && npm run build` before saying a change is done.

## How it's built
- Astro (static output) + React islands (`src/islands/`) only for interactive parts: inkblot, mind map, journal filters, Likert scale. Everything else is plain HTML.
- Posts: `src/content/journal/{es,en}/*.md`, schema in `src/content.config.ts`. `translationKey` links the es and en versions. `_templates/` holds Obsidian templates and is not published.
- UI text: `src/lib/i18n.ts` (es and en). Post text never goes there.
- Design tokens: `src/styles/tokens.css`. Use tokens, never literal colors. Every color needs a dark value.
- Mind map topics and links: `src/lib/mindmap.ts`. Profile links (GitHub, LinkedIn): `src/lib/site.ts`.

## Rules
- Cost zero: static hosting on Cloudflare free tier. No paid services.
- No tracking that identifies people. No cookies. `localStorage` only for the theme choice.
- The inkblot and the Likert scale are decoration and feedback only. Never present anything as a psychological test or interpret visitors.
- `sample: true` marks placeholder posts; remove them as real posts arrive.
- Code, comments and commits in English. Interface text in both languages.
