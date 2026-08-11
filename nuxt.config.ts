// https://nuxt.com/docs/api/configuration/nuxt-config
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
    // `/` on a custom domain; `/<repository>/` on GitHub Pages, where the CI
    // workflow sets NUXT_APP_BASE_URL. Hand-written absolute paths in templates
    // go through `useAssetPath()` so both deployments resolve.
    baseURL: process.env.NUXT_APP_BASE_URL || '/',

    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Histos - the security boundary for agent tool calls',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },

        // The site must not be indexed. `robots.txt` deliberately *allows*
        // crawling: a `Disallow` would stop the crawler ever fetching the page,
        // and therefore ever reading this tag - which is how URLs end up
        // indexed with no content rather than not indexed at all.
        { name: 'robots', content: 'noindex, nofollow' },
        { name: 'googlebot', content: 'noindex, nofollow' },

        {
          name: 'description',
          content:
            'Histos makes the tool call a security boundary in both directions: which tools an agent may call, with which arguments, against whose records, and what may come back. It does not detect prompt injection - it bounds what a manipulated agent can actually do. In-process, fail-closed, with zero runtime dependencies in the core.',
        },
        { name: 'theme-color', content: '#0b0d10', media: '(prefers-color-scheme: dark)' },
        { name: 'theme-color', content: '#fbfaf8', media: '(prefers-color-scheme: light)' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Histos - the security boundary for agent tool calls' },
        {
          property: 'og:description',
          content: 'The model proposes. Policy decides. Deterministic enforcement at the tool call, in both directions.',
        },
        { name: 'twitter:card', content: 'summary_large_image' },
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
