<script setup lang="ts">
// ἱστός - the mast. Upright, with the rigging that binds to it.
withDefaults(defineProps<{ sizeInPixels?: number }>(), { sizeInPixels: 22 })
</script>

<template>
  <svg
    class="mast-mark"
    :width="sizeInPixels"
    :height="sizeInPixels"
    viewBox="0 0 32 32"
    fill="none"
    aria-hidden="true"
  >
    <path d="M16 4v24" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" />
    <path d="M8.5 9.5h15" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" />
    <path d="M10.5 28c1.9-3.1 9.1-3.1 11 0" stroke="var(--accent)" stroke-width="2.2" stroke-linecap="round" />
    <path d="M16 9.5 10 20M16 9.5 22 20" stroke="var(--accent)" stroke-width="1.5" opacity="0.55" />
  </svg>
</template>

<style scoped lang="scss">
.mast-mark {
  flex-shrink: 0;
}
</style>
