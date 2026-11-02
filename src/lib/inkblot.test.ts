import { describe, expect, it } from 'vitest';
import { BLOT_H, BLOT_W, cardNumeral, makeBlot } from './inkblot';

describe('makeBlot', () => {
  it('is mirrored left to right', () => {
    for (const seed of [1, 1847, 9766, 123456]) {
      const cells = makeBlot(seed);
      expect(cells).toHaveLength(BLOT_W * BLOT_H);
      for (let y = 0; y < BLOT_H; y++) {
        for (let x = 0; x < BLOT_W / 2; x++) {
          expect(cells[y * BLOT_W + x]).toBe(cells[y * BLOT_W + (BLOT_W - 1 - x)]);
        }
      }
    }
  });

  it('gives the same card for the same seed', () => {
    expect(makeBlot(42)).toEqual(makeBlot(42));
  });

  it('draws a visible shape, not an empty or full grid', () => {
    const filled = makeBlot(1847).filter((c) => c !== 'e').length;
    expect(filled).toBeGreaterThan(40);
    expect(filled).toBeLessThan(BLOT_W * BLOT_H * 0.7);
  });
});

describe('cardNumeral', () => {
  it('cycles I to X', () => {
    expect(cardNumeral(0)).toBe('I');
    expect(cardNumeral(9)).toBe('X');
    expect(cardNumeral(10)).toBe('I');
  });
});
