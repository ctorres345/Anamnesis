import type { APIContext } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { useT } from '../../../lib/i18n';
import { splitId } from '../../../lib/journal';
import { renderOg } from '../../../lib/og';

/** /og/en/yuyay.png: social preview image for each published post. */
export async function getStaticPaths() {
  const entries = await getCollection('journal', (e) => !e.data.draft);
  return entries.map((entry) => {
    const { lang, slug } = splitId(entry.id);
    return { params: { lang, slug }, props: { entry } };
  });
}

export async function GET({ props }: APIContext) {
  const entry = (props as { entry: CollectionEntry<'journal'> }).entry;
  const { lang } = splitId(entry.id);
  const png = await renderOg({
    id: entry.id,
    title: entry.data.title,
    kind: entry.data.kind,
    kindLabel: useT(lang)(`kind.${entry.data.kind}`),
    note: entry.data.note,
  });
  return new Response(new Uint8Array(png), { headers: { 'content-type': 'image/png' } });
}
