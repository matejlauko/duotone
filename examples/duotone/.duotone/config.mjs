/**
 * @type {import('@duotone/react').UserConfig}
 */
export default {
  name: 'This One',
  themes: {
    mainThemeTokens: {
      name: 'main',
      path: '../themes.js',
      previewStyles: { renderPanel: { background: 'white' } },
    },
    headerThemeTokens: {
      name: 'header',
      path: '../themes.js',
      previewStyles: {
        renderPanel: {
          textColor: 'white',
          background: '#1a1d1e',
        },
      },
    },
  },
}
