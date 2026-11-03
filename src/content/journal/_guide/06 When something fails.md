# 06 · When something fails

The site checks every post before publishing. If something is wrong, **the old version stays live** and nothing breaks. You just need to fix the mistake.

## How to see the error
1. GitHub → repo **Anamnesis** → the red X next to your last commit → **Details**.
   Or: Cloudflare dashboard → Workers & Pages → **anamnesis** → Deployments → the failed one → logs.
2. Look for the line that names a **file** and a **field**.

## Common errors
| Message says… | Cause | Fix |
|---|---|---|
| `kind: ... Invalid option` | `kind` misspelled | Use `project`, `psychology`, `game`, `thought` or `video-idea` |
| `kind: game needs a "game:" block` | Game post without the `game:` part | Insert the `game` template again |
| `rating ... Too big` | `rating` above 5 | Use 1 to 5 |
| `status ... Invalid option` | Game status misspelled | `playing`, `finished` or `dropped` |
| `note ... Too big` | Margin note too long | 40 characters max |
| `date ... Invalid date` | Wrong date format | `YYYY-MM-DD`, like `2026-11-02` |
| `translationKey ... Required` | Missing translationKey | Add one, like `my-post` |
| `ImageNotFound ... assets/x.png` | Image file missing or renamed | Paste the image again, or fix the path |
| `must live in es/ or en/` | Post outside those folders | Move the note into `es/` or `en/` |
| `Broken link [[x]] in post.md` | A `[[link]]` to a post that doesn't exist | Fix the name, or create that post |
| `Tests ... failed` / `lint` | A code change broke something | Ask Claude Code with the error |

Then: fix → commit → push.

## Obsidian Git says "conflict"
It means the same file changed in two places (for example, you and Claude Code). Easiest fix: ask Claude Code to resolve it, or copy your text somewhere safe, run *Obsidian Git: Pull*, and paste your changes back.

## Still stuck
Open a Claude Code session on the Anamnesis repo and paste the error message.
