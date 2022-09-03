import colorString, { ColorDescriptor } from 'color-string'
import tinycolor from 'tinycolor2'

export const COLOR_FORMATS = ['hex', 'hex8', 'rgb', 'hsl', 'hwb', 'name'] as const
export type ColorFormat = typeof COLOR_FORMATS[number]

export type ColorI = ColorDescriptor

/**
 * Returns whether the color string is a valid color.
 */
export function isValidColor(colorStr: string): boolean {
  return !!colorString.get(colorStr)
}

/**
 * Returns color format {ColorFormat} of color string.
 */
export function getColorFormat(colorStr: string): ColorFormat | null {
  const color = tinycolor(colorStr)

  const format = color.getFormat() as ColorFormat

  if (!COLOR_FORMATS.includes(format)) {
    throw new Error(`Invalid color format: ${format} - ${colorStr}`)
  }

  return format
}

/**
 * Conert color string to specific format.
 */
export function setColorFormat(colorStr: string, format: ColorFormat) {
  const color = tinycolor(colorStr)

  switch (format) {
    case 'hex':
      return color.getAlpha() < 1 ? color.toHex8String() : color.toHexString()
    case 'hex8':
      return color.toHex8String()
    case 'rgb':
      return color.toRgbString()
    case 'hsl':
      return color.toHslString()
    case 'name': {
      const name = color.toName()
      if (name) return name

      return color.getAlpha() === 1 ? color.toHexString() : color.toRgbString()
    }
  }

  return color.toString()
}
