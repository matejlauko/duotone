#!/usr/bin/env node

import { program } from 'commander'
import {
  DEFAULT_BASE,
  DEFAULT_CONFIG_FOLDER,
  DEFAULT_OUT_FOLDER,
  DEFAULT_PORT,
} from '../shared/consts.js'
import build from './build.js'
import init from './init.js'
import serve from './serve.js'
import { strToInt } from './utils.js'

program.showHelpAfterError().showSuggestionAfterError()

program
  .command('serve')
  .alias('dev')
  .description('start the dev app')
  .option('-p, --port [number]', `port of the duotone server [default: ${DEFAULT_PORT}]`, strToInt)
  .option(`--config [string]', 'config directory [default: ${DEFAULT_CONFIG_FOLDER}]`)
  .option('--viteConfig [string]', 'file with Vite configuration')
  .action(async (params) => {
    await serve({ ...params, serve: params })
  })

program
  .command('build')
  .description('build static production app for deployment')
  .option('-o, --outDir <path>', `output directory [default: ${DEFAULT_OUT_FOLDER}]`)
  .option('--config [string]', `config directory [default: ${DEFAULT_CONFIG_FOLDER}]`)
  .option('--base [string]', `assets base public path [default: ${DEFAULT_BASE}]`)
  .option('--viteConfig [string]', 'file with Vite configuration')
  .action(async (params) => {
    const success = await build({ ...params, build: params })
    console.log({ params })

    if (success) {
      process.exit(0)
    }
    process.exit(1)
  })

program.command('init').description('init the config structure and add template files').action(init)

program.parse(process.argv)
