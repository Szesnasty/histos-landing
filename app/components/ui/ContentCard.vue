<script setup lang="ts">
defineProps<{
  title: string
  body: string
}>()
</script>

<template>
  <article class="content-card">
    <h3 class="content-card__title">{{ title }}</h3>
    <p class="content-card__body">{{ body }}</p>
  </article>
</template>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;
@use '~/assets/scss/mixins' as *;

.content-card {
  @include surface-card;

  &__title {
    margin-bottom: $space-tiny;
  }

  &__body {
    color: var(--text-secondary);
  }
}
</style>
