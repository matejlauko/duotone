import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import debug from '../../debug.js'
import { cleanupWindowsPath } from '../../utils.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * @param themeConfig {import("../../../shared/types").ThemeConfig}
 */
const getThemePath = (themeConfig) =>
  typeof themeConfig === 'string' ? themeConfig : themeConfig.path

/**
 * @param config {import("../../../shared/types").Config}
 * @param configFolder {string}
 */
const getThemeImport = (config, configFolder) => {
  /**
   * @param themeKey {string}
   */
  return (themeKey) => {
    debug(`Getting theme ${themeKey} import`)

    const themeConfig = config.themes[themeKey]
    const themePath = getThemePath(themeConfig)
    const filePath = path.join(configFolder, themePath)

    debug(`Theme file: ${filePath}`)

    if (!fs.existsSync(filePath)) {
      throw new Error(`Theme ${themeKey} not found at ${filePath}`)
    }

    const relativePath = cleanupWindowsPath(
      path.relative(path.join(__dirname, '../../app'), filePath)
    ).slice(2)

    const multipleThemesWithSamePath =
      Object.values(config.themes).filter((tc) => getThemePath(tc) === themePath).length > 1

    // Assumes theme is experoted from module as default, by default.
    // When multiple themes are exproted from the same file, it's assumed they are all named exports.
    return multipleThemesWithSamePath
      ? `import { ${themeKey} } from '${relativePath}';`
      : `import ${themeKey} from '${relativePath}';`
  }
}

/**
 * @param config {import("../../../shared/types").Config}
 * @param configFolder {string}
 */
export const getThemeExports = (config, configFolder) => {
  debug(`Getting theme exports`)

  const importsList = Object.keys(config.themes)
    .map(getThemeImport(config, configFolder))
    .join('\n')

  const themeKeys = Object.keys(config.themes)
    .map((themeKey) => themeKey)
    .join(', ')

  return `
    ${importsList}\n
    export const themes = { ${themeKeys} };
  `
}
