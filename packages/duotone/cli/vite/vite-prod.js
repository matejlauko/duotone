import path from 'path'
import { fileURLToPath } from 'url'
import { build } from 'vite'
import getBaseViteConfig from './vite-base.js'

/**
 * @param config {import("../../shared/types").Config}
 * @param configFolder {string}
 */
const viteProd = async (config, configFolder) => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))

  /**
   * @type {import('vite').InlineConfig}
   */
  const viteConfig = await getBaseViteConfig(config, configFolder, {
    mode: 'production',
    base: config.base,
    build: {
      outDir: path.join(process.cwd(), config.outDir),
      emptyOutDir: true,
      rollupOptions: {
        input: {
          main: path.join(__dirname, '../../app/index.html'),
          preview: path.join(__dirname, '../../app/preview/index.html'),
        },
      },
    },
  })

  await build(viteConfig)
}

export default viteProd
