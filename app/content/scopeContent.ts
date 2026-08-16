import type { TitledParagraph } from './problemContent'

/**
 * What Histos does not do.
 *
 * This list mirrors `SECURITY.md` in the library and has to keep mirroring it.
 * A limit somebody discovers in production was a lie on the website.
 */
export const SCOPE_LIMITATIONS: TitledParagraph[] = [
  {
    title: 'It does not detect prompt injection',
    body: 'It works on capability, not on interpreting whether text is malicious.',
  },
  {
    title: 'It does not authenticate callers',
    body: 'It consumes a principal established by your host and cannot verify that the host bound it correctly.',
  },
  {
    title: 'It does not replace backend authorization',
    body: 'The system of record remains the final authority, especially across the check-to-execution gap.',
  },
  {
    title: 'It does not protect tools it never sees',
    body: 'Complete mediation depends on your integration. A tool you do not wrap is a tool Histos cannot bound.',
  },
  {
    title: 'It does not bound a whole agent run',
    body: 'Budgets and rate limits are per identity and tool inside one process. There is no run or session scope yet.',
  },
  {
    title: 'It does not solve human intent',
    body: 'It enforces the written policy, not what someone later wishes that policy had meant.',
  },
  {
    title: 'It does not run an agent fleet',
    body: 'There is no agent registry, identity provider, sandbox or hosted control plane. Histos is the local enforcement layer inside a Python host.',
  },
]
