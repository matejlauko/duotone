import { styled } from '../config'

export const textVariants = {
  color: {
    text: {
      color: '$text',
    },
    accent: {
      color: '$textAccent',
    },
    muted: {
      color: '$textMuted',
    },
    contrast: {
      color: '$textContrast',
    },
  },
  weight: {
    light: {
      fontWeight: '$light',
    },
    normal: {
      fontWeight: '$normal',
    },
    medium: {
      fontWeight: '$medium',
    },
    bold: {
      fontWeight: '$bold',
    },
  },
  caps: {
    true: {
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },
  },
  size: {
    xxs: {
      fontSize: '$0',
    },
    xs: {
      fontSize: '$1',
    },
    sm: {
      fontSize: '$2',
    },
    base: {
      fontSize: '$base',
    },
    md: {
      fontSize: '$4',
    },
    lg: {
      fontSize: '$5',
    },
    xl: {
      fontSize: '$6',
    },
    xl2: {
      fontSize: '$7',
    },
    xl3: {
      fontSize: '$8',
    },
  },
  align: {
    center: { textAlign: 'center' },
    left: { textAlign: 'left' },
    right: { textAlign: 'right' },
  },
} as const

export const Text = styled('span', {
  display: 'inline-block',
  variants: textVariants,
})

export const Paragraph = styled('p', {
  lineHeight: '$$lg',
  variants: {
    ...textVariants,
    readable: {
      true: { maxWidth: 'min(600px, 75ch)' },
      large: { maxWidth: '800px' },
    },
  },
})
