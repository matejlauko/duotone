import boxen from 'boxen'
import { VIRTUAL_GENERATED_PATH } from '../../shared/consts.js'
import debug from './debug.js'
import { getConfigExport } from './generate/get-config.js'
import { getPreviewExports } from './generate/get-preview.js'
import { getThemeExports } from './generate/get-themes.js'

const resolvedVirtualModuleId = '\0' + VIRTUAL_GENERATED_PATH

/**
 * @param config {import("../../shared/types").Config}
 * @param configFolder {string}
 */
const duotonePlugin = (config, configFolder) => {
  return {
    name: 'duotone-plugin',
    /**
     * @param {string} id
     */
    resolveId(id) {
      if (id === VIRTUAL_GENERATED_PATH) {
        return resolvedVirtualModuleId
      }
      return null
    },

    /**
     * @param {string} id
     */
    async load(id) {
      if (id === resolvedVirtualModuleId) {
        debug(`Transforming: ${id}`)

        try {
          const configExport = getConfigExport(configFolder)
          const previewExports = getPreviewExports(configFolder)
          const themeExports = getThemeExports(config, configFolder)

          return `
            ${configExport}\n
            ${previewExports}\n
            ${themeExports}
          `
        } catch (error) {
          console.log(
            boxen(
              'Config load failed. Check you configuration and exports based on documentaiton.',
              { padding: 1, borderColor: 'red' }
            )
          )
          console.error(error)

          process.exit(1)
        }
      }
      return
    },
  }
}

export default duotonePlugin
