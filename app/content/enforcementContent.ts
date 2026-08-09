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
}

export interface PolicyPrimitiveGroup {
  groupLabel: string
  primitives: string[]
}

export const PRE_TOOL_CHECKS: NamedCheck[] = [
  { name: 'Tool access', question: 'may this role call this tool at all?' },
  { name: 'Argument schema', question: 'are names, types, ranges, enums and patterns valid?' },
  { name: 'Trusted binding', question: 'replace model-controlled values with trusted principal attributes.' },
  {
    name: 'Resource authorization',
    question: 'does the caller actually own or have access to the target resource?',
  },
  { name: 'State conditions', question: 'is the resource currently in a state where this action is allowed?' },
  { name: 'Rate limits', question: 'how often may this action happen?' },
  { name: 'Budgets', question: 'how much cumulative action is permitted?' },
  {
    name: 'Canary / secret screening',
    question: 'is the call carrying a planted token or a verified secret out?',
  },
  { name: 'Confirmation', question: 'must a human approve this exact action first?' },
]

export const POST_TOOL_CHECKS: NamedCheck[] = [
  { name: 'Return schema', question: 'does the result match the declared contract?' },
  { name: 'Projection', question: 'only declared fields leave the boundary.' },
  { name: 'Sensitive-field redaction', question: 'remove fields marked as sensitive.' },
  { name: 'Secret redaction', question: 'stop supported secrets from flowing back into context.' },
  { name: 'Canary redaction', question: 'strip planted tokens out when they surface.' },
  { name: 'Exception redaction', question: 'errors do not become accidental exfiltration channels.' },
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
