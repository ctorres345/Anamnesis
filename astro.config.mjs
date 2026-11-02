// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://cjtech.dev',
  integrations: [
    // Preact: same component code as React, ~4 KB instead of ~65 KB of JavaScript.
    preact(),
    mdx(),
    sitemap({ i18n: { defaultLocale: 'es', locales: { es: 'es-PE', en: 'en-US' } } }),
  ],
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },
});
