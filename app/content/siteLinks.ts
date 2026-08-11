/**
 * Every outbound destination the site uses, in one place.
 *
 * The repository URL in particular appears in the header, the hero, the closing
 * call to action and four footer rows - having it written out seven times is how
 * a rename leaves three of them pointing somewhere dead.
 */
export const GITHUB_REPOSITORY_URL = 'https://github.com/Szesnasty/histos'

export const SPEC_SCHEMA_URL = '/spec/policy-0.1.schema.json'
export const SPEC_DECISION_CODES_URL = '/spec/decision-codes.json'
export const SPEC_CONFORMANCE_MANIFEST_URL = '/spec/conformance-manifest.json'

/**
 * A link to a section of the landing page, usable from any route.
 *
 * A bare `#problem` means "on whichever page you are already on", which was true
 * while there was one page. From `/sweep` it resolves to `/sweep#problem` and does
 * nothing at all — the header nav silently stopped working the moment a second route
 * existed. Routing it through NuxtLink also applies the deployment base URL, which a
 * hand-written path does not get.
 */
export function landingSection(anchor: string) {
  return { path: '/', hash: anchor }
}

export const SECTION_ANCHORS = {
  top: '#top',
  problem: '#problem',
  answer: '#answer',
  enforcement: '#enforcement',
  sweep: '#sweep',
  whyPolicy: '#why-policy',
  identity: '#identity',
  format: '#format',
  scope: '#scope',
  openCore: '#open-core',
  status: '#status',
  getStarted: '#get-started',
} as const
