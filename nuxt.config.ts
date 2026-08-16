// https://nuxt.com/docs/api/configuration/nuxt-config
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SOCIAL_IMAGE_PATH,
  absoluteSiteUrl,
} from './app/content/siteMeta'

export default defineNuxtConfig({
  compatibilityDate: '2025-08-09',
  devtools: { enabled: false },

  // Static output. The site is a set of files: it can sit on any static host,
  // which is also what makes `public/spec/` a legitimate home for the schema the
  // policy format's `$id` points at.
  ssr: true,
  nitro: {
    prerender: {
      // Both routes listed explicitly. Crawling is off because most of the other
      // links are into `public/spec/` and `public/sweep.jsonl`, which are static
      // files rather than routes - the crawler would try to prerender them and fail.
      routes: ['/', '/sweep'],
      crawlLinks: false,
    },
  },

  // Components are addressed by their own names - `<HeroSection>`, not
  // `<SectionsHeroSection>` - so the directory structure can be reorganised
  // without touching a single template.
  components: [{ path: '~/components', pathPrefix: false }],

  css: ['~/assets/scss/main.scss'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: { api: 'modern-compiler' },
      },
    },
  },

  app: {
    // The site is served from the root of its own domain, usehistos.dev. It is
    // deliberately not read from an environment variable: a build that silently
    // came out prefixed with `/<repository>/` would break every absolute path
    // once the custom domain is in front of it.
    baseURL: '/',

    head: {
      htmlAttrs: { lang: 'en' },
      title: SITE_TITLE,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },

        { name: 'robots', content: 'index, follow' },

        { name: 'description', content: SITE_DESCRIPTION },
        { name: 'theme-color', content: '#0b0d10', media: '(prefers-color-scheme: dark)' },
        { name: 'theme-color', content: '#fbfaf8', media: '(prefers-color-scheme: light)' },

        // `og:url` is set per route in `app.vue`, alongside the canonical it has
        // to agree with. Everything here is a default a page may override.
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: SITE_NAME },
        { property: 'og:title', content: SITE_TITLE },
        { property: 'og:description', content: SITE_DESCRIPTION },
        { property: 'og:image', content: absoluteSiteUrl(SOCIAL_IMAGE_PATH) },
        {
          property: 'og:image:alt',
          content: 'Odysseus lashed to the mast as the Sirens sing - the Histos hero artwork',
        },

        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: SITE_TITLE },
        { name: 'twitter:description', content: SITE_DESCRIPTION },
        { name: 'twitter:image', content: absoluteSiteUrl(SOCIAL_IMAGE_PATH) },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href:
            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%230b0d10'/%3E%3Cpath d='M16 5v22M9 10h14M11 27c2-3 8-3 10 0' stroke='%23e8b04b' stroke-width='2.2' stroke-linecap='round' fill='none'/%3E%3C/svg%3E",
        },
      ],
    },
  },
})
