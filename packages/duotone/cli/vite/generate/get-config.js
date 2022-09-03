import path from 'path'
import { fileURLToPath } from 'url'
import { CONFIG_FILE } from '../../../shared/consts.js'
import debug from '../debug.js'
import { cleanupWindowsPath } from '../../utils.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * @param {string} configFolder
 */
export const getConfigExport = (configFolder) => {
  debug(`Getting config export`)

  const filePath = path.join(configFolder, CONFIG_FILE)

  const relativePath = cleanupWindowsPath(
    path.relative(path.join(__dirname, '../../app'), filePath)
  ).slice(2)

  return `export { default as config } from '${relativePath}';`
}
