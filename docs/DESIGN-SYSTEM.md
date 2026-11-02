# Design system: Mind Notebook

Chosen on 2026-11-02. Reference mockup: https://claude.ai/artifact/Pq9GKt1Cj77ka4mkawsG4g

Idea: a clean notebook page. Engineering shows in the graph paper and mono font, psychology in lavender, the inkblot, field notes and the Likert scale, games in pixels, art and writing in hand-drawn marks.

## Colors (`src/styles/tokens.css`)
| Token | Light | Use |
|---|---|---|
| `--matcha` | `#b9d19a` | Main color, highlighter, thoughts |
| `--matcha-deep` | `#5f7d45` | Matcha for text and icons |
| `--lavender` | `#d8cff3` | Second color, psychology, hand-drawn circles |
| `--lavender-deep` | `#6a58a8` | Links, margin notes, focus ring |
| `--sky` | `#c6dff2` | Projects |
| `--peach` | `#f6d0b5` | Games, "playing" |
| `--butter` | `#f2e7a8` | Video ideas |
| `--ink` / `--muted` | `#1d231e` / `#6f776f` | Text |
| `--paper` / `--sheet` / `--line` | | Page, sheet, hairlines |

Every token has a dark value. Put `data-kind="game"` (or `data-status="playing"`) on an element and use `var(--hl)` to get its pastel.

## Type
- **Hanken Grotesk**: headings and text.
- **Geist Mono**: dates, tags, numbers, small labels.
- **Caveat**: margin notes and small handwritten touches only.

## Components
| Component | File |
|---|---|
| Header, language switch, theme toggle | `src/components/Header.astro`, `ThemeToggle.astro` |
| Footer with giant name | `src/components/Footer.astro` |
| Pixel inkblot card | `src/islands/Inkblot.tsx` + `src/lib/inkblot.ts` |
| Mind map | `src/islands/MindMap.tsx` + `src/lib/mindmap.ts` |
| Field-notes list with filters | `src/islands/JournalList.tsx` |
| Likert scale | `src/islands/Likert.tsx` |
| Game shelf | `src/components/GameShelf.astro` |

## Motion
Hover lifts, color fills and page transitions (Astro `ClientRouter`). Everything stops under `prefers-reduced-motion`.
