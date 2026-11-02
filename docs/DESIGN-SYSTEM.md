# Design system: Mind Notebook

Every color, font, size, space and motion value the site uses. The values are **design tokens**: CSS variables defined once in `src/styles/tokens.css` and used everywhere else. Change a token there and the whole site follows.

Chosen on 2026-11-02. Reference mockup: https://claude.ai/artifact/Pq9GKt1Cj77ka4mkawsG4g

**Idea:** a clean notebook page. Each side of Cesar shows up in one detail:
| Side | Detail |
|---|---|
| Engineering | graph-paper background, mono font for data, the mind map as a graph |
| Psychology | lavender, the pixel inkblot, field notes, the Likert scale |
| Games | pixel art: inkblot cells, game-shelf icons |
| Art and writing | hand-drawn circle and highlighter, Caveat handwriting |

## Rules
1. Use tokens, never literal colors or sizes, in components.
2. Every color token has a light and a dark value.
3. Text on a pastel fill always uses `--on-pastel`.
4. Caveat (handwriting) only for short notes, never for paragraphs.
5. Motion stops when the visitor asks for reduced motion.

## Colors

### Surfaces and text
| Token | Light | Dark | Use |
|---|---|---|---|
| `--paper` | `#eef1ea` | `#121511` | Page background behind the sheet |
| `--grid` | `rgba(60,80,50,.07)` | `rgba(185,209,154,.05)` | Graph-paper lines |
| `--sheet` | `#fdfdfb` | `#191d18` | The rounded sheet, cards |
| `--line` | `#e3e7df` | `#2a3027` | Hairlines, borders |
| `--ink` | `#1d231e` | `#e9eee4` | Main text, dark buttons |
| `--muted` | `#6f776f` | `#98a094` | Secondary text |
| `--on-pastel` | `#1d231e` | `#161a15` | Text on any pastel fill |

### Brand
| Token | Light | Dark | Use |
|---|---|---|---|
| `--matcha` | `#b9d19a` | `#a9c48a` | Main color: highlighter, thoughts, "finished" |
| `--matcha-deep` | `#5f7d45` | `#b9d19a` | Matcha for text and icons |
| `--lavender` | `#d8cff3` | `#c3b8e8` | Second color: psychology, hand-drawn circle, "dropped" |
| `--lavender-soft` | `#f1edfb` | `#23212e` | Lavender bands (mind map, inkblot card) |
| `--lavender-deep` | `#6a58a8` | `#cdc3f0` | Links, margin notes, focus ring |

### One pastel per kind of entry
| Kind | Token | Light | Dark |
|---|---|---|---|
| `project` | `--sky` | `#c6dff2` | `#afcde6` |
| `psychology` | `--lavender` | `#d8cff3` | `#c3b8e8` |
| `game` | `--peach` | `#f6d0b5` | `#eebd9c` |
| `thought` | `--matcha` | `#b9d19a` | `#a9c48a` |
| `video-idea` | `--butter` | `#f2e7a8` | `#e5d991` |

Game status uses the same pastels: `playing` = peach, `finished` = matcha, `dropped` = lavender.

**How to use:** put `data-kind="game"` (or `data-status="playing"`) on an element and read `var(--hl)`. Example: `.chip-kind { background: var(--hl); color: var(--on-pastel); }`.

## Typography
| Token | Font | Weights loaded | Use |
|---|---|---|---|
| `--font-display` | Hanken Grotesk | 400, 500, 600, 700 | Headings and body text |
| `--font-mono` | Geist Mono | 400, 500 | Dates, tags, numbers, small labels |
| `--font-hand` | Caveat | 600 | Margin notes, "what do you see?" |

Fonts are self-hosted with Fontsource, Latin subset only (covers English and Spanish). Hanken Grotesk 400 and 600 are preloaded.

### Type scale
| Token | Size | Use |
|---|---|---|
| `--step-0` | `1rem` | Body |
| `--step-1` | `clamp(1.125rem, 1rem + 0.6vw, 1.375rem)` | Entry titles in lists, lede |
| `--step-2` | `clamp(1.5rem, 1.2rem + 1.4vw, 2.125rem)` | Section titles inside bands |
| `--step-3` | `clamp(1.875rem, 1.4rem + 2.4vw, 3rem)` | Page and section headings |
| `--step-4` | `clamp(2.25rem, 1.4rem + 4.2vw, 4.375rem)` | Home hero |
| `--step-giant` | `clamp(3.5rem, 13.5vw, 11.5rem)` | Footer name |

Headings use tight letter spacing (`-0.03em` to `-0.06em`) and `text-wrap: balance`. Body text stays under ~66 characters per line.

## Space, shape and motion
| Token | Value | Use |
|---|---|---|
| `--space-1` … `--space-7` | 4, 8, 12, 16, 24, 40, 64 px | Gaps and padding |
| `--gutter` | `clamp(18px, 4.5vw, 64px)` | Side padding inside the sheet |
| `--radius-s` | 6px | Chips, badges |
| `--radius-m` | 16px | Cards, panels |
| `--radius-l` | 24px | Large cards (inkblot, entry box) |
| `--radius-sheet` | 28px | The sheet |
| `--dur` | 0.25s | Standard transition |
| `--ease-pop` | `cubic-bezier(.3,1.4,.6,1)` | Playful bounce (inkblot cells, notes) |

## Components
| Component | File | Notes |
|---|---|---|
| Header, language switch, theme toggle | `src/components/Header.astro`, `ThemeToggle.astro` | Theme saved in `localStorage` |
| Footer with giant name | `src/components/Footer.astro` | Profile links from `src/lib/site.ts` |
| Pixel inkblot card | `src/islands/Inkblot.tsx`, `src/lib/inkblot.ts` | 18×14 cells, mirrored; "just for fun, not a test" |
| Mind map | `src/islands/MindMap.tsx`, `src/lib/mindmap.ts` | Topics and links are data |
| Field-notes list | `src/islands/JournalList.tsx` | Filters only on the journal page |
| Likert scale | `src/islands/Likert.tsx` | 5 points, "not at all" → "a lot" |
| Game shelf | `src/components/GameShelf.astro` | Cover color = status |
| Kind chip, sample badge | `.chip-kind`, `.badge-sample` in `global.css` | |
| Buttons | `.btn`, `.btn.dark` in `global.css` | Pill shape |
| Highlighter | `.mark` in `global.css` | Matcha band under a word |

## Accessibility
- Text colors meet WCAG AA on their backgrounds in both themes.
- Visible focus ring (`--lavender-deep`) on every control; "skip to content" link.
- Decorative graphics (inkblot, pixel icons) are hidden from screen readers.
- All motion is disabled under `prefers-reduced-motion`.
