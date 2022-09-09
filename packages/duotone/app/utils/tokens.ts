import * as Polished from 'polished'

import { isValidColor } from './color'

export enum TokenType {
  Size = 'size',
  Color = 'color',
  Number = 'number',
  Discrete = 'discrete',
  Text = 'text',
  StitchesVariable = 'stitches_variable',
}

export const SIZE_UNITS = ['', 'px', 'em', 'rem', '%', 'vw', 'vh', 'vmin', 'vmax'] as const
export type SizeUnit = typeof SIZE_UNITS[keyof typeof SIZE_UNITS]

export function getTokenType(value: string | number): TokenType {
  if (typeof value === 'number') {
    value = String(value)
  }

  if (!value.trim()) return TokenType.Text

  // Special Stitches variable reference case
  if (/^\$\w+/.test(value)) {
    return TokenType.StitchesVariable
  }

  if (/^-?[\d\.,]+$/i.test(value)) {
    return TokenType.Number
  }

  if (/^-?[\d\.,]+\s*[a-z%]+$/i.test(value)) {
    return TokenType.Size
  }

  if (isValidColor(value)) {
    return TokenType.Color
  }

  if (/^[a-z]+$/i.test(value)) {
    return TokenType.Discrete
  }

  return TokenType.Text
}

export const getValueAndUnit = Polished.getValueAndUnit
