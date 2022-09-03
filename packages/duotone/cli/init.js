#!/usr/bin/env node

import boxen from 'boxen'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { DEFAULT_CONFIG_FOLDER } from '../shared/consts.js'
import debug from './debug.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const SRC = path.join(__dirname, '../config-template')
const DEST = path.join(process.cwd(), DEFAULT_CONFIG_FOLDER)

const init = () => {
  debug('Starting init script')

  try {
    if (fs.existsSync(DEST)) {
      debug('Config folder already exists - aborting init')
      return
    }

    fs.mkdirSync(DEST)

    fs.readdirSync(SRC).forEach((file) => {
      fs.copyFileSync(path.join(SRC, file), path.join(DEST, file))
    })

    debug('Init script finished')

    console.log(
      boxen(
        `Initialized duotone config in \`${DEFAULT_CONFIG_FOLDER}\` folder.\n\nYou can remove \`components.tsx\` and \`theme.js\` after you try it out.`,
        { padding: 1 }
      )
    )
  } catch (error) {
    console.error(error)
  }
}

export default init
