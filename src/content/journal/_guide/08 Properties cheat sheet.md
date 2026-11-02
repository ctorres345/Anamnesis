# 08 · Properties cheat sheet

| Property | Required | Example | What it does |
|---|---|---|---|
| `title` | yes | `Hollow Knight, 40 hours later` | Title |
| `date` | yes | `2026-11-02` | Order and date shown |
| `kind` | yes | `project` · `psychology` · `game` · `thought` · `video-idea` | Color and filter |
| `translationKey` | yes | `hollow-knight` | Links the es and en versions |
| `summary` | no | one sentence | Shown under the title in lists |
| `note` | no | `flow state, again` | Handwritten margin note (max 40 characters) |
| `tags` | no | `[metroidvania, indie]` | Labels |
| `draft` | no | `true` / `false` | `true` = hidden on the site |
| `sample` | no | `true` | Shows a "sample" badge |

## Only for `kind: game` (required)
```yaml
game:
  platform: Switch
  status: playing     # playing | finished | dropped
  hours: 40           # optional
  rating: 4           # optional, 1 to 5
```

## Only for `kind: video-idea` (required)
```yaml
video:
  stage: idea         # idea | script | recorded | published
  youtubeUrl: https://youtu.be/...   # optional
```

## Optional for `kind: project`
```yaml
project:
  url: https://yuyay.cjtech.dev      # shows a button on the post
  repo: https://github.com/...
  stack: [Astro, TypeScript]
```
