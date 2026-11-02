# 04 · Publish, edit, hide

## Publish
1. Make sure `draft: false`.
2. `Cmd + P` → *Obsidian Git: Commit all changes* → write a short message, for example `New post: Hollow Knight`.
3. `Cmd + P` → *Obsidian Git: Push*.
4. Wait about 1 minute. Cloudflare builds the site and the post is live.

Shortcut: *Obsidian Git: Commit and sync* does pull + commit + push in one step.

## Edit a published post
Edit the note → commit → push. Same as publishing.

## Hide a post (without deleting it)
Set `draft: true` → commit → push. It disappears from the site but stays in your vault.

## Delete a post
Delete the note (and its images in `assets/` if no other post uses them) → commit → push.

## Change the date order
Posts are sorted by `date`, newest first. Change `date` to move a post.

## Remove the sample posts
The posts with `sample: true` are placeholders. Delete them (in `es/` and `en/`) when you have real posts.

## How do I know it worked?
- Open the post on cjtech.dev after ~1 minute.
- Or in GitHub, open the repo: a green check next to the last commit means it published. A red X means it failed: see [06 When something fails](06%20When%20something%20fails.md).
