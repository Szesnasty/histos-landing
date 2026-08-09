export interface ReleaseStatusEntry {
  title: string
  body: string
  availableNow: boolean
}

export const RELEASE_STATUS_ENTRIES: ReleaseStatusEntry[] = [
  {
    title: 'Histos Python',
    body: 'Available now as the reference runtime, under Apache-2.0.',
    availableNow: true,
  },
  {
    title: 'Histos Policy Format',
    body: 'Draft 0.1: implemented, documented, and pinned by a conformance corpus.',
    availableNow: true,
  },
  {
    title: 'CLI and developer workflow',
    body: 'Policy loading, validation, review and coverage as a CI gate.',
    availableNow: true,
  },
  {
    title: 'Additional runtimes and organizational tooling',
    body: 'Evolves after real adoption, not before it.',
    availableNow: false,
  },
]
