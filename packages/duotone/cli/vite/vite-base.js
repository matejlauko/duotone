import react from '@vitejs/plugin-react'
import jotaiDebugLabel from 'jotai/babel/plugin-debug-label'
import jotaiReactRefresh from 'jotai/babel/plugin-react-refresh'
import path from 'path'
import { fileURLToPath } from 'url'
import tsconfigPaths from 'vite-tsconfig-paths'
import { PREVIEW_FILE_NAME } from '../../shared/consts.js'
import getUserViteConfig from './get-user-vite-config.js'
import duotonePlugin from './vite-plugin.js'

const processDir = process.cwd()

/**
 * @param userConfig {import("../../shared/types").Config}
 * @param configFolder {string}
 * @param viteConfig {import('vite').InlineConfig}
 */
const getBaseViteConfig = async (userConfig, configFolder, viteConfig) => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))

  const { userViteConfig, hasReactPlugin, hasTSConfigPathPlugin } = await getUserViteConfig(
    viteConfig.build ? 'build' : 'serve',
    viteConfig.mode || 'production',
    userConfig.viteConfig
  )

  // We need to fake react-dom/client import if the user still uses React v17
  // and not v18, otherwise Vite would fail the import analysis step
  const resolve = {}
  try {
    await import('react-dom/client')
  } catch (e) {
    // If the user already has custom `resolve.alias` configured, we must match
    // the same format. This logic is heavily inspired from:
    // https://github.com/rollup/plugins/blob/985cf4c422896ac2b21279f0f99db9d281ef73c2/packages/alias/src/index.ts#L19-L34

    if (Array.isArray(userViteConfig.resolve?.alias)) {
      resolve.alias = [
        {
          find: 'react-dom/client',
          replacement: 'react-dom',
        },
      ]
    } else {
      resolve.alias = {
        'react-dom/client': 'react-dom',
      }
    }
  }

  /**
   * @type {import('vite').InlineConfig}
   */
  const config = {
    ...viteConfig,
    configFile: false,
    cacheDir: path.join(processDir, 'node_modules/.vite'),
    root: path.join(__dirname, '../../app/'),
    envDir: processDir,
    resolve,
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'lodash.merge',
        'lodash.get',
        'jotai',
        'polished',
        'react-color-palette',
        'color-string',
        'tinycolor2',
        'react-helmet-async',
        ...(!!resolve.alias ? [] : ['react-dom/client']),
      ],
      entries: [
        path.join(processDir, `${PREVIEW_FILE_NAME}.tsx`),
        path.join(processDir, `${PREVIEW_FILE_NAME}.ts`),
        path.join(processDir, `${PREVIEW_FILE_NAME}.jsx`),
        path.join(processDir, `${PREVIEW_FILE_NAME}.js`),
      ],
    },
    plugins: [
      !hasTSConfigPathPlugin &&
        tsconfigPaths({
          root: process.cwd(),
        }),
      duotonePlugin(userConfig, configFolder),
      !hasReactPlugin && react({ babel: { plugins: [jotaiDebugLabel, jotaiReactRefresh] } }),
    ],
  }

  return config
}

export default getBaseViteConfig
