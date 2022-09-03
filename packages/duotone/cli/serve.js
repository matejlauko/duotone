#!/usr/bin/env node

import boxen from 'boxen'
import path from 'path'
import { DEFAULT_CONFIG_FOLDER } from '../shared/consts.js'
import debug from './debug.js'
import { loadConfig } from './load-config.js'
import viteServe from './vite/vite-dev.js'

/**
 * @param params {import("../shared/types").ServeParams}
 */
const serve = async (params = {}) => {
  debug('Starting serve command')

  params.config = params.config || DEFAULT_CONFIG_FOLDER

  const configFolder = path.isAbsolute(params.config)
    ? params.config
    : path.join(process.cwd(), params.config)

  debug('Config folder:', configFolder)

  const config = await loadConfig(configFolder)

  config.port = params.port ? params.port : config.port
  config.viteConfig = params.viteConfig ? params.viteConfig : config.viteConfig

  debug(`Config:\n${JSON.stringify(config, null, '  ')}`)

  try {
    const serverUrl = await viteServe(config, configFolder)

    console.log(
      boxen(`duotone started at ${serverUrl}`, {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'blue',
        titleAlignment: 'center',
        textAlignment: 'center',
      })
    )
  } catch (error) {
    console.log(error)
  }
}

export default serve
