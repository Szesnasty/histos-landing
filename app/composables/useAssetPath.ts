/**
 * Prefixes an absolute site path with the deployment base URL.
 *
 * On a custom domain the base is `/` and this is a no-op. On GitHub Pages the
 * site is served from `/<repository>/`, and a hardcoded `/img/hero.webp` in a
 * template would 404 - Nuxt rewrites its own generated asset URLs, but not
 * strings written by hand in markup.
 */
export function useAssetPath() {
  const { app } = useRuntimeConfig()

  function withBasePath(absolutePath: string): string {
    const base = app.baseURL || '/'
    const normalisedBase = base.endsWith('/') ? base.slice(0, -1) : base
    return `${normalisedBase}${absolutePath}`
  }

  return { withBasePath }
}
