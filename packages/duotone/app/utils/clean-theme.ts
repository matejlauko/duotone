import { ThemeTokens } from '../../shared/types'

/**
 * Cleans the theme to get only editable tokens.
 * Removes functions and others.
 */
export function cleanTheme(theme: object): ThemeTokens {
  return Object.entries(theme).reduce((acc, [key, val]) => {
    if (val && typeof val === 'object') {
      acc[key] = cleanTheme(val)

      return acc
    }

    if (typeof val !== 'function' && key !== 'selector' && key !== 'className') {
      acc[key] = val
    }

    return acc
  }, {} as Record<string, any>)
}
