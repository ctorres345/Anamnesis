# Writing a post

> The full step-by-step guide lives inside the Obsidian vault: `src/content/journal/_guide/` (start with `00 Start here.md`). It is not published.

Every post is one Markdown file. Spanish posts go in `src/content/journal/es/`, English posts in `src/content/journal/en/`. The file name becomes the URL: `es/mi-post.md` → `cjtech.dev/es/journal/mi-post/`.

## Steps
1. Copy a template from `src/content/journal/_templates/` (or insert it in Obsidian).
2. Fill in the properties (the part between the `---` lines).
3. Write the post below them.
4. Set `draft: false` when it's ready.
5. Commit and push. The site rebuilds.

## Properties
| Property | Required | Example | What it does |
|---|---|---|---|
| `title` | yes | `Hollow Knight, 40 hours later` | Post title |
| `date` | yes | `2026-11-02` | Sort order and date shown |
| `kind` | yes | `project`, `psychology`, `game`, `thought`, `video-idea` | Color and filter |
| `translationKey` | yes | `hollow-knight` | Same value in the es and en files links them |
| `summary` | no | one sentence | Shown under the title in lists |
| `note` | no | `flow state, again` (max 40 characters) | Handwritten margin note |
| `tags` | no | `[metroidvania]` | |
| `draft` | no | `true` | Hidden on the live site, visible with `npm run dev` |
| `sample` | no | `true` | Shows a "sample" badge |
| `game:` | when `kind: game` | `platform`, `status` (playing / finished / dropped), `hours`, `rating` 1–5 | Game shelf card |
| `project:` | no | `url`, `repo`, `stack` | Link on the post page |
| `video:` | when `kind: video-idea` | `stage` (idea / script / recorded / published), `youtubeUrl` | |

If a property is wrong (for example `rating: 7`), `npm run build` stops and says which file and field to fix, so a broken post never goes live.

## Obsidian setup (one time)
1. Clone the repo on your computer.
2. In Obsidian: **Open folder as vault** → choose `src/content/journal`.
3. Settings → **Templates** (core plugin): template folder = `_templates`.
4. Settings → **Files and links**: "Use [[Wikilinks]]" on, "New link format" = "Shortest path when possible", "Default location for new attachments" = "In subfolder under current folder", name `assets`. `[[post]]` links and `![[image.png]]` embeds work; a link to a missing post fails the build.
5. Install the community plugin **Obsidian Git**. Use "Commit and push" when a post is ready, and "Pull" before you start writing so you get changes made with Claude Code.

New post in Obsidian: create a note inside `es/` or `en/` → command "Insert template" → pick the kind → fill the properties.
