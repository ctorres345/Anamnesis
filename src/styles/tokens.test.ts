import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

// Checks that every text/icon color pair in tokens.css meets WCAG AA, in light and dark.
const css = readFileSync(fileURLToPath(new URL('./tokens.css', import.meta.url)), 'utf8');

function tokens(block: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const m of block.matchAll(/--([a-z0-9-]+):\s*(#[0-9a-f]{6})/gi)) out[m[1]] = m[2];
  return out;
}

const light = tokens(css.slice(css.indexOf(':root {'), css.indexOf('@media (prefers-color-scheme: dark)')));
const dark = { ...light, ...tokens(css.slice(css.indexOf(":root[data-theme='dark']"))) };

function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

// [text or icon, background, minimum ratio]. 4.5 = normal text, 3 = icons and large text.
const PAIRS: [string, string, number][] = [
  ['ink', 'sheet', 4.5],
  ['ink', 'paper', 4.5],
  ['muted', 'sheet', 4.5],
  ['muted', 'lavender-soft', 4.5],
  ['lavender-deep', 'sheet', 4.5],
  ['lavender-deep', 'lavender-soft', 4.5],
  ['sheet', 'ink', 4.5],
  ['on-pastel', 'matcha', 4.5],
  ['on-pastel', 'lavender', 4.5],
  ['on-pastel', 'sky', 4.5],
  ['on-pastel', 'peach', 4.5],
  ['on-pastel', 'butter', 4.5],
  ['matcha-deep', 'sheet', 3],
  ['sky-deep', 'sheet', 3],
  ['peach-deep', 'sheet', 3],
];

describe.each([
  ['light', light],
  ['dark', dark],
])('%s theme contrast', (_name, t) => {
  it.each(PAIRS)('%s on %s ≥ %s', (fg, bg, min) => {
    expect(t[fg], `missing token --${fg}`).toBeDefined();
    expect(t[bg], `missing token --${bg}`).toBeDefined();
    expect(contrast(t[fg], t[bg])).toBeGreaterThanOrEqual(min);
  });
});
