import { describe, expect, it } from 'vitest';
import worker from './index';
import type { KV } from './reactions';

function env(existing = ['/en/journal/yuyay/']) {
  const store = new Map<string, string>();
  const kv: KV = { get: async (k) => store.get(k) ?? null, put: async (k, v) => void store.set(k, v) };
  const assets = {
    fetch: async (req: Request) => new Response('', { status: existing.includes(new URL(req.url).pathname) ? 200 : 404 }),
  };
  return { ASSETS: assets, REACTIONS: kv, store };
}

const O = 'https://cjtech.dev';
const post = (body: unknown, origin = O) =>
  new Request(`${O}/api/reactions`, { method: 'POST', headers: { origin, 'content-type': 'application/json' }, body: JSON.stringify(body) });

describe('reactions API', () => {
  it('counts answers per post', async () => {
    const e = env();
    await worker.fetch(post({ post: 'en/yuyay', answer: 5 }), e);
    const res = await worker.fetch(post({ post: 'en/yuyay', answer: 4 }), e);
    expect(await res.json()).toEqual({ counts: [0, 0, 0, 1, 1] });
    const get = await worker.fetch(new Request(`${O}/api/reactions?post=en/yuyay`), e);
    expect(await get.json()).toEqual({ counts: [0, 0, 0, 1, 1] });
  });

  it('rejects other sites, bad input and unknown posts', async () => {
    const e = env();
    expect((await worker.fetch(post({ post: 'en/yuyay', answer: 5 }, 'https://evil.example'), e)).status).toBe(403);
    expect((await worker.fetch(post({ post: 'en/yuyay', answer: 9 }), e)).status).toBe(400);
    expect((await worker.fetch(post({ post: '../etc', answer: 1 }), e)).status).toBe(400);
    expect((await worker.fetch(post({ post: 'en/nope', answer: 1 }), e)).status).toBe(404);
    expect(e.store.size).toBe(0);
  });

  it('passes every other path to the static files', async () => {
    const e = env(['/en/']);
    expect((await worker.fetch(new Request(`${O}/en/`), e)).status).toBe(200);
  });
});
