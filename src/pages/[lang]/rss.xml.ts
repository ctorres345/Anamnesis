import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { LANGS, useT, type Lang } from '../../lib/i18n';
import { entryUrl, getEntries } from '../../lib/journal';

export function getStaticPaths() {
  return LANGS.map((lang) => ({ params: { lang } }));
}

export async function GET(context: APIContext) {
  const lang = context.params.lang as Lang;
  const t = useT(lang);
  const entries = await getEntries(lang);
  return rss({
    title: `cjtech.dev · ${t('site.tagline')}`,
    description: t('journal.intro'),
    site: context.site ?? 'https://cjtech.dev',
    items: entries.map((e) => ({
      title: e.data.title,
      pubDate: e.data.date,
      description: e.data.summary,
      link: entryUrl(e),
      categories: [e.data.kind, ...e.data.tags],
    })),
    customData: `<language>${lang}</language>`,
  });
}
