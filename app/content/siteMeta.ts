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
 * The description is deliberately 158 characters: long enough to carry both
 * directions of the boundary, short enough to survive the ~160-character
 * truncation in a result listing intact.
 */
export const SITE_TITLE = 'Histos - the small Python policy gate for agent tool calls'

export const SITE_DESCRIPTION =
  'Histos is a small in-process Python policy gate around agent tool calls: authorize proposed actions before execution, constrain tool output before it returns.'

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
