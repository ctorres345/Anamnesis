# 01 · One-time setup

Do this once per computer.

## A. Get the vault
1. Clone the repo: `https://github.com/ctorres345/Anamnesis`
2. Obsidian → **Open folder as vault** → pick `Anamnesis/src/content/journal`

## B. Settings → Files and links
| Setting | Value |
|---|---|
| Use [[Wikilinks]] | **Off** |
| New link format | **Relative path to file** |
| Default location for new attachments | **In subfolder under current folder** |
| Subfolder name | `assets` |

Why: the site reads normal Markdown links. With these settings, pasting an image creates `![](assets/image.png)`, which the site understands.

## C. Settings → Core plugins → Templates
| Setting | Value |
|---|---|
| Template folder location | `_templates` |
| Date format | `YYYY-MM-DD` |

## D. Settings → Community plugins → Obsidian Git
1. Install and enable **Obsidian Git**.
2. Recommended options:
   - **Pull on startup**: on
   - **Auto pull interval**: 10 minutes
   - Leave **auto commit/push off**, so you decide when something goes live.
3. Sign in to GitHub when it asks (on Mac it uses your normal git login).

## E. Check it works
1. Open the command palette (`Cmd + P`).
2. Run **Obsidian Git: Pull**.
3. You should see the notes in `es/` and `en/`.
