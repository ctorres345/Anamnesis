/**
 * cjtech.dev Worker. Static files are served by Cloudflare's asset handler;
 * this script only runs for /api/* (see run_worker_first in wrangler.jsonc).
 */
import { addAnswer, isAnswer, isPostId, readCounts, type KV } from './reactions';

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  REACTIONS: KV;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

/** Only count answers for posts that really exist on the site. */
async function postExists(env: Env, origin: string, post: string): Promise<boolean> {
  const [lang, slug] = post.split('/');
  const res = await env.ASSETS.fetch(new Request(`${origin}/${lang}/journal/${slug}/`));
  return res.ok;
}

export async function handleReactions(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);

  if (request.method === 'GET') {
    const post = url.searchParams.get('post');
    if (!isPostId(post)) return json({ error: 'bad post' }, 400);
    return json({ counts: await readCounts(env.REACTIONS, post) });
  }

  if (request.method === 'POST') {
    // Same-site requests only.
    if (request.headers.get('origin') !== url.origin) return json({ error: 'forbidden' }, 403);
    let body: { post?: unknown; answer?: unknown };
    try {
      body = await request.json();
    } catch {
      return json({ error: 'bad json' }, 400);
    }
    if (!isPostId(body.post) || !isAnswer(body.answer)) return json({ error: 'bad input' }, 400);
    if (!(await postExists(env, url.origin, body.post))) return json({ error: 'unknown post' }, 404);
    return json({ counts: await addAnswer(env.REACTIONS, body.post, body.answer) });
  }

  return json({ error: 'method not allowed' }, 405);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);
    if (pathname === '/api/reactions') return handleReactions(request, env);
    if (pathname.startsWith('/api/')) return json({ error: 'not found' }, 404);
    return env.ASSETS.fetch(request);
  },
};
