import * as Stitches from '@stitches/react'
import { StylesConfig, StylesTheme } from './types'
import merge from 'lodash.merge'
import { darken, transparentize, getValueAndUnit, setLightness, lighten } from 'polished'

const DEFAULT_PREVIEW_STYLES = {
  primaryColor: '#3e63dd',
  textColor: '#161616',

  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  outline: {
    background: '#e8e8e8',
    baseFontSize: '14px',
    width: '240px',
  },
  preview: {
    background: '#f3f3f3',
    baseFontSize: '14px',
    componentsGap: '4rem',
    variantsGap: '2rem',
  },
  renderPanel: {
    background: '#FFF',
  },
}

export const generateThemeFromPreviewStyles = (previewStylesConfig?: StylesConfig): StylesTheme => {
  const styles = merge(DEFAULT_PREVIEW_STYLES, previewStylesConfig)
  const [outlineFontSizeVal, outlineFontSizeUnit] = getValueAndUnit(styles.outline.baseFontSize)
  const [previewFontSizeVal, previewFontSizeUnit] = getValueAndUnit(styles.preview.baseFontSize)

  return {
    root: {
      background: styles.preview.background,
      fontFamily: styles.fontFamily,
      fontWeight: 400,
      lineHeight: 1.5,
      color: styles.textColor,
    },
    outline: {
      background: styles.outline.background,
      border: `1px solid ${darken(0.1, styles.outline.background)}`,
      width: styles.outline.width,

      kitName_color: styles.primaryColor,
      kitName_fontSize: `${outlineFontSizeVal * 1.25}${outlineFontSizeUnit}`,
      kitName_fontWeight: 600,

      item_color: styles.textColor,
      item_fontWeight: 500,

      component_fontSize: `${outlineFontSizeVal}${outlineFontSizeUnit}`,
      variant_fontSize: `${outlineFontSizeVal * 0.95}${outlineFontSizeUnit}`,

      button_hover_background: transparentize(0.94, setLightness(0.1, styles.outline.background)),
      button_hover_color: styles.primaryColor,
      button_active_background: transparentize(0.9, setLightness(0.1, styles.outline.background)),
      button_active_color: styles.primaryColor,

      expand_color: styles.textColor,
      expand_background: 'transparent',
      expand_borderRadius: '4px',
    },
    component: {
      heading_background: styles.preview.background,
      heading_fontSize: `${previewFontSizeVal * 1.15}${previewFontSizeUnit}`,
      heading_color: styles.textColor,
      gap: styles.preview.componentsGap,
      heading_height: '52px',
      heading_fontWeight: 500,
      heading_marginBottom: '0.5em',
    },
    variant: {
      background: styles.renderPanel.background,
      border: `1px solid ${darken(0.1, styles.renderPanel.background)}`,
      borderRadius: '6px',

      gap: styles.preview.variantsGap,

      heading_fontSize: `${previewFontSizeVal}${previewFontSizeUnit}`,
      heading_color: styles.textColor,
      heading_fontWeight: 400,
      heading_marginBottom: '0.5em',

      option_fontSize: `${previewFontSizeVal * 0.95}${previewFontSizeUnit}`,
      option_color: styles.renderPanel.textColor ?? lighten(0.1, styles.textColor),
      option_fontWeight: 300,
      option_marginBottom: '0.25em',
    },
  }
}

export const { config, css, styled, theme, createTheme } = Stitches.createStitches({
  prefix: 'dtp',
  theme: generateThemeFromPreviewStyles(),
})

export type CSS = Stitches.CSS<typeof config>

export const layoutCss = css({
  boxSizing: 'border-box',
})

export const textBaseCss = css({
  all: 'unset',
  color: '$root$color',
  fontFamily: '$root$fontFamily',
  lineHeight: '$root$lineHeight',
  fontWeight: '$root$fontWeight',
  margin: 0,
  textRendering: 'optimizeLegibility',
})

export const buttonBaseCss = css({
  all: 'unset',
  userSelect: 'none',
  lineHeight: '1',
  cursor: 'pointer',
  WebkitTapHighlightColor: 'transparent',
  fontFamily: 'inherit',
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'transparent',
  color: 'inherit',

  '&:focus': {
    border: 'none',
    outline: 'none',
  },
})

export const linkBaseCss = css({
  all: 'unset',
  color: 'inherit',

  '&:hover, &:focus-visible': {
    color: '$outline$button_hover_color',
  },
})

/**
 * Adds shared classes to DOM sooner, makes sure they don't override component styles
 */
export const prepareSharedStyles = () => {
  layoutCss()
  textBaseCss()
  buttonBaseCss()
  linkBaseCss()
}
