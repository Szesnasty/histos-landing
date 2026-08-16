export interface ResponsibilityRow {
  question: string
  answeredBy: string
  detail: string
  isHistos?: boolean
}

export const RESPONSIBILITY_ROWS: ResponsibilityRow[] = [
  {
    question: 'Who is this?',
    answeredBy: 'Your identity layer',
    detail: 'Entra ID, Okta, Auth0, Keycloak or workload identity - whatever your host already trusts.',
  },
  {
    question: 'What may this identity let an agent do?',
    answeredBy: 'Histos',
    detail: 'This tool, with these arguments, on this resource, within this budget and approval rule.',
    isHistos: true,
  },
  {
    question: 'Should the backend still verify the action?',
    answeredBy: 'Yes',
    detail: 'The system of record remains the final authority; Histos does not replace backend authorization.',
  },
]
