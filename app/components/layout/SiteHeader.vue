<script setup lang="ts">
import { GITHUB_REPOSITORY_URL, SECTION_ANCHORS } from '~/content/siteLinks'

const HEADER_SCROLL_THRESHOLD_PX = 24

const { themePreference: _themePreference, toggleTheme } = useThemePreference()
const { hasScrolledPastThreshold } = useScrollThreshold(HEADER_SCROLL_THRESHOLD_PX)

const NAVIGATION_LINKS = [
  { href: SECTION_ANCHORS.problem, label: 'Problem' },
  { href: SECTION_ANCHORS.answer, label: 'Answer' },
  { href: SECTION_ANCHORS.enforcement, label: 'Enforcement' },
  { href: SECTION_ANCHORS.identity, label: 'Identity' },
  { href: SECTION_ANCHORS.format, label: 'Format' },
  { href: SECTION_ANCHORS.scope, label: 'Scope' },
  { href: SECTION_ANCHORS.openCore, label: 'Open core' },
  { href: SECTION_ANCHORS.status, label: 'Status' },
] as const
</script>

<template>
  <header class="site-header" :class="{ 'site-header--over-artwork': !hasScrolledPastThreshold }">
    <div class="page-container site-header__inner">
      <a :href="SECTION_ANCHORS.top" class="site-header__brand" aria-label="Histos, home">
        <MastMark />
        <span class="site-header__brand-name">Histos</span>
      </a>

      <nav class="site-header__nav" aria-label="Sections">
        <a v-for="link in NAVIGATION_LINKS" :key="link.href" :href="link.href">{{ link.label }}</a>
      </nav>

      <div class="site-header__actions">
        <button
          class="site-header__theme-toggle"
          type="button"
          aria-label="Toggle colour theme"
          @click="toggleTheme"
        >
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.7">
            <circle cx="12" cy="12" r="4.2" />
            <path
              stroke-linecap="round"
              d="M12 2.6v2.1M12 19.3v2.1M4.2 4.2l1.5 1.5M18.3 18.3l1.5 1.5M2.6 12h2.1M19.3 12h2.1M4.2 19.8l1.5-1.5M18.3 5.7l1.5-1.5"
            />
          </svg>
        </button>
        <a class="site-header__repo-link" :href="GITHUB_REPOSITORY_URL" rel="noopener">GitHub</a>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;
@use '~/assets/scss/mixins' as *;

$theme-toggle-size: 34px;

.site-header {
  // Fixed, not sticky. A sticky header participates in normal flow and so
  // occupies its own 60px band above the hero - which is exactly the pale strip
  // that made the artwork start below the fold instead of behind the bar.
  position: fixed;
  inset: 0 0 auto;
  z-index: 50;
  background: color-mix(in srgb, var(--page-background) 88%, transparent);
  backdrop-filter: blur(12px);
  border-bottom: $border-hairline solid var(--border-subtle);
  transition:
    background $transition-theme,
    border-color $transition-theme,
    color $transition-theme;

  // Floating over the hero photograph: no bar, and the hero's light palette.
  &--over-artwork {
    background: transparent;
    backdrop-filter: none;
    border-bottom-color: transparent;

    --text-primary: #f4f6f9;
    --text-secondary: #c9d2de;
    --border-subtle: rgb(255 255 255 / 22%);
    --border-strong: rgb(255 255 255 / 34%);
    --surface-raised: rgb(255 255 255 / 8%);

    color: var(--text-primary);

    .site-header__repo-link {
      background: rgb(255 255 255 / 8%);
      backdrop-filter: blur(6px);
    }
  }

  &__inner {
    display: flex;
    align-items: center;
    gap: $space-medium;
    height: $header-height;
  }

  &__brand {
    display: flex;
    align-items: center;
    gap: $space-tiny;
    text-decoration: none;
    font-weight: 660;
    letter-spacing: -0.02em;
    font-size: $font-size-lede-small;
    flex-shrink: 0;
  }

  &__nav {
    display: none;
    gap: $space-medium - 2px;
    margin-inline: auto;
    font-size: $font-size-detail;

    @include from-wide {
      display: flex;
    }

    a {
      color: var(--text-secondary);
      text-decoration: none;
      transition: color $transition-fast;

      &:hover {
        color: var(--text-primary);
      }
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: $space-tiny + 2px;
    margin-left: auto;

    @include from-wide {
      margin-left: 0;
    }
  }

  &__theme-toggle {
    display: grid;
    place-items: center;
    width: $theme-toggle-size;
    height: $theme-toggle-size;
    border-radius: $radius-small;
    border: $border-hairline solid var(--border-subtle);
    background: transparent;
    color: var(--text-secondary);
    cursor: pointer;
    transition:
      color $transition-fast,
      border-color $transition-fast;

    &:hover {
      color: var(--text-primary);
      border-color: var(--border-strong);
    }
  }

  &__repo-link {
    display: inline-flex;
    align-items: center;
    padding: $space-tiny - 1px $space-small + 2px;
    border-radius: $radius-base;
    border: $border-hairline solid var(--border-strong);
    background: var(--surface-raised);
    font-size: $font-size-detail;
    font-weight: $font-weight-semibold;
    text-decoration: none;
    transition: border-color $transition-fast;

    &:hover {
      border-color: var(--accent);
    }
  }
}
</style>
