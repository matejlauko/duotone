import { BaseButton } from './button'
import { styled } from '../config'
import * as React from 'react'
import { IconProps } from './icon'

const defaultVariants = {
  size: 'md',
  variant: 'outline',
} as const

export const UIIconButton = styled(BaseButton, {
  flexShrink: 0,
  paddingLeft: '0 !important',
  paddingRight: '0 !important',
  borderRadius: '$radii$md',
  color: '$icon',
  justifyContent: 'center',

  variants: {
    size: {
      '2xs': {
        size: '$control_2xs',
      },
      sm: {
        size: '$control_sm',
      },
      md: {
        size: '$control_md',
      },
      lg: {
        size: '$control_lg',
      },
      xl: {
        size: '$control_xl',
      },
    },
    variant: {
      outline: {
        color: '$text',
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '$border',

        '&:hover': {
          bg: '$outlineBgHover',
        },
        '&:active': {
          bg: '$outlineBgActive',
          color: '$iconActive',
        },
      },
      ghost: {
        color: '$icon',
        bg: '$ghostBg',

        '&:hover': {
          bg: '$ghostBgHover',
          color: '$iconHover',
        },
        '&:active': {
          bg: '$ghostBgActive',
          color: '$iconActive',
        },
      },
    },
  },
  defaultVariants,
})

export const IconButton = React.forwardRef<
  React.ElementRef<typeof UIIconButton>,
  React.ComponentProps<typeof UIIconButton> & { as?: React.ElementType }
>(function IconButton({ size = defaultVariants.size, children, ...props }, forwardedRef) {
  if (!children || !React.isValidElement(children)) return null

  const iconSize = (() => {
    switch (size) {
      case 'xl':
        return 'lg'
      case '2xs':
        return 'sm'
      default:
        return size
    }
  })() as 'sm' | 'md' | 'lg'

  const iconChild = React.cloneElement(children as React.ReactElement<IconProps>, {
    color: 'blend',
    size: iconSize,
  })

  return (
    <UIIconButton size={size} {...props} ref={forwardedRef}>
      {iconChild}
    </UIIconButton>
  )
})
