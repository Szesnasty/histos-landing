<script setup lang="ts">
defineProps<{
  eyebrow: string
  heading: string
  /** Optional second line under the heading, at lede weight. */
  subheading?: string
}>()
</script>

<template>
  <header class="section-heading">
    <p class="section-heading__eyebrow">{{ eyebrow }}</p>
    <h2 class="section-heading__title">{{ heading }}</h2>
    <p v-if="subheading" class="section-heading__subtitle">{{ subheading }}</p>
  </header>
</template>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;
@use '~/assets/scss/mixins' as *;

.section-heading {
  &__eyebrow {
    @include monospace-label($font-size-caption);

    color: var(--accent-text);
    font-weight: $font-weight-strong;
    margin-bottom: $space-base;
  }

  &__subtitle {
    margin-top: $space-tiny;
    color: var(--text-secondary);
    font-weight: $font-weight-medium;
    font-size: $font-size-lede-small;

    @include from-medium {
      font-size: $font-size-lede;
    }
  }
}
</style>
