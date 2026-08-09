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
    body: 'Security rules live in a dedicated policy instead of being scattered across handlers, tools and agent code.',
  },
  {
    title: 'Default-deny by design',
    body: 'A new or forgotten tool does not silently become trusted just because nobody added another if.',
  },
  {
    title: 'Reviewable security changes',
    body: 'Changing a refund limit from 500 to 5000 becomes an obvious policy diff instead of one line hidden inside application logic.',
  },
  {
    title: 'Portable semantics',
    body: 'Ownership, binding, confirmation, argument limits and output controls mean the same thing across compatible runtimes.',
  },
  {
    title: 'Coverage and verification',
    body: 'Histos can validate policy, detect uncovered tool surfaces, emit stable decision codes and verify runtime conformance.',
  },
  {
    title: 'Audit without rebuilding it yourself',
    body: 'Every decision can be tied to the tool, principal, policy and reason, without every team inventing its own logging convention.',
  },
]

/** What "an obvious policy diff" actually looks like, since the claim is about visibility. */
export const POLICY_LIMIT_DIFF = `  tools:
    make_refund:
      args:
-       amount: { type: integer, minimum: 1, maximum: 500 }
+       amount: { type: integer, minimum: 1, maximum: 5000 }`
