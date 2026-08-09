/**
 * Drifts the hero artwork at a fraction of the scroll speed.
 *
 * Three deliberate details:
 *
 *  - the offset is **clamped**, so the frame never runs out from under the image
 *    and exposes the page background at its edge;
 *  - work stops once the hero has scrolled well out of view, rather than
 *    recalculating a transform nobody can see for the length of the page;
 *  - if the reader has asked for reduced motion the listener is never attached
 *    at all. A parallax nobody can turn off is a bug, not an effect.
 */
const PARALLAX_SPEED_FACTOR = 0.3
const MAXIMUM_PARALLAX_OFFSET_PX = 130
const STOP_WORK_AFTER_VIEWPORT_MULTIPLES = 1.3

export function useHeroParallax() {
  const parallaxLayerElement = ref<HTMLElement | null>(null)
  let pendingAnimationFrame = 0

  function scheduleParallaxUpdate(): void {
    if (pendingAnimationFrame) return

    pendingAnimationFrame = requestAnimationFrame(() => {
      pendingAnimationFrame = 0

      const layer = parallaxLayerElement.value
      if (!layer) return

      const scrollOffset = window.scrollY
      if (scrollOffset > window.innerHeight * STOP_WORK_AFTER_VIEWPORT_MULTIPLES) return

      const verticalDrift = Math.min(scrollOffset * PARALLAX_SPEED_FACTOR, MAXIMUM_PARALLAX_OFFSET_PX)
      layer.style.transform = `translate3d(0, ${verticalDrift}px, 0)`
    })
  }

  onMounted(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    window.addEventListener('scroll', scheduleParallaxUpdate, { passive: true })
    scheduleParallaxUpdate()
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', scheduleParallaxUpdate)
    if (pendingAnimationFrame) cancelAnimationFrame(pendingAnimationFrame)
  })

  return { parallaxLayerElement }
}
