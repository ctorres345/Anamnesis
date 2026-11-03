import { describe, expect, it } from 'vitest';
import { blobPath } from './blob';

describe('blobPath', () => {
  it('is closed and stable for a seed', () => {
    const d = blobPath(3);
    expect(d.startsWith('M')).toBe(true);
    expect(d.endsWith('Z')).toBe(true);
    expect(blobPath(3)).toBe(d);
    expect(blobPath(4)).not.toBe(d);
  });

  it('stays inside the 200x200 box', () => {
    const nums = blobPath(11).match(/-?\d+(\.\d+)?/g)!.map(Number);
    expect(Math.min(...nums)).toBeGreaterThanOrEqual(0);
    expect(Math.max(...nums)).toBeLessThanOrEqual(200);
  });
});
