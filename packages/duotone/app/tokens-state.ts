import { atom, useAtom } from 'jotai'
import getInPath from 'lodash.get'
import * as React from 'react'
import { ThemePack, ThemeTokens, TokenValue } from '../shared/types'
import { currentThemeNameAtom } from './theming-state'
import { setInPath } from './utils/object'

export type Token = {
  path: string
  value: TokenValue
}

export const changedTokensAtom = atom<Record<ThemePack['name'], ThemeTokens>>({})

/**
 * Get changed tokens just for the current theme
 */
export const hasChangedTokensAtom = atom<boolean>((get) => {
  const currThemeName = get(currentThemeNameAtom)
  if (!currThemeName) return false

  const changedObj = get(changedTokensAtom)[currThemeName]

  return Boolean(changedObj && Object.keys(changedObj).length)
})

/**
 * Get changed tokens just for the current theme
 */
export const changedTokensInCurrentThemeAtom = atom<ThemeTokens>((get) => {
  const currThemeName = get(currentThemeNameAtom)
  if (!currThemeName) return {}

  return get(changedTokensAtom)[currThemeName] || {}
})

/**
 * Set a change to changed tokens - using path and value
 */
export const addChangedTokenAtom = atom(null, (get, set, { path, value }: Token) => {
  const currThemeName = get(currentThemeNameAtom)
  if (!currThemeName) return

  const currChanges = get(changedTokensAtom)

  set(changedTokensAtom, setInPath(currChanges, `${currThemeName}.${path}`, value))
})

/**
 * Memoized hook to get current value of token by path
 */
export const useChangedTokenValue = (path: string): TokenValue => {
  const [result] = useAtom(
    React.useMemo(
      () =>
        atom((get) => {
          const changedTokens = get(changedTokensInCurrentThemeAtom)

          return getInPath(changedTokens, path)
        }),
      [path]
    )
  )

  return result as TokenValue
}

/**
 * Setter that resets all changes in current theme
 */
export const resetTokenChangesInCurrentTheme = atom(null, (get, set) => {
  const currThemeName = get(currentThemeNameAtom)
  if (!currThemeName) return

  const currChanges = get(changedTokensAtom)

  set(changedTokensAtom, setInPath(currChanges, currThemeName, {}))
})

/**
 * Setter that resets changes only in a given theme path
 */
export const resetTokenChangeInCurrentThemeAndPath = atom(null, (get, set, path: string) => {
  const currThemeName = get(currentThemeNameAtom)
  if (!currThemeName) return

  const currChanges = get(changedTokensAtom)

  set(changedTokensAtom, setInPath(currChanges, `${currThemeName}.${path}`, undefined))
})

/**
 * Search tokens term
 */
export const searchTermAtom = atom<string>('')

/**
 * Highlight a token
 */
export const highlightedTokenAtom = atom<Token['path'] | null>(null)

/**
 * Sets highlighted token.
 * But allows re-highlighting by first resseting the old value.
 */
export const setHighlightedTokenWithResetAtom = atom(null, (get, set, path: string) => {
  // First reset and have re-render
  set(highlightedTokenAtom, null)

  // Set new value in next loop
  setTimeout(() => {
    set(highlightedTokenAtom, path)
  }, 1)
})
