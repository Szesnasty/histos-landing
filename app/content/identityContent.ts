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
    detail: 'Entra ID, Okta, Auth0, Keycloak, workload identity - whatever you already run.',
  },
  {
    question: 'What may this identity let an agent do?',
    answeredBy: 'Histos',
    detail: 'This tool, these arguments, this resource, this budget, with or without approval.',
    isHistos: true,
  },
  {
    question: 'Should the backend still verify the action?',
    answeredBy: 'Yes',
    detail: 'The system of record stays the final authority. Histos is a boundary, not a replacement for it.',
  },
]
