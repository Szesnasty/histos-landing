/**
 * A tiny, dependency-free syntax highlighter.
 *
 * Every input on this site is authored content rather than user input, but the
 * source is HTML-escaped **before** any markup is added regardless - a
 * highlighter that only happens to be safe is a habit worth not forming.
 *
 * It lives in a composable rather than in the component so the component stays
 * presentational and the escaping rule has one home.
 */
export type SupportedLanguage = 'yaml' | 'json' | 'python' | 'bash' | 'text'

const PYTHON_KEYWORD_PATTERN =
  /\b(from|import|def|class|return|with|as|if|else|elif|for|while|try|except|raise|await|async|None|True|False|not|in|and|or|pass|lambda)\b/g

const SHELL_COMMAND_PATTERN = /^(\s*)(pip|python|histos|npm|npx|curl)\b/

function escapeHtmlEntities(source: string): string {
  return source.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function highlightYaml(escapedSource: string): string {
  return escapedSource
    .split('\n')
    .map((line) => {
      const wholeLineComment = line.match(/^(\s*)(#.*)$/)
      if (wholeLineComment) return `${wholeLineComment[1]}<span class="token-comment">${wholeLineComment[2]}</span>`

      const trailingComment = line.match(/^(.*?)(\s+#\s.*)$/)
      const codePart = trailingComment ? trailingComment[1]! : line
      const commentPart = trailingComment ? `<span class="token-comment">${trailingComment[2]}</span>` : ''

      return (
        codePart
          .replace(/^(\s*-?\s*)([\w.$-]+)(:)/, '$1<span class="token-key">$2</span>$3')
          .replace(/(:\s*)("[^"]*"|'[^']*')/g, '$1<span class="token-string">$2</span>') + commentPart
      )
    })
    .join('\n')
}

function highlightJson(escapedSource: string): string {
  return escapedSource
    .replace(/("(?:[^"\\]|\\.)*")(\s*:)/g, '<span class="token-key">$1</span>$2')
    .replace(/(:\s*)("(?:[^"\\]|\\.)*")/g, '$1<span class="token-string">$2</span>')
}

function highlightPython(escapedSource: string): string {
  return escapedSource
    .split('\n')
    .map((line) => {
      const trailingComment = line.match(/^(.*?)(#.*)$/)
      const codePart = trailingComment ? trailingComment[1]! : line
      const commentPart = trailingComment ? `<span class="token-comment">${trailingComment[2]}</span>` : ''

      return (
        codePart
          .replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, '<span class="token-string">$1</span>')
          .replace(PYTHON_KEYWORD_PATTERN, '<span class="token-keyword">$1</span>') + commentPart
      )
    })
    .join('\n')
}

function highlightShell(escapedSource: string): string {
  return escapedSource
    .split('\n')
    .map((line) =>
      line.trimStart().startsWith('#')
        ? `<span class="token-comment">${line}</span>`
        : line.replace(SHELL_COMMAND_PATTERN, '$1<span class="token-keyword">$2</span>'),
    )
    .join('\n')
}

/** Plain transcripts: colour the verdicts, because that is what a reader scans for. */
function highlightTranscript(escapedSource: string): string {
  return escapedSource
    .replace(/\b(DENY|REFUSED|✕)\b/g, '<span class="token-deny">$1</span>')
    .replace(/\b(ALLOW|OK|✓)\b/g, '<span class="token-allow">$1</span>')
    .replace(/(⚠)/g, '<span class="token-warn">$1</span>')
    .replace(/\[([a-z_]+)\]/g, '[<span class="token-key">$1</span>]')
}

export function useSyntaxHighlight(source: MaybeRefOrGetter<string>, language: MaybeRefOrGetter<SupportedLanguage>) {
  const highlightedHtml = computed(() => {
    const escaped = escapeHtmlEntities(toValue(source))

    switch (toValue(language)) {
      case 'yaml':
        return highlightYaml(escaped)
      case 'json':
        return highlightJson(escaped)
      case 'python':
        return highlightPython(escaped)
      case 'bash':
        return highlightShell(escaped)
      default:
        return highlightTranscript(escaped)
    }
  })

  return { highlightedHtml }
}
