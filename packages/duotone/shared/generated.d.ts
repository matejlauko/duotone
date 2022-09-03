import * as React from 'react'
import {
  ComponentConfig,
  ComponentsConfig,
  CreateTheme,
  KitConfig,
  Provider,
  StylesConfig,
} from './types'

type ReactNodeWithoutObject = React.ReactElement | string | number | boolean | null | undefined

declare module 'virtual:__DUOTONE_GENERATED__' {
  export const config: KitConfig

  export const themes: Record<string, {}>

  export const preview: {
    Provider: Provider
    createTheme: CreateTheme
    head: React.ReactNode | undefined
    previewStyles: StylesConfig
  } & { [C: string]: ComponentConfig } & { default: ComponentsConfig }
}
