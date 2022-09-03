import { KitConfig, ThemePack } from '../../shared/types'
import { cleanTheme } from './clean-theme'

export function generateThemes<T extends {}>(
  config: KitConfig,
  themes: Record<string, {}>
): ThemePack<T>[] {
  return Object.entries(config.themes).map(([name, themeConfig]) => {
    const theme = themes[name] as T

    const _theme: ThemePack<T> = {
      name,
      theme,
      tokens: cleanTheme(theme),
    }

    if (typeof themeConfig === 'object') {
      _theme.name = themeConfig.name || name
      _theme.previewStyles = themeConfig.previewStyles
    }

    return _theme
  })
}
