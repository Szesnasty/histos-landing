export interface ReleaseStatusEntry {
  title: string
  body: string
  availableNow: boolean
}

export const RELEASE_STATUS_ENTRIES: ReleaseStatusEntry[] = [
  {
    title: 'Histos Python',
    body: 'Source available now under Apache-2.0. Version 0.1.0 is the PyPI release candidate, not a published package yet.',
    availableNow: true,
  },
  {
    title: 'Histos Policy Format',
    body: 'Draft 0.1: implemented, documented, and pinned by a conformance corpus.',
    availableNow: true,
  },
  {
    title: 'CLI and developer workflow',
    body: 'Policy loading, validation, review, coverage, tool import and definition drift as CI gates.',
    availableNow: true,
  },
  {
    title: 'Additional runtimes and organizational tooling',
    body: 'Evolves after real adoption, not before it.',
    availableNow: false,
  },
]
