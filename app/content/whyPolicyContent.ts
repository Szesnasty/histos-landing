/**
 * The answer to the most reasonable objection a developer can raise:
 * "why not just write the checks in code?"
 *
 * The section deliberately concedes the small case. Trying to sell a policy
 * engine to somebody with one agent and three tools is how a tool loses
 * credibility with everybody else.
 */
export interface NumberedArgument {
  title: string
  body: string
}

export const POLICY_OVER_CODE_ARGUMENTS: NumberedArgument[] = [
  {
    title: 'One place for the boundary',
    body: 'Security rules live in one policy instead of being scattered across tools, handlers and agent code.',
  },
  {
    title: 'Default-deny by design',
    body: 'A new or forgotten tool stays blocked until the policy explicitly grants it.',
  },
  {
    title: 'Reviewable security changes',
    body: 'Changing a refund limit from 500 to 5000 becomes an obvious policy diff, not a hidden application change.',
  },
  {
    title: 'Portable semantics',
    body: 'Ownership, trusted binding, confirmation, limits and output controls keep the same declared meaning.',
  },
  {
    title: 'Coverage and verification',
    body: 'Validate policy, find uncovered tool surfaces, detect drift and fail CI before deployment.',
  },
  {
    title: 'Audit without rebuilding it yourself',
    body: 'Tie each decision to the tool, principal, policy and reason without inventing another logging convention.',
  },
]

/** What "an obvious policy diff" actually looks like, since the claim is about visibility. */
export const POLICY_LIMIT_DIFF = `  tools:
    make_refund:
      args:
-       amount: { type: integer, minimum: 1, maximum: 500 }
+       amount: { type: integer, minimum: 1, maximum: 5000 }`
