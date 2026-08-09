/**
 * Tracks whether the page has scrolled past a pixel threshold.
 *
 * Used by the header, which floats transparently over the dark hero artwork at
 * the top of the page and becomes a normal themed bar once anything has scrolled
 * underneath it.
 */
export function useScrollThreshold(thresholdInPixels: number) {
  const hasScrolledPastThreshold = ref(false)

  function updateScrollState(): void {
    hasScrolledPastThreshold.value = window.scrollY > thresholdInPixels
  }

  onMounted(() => {
    window.addEventListener('scroll', updateScrollState, { passive: true })
    updateScrollState()
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', updateScrollState)
  })

  return { hasScrolledPastThreshold }
}
