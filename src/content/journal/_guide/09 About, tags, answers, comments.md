# 09 · About, tags, answers, comments

## Edit the About page
Open `pages/en/about.md` (and `pages/es/about.md`). Edit it like a post, then commit and push.
Properties: `title`, `summary`, `note`. You can use `[[links]]` to posts.

## Tags
- Add `tags: [indie, metroidvania]` to a post.
- Each tag gets its own page: `cjtech.dev/en/tags/indie/`. All tags: `cjtech.dev/en/tags/`.
- Spanish accents are fine: `psicometría` becomes `/tags/psicometria/`.
- "Keep reading" at the end of each post picks posts with the same tags first, then the same kind.

## The 1–5 answers
- Visitors answer "Was this entry useful to you?" once per post. Only the count of each answer is saved, nothing about the visitor.
- After answering, they see small bars with how everyone answered.
- To see the numbers yourself: open the post and answer, or open
  `cjtech.dev/api/reactions?post=en/yuyay` (language/file-name).

## Comments (one-time setup)
Comments use GitHub Discussions. They stay hidden until this is done:
1. GitHub → **Anamnesis** → Settings → General → Features → turn on **Discussions**.
2. In Discussions, create a category named **Comments** (type: Announcement, so only you and giscus create threads).
3. Install the giscus app: https://github.com/apps/giscus → only the Anamnesis repo.
4. Open https://giscus.app, enter `ctorres345/Anamnesis`, pick the **Comments** category, and copy the `data-category-id` value.
5. Ask Claude Code: *"Set the giscus categoryId to <value>"* (it goes in `src/lib/site.ts`).

Moderate comments from the Discussions tab on GitHub. Visitors need a GitHub account to comment.

## Search
Press `Ctrl K` (or `/`) on the site, or the magnifier in the header. It searches posts and About in the current language.
