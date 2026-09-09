import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { site } from './src/data/site';

/**
 * `site` is required for canonical URLs and for the sitemap to emit absolute production
 * URLs (CORE_CONTRACTS §21, §22). It is read from src/data/site.ts (siteUrl) so canonical URLs,
 * the sitemap, robots.txt, and schema all derive from one value.
 */
export default defineConfig({
  site: site.siteUrl,
  integrations: [
    sitemap({
      /**
       * §21: only approved canonical, indexable routes belong in the sitemap.
       * Template preview routes are noindex,nofollow and are excluded from sitemaps by
       * contract (§17). The internal client-preview route is not a production page.
       */
      filter: (page) =>
        !page.includes('/templates/') && !page.includes('/clients/'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
