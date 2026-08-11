/**
 * The runtime-enforcement section.
 *
 * IMPORTANT: every capability listed in `POLICY_PRIMITIVE_GROUPS` is checked
 * against the shipped engine - seventeen come from `histos.ENGINE_FEATURES`, the
 * rest from the public API and CLI. Nothing here is roadmap. A capability that
 * only exists on a plan does not get to look like one that exists in a release.
 */

export interface NamedCheck {
  name: string
  question: string
  /**
   * Whether the check decides from a declared fact or has to recognise something.
   *
   * `structural` checks answer from the policy, the principal and the host's own
   * records: a role either holds a grant or it does not, an argument either matches
   * a schema or it does not, a caller either owns the resource or does not. There is
   * no recognition step, so there is no class of input that slips past by looking
   * unfamiliar.
   *
   * `recognition` checks have to identify something in a value — a secret, a planted
   * token. They are useful and they are not guarantees: what they have never seen,
   * they do not catch. Presenting them in one list with the structural checks is the
   * quickest way for a reader to over-trust the weaker half.
   */
  kind: 'structural' | 'recognition'
}

export interface PolicyPrimitiveGroup {
  groupLabel: string
  primitives: string[]
}

export const PRE_TOOL_CHECKS: NamedCheck[] = [
  { kind: 'structural', name: 'Tool access', question: 'may this role call this tool at all?' },
  { kind: 'structural', name: 'Argument schema', question: 'are names, types, ranges, enums and patterns valid?' },
  { kind: 'structural', name: 'Trusted binding', question: 'replace model-controlled values with trusted principal attributes.' },
  {
    kind: 'structural',
    name: 'Resource authorization',
    question: 'does the caller actually own or have access to the target resource?',
  },
  { kind: 'structural', name: 'State conditions', question: 'is the resource currently in a state where this action is allowed?' },
  { kind: 'structural', name: 'Rate limits', question: 'how often may this action happen?' },
  { kind: 'structural', name: 'Budgets', question: 'how much cumulative action is permitted?' },
  {
    kind: 'recognition',
    name: 'Canary / secret screening',
    question: 'is the call carrying a planted token or a verified secret out?',
  },
  { kind: 'structural', name: 'Confirmation', question: 'must a human approve this exact action first?' },
]

export const POST_TOOL_CHECKS: NamedCheck[] = [
  { kind: 'structural', name: 'Return schema', question: 'does the result match the declared contract?' },
  { kind: 'structural', name: 'Projection', question: 'only declared fields leave the boundary.' },
  { kind: 'structural', name: 'Sensitive-field redaction', question: 'remove fields marked as sensitive.' },
  { kind: 'recognition', name: 'Secret redaction', question: 'stop supported secrets from flowing back into context.' },
  { kind: 'recognition', name: 'Canary redaction', question: 'strip planted tokens out when they surface.' },
  { kind: 'structural', name: 'Exception redaction', question: 'errors do not become accidental exfiltration channels.' },
]

export const POLICY_PRIMITIVE_GROUPS: PolicyPrimitiveGroup[] = [
  {
    groupLabel: 'pre-tool',
    primitives: [
      'RBAC',
      'default deny',
      'role inheritance',
      'arg schema',
      'regex patterns',
      'numeric bounds',
      'string bounds',
      'enum',
      'array elements',
      'trusted binding',
      'resource ownership',
      'resource conditions',
      'rate limits',
      'budgets',
      'confirmation',
      'secret detection',
      'canary in arguments',
    ],
  },
  {
    groupLabel: 'post-tool',
    primitives: [
      'strict returns',
      'output projection',
      'sensitive redaction',
      'secret redaction',
      'canary redaction',
      'exception redaction',
    ],
  },
  {
    groupLabel: 'developer tooling',
    primitives: [
      'hash-chained audit',
      'audit verifier',
      'policy review',
      'coverage as a CI gate',
      'MCP / OpenAPI import',
      'canonical policy hash',
      'async tools',
    ],
  },
]

export const TOTAL_POLICY_PRIMITIVE_COUNT = POLICY_PRIMITIVE_GROUPS.reduce(
  (runningTotal, group) => runningTotal + group.primitives.length,
  0,
)

/** The step names drawn inside the gate diagram, in execution order. */
export const PRE_TOOL_DIAGRAM_STEPS: string[] = [
  'Role / tool access',
  'Argument validation',
  'Trusted argument binding',
  'Resource ownership',
  'Resource conditions',
  'Rate limits',
  'Budgets',
  'Canary / secret screening',
  'Human confirmation',
]

/**
 * Canary appears on both sides and does two different things: in an argument it
 * is a refusal (`canary_exfil`, DENY), in a result it is a removal
 * (`post_redaction`, REDACT). Naming them the same would blur that.
 */
export const POST_TOOL_DIAGRAM_STEPS: string[] = [
  'Return shape validation',
  'Output projection',
  'Sensitive-field redaction',
  'Secret redaction',
  'Canary redaction',
  'Exception redaction',
]
