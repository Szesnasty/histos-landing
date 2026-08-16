import type { TitledParagraph } from './problemContent'

export const POLICY_FORMAT_PRINCIPLES: TitledParagraph[] = [
  {
    title: 'Readable by humans',
    body: 'A security policy should be reviewable in a pull request by someone who does not read Python.',
  },
  {
    title: 'Strict enough for machines',
    body: 'Strictly validated and canonicalized. The same document hashes the same everywhere, which policy pinning and approvals depend on.',
  },
  {
    title: 'Designed to outlive one runtime',
    body: 'Runtimes may change. The policy remains the reviewable contract.',
  },
]
