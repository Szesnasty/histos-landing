<script setup lang="ts">
import { SITE_ORIGIN, absoluteSiteUrl } from '~/content/siteMeta'

/**
 * Applied before first paint so the page never flashes the wrong theme. This
 * cannot live in `useThemePreference` - a composable runs after hydration, by
 * which time the wrong palette has already been painted.
 */
const APPLY_STORED_THEME_BEFORE_PAINT = `(function(){try{var t=localStorage.getItem('histos-theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t)}}catch(e){}})()`

/**
 * One canonical URL per route, and an `og:url` that agrees with it.
 *
 * It is built here rather than page by page so a new route cannot be added
 * without one - a page with no canonical, or with the landing page's canonical
 * copied onto it, is how two URLs end up competing for the same content.
 *
 * The trailing slash is deliberate: a prerendered `/sweep` is written as
 * `/sweep/index.html` and therefore served at `/sweep/`, which is the URL the
 * canonical must name. Query and hash are dropped - neither identifies a
 * different document here.
 */
const route = useRoute()
const canonicalUrl = computed(() => {
  const path = route.path.endsWith('/') ? route.path : `${route.path}/`
  return path === '/' ? `${SITE_ORIGIN}/` : absoluteSiteUrl(path)
})

useHead({
  script: [{ innerHTML: APPLY_STORED_THEME_BEFORE_PAINT, tagPosition: 'head' }],
  link: [{ rel: 'canonical', href: canonicalUrl }],
  meta: [{ property: 'og:url', content: canonicalUrl }],
})
</script>

<template>
  <div class="app-shell">
    <a href="#main-content" class="app-shell__skip-link">Skip to content</a>
    <SiteHeader />
    <main id="main-content" class="app-shell__main">
      <NuxtPage />
    </main>
    <SiteFooter />
  </div>
</template>

<style lang="scss">
@use '~/assets/scss/variables' as *;

.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  &__main {
    flex: 1;
  }

  &__skip-link {
    position: absolute;
    left: -9999px;
    top: 0;
    background: var(--surface-raised);
    border: $border-hairline solid var(--accent);
    padding: $space-tiny + 2px $space-base;
    border-radius: $radius-base;
    z-index: 100;

    &:focus {
      left: $space-base;
      top: $space-base;
    }
  }
}
</style>
