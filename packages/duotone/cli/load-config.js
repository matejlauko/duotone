import fs from 'fs'
import merge from 'lodash.merge'
import path from 'path'
import { CONFIG_FILE, DEFAULT_BASE, DEFAULT_OUT_FOLDER, DEFAULT_PORT } from '../shared/consts.js'
import debug from './debug.js'

/** @type {import("../shared/types").CliConfig} */
const DEFAULT_CONFIG = {
  port: DEFAULT_PORT,
  outDir: DEFAULT_OUT_FOLDER,
  base: DEFAULT_BASE,
}

/**
 * @param {string} configFolder
 */
export const loadConfig = async (configFolder) => {
  const filePath = path.join(configFolder, CONFIG_FILE)

  debug(`Loading config: ${filePath}`)

  if (!fs.existsSync(filePath)) {
    console.error(`Config file not found: ${filePath}`)
    process.exit(1)
  }

  /**
   * @type {import('../shared/types').UserConfig}
   */
  const config = (await import('file:///' + filePath)).default

  debug(`Custom config: ${JSON.stringify(config, null, '  ')}`)

  return /** @type {import("../shared/types").Config} */ (merge(DEFAULT_CONFIG, config))
}
