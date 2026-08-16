/**
 * The released version of the library, as published.
 *
 * It is `histos.__version__` and the PyPI release, written here once: the hero
 * badge, the status section and the page's structured data all state it, and a
 * version that disagrees with itself in three places is worse than no version
 * at all. Bump it here when a release goes out.
 */
export const HISTOS_VERSION = '0.1.0'

export interface ReleaseStatusEntry {
  title: string
  body: string
  availableNow: boolean
}

export const RELEASE_STATUS_ENTRIES: ReleaseStatusEntry[] = [
  {
    title: 'Histos Python',
    body: `Released: v${HISTOS_VERSION} on PyPI, the reference runtime, under Apache-2.0.`,
    availableNow: true,
  },
  {
    title: 'Histos Policy Format',
    body: 'Draft 0.1: implemented, documented, and pinned by a conformance corpus.',
    availableNow: true,
  },
  {
    title: 'CLI and developer workflow',
    body: 'Ships with the package: policy loading, validation, review, coverage, tool import and definition drift as CI gates.',
    availableNow: true,
  },
  {
    title: 'Additional runtimes and organizational tooling',
    body: 'Evolves after real adoption, not before it.',
    availableNow: false,
  },
]
