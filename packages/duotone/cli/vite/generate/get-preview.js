import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { PREVIEW_FILE_NAME } from '../../../shared/consts.js'
import debug from '../../debug.js'
import { cleanupWindowsPath } from '../../utils.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * @param {string} configFolder
 */
export const getPreviewFilePath = (configFolder) => {
  const filePath = [
    path.join(configFolder, `${PREVIEW_FILE_NAME}.tsx`),
    path.join(configFolder, `${PREVIEW_FILE_NAME}.ts`),
    path.join(configFolder, `${PREVIEW_FILE_NAME}.jsx`),
    path.join(configFolder, `${PREVIEW_FILE_NAME}.js`),
  ].find((path) => fs.existsSync(path))

  debug(`Preview file: ${filePath}`)

  return filePath
}

/**
 * @param {string} configFolder
 */
export const getPreviewExports = (configFolder) => {
  debug(`Getting preview exports`)

  const filePath = getPreviewFilePath(configFolder)

  if (!filePath) {
    throw new Error(`Preview file not found at ${configFolder}`)
  }

  const relativePath = cleanupWindowsPath(
    path.relative(path.join(__dirname, '../../app'), filePath)
  ).slice(2)

  return `export * as preview from '${relativePath}';`
}
