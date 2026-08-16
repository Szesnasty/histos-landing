/**
 * The canonical identity of the deployed site.
 *
 * `SITE_ORIGIN` has no trailing slash so paths can be appended directly; every
 * absolute URL the page emits - canonical, `og:url`, `og:image`, the JSON-LD
 * `url` - is built from it, so the production domain is written once.
 *
 * The apex domain is canonical. `www.usehistos.dev` is expected to redirect here
 * at the DNS/Pages layer and must never appear in a canonical or `og:url`.
 */
export const SITE_ORIGIN = 'https://usehistos.dev'

export const SITE_NAME = 'Histos'

/**
 * The title and description are the page's own positioning, not a second one
 * written for search engines. They say the same thing the hero says - a small
 * Python policy gate, not a governance platform - because a result that
 * promises something the page does not deliver is a bounce, not a visit.
 *
 * The description stays below 160 characters so the integration paths and the
 * boundary survive ordinary search-result truncation intact.
 */
export const SITE_TITLE = 'Histos - deterministic policy enforcement for Python agent tools'

export const SITE_DESCRIPTION =
  'Fail-closed policy for agent tool calls in raw Python, LangChain and LangGraph. Bound actions before execution; constrain returned data before model context.'

/**
 * The hero painting, reused as the social card.
 *
 * TODO: this is 1920x822 (2.34:1), so `summary_large_image` and Open Graph
 * consumers crop it slightly rather than framing a card composed for the purpose.
 * A dedicated 1200x630 card is the correct asset; until one exists, an existing
 * real image beats a placeholder. JPEG rather than WebP because several card
 * renderers still do not fetch WebP.
 */
export const SOCIAL_IMAGE_PATH = '/img/hero-1920.jpg'

/**
 * An absolute URL for a site-root-relative path.
 *
 * Canonical tags, `og:url` and structured data all have to be absolute - a
 * relative one is either ignored or resolved against whatever host is serving.
 */
export function absoluteSiteUrl(path: string): string {
  return `${SITE_ORIGIN}${path.startsWith('/') ? path : `/${path}`}`
}
