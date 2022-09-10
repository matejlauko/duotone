import { ColorPalette, ColorScale, KitConfig } from '../../shared/types'

/**
 * Picks color palette from config
 * and istributes palette config to base color values and scale objects
 */
export const generateColorPalette = (
  config: KitConfig
): {
  colors: ColorScale
  scales: ColorPalette
  valKeyMap: Map<string, string>
  keyValMap: Map<string, string>
} | null => {
  if (!config.colorPalette || Object.keys(config.colorPalette).length === 0) return null

  const colors: ColorScale = {}
  const scales: ColorPalette = {}
  // Map of color value -> color palette id
  const valKeyMap: Map<string, string> = new Map()
  // Map of color palette id -> color value
  const keyValMap: Map<string, string> = new Map()

  Object.entries(config.colorPalette).forEach(([name, val]) => {
    if (typeof val === 'object') {
      scales[name] = val

      for (const key in val) {
        valKeyMap.set(val[key], `${name}.${key}`)
        keyValMap.set(`${name}.${key}`, val[key])
      }
    } else {
      colors[name] = val

      valKeyMap.set(val, name)
      keyValMap.set(name, val)
    }
  })

  return { colors, scales, valKeyMap, keyValMap }
}
