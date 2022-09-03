import getPort from 'get-port'
import { createServer } from 'vite'
import debug from './debug.js'
import getBaseViteConfig from './vite-base.js'

/**
 * @param config {import("../../shared/types").Config}
 * @param configFolder {string}
 */
const viteDev = async (config, configFolder) => {
  const port = await getPort({
    port: [config.port, 7891, 7892, 7893, 7894, 7895],
  })
  const hmrPort = await getPort({
    port: [24678, 24679, 24680, 24681, 24682, 24683, 24684, 24685],
  })

  debug(`Port set to: ${port}`)

  /**
   * @type {import('vite').InlineConfig}
   */
  const viteConfig = await getBaseViteConfig(config, configFolder, {
    mode: 'development',
    server: {
      port,
      hmr: {
        port: hmrPort,
      },
      fs: {
        strict: false,
      },
    },
  })

  const viteServer = await createServer(viteConfig)

  const serverUrl = `${viteServer.config.server.https ? 'https' : 'http'}://${
    viteServer.config.server.host || 'localhost'
  }:${port}`

  await viteServer.listen()

  return serverUrl
}

export default viteDev
