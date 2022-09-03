#!/usr/bin/env node

import boxen from 'boxen'
import path from 'path'
import { DEFAULT_CONFIG_FOLDER } from '../shared/consts.js'
import debug from './debug.js'
import { loadConfig } from './load-config.js'
import viteProd from './vite/vite-prod.js'

/**
 * @param params {import("../shared/types").BuildParams}
 */
const build = async (params = {}) => {
  debug('Starting build command')

  params.config = params.config || DEFAULT_CONFIG_FOLDER

  const configFolder = path.isAbsolute(params.config)
    ? params.config
    : path.join(process.cwd(), params.config)

  debug('Config folder:', configFolder)

  const config = await loadConfig(configFolder)

  config.outDir = params.outDir ? params.outDir : config.outDir
  config.viteConfig = params.viteConfig ? params.viteConfig : config.viteConfig
  config.base = params.base ? params.base : config.base

  debug(`Config:\n${JSON.stringify(config, null, '  ')}`)

  try {
    await viteProd(config, configFolder)

    console.log(
      boxen(`duotone build finished and is available for deploy in \`${config.outDir}\` folder`, {
        padding: 1,
        margin: 1,
        borderColor: 'blue',
      })
    )

    return true
  } catch (error) {
    console.error(error)

    return false
  }
}

export default build
