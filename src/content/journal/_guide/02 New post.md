# 02 · New post

## Steps
1. **Pull first**: `Cmd + P` → *Obsidian Git: Pull*
2. Create a note **inside `es/` or `en/`**.
   - The file name becomes the address. Use lowercase and dashes: `hollow-knight-review.md` → `cjtech.dev/en/journal/hollow-knight-review/`
3. `Cmd + P` → *Templates: Insert template* → pick the kind:

| Template | Use it for | Color |
|---|---|---|
| `project` | Things you build | sky blue |
| `psychology` | Class notes, ideas from psychology | lavender |
| `game` | Games you play | peach |
| `thought` | Anything else | matcha |
| `video-idea` | Ideas for videos | butter yellow |

4. Fill the properties at the top:
   - **title**: the post title
   - **summary**: one sentence (shows in lists)
   - **note**: a short margin note, max 40 characters (shows handwritten)
   - **translationKey**: a short id, like `hollow-knight`. Use the **same one** in the other language's version.
5. Write the post below the properties.
6. When it's ready, change **draft** from `true` to `false`.
7. Publish: see [04 Publish, edit, hide](04%20Publish%2C%20edit%2C%20hide.md).

## Example (game)
```yaml
---
title: Hollow Knight, 40 hours later
date: 2026-11-02
kind: game
summary: What kept me playing after the first boss.
note: flow state, again
tags: [metroidvania]
translationKey: hollow-knight
draft: false
game:
  platform: Switch
  status: playing     # playing | finished | dropped
  hours: 40
  rating: 4           # 1 to 5
---
```

## Formatting you can use
| Write | Get |
|---|---|
| `## Heading` | Section title |
| `**bold**`, `*italic*` | **bold**, *italic* |
| `> text` | Lavender quote box |
| `[text](https://...)` | Link |
| `` `code` `` | Inline code |
| `- item` | List |
