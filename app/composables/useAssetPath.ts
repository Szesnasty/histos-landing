/**
 * Prefixes an absolute site path with the deployment base URL.
 *
 * The site is served from the root of usehistos.dev, so `app.baseURL` is `/` and
 * this is a no-op today. It stays because it is the single place that would have
 * to change if the site were ever served from a subpath again: Nuxt rewrites its
 * own generated asset URLs, but not strings written by hand in markup.
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
