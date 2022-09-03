import * as Polished from 'polished'

import { isValidColor } from './color'

export type TokenType = 'size' | 'color' | 'number' | 'discrete' | 'text'

export const SIZE_UNITS = ['', 'px', 'em', 'rem', '%', 'vw', 'vh', 'vmin', 'vmax'] as const
export type SizeUnit = typeof SIZE_UNITS[keyof typeof SIZE_UNITS]

export function getTokenType(value: string | number) {
  if (typeof value === 'number') {
    value = String(value)
  }

  if (!value.trim()) return 'text'

  if (/^-?[\d\.,]+$/i.test(value)) {
    return 'number'
  }

  if (/^-?[\d\.,]+\s*[a-z%]+$/i.test(value)) {
    return 'size'
  }

  if (isValidColor(value)) {
    return 'color'
  }

  if (/^[a-z]+$/i.test(value)) {
    return 'discrete'
  }

  return 'text'
}

export const getValueAndUnit = Polished.getValueAndUnit
