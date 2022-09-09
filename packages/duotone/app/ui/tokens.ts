import { colors } from './colors'

export const lightThemeTokens = {
  colors: {
    hiContrast: colors.black,
    loContrast: colors.white,

    // Backgrounds

    uiBg: '$loContrast',
    uiBg2: colors.gray1,
    uiBg3: colors.gray2,
    uiBg4: colors.gray3,
    uiBg5: colors.gray4,
    uiBg6: colors.gray5,

    bodyBg: '$uiBg4',

    panelBg: colors.grayA2,
    overlayBg: colors.grayA11,
    tooltipBg: colors.grayA12,
    resultBg: colors.accentA5,
    scrollThumbBg: colors.grayA8,

    // Texts

    text: '$hiContrast',
    textMuted: colors.gray11,
    textContrast: '$loContrast',
    textPlaceholder: colors.gray9,

    textAccent: colors.accent11,
    textDestroy: colors.red11,

    // Lines & Borders

    lineUltraLight: colors.gray3,
    lineLight: colors.gray5,
    line: colors.gray6,
    border: colors.gray7,
    borderHover: colors.gray8,

    focus: colors.accentA8,

    borderAccent: colors.accent7,
    borderAccentActive: colors.accent9,

    borderDestroy: colors.red6,

    // Buttons

    solidText: '$loContrast',

    solidAccentBg: colors.accent9,
    solidAccentBgHover: colors.accent10,
    solidAccentBgActive: colors.accent11,

    outlineBorder: colors.gray7,
    outlineBgHover: colors.grayA3,
    outlineBgActive: colors.grayA4,

    ghostBg: 'transparent',
    ghostBgHover: colors.grayA3,
    ghostBgActive: colors.grayA4,

    ghostAccentBgHover: colors.accent3,
    ghostAccentBgActive: colors.accent4,
    ghostAccentTextHover: '$textAccent',

    ghostDestroyBgHover: colors.red3,
    ghostDestroyBgActive: colors.red4,
    ghostDestroyTextHover: '$textDestroy',

    // Controls

    controlBg: '$loContrast',
    controlBgHover: colors.gray1,
    controlBgActive: colors.gray2,
    controlBgInactive: colors.gray5,

    editorInputActive: '$uiBg2',

    // Icons

    icon: colors.gray9,
    iconHover: colors.gray11,
    iconActive: colors.gray12,
  },
  fonts: {
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
  fontSizes: {
    1: '0.75rem',
    2: '0.8125rem',
    3: '0.875rem',
    4: '0.9375',
    5: '1rem',
    6: '1.125rem',
    7: '1.25rem',
    8: '1.5rem',
    9: '1.75rem',
    10: '2rem',

    base: '$fontSizes$3',
  },
  lineHeights: {
    body: 1.5,
    lg: 1.75,
  },
  fontWeights: {
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    black: 800,
  },
  space: {
    '0_5': '2px',
    1: '4px',
    '1_5': '6px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    7: '28px',
    8: '32px',
    9: '36px',
    10: '40px',
    12: '48px',
    14: '56px',
    16: '64px',
    18: '72px',
    20: '80px',
    24: '96px',
    28: '112px',
  },
  sizes: {
    control_3xs: '16px',
    control_2xs: '20px',
    control_xs: '24px',
    control_sm: '28px',
    control_md: '34px',
    control_lg: '40px',
    control_xl: '48px',
    control_xxl: '64px',
  },
  radii: {
    sm: '4px',
    md: '6px',
    lg: '10px',
    round: '50%',
    max: '9909px',
  },
  shadows: {
    outline: '0 0 0 2px $colors$focus',

    1: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    2: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    3: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    4: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    5: '0px 10px 38px -10px rgba(0, 0, 0, 0.35), 0px 10px 20px -15px rgba(0, 0, 24, 0.2)',
  },
  zIndices: {
    under: 0,
    base: 1,
    search: 3,
    popover: 200,
    tooltip: 250,
    dialogOverlay: 300,
    dialog: 301,
  },
  transitions: {
    appear_fast: '.15s cubic-bezier(0, 0, 0.40, 1)', // ease-out
    appear_slow: '0.3s cubic-bezier(0, 0, 0.40, 1)', // ease-out
    out_fast: '0.15s cubic-bezier(0.50, 0, 1, 1)', // ease-in
    out_slow: '0.3s cubic-bezier(0.50, 0, 1, 1)', // ease-in
    move_fast: '0.15s cubic-bezier(0.45, 0, 0.40, 1)', // ease-in-out
    move_slow: '0.3s cubic-bezier(0.45, 0, 0.40, 1)', // ease-in-out
  },
}

export const darkThemeTokens = {
  colors: {
    hiContrast: colors.white,
    loContrast: colors.black,

    // Backgrounds

    uiBg: colors.grayDark2,

    bodyBg: colors.grayDark1,

    panelBg: colors.grayDarkA2,
    overlayBg: colors.grayDarkA11,
    tooltipBg: colors.grayDarkA12,
    resultBg: colors.accentDarkA5,
    scrollThumbBg: colors.grayDarkA8,

    // Texts

    text: '$hiContrast',
    textMuted: colors.grayDark11,
    textContrast: '$loContrast',
    textPlaceholder: colors.grayDark9,

    textAccent: colors.accentDark11,
    textDestroy: colors.redDark11,

    // Lines & Borders

    lineUltraLight: colors.grayDark3,
    lineLight: colors.grayDark5,
    line: colors.grayDark6,
    border: colors.grayDark7,
    borderHover: colors.grayDark8,

    focus: colors.accentDarkA8,

    borderAccent: colors.accentDark6,
    borderAccentActive: colors.accentDark9,

    borderDestroy: colors.redDark6,

    // Buttons

    solidText: '$hiContrast',

    solidAccentBg: colors.accentDark9,
    solidAccentBgHover: colors.accentDark10,
    solidAccentBgActive: colors.accentDark11,

    outlineBorder: colors.grayDark7,
    outlineBgHover: colors.grayDarkA3,
    outlineBgActive: colors.grayDarkA4,

    ghostBg: 'transparent',
    ghostBgHover: colors.grayDarkA3,
    ghostBgActive: colors.grayDarkA4,

    ghostAccentBgHover: colors.accentDark3,
    ghostAccentBgActive: colors.accentDark4,
    ghostAccentTextHover: '$text',

    ghostDestroyBgHover: colors.redDark3,
    ghostDestroyBgActive: colors.redDark4,
    ghostDestroyTextHover: '$text',

    // Controls

    controlBg: '$loContrast',
    controlBgHover: colors.grayDark1,
    controlBgActive: colors.grayDark2,
    controlBgInactive: colors.grayDark5,

    editorInputActive: '$uiBg2',

    // Icons

    icon: colors.grayDark11,
    iconHover: colors.grayDark12,
    iconActive: colors.white,
  },
}
