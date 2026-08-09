/**
 * Colour-theme preference: read it, toggle it, persist it.
 *
 * `null` means "follow the operating system". An explicit choice writes
 * `data-theme` onto the document element, which the stylesheet gives higher
 * precedence than `prefers-color-scheme`, so the toggle wins in both directions.
 *
 * The initial value is applied by a small blocking script in `app.vue` rather
 * than here, because a composable runs after hydration and the page would flash
 * the wrong theme first.
 */
export type ColourTheme = 'light' | 'dark'
export type ThemePreference = ColourTheme | null

const THEME_STORAGE_KEY = 'histos-theme'
const THEME_DOCUMENT_ATTRIBUTE = 'data-theme'

function readStoredPreference(): ThemePreference {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    return stored === 'dark' || stored === 'light' ? stored : null
  } catch {
    // Private browsing modes can throw on access. Falling back to the system
    // preference is the correct behaviour, not an error worth surfacing.
    return null
  }
}

function systemPrefersDark(): boolean {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function useThemePreference() {
  const themePreference = ref<ThemePreference>(null)

  onMounted(() => {
    themePreference.value = readStoredPreference()
  })

  const resolvedThemeIsDark = () =>
    themePreference.value === 'dark' || (themePreference.value === null && systemPrefersDark())

  function toggleTheme(): void {
    const nextTheme: ColourTheme = resolvedThemeIsDark() ? 'light' : 'dark'

    themePreference.value = nextTheme
    document.documentElement.setAttribute(THEME_DOCUMENT_ATTRIBUTE, nextTheme)

    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
    } catch {
      // The theme still applies for this page view; only persistence is lost.
    }
  }

  return { themePreference, toggleTheme }
}
