import { getCollection, type CollectionEntry } from 'astro:content';
import { isLang, isoDay, useT, type Lang } from './i18n';
import type { Row } from '../islands/JournalList';

export type Entry = CollectionEntry<'journal'>;

/** "en/yuyay" -> { lang: "en", slug: "yuyay" } */
export function splitId(id: string): { lang: Lang; slug: string } {
  const [lang, ...rest] = id.split('/');
  if (!isLang(lang)) throw new Error(`Journal entry "${id}" must live in es/ or en/`);
  return { lang, slug: rest.join('/') };
}

export function entryUrl(entry: Entry): string {
  const { lang, slug } = splitId(entry.id);
  return `/${lang}/journal/${slug}/`;
}

/** Published entries in one language, newest first. Drafts are hidden in production builds. */
export async function getEntries(lang: Lang): Promise<Entry[]> {
  const all = await getCollection(
    'journal',
    (e) => splitId(e.id).lang === lang && (import.meta.env.DEV || !e.data.draft),
  );
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** The same post in the other language, if it exists. */
export async function findTranslation(entry: Entry, lang: Lang): Promise<Entry | undefined> {
  const list = await getEntries(lang);
  return list.find((e) => e.data.translationKey === entry.data.translationKey);
}

/** Rough reading time: 200 words per minute, at least 1. */
export function readingMinutes(body: string | undefined): number {
  const words = (body ?? '').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}


/** Plain data for the JournalList island. */
export function toRows(entries: Entry[], lang: Lang): Row[] {
  const t = useT(lang);
  return entries.map((e) => ({
    url: entryUrl(e),
    title: e.data.title,
    summary: e.data.summary,
    date: isoDay(e.data.date),
    kind: e.data.kind,
    kindLabel: t(`kind.${e.data.kind}`),
    note: e.data.note,
    sample: e.data.sample,
  }));
}
