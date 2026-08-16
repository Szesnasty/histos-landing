<script setup lang="ts">
/**
 * The mark: a gold H.
 *
 * It replaces a literal drawing of the mast - upright, yard, rigging, hull -
 * which at the sizes this actually renders at (22px in the header, 16px in a
 * browser tab) collapsed into a crucifix. A mark that reads as a religious
 * symbol at a glance is not a mark for this product, however well the mast
 * suits the name.
 *
 * The crossbar sits above centre rather than on it: that is the yard of the
 * mast, and it is what keeps the letterform from being an anonymous H while
 * still being unmistakably an H. The etymology stays where it belongs, in
 * words, in the footer.
 */
withDefaults(defineProps<{ sizeInPixels?: number }>(), { sizeInPixels: 22 })
</script>

<template>
  <svg
    class="histos-mark"
    :width="sizeInPixels"
    :height="sizeInPixels"
    viewBox="0 0 32 32"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M10 7v18M22 7v18M10 13.5h12"
      stroke="var(--accent)"
      stroke-width="3"
      stroke-linecap="round"
    />
  </svg>
</template>

<style scoped lang="scss">
.histos-mark {
  flex-shrink: 0;
}
</style>
