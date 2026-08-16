export interface TitledParagraph {
  title: string
  body: string
}

export const PROBLEM_CARDS: TitledParagraph[] = [
  {
    title: 'Untrusted content reaches the model',
    body: 'Documents, retrieved passages, tool output and user input share one context. Instruction hierarchy can reduce bad behaviour; it cannot authorize an action.',
  },
  {
    title: 'The model may still call tools',
    body: 'A manipulated model can still emit a perfectly valid-looking call: the right tool name, well-formed arguments and plausible intent.',
  },
  {
    title: 'Detection is not a hard boundary',
    body: 'Detection can lower risk. It cannot make a deterministic decision about which capability this principal may exercise on this resource.',
  },
]
