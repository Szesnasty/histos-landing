export interface TitledParagraph {
  title: string
  body: string
}

export const PROBLEM_CARDS: TitledParagraph[] = [
  {
    title: 'Untrusted content reaches the model',
    body: 'Documents, retrieved passages, tool output and user input all arrive in the same context window. Roles do carry different levels of trust, and providers now train against an instruction hierarchy - but a model-side hierarchy is a learned disposition, not a deterministic authorization boundary. It moves how likely the model is to comply; it does not decide what the call is allowed to do.',
  },
  {
    title: 'The model may still call tools',
    body: 'Even when the instruction came from the wrong place, the resulting tool call can look perfectly valid - correct name, well-formed arguments, plausible intent.',
  },
  {
    title: 'Detection is not a hard boundary',
    body: 'A detector may help. It does not deterministically decide what the agent can and cannot do, and it is answering a question with no stable ground truth.',
  },
]
