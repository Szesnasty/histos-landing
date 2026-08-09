export interface TitledParagraph {
  title: string
  body: string
}

export const PROBLEM_CARDS: TitledParagraph[] = [
  {
    title: 'Untrusted content reaches the model',
    body: 'Documents, retrieved passages, tool output and user input all end up in the same context window. There is no separate channel for the parts you wrote.',
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
