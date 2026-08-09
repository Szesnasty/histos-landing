import type { TitledParagraph } from './problemContent'

export const POLICY_FORMAT_PRINCIPLES: TitledParagraph[] = [
  {
    title: 'Readable by humans',
    body: 'A security policy should be reviewable in a pull request, by someone who does not read Python.',
  },
  {
    title: 'Strict enough for machines',
    body: 'Validated, canonicalized, deterministic. The same document hashes the same everywhere - which is what policy pinning and approvals rest on.',
  },
  {
    title: 'Designed to outlive one runtime',
    body: 'The runtime may grow. The policy remains the contract, and the contract is the part worth getting right slowly.',
  },
]
