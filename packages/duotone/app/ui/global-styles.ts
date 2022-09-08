export const globalStyles = {
  '*, ::before, ::after': {
    boxSizing: 'border-box',
    borderWidth: 0,
    borderStyle: 'solid',
  },

  html: {
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
    textRendering: 'optimizeLegibility',
    scrollBehavior: 'smooth',
    overscrollBehavior: 'none',
  },

  body: {
    color: '$text',
    lineHeight: '$body',
    fontFamily: '$body',
    bg: '$bodyBg',
    fontFeatureSettings: 'kern',
    overflowY: 'auto',
    overflowX: 'hidden',
  },

  'html, body, #root, #__next': {
    height: '100%',
    padding: 0,
    margin: 0,
  },

  '#__next': {
    position: 'relative',
    zIndex: '$base',
  },

  ':focus': {
    outline: 'none',
  },
  ':focus-visible': {
    outline: '$colors$focus solid 2px',
  },

  'a, button, [role="button"]': {
    cursor: 'pointer',
  },

  'h1, h2, h3, h4': {
    margin: 0,
  },
} as const
