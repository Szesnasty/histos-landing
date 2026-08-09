<script setup lang="ts">
withDefaults(
  defineProps<{
    href: string
    variant?: 'primary' | 'secondary' | 'ghost'
    /** External links get `rel="noopener"`; internal anchors must not. */
    external?: boolean
  }>(),
  { variant: 'secondary', external: false },
)
</script>

<template>
  <a
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
