import * as __GENERATED_KIT__ from 'virtual:__DUOTONE_GENERATED__'
import merge from 'lodash.merge'
import * as React from 'react'
import { CreateTheme, Provider as ProviderT, ThemePack, ThemeTokens } from '../shared/types'
import { generateThemes } from './utils/generate-themes'
import { generateColorPalette } from './utils/generate-color-palette'

export const CONFIG = __GENERATED_KIT__.config

/* THEME */

export const THEMES: ThemePack[] = generateThemes(CONFIG, __GENERATED_KIT__.themes)

const {
  Provider: _Provider,
  createTheme: _createTheme,
  head: _head,
  previewStyles: _previewStyles,
  ..._components
} = __GENERATED_KIT__.preview

/* COMPONENTS */

export const COMPONENTS = 'default' in _components ? _components['default'] : _components

/* PROVIDER */

export const DefaultProvider = (props: React.PropsWithChildren<{ theme: ThemeTokens }>) =>
  /*#__PURE__*/ React.createElement(React.Fragment, null, props.children)

export const PROVIDER = _Provider ?? (DefaultProvider as unknown as ProviderT)

/* CREATE THEME */

export const defaultCreateTheme: CreateTheme = (tokens, themeStore) =>
  merge({}, themeStore.theme, tokens)

export const CREATE_THEME = _createTheme ?? defaultCreateTheme

/* HEAD */

export const HEAD = _head ?? null

/* STYLES */

export const PREVIEW_STYLES = _previewStyles ?? {}

/* COLOR PALETTE */

export const COLOR_PALETTE = generateColorPalette(CONFIG)
