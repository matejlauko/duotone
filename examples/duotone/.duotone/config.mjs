/**
 * @type {import('@duotone/react').UserConfig}
 */
export default {
  name: 'duotone UI',
  themes: {
    lightThemeTokens: {
      name: 'light',
      path: '../themes.js',
      previewStyles: { renderPanel: { background: 'white' } },
    },
    darkThemeTokens: {
      name: 'dark',
      path: '../themes.js',
      previewStyles: {
        renderPanel: {
          fontColor: 'white',
          background: '#202425',
        },
      },
    },
  },
  colorPalette: {
    white: '#FFF',
    black: '#151718',

    gray: {
      gray1: '#fbfcfd',
      gray2: '#f8f9fa',
      gray3: '#f1f3f5',
      gray4: '#eceef0',
      gray5: '#e6e8eb',
      gray6: '#dfe3e6',
      gray7: '#d7dbdf',
      gray8: '#c1c8cd',
      gray9: '#889096',
      gray10: '#7e868c',
      gray11: '#687076',
      gray12: '#11181c',
    },

    grayDark: {
      grayDark1: '#151718',
      grayDark2: '#1a1d1e',
      grayDark3: '#202425',
      grayDark4: '#26292b',
      grayDark5: '#2b2f31',
      grayDark6: '#313538',
      grayDark7: '#3a3f42',
      grayDark8: '#4c5155',
      grayDark9: '#697177',
      grayDark10: '#787f85',
      grayDark11: '#9ba1a6',
      grayDark12: '#ecedee',
    },

    grayA: {
      grayA1: 'hsla(210, 92.6%, 26.5%, 0.016)',
      grayA2: 'hsla(210, 87.7%, 16.0%, 0.028)',
      grayA3: 'hsla(210, 98.8%, 14.4%, 0.055)',
      grayA4: 'hsla(210, 94.1%, 11.1%, 0.075)',
      grayA5: 'hsla(216, 91.1%, 10.9%, 0.099)',
      grayA6: 'hsla(206, 96.4%, 11.3%, 0.126)',
      grayA7: 'hsla(210, 99.1%, 10.1%, 0.157)',
      grayA8: 'hsla(205, 96.5%, 10.0%, 0.244)',
      grayA9: 'hsla(206, 98.8%, 5.9%, 0.467)',
      grayA10: 'hsla(206, 99.6%, 5.4%, 0.506)',
      grayA11: 'hsla(206, 97.0%, 4.8%, 0.593)',
      grayA12: 'hsla(202, 97.0%, 2.4%, 0.934)',
    },

    grayDarkA: {
      grayDarkA1: 'hsla(0, 0%, 0%, 0)',
      grayDarkA2: 'hsla(181, 98.9%, 91.8%, 0.026)',
      grayDarkA3: 'hsla(182, 86.7%, 91.4%, 0.057)',
      grayDarkA4: 'hsla(209, 86.7%, 93.9%, 0.083)',
      grayDarkA5: 'hsla(200, 90.3%, 93.4%, 0.109)',
      grayDarkA6: 'hsla(209, 95.3%, 93.5%, 0.139)',
      grayDarkA7: 'hsla(204, 98.5%, 93.9%, 0.182)',
      grayDarkA8: 'hsla(209, 94.0%, 94.7%, 0.265)',
      grayDarkA9: 'hsla(207, 97.3%, 94.0%, 0.412)',
      grayDarkA10: 'hsla(209, 99.4%, 95.2%, 0.472)',
      grayDarkA11: 'hsla(208, 98.7%, 96.8%, 0.615)',
      grayDarkA12: 'hsla(211, 86.7%, 99.6%, 0.927)',
    },

    accent: {
      accent1: '#fdfdfe',
      accent2: '#f8faff',
      accent3: '#f0f4ff',
      accent4: '#e6edfe',
      accent5: '#d9e2fc',
      accent6: '#c6d4f9',
      accent7: '#aec0f5',
      accent8: '#8da4ef',
      accent9: '#3e63dd',
      accent10: '#3a5ccc',
      accent11: '#3451b2',
      accent12: '#101d46',
    },

    accentDark: {
      accentDark1: '#131620',
      accentDark2: '#15192d',
      accentDark3: '#192140',
      accentDark4: '#1c274f',
      accentDark5: '#1f2c5c',
      accentDark6: '#22346e',
      accentDark7: '#273e89',
      accentDark8: '#2f4eb2',
      accentDark9: '#3e63dd',
      accentDark10: '#5373e7',
      accentDark11: '#849dff',
      accentDark12: '#eef1fd',
    },

    accentA: {
      accentA5: 'hsla(225, 98.6%, 46.4%, 0.150)',
      accentA8: 'hsla(226, 99.5%, 43.1%, 0.448)',
    },

    accentDarkA: {
      accentDarkA5: 'hsla(227, 99.2%, 62.3%, 0.270)',
      accentDarkA8: 'hsla(226, 99.9%, 62.1%, 0.655)',
    },

    red: {
      red1: '#fffcfc',
      red2: '#fff8f8',
      red3: '#ffefef',
      red4: '#ffe5e5',
      red5: '#fdd8d8',
      red6: '#f9c6c6',
      red7: '#f3aeaf',
      red8: '#eb9091',
      red9: '#e5484d',
      red10: '#dc3d43',
      red11: '#cd2b31',
      red12: '#381316',
    },

    redDark: {
      redDark1: '#1f1315',
      redDark2: '#291415',
      redDark3: '#3c181a',
      redDark4: '#481a1d',
      redDark5: '#541b1f',
      redDark6: '#671e22',
      redDark7: '#822025',
      redDark8: '#aa2429',
      redDark9: '#e5484d',
      redDark10: '#f2555a',
      redDark11: '#ff6369',
      redDark12: '#feecee',
    },
  },
}
