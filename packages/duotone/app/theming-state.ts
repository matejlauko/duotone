import { atom } from 'jotai'
import { ThemePack } from '../shared/types'
import { THEMES } from './config'

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
