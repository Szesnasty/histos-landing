/**
 * Every code sample on the page.
 *
 * These are real output from the library, not illustration. When the library
 * changes, re-run the command and paste the new result - the page is wrong until
 * somebody does. Keeping them here rather than inline in the templates is what
 * makes that a one-file job.
 */

export const INSTALL_COMMAND = `git clone https://github.com/Szesnasty/histos
pip install "./histos[yaml]"`

export const REFUND_POLICY_YAML = `schema_version: histos.policy/0.1
policy_id: refund-approval
version: "1"

roles:
  refund_officer:
    allow: [make_refund]

tools:
  make_refund:
    args:
      amount: { type: integer, minimum: 1, maximum: 50000 }
    confirmation:
      required: true`

export const PROTECT_TOOLS_PYTHON = `from histos import protect

guarded = protect(my_tools, policy="security.policy.yaml")
agent.tools = guarded.tools     # the same tools, now bounded`

export const IDENTITY_ROLE_MAPPING = `  Entra app role                      Histos role
  finance-refund-operator      →      refund_officer
  support-tier2                →      support_agent

  Okta group                          Histos role
  eng-oncall                   →      incident_responder

  ── and never the other way round ──────────────────

  roles:
    "a9481de2-f123-4c77-9e21-…":      ✕  one directory, one tenant
    refund_officer:                   ✓  a portable artifact`
