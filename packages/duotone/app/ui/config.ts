import * as Stitches from '@stitches/react'
import { ConfigType } from '@stitches/react/types/config'
import { mainThemeTokens, headerThemeTokens } from './tokens'

export const { config, createTheme, css, getCssText, globalCss, styled, theme, keyframes } =
  Stitches.createStitches({
    prefix: 'dt',
    theme: mainThemeTokens,
    media: {
      motion: '(prefers-reduced-motion: no-preference)',
    },
    utils: {
      m: (value: Stitches.PropertyValue<'margin'>) => ({
        margin: value,
      }),
      mt: (value: Stitches.PropertyValue<'margin'>) => ({
        marginTop: value,
      }),
      mr: (value: Stitches.PropertyValue<'margin'>) => ({
        marginRight: value,
      }),
      mb: (value: Stitches.PropertyValue<'margin'>) => ({
        marginBottom: value,
      }),
      ml: (value: Stitches.PropertyValue<'margin'>) => ({
        marginLeft: value,
      }),
      mx: (value: Stitches.PropertyValue<'margin'>) => ({
        marginLeft: value,
        marginRight: value,
      }),
      my: (value: Stitches.PropertyValue<'margin'>) => ({
        marginTop: value,
        marginBottom: value,
      }),
      p: (value: Stitches.PropertyValue<'padding'>) => ({
        padding: value,
      }),
      pt: (value: Stitches.PropertyValue<'padding'>) => ({
        paddingTop: value,
      }),
      pr: (value: Stitches.PropertyValue<'padding'>) => ({
        paddingRight: value,
      }),
      pb: (value: Stitches.PropertyValue<'padding'>) => ({
        paddingBottom: value,
      }),
      pl: (value: Stitches.PropertyValue<'padding'>) => ({
        paddingLeft: value,
      }),
      px: (value: Stitches.PropertyValue<'padding'>) => ({
        paddingLeft: value,
        paddingRight: value,
      }),
      py: (value: Stitches.PropertyValue<'padding'>) => ({
        paddingTop: value,
        paddingBottom: value,
      }),
      bg: (value: Stitches.ScaleValue<'colors'>) => ({
        backgroundColor: value,
      }),
      size: (value: Stitches.PropertyValue<'width'>) => ({
        width: value,
        height: value,
      }),
      weight: (value: Stitches.ScaleValue<'fontWeights'>) => ({
        fontWeight: value,
      }),
    },
  })

export type CSS = Stitches.CSS<typeof config>

export type ExactTheme = typeof theme
export type Theme = ConfigType.Theme<ExactTheme>
export type Color = keyof ExactTheme['colors']

export const headerTheme = createTheme(headerThemeTokens)
