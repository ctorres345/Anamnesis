/** Cell colors of a pixel inkblot. "e" = empty. */
export type BlotCell = 'e' | 'm' | 'd' | 'l' | 'p';

export const BLOT_W = 18;
export const BLOT_H = 14;

/** Small seeded random generator (mulberry32), so the same seed gives the same card. */
function rng(seed: number): () => number {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Builds a mirrored (left/right symmetric) pixel inkblot.
 * Random left half, smoothed into blobs, then copied to the right half.
 * Returns BLOT_W * BLOT_H cells, row by row.
 */
export function makeBlot(seed: number): BlotCell[] {
  const W = BLOT_W;
  const H = BLOT_H;
  const HALF = W / 2;
  const r = rng(seed);

  let g: number[][] = [];
  for (let y = 0; y < H; y++) {
    const row: number[] = [];
    for (let x = 0; x < HALF; x++) {
      const dx = (HALF - 1 - x) / HALF; // 0 next to the middle line
      const dy = Math.abs(y - (H - 1) / 2) / (H / 2);
      const wing = 0.5 + 0.5 * Math.sin((y / H) * Math.PI * 2 + x * 0.5); // uneven edge
      const p =
        1.5 *
        Math.pow(1 - dx, 0.75) *
        Math.pow(Math.max(0, 1 - dy * (0.75 + 0.35 * dx)), 0.8) *
        (0.6 + 0.4 * wing);
      row.push(r() < p ? 1 : 0);
    }
    g.push(row);
  }

  for (let pass = 0; pass < 2; pass++) {
    const next = g.map((row) => row.slice());
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < HALF; x++) {
        let k = 0;
        for (let yy = -1; yy <= 1; yy++) {
          for (let xx = -1; xx <= 1; xx++) {
            if (!xx && !yy) continue;
            let X = x + xx;
            const Y = y + yy;
            if (X >= HALF) X = 2 * HALF - 1 - X; // mirror across the middle
            if (Y >= 0 && Y < H && X >= 0 && g[Y][X]) k++;
          }
        }
        next[y][x] = k >= 5 ? 1 : k <= 2 ? 0 : g[y][x];
      }
    }
    g = next;
  }

  const cells: BlotCell[] = Array.from({ length: W * H }, () => 'e' as const);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < HALF; x++) {
      let cell: BlotCell = 'e';
      if (g[y][x]) {
        const core = x >= HALF - 2 && Math.abs(y - (H - 1) / 2) < 2;
        const v = r();
        cell = core ? (v < 0.6 ? 'l' : 'd') : v < 0.07 ? 'p' : v < 0.3 ? 'd' : 'm';
      }
      cells[y * W + x] = cell;
      cells[y * W + (W - 1 - x)] = cell;
    }
  }
  return cells;
}

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

/** Card number shown on the inkblot, I to X, then back to I. */
export function cardNumeral(index: number): string {
  return ROMAN[((index % ROMAN.length) + ROMAN.length) % ROMAN.length];
}
