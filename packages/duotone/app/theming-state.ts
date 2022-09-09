import { atom, useAtom } from 'jotai'
import { ThemePack, TokenValue } from '../shared/types'
import { THEMES } from './config'
import * as React from 'react'
import getInPath from 'lodash.get'

/**
 * Currently selected theme.
 * Sets the first from generated themes as default.
 */
export const currentThemeAtom = atom<ThemePack>(THEMES[0])

/**
 * Get the name of the current theme.
 * Used as query for tokens-state selectors.
 */
export const currentThemeNameAtom = atom<ThemePack['name'] | undefined>((get) => {
  const theme = get(currentThemeAtom)
  return theme?.name
})

/**
 * Theme created from changed tokens
 */
export const createdThemeAtom = atom<ThemePack['theme'] | string | undefined>(undefined)

/**
 * Memoized hook to get current value of token by path
 */
export const useCurrentThemeTokenValue = (path: string): TokenValue => {
  const [result] = useAtom(
    React.useMemo(
      () =>
        atom((get) => {
          const tokens = get(currentThemeAtom).tokens

          return getInPath(tokens, path)
        }),
      [path]
    )
  )

  return result as TokenValue
}
