import { StylesConfig } from '@duotone/preview'
import * as React from 'react'

export type TokenValue = string | number
export type ThemeTokens = {
  [name: string]: ThemeTokens | TokenValue
}
export type ThemePack<T = {}> = {
  name: string
  theme: T
  tokens: ThemeTokens
  previewStyles?: StylesConfig
}

export type ThemeConfig = string | { name?: string; path: string; previewStyles?: StylesConfig }
export type ThemesConfig = Record<string, ThemeConfig>

export type Provider = (
  props: React.PropsWithChildren<{ theme: ThemeTokens }>
) => React.ComponentElement<any, any>

export type CreateTheme<T = {}> = (tokens: ThemeTokens, themeStore: ThemePack<T>) => T | string

export type KitConfig = {
  themes: ThemesConfig
  name?: string
  logo?: string
  url?: string
  description?: string
}

export type CliConfig = {
  port: number
  outDir: string // Build output folder
  base: string // Base public path
  viteConfig?: string // Vite config path
}

export type UserConfig = Partial<CliConfig> & KitConfig
export type Config = CliConfig & KitConfig

export type ServeParams = Partial<Pick<CliConfig, 'port' | 'viteConfig'>> & {
  config?: string // Config folder
}

export type BuildParams = Partial<Pick<CliConfig, 'outDir' | 'viteConfig' | 'base'>> & {
  config?: string // Config folder
}

// Re-export preview types for use outside
export type { ComponentConfig, ComponentsConfig, StylesConfig } from '@duotone/preview'
