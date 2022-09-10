import { styled, css } from '../config'

export const Box = styled('div', {
  display: 'block',
})

const commonStackStyles = {
  gap: {
    none: { gap: 0 },
    xs: {
      gap: '$1',
    },
    sm: {
      gap: '$2',
    },
    md: {
      gap: '$4',
    },
    lg: {
      gap: '$8',
    },
  },
  justify: {
    start: {
      justifyContent: 'flex-start',
    },
    end: {
      justifyContent: 'flex-end',
    },
    center: {
      justifyContent: 'center',
    },
    between: {
      justifyContent: 'space-between',
    },
  },
  align: {
    start: {
      alignItems: 'flex-start',
    },
    center: {
      alignItems: 'center',
    },
    end: {
      alignItems: 'flex-end',
    },
  },
}

export const hstackCss = css({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  flexDirection: 'row',

  variants: {
    vertical: {
      true: {
        flexDirection: 'column',
        alignItems: 'start',
      },
    },
    ...commonStackStyles,
  },
  defaultVariants: {
    gap: 'md',
  },
})

export const HStack = styled('div', hstackCss)

export const vstackCss = css({
  display: 'flex',
  alignItems: 'stretch',
  flexDirection: 'column',

  variants: {
    ...commonStackStyles,
  },
  defaultVariants: {
    gap: 'md',
  },
})

export const VStack = styled('div', vstackCss)

export const HCenter = styled('div', { display: 'flex', justifyContent: 'center' })

export const Scrollable = styled('div', {
  overflow: 'auto',
  maxHeight: '100%',

  '&::-webkit-scrollbar': {
    width: '15px',
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: '$radii$lg',
    borderWidth: '5px',
    bg: '$scrollThumbBg',
    opacity: 0,
    borderColor: 'transparent',
    borderStyle: 'solid',
    backgroundClip: 'content-box',
  },
  '&::-webkit-scrollbar-track': {
    bg: 'inherit',
  },
})
