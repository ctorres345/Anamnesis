import { describe, expect, it, vi } from 'vitest';

vi.mock('astro:content', () => ({ getCollection: vi.fn() }));
const { relatedEntries, tagCounts, tagSlug } = await import('./journal');

type E = Parameters<typeof relatedEntries>[0];
const entry = (id: string, kind: string, tags: string[], day: number) =>
  ({ id, data: { kind, tags, date: new Date(2026, 9, day) } }) as unknown as E;

describe('tagSlug', () => {
  it('makes URL-safe slugs, also for Spanish accents', () => {
    expect(tagSlug('Psicometría')).toBe('psicometria');
    expect(tagSlug('Cognitive psych')).toBe('cognitive-psych');
  });
});

describe('tagCounts', () => {
  it('counts tags across posts', () => {
    const list = [entry('a', 'game', ['indie', 'metroidvania'], 1), entry('b', 'game', ['indie'], 2)];
    expect(tagCounts(list)).toEqual([
      { tag: 'indie', slug: 'indie', count: 2 },
      { tag: 'metroidvania', slug: 'metroidvania', count: 1 },
    ]);
  });
});

describe('relatedEntries', () => {
  it('prefers shared tags, then the same kind, and skips the post itself', () => {
    const me = entry('me', 'game', ['indie'], 5);
    const sameTag = entry('tag', 'thought', ['indie'], 1);
    const sameKind = entry('kind', 'game', [], 9);
    const other = entry('other', 'project', [], 9);
    expect(relatedEntries(me, [me, other, sameKind, sameTag]).map((e) => e.id)).toEqual(['tag', 'kind']);
  });
});
