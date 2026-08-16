/**
 * The released version of the library, as published.
 *
 * It is `histos.__version__` and the PyPI release, written here once: the hero
 * badge, the status section and the page's structured data all state it, and a
 * version that disagrees with itself in three places is worse than no version
 * at all. Bump it here when a release goes out.
 */
export const HISTOS_VERSION = '0.1.1'

export interface ReleaseStatusEntry {
  title: string
  body: string
  availableNow: boolean
}

export const RELEASE_STATUS_ENTRIES: ReleaseStatusEntry[] = [
  {
    title: 'Histos Python',
    body: `v${HISTOS_VERSION} is live on PyPI: the Apache-2.0 reference runtime for Python 3.12+.`,
    availableNow: true,
  },
  {
    title: 'Histos Policy Format',
    body: 'Draft 0.1 is implemented, documented, backed by JSON Schema and pinned by a conformance corpus.',
    availableNow: true,
  },
  {
    title: 'CLI and developer workflow',
    body: 'Validation, review, coverage, tool import and definition-drift checks ship in the package and fit into CI.',
    availableNow: true,
  },
  {
    title: 'Raw Python, LangChain and LangGraph',
    body: 'The framework-free core, LangChain StructuredTool adapter and LangGraph ToolNode execution path ship and are exercised in the repository demos.',
    availableNow: true,
  },
  {
    title: 'Additional runtimes and organizational tooling',
    body: 'Not shipped. Additional runtimes and fleet operations wait for evidence from real adoption.',
    availableNow: false,
  },
]
