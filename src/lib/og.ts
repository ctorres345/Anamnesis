import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { makeBlot, BLOT_W } from './inkblot';

/**
 * Social preview image (1200x630 PNG) for one post, drawn at build time.
 * Colors are the light-theme design tokens (src/styles/tokens.css): a PNG can't read CSS variables.
 */
const C = {
  paper: '#eef1ea', sheet: '#fdfdfb', ink: '#1d231e', muted: '#646b64', line: '#e3e7df',
  matcha: '#b9d19a', matchaDeep: '#5f7d45', lavender: '#d8cff3', lavenderSoft: '#f1edfb', lavenderDeep: '#6a58a8',
  sky: '#c6dff2', peach: '#f6d0b5', butter: '#f2e7a8',
};
const KIND_COLOR: Record<string, string> = {
  project: C.sky, psychology: C.lavender, game: C.peach, thought: C.matcha, 'video-idea': C.butter,
};
const CELL: Record<string, string> = { m: C.matcha, d: C.matchaDeep, l: '#a99bd6', p: C.peach };

const require = createRequire(import.meta.url);
const font = (pkg: string, file: string) => readFileSync(require.resolve(`@fontsource/${pkg}/files/${file}`));
let fonts: { name: string; data: Buffer; weight: 400 | 600 | 700; style: 'normal' }[] | undefined;
function loadFonts() {
  fonts ??= [
    { name: 'Hanken', data: font('hanken-grotesk', 'hanken-grotesk-latin-600-normal.woff'), weight: 600, style: 'normal' },
    { name: 'Mono', data: font('geist-mono', 'geist-mono-latin-400-normal.woff'), weight: 400, style: 'normal' },
    { name: 'Hand', data: font('caveat', 'caveat-latin-600-normal.woff'), weight: 600, style: 'normal' },
  ];
  return fonts;
}

type Node = { type: string; props: Record<string, unknown> };
const el = (type: string, style: Record<string, unknown>, children?: unknown): Node => ({ type, props: { style, children } });

/** Stable number from text, so each post gets its own inkblot. */
export function seedFrom(text: string): number {
  let h = 2166136261;
  for (const ch of text) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return h >>> 0;
}

export interface OgInput {
  title: string;
  kindLabel: string;
  kind: string;
  note?: string;
  id: string;
}

export async function renderOg({ title, kindLabel, kind, note, id }: OgInput): Promise<Buffer> {
  const cells = makeBlot(seedFrom(id));
  const rows = [];
  for (let y = 0; y < cells.length / BLOT_W; y++) {
    rows.push(
      el('div', { display: 'flex', gap: 3 }, cells.slice(y * BLOT_W, (y + 1) * BLOT_W).map((c) =>
        el('div', { width: 17, height: 17, borderRadius: 2, background: CELL[c] ?? 'transparent' }),
      )),
    );
  }

  const tree = el('div', { width: 1200, height: 630, display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.paper, fontFamily: 'Hanken' }, [
    el('div', { width: 1100, height: 530, display: 'flex', background: C.sheet, borderRadius: 36, padding: '56px 60px', gap: 40, alignItems: 'center' }, [
      el('div', { display: 'flex', flexDirection: 'column', flex: 1, gap: 22 }, [
        el('div', { display: 'flex' }, [
          el('div', { display: 'flex', fontFamily: 'Mono', fontSize: 22, padding: '6px 14px', borderRadius: 8, background: KIND_COLOR[kind] ?? C.matcha, color: C.ink }, kindLabel),
        ]),
        el('div', { display: 'flex', fontSize: title.length > 60 ? 50 : 60, lineHeight: 1.06, letterSpacing: -2, color: C.ink }, title),
        note ? el('div', { display: 'flex', fontFamily: 'Hand', fontSize: 34, color: C.lavenderDeep }, note) : el('div', { display: 'flex' }),
        el('div', { display: 'flex', fontFamily: 'Mono', fontSize: 22, color: C.muted, marginTop: 'auto' }, 'cjtech.dev'),
      ]),
      el('div', { display: 'flex', flexDirection: 'column', gap: 3, padding: 24, background: C.lavenderSoft, borderRadius: 24 }, rows),
    ]),
  ]);

  const svg = await satori(tree as never, { width: 1200, height: 630, fonts: loadFonts() });
  return new Resvg(svg).render().asPng();
}
