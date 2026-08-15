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
    body: 'That is a different class of system, working on meaning rather than on capability.',
  },
  {
    title: 'It does not authenticate callers',
    body: 'It relies on a trusted identity established by your environment, and cannot verify that you established it correctly.',
  },
  {
    title: 'It does not replace backend authorization',
    body: 'The system of record remains the final authority, especially between the moment of the check and the moment of execution.',
  },
  {
    title: 'It does not protect tools it never sees',
    body: 'Complete mediation depends on the adapter and the integration. A tool nobody wrapped is a tool nobody bounded.',
  },
  {
    title: 'It does not bound a whole agent run',
    body: 'Budgets and rate limits count per identity and tool, inside one process. There is no run or session scope yet, so the honest claim is a ceiling on every single action - not a ceiling on how many actions a loop may attempt.',
  },
  {
    title: 'It does not solve human intent',
    body: 'It enforces what the policy allows, not what someone later wishes it had said.',
  },
  {
    title: 'It does not run an agent fleet',
    body: 'There is no agent registry, identity provider, sandbox or hosted control plane. Histos is the local Python enforcement layer; organization-wide operations are a separate product problem.',
  },
]
