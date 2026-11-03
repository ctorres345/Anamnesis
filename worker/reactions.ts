/**
 * Anonymous 1–5 answers per post ("Was this entry useful to you?").
 * Stores only five counts per post. No IP, no cookie, no visitor ID.
 */

export interface KV {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
}

export type Counts = [number, number, number, number, number];

const POST_ID = /^(es|en)\/[a-z0-9][a-z0-9-]{0,79}$/;

export function isPostId(value: unknown): value is string {
  return typeof value === 'string' && POST_ID.test(value);
}

export function isAnswer(value: unknown): value is 1 | 2 | 3 | 4 | 5 {
  return Number.isInteger(value) && (value as number) >= 1 && (value as number) <= 5;
}

export async function readCounts(kv: KV, post: string): Promise<Counts> {
  const raw = await kv.get(`r:${post}`);
  if (!raw) return [0, 0, 0, 0, 0];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length === 5 && parsed.every((n) => Number.isInteger(n) && n >= 0)) {
      return parsed as Counts;
    }
  } catch {
    // fall through: start again
  }
  return [0, 0, 0, 0, 0];
}

export async function addAnswer(kv: KV, post: string, answer: 1 | 2 | 3 | 4 | 5): Promise<Counts> {
  const counts = await readCounts(kv, post);
  counts[answer - 1] += 1;
  // KV is eventually consistent: two answers in the same second may count as one. Fine for a small site.
  await kv.put(`r:${post}`, JSON.stringify(counts));
  return counts;
}
