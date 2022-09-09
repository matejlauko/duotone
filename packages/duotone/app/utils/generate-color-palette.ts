import { ColorPalette, ColorScale, KitConfig } from '../../shared/types'

/**
 * Picks color palette from config
 * and istributes palette config to base color values and scale objects
 */
export const generateColorPalette = (
  config: KitConfig
): { colors: ColorScale; scales: ColorPalette } | null => {
  if (!config.colorPalette || Object.keys(config.colorPalette).length === 0) return null

  const colors: ColorScale = {}
  const scales: ColorPalette = {}

  Object.entries(config.colorPalette).forEach(([name, val]) => {
    if (typeof val === 'object') {
      scales[name] = val
    } else {
      colors[name] = val
    }
  })

  return { colors, scales }
}
