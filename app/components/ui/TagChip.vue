<script setup lang="ts">
withDefaults(
  defineProps<{
    /** `key` marks the chips that describe the runtime, not its licence and versions. */
    tone?: 'neutral' | 'allow' | 'warn' | 'key'
  }>(),
  { tone: 'neutral' },
)
</script>

<template>
  <span class="tag-chip" :class="`tag-chip--${tone}`">
    <slot />
  </span>
</template>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;

.tag-chip {
  display: inline-flex;
  align-items: center;
  gap: $space-hair;
  font-family: $font-family-mono;
  font-size: $font-size-micro;
  letter-spacing: 0.04em;
  padding: 3px $space-tiny;
  border-radius: $radius-pill;
  border: $border-hairline solid var(--border-strong);
  color: var(--text-secondary);
  white-space: nowrap;

  &--allow {
    color: var(--verdict-allow);
    border-color: color-mix(in srgb, var(--verdict-allow) 45%, transparent);
    background: var(--verdict-allow-surface);
  }

  &--warn {
    color: var(--verdict-warn);
    border-color: color-mix(in srgb, var(--verdict-warn) 45%, transparent);
    background: var(--verdict-warn-surface);
  }

  &--key {
    color: var(--accent-text);
    border-color: color-mix(in srgb, var(--accent) 55%, transparent);
    background: rgb(232 176 75 / 10%);
  }
}
</style>
