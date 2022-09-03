import { atom, useAtom } from 'jotai'
import getInPath from 'lodash.get'
import * as React from 'react'
import { ThemePack, ThemeTokens, TokenValue } from '../shared/types'
import { currentThemeNameAtom } from './theming-state'
import { setInPath } from './utils/object'

export type TokenChange = {
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
export const addChangedTokenAtom = atom(null, (get, set, { path, value }: TokenChange) => {
  const currThemeName = get(currentThemeNameAtom)
  if (!currThemeName) return

  const currChanges = get(changedTokensAtom)

  set(changedTokensAtom, setInPath(currChanges, `${currThemeName}.${path}`, value))
})

/**
 * Set a token changes for current theme
 */
export const setChangedTokensInCurrentThemeAtom = atom(null, (get, set, _tokens: ThemeTokens) => {
  const currThemeName = get(currentThemeNameAtom)
  if (!currThemeName) return

  const currChanges = get(changedTokensAtom)

  set(changedTokensAtom, setInPath(currChanges, currThemeName, _tokens))
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
