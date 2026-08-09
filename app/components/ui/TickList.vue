<script setup lang="ts">
withDefaults(
  defineProps<{
    items: string[]
    /** Ticks assert "this exists"; dots merely enumerate. */
    marker?: 'tick' | 'dot'
  }>(),
  { marker: 'tick' },
)
</script>

<template>
  <ul class="tick-list" :class="`tick-list--${marker}`">
    <li v-for="item in items" :key="item">{{ item }}</li>
  </ul>
</template>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;

.tick-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: $space-tiny;
  font-size: $font-size-body-small;
  color: var(--text-secondary);

  li {
    padding-left: $space-medium;
    position: relative;

    &::before {
      position: absolute;
      left: 0;
    }
  }

  &--tick li::before {
    content: '✓';
    color: var(--verdict-allow);
    font-weight: $font-weight-strong;
  }

  &--dot li::before {
    content: '·';
    color: var(--text-tertiary);
    font-size: 1.4em;
    line-height: 1;
  }
}
</style>
