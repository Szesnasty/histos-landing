<script setup lang="ts">
withDefaults(
  defineProps<{
    /** An absolute URL or an in-page anchor. */
    href?: string
    /**
     * An internal route. Rendered through NuxtLink so the deployment base URL is
     * applied — a hand-written `/sweep` 404s on GitHub Pages, where the site is
     * served from `/<repository>/`.
     */
    to?: string
    variant?: 'primary' | 'secondary' | 'ghost'
    /** External links get `rel="noopener"`; internal anchors must not. */
    external?: boolean
  }>(),
  { href: undefined, to: undefined, variant: 'secondary', external: false },
)
</script>

<template>
  <NuxtLink v-if="to" class="app-button" :class="`app-button--${variant}`" :to="to">
    <slot />
  </NuxtLink>
  <a
    v-else
    class="app-button"
    :class="`app-button--${variant}`"
    :href="href"
    :rel="external ? 'noopener' : undefined"
  >
    <slot />
  </a>
</template>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;

.app-button {
  display: inline-flex;
  align-items: center;
  gap: $space-tiny;
  padding: $space-small $space-base + 2px;
  border-radius: $radius-base;
  border: $border-hairline solid var(--border-strong);
  background: var(--surface-raised);
  font-size: $font-size-body-small;
  font-weight: $font-weight-semibold;
  text-decoration: none;
  cursor: pointer;
  transition:
    border-color $transition-fast,
    transform $transition-fast,
    background $transition-fast;

  &:hover {
    border-color: var(--accent);
    transform: translateY(-1px);
  }

  &--primary {
    background: var(--text-primary);
    color: var(--page-background);
    border-color: var(--text-primary);

    &:hover {
      border-color: var(--text-primary);
      opacity: 0.9;
    }
  }

  &--ghost {
    background: rgb(255 255 255 / 7%);
    backdrop-filter: blur(6px);
  }
}
</style>
