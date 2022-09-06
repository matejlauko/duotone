import * as Stitches from '@stitches/react'
import merge from 'lodash.merge'
import { darken, getValueAndUnit, transparentize } from 'polished'
import { StylesConfig } from './types'

const DEFAULT_PREVIEW_STYLES: Required<StylesConfig> & {
  renderPanel: Required<StylesConfig['renderPanel']>
} = {
  background: '#f8f9fa',
  fontSize: '1rem',
  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  fontColor: '#151718',
  primaryColor: '#3e63dd',

  renderPanel: {
    background: '#fff',
    fontColor: '#151718',
  },
} as const

export const generateThemeFromPreviewStyles = (previewStylesConfig?: StylesConfig) => {
  const styles = merge(DEFAULT_PREVIEW_STYLES, previewStylesConfig)
  const [previewFontSizeVal, previewFontSizeUnit] = getValueAndUnit(styles.fontSize)

  return {
    root: {
      background: styles.background,
      fontFamily: styles.fontFamily,
      fontWeight: 400,
      lineHeight: 1.5,
      color: styles.fontColor,
    },

    component: {
      heading_background: styles.background,
      heading_shadow: transparentize(0.25, darken(0.5, styles.background)),
      heading_fontSize: `${previewFontSizeVal * 1.15}${previewFontSizeUnit}`,
      heading_color: styles.fontColor,
      gap: '4rem',
      heading_height: '52px',
      heading_fontWeight: 500,
    },

    variant: {
      heading_fontSize: `${previewFontSizeVal}${previewFontSizeUnit}`,
      heading_color: styles.fontColor,
      heading_fontWeight: 400,
      gap: '2rem',
    },

    renderPanel: {
      background: styles.renderPanel.background,
      border: `1px solid ${darken(0.1, styles.renderPanel.background)}`,
      borderRadius: '6px',

      option_fontSize: `${previewFontSizeVal * 0.95}${previewFontSizeUnit}`,
      option_color: styles.renderPanel.fontColor ?? styles.fontColor,
      option_fontWeight: 400,
    },

    outline: {
      background: '#f1f3f5',
      border: `1px solid #dfe3e6`,
      width: '240px',

      kitName_color: styles.primaryColor,
      kitName_fontSize: '1rem',
      kitName_fontWeight: 600,

      item_color: '#151718',
      item_fontWeight: 500,

      component_fontSize: '0.875rem',
      variant_fontSize: '0.8125rem',

      button_hover_background: '#e6e8eb',
      button_hover_color: styles.primaryColor,
      button_active_background: '#dfe3e6',
      button_active_color: styles.primaryColor,

      expand_color: '#687076',
      expand_borderRadius: '4px',
      expand_hover_background: '#d7dbdf',
      expand_hover_color: styles.primaryColor,
      expand_active_background: '#c1c8cd',
      expand_active_color: styles.primaryColor,
    },
  }
}

export const { config, css, styled, theme, createTheme } = Stitches.createStitches({
  prefix: 'dtp',
  theme: generateThemeFromPreviewStyles(),
})

export type CSS = Stitches.CSS<typeof config>
