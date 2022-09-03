import { BaseButton } from './button'
import { styled } from '../config'
import * as React from 'react'

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
      outline: {},
      ghost: {
        color: '$icon',
        bg: '$ghost',

        '&:hover': {
          bg: '$ghostHover',
          color: '$iconHover',
        },
        '&:active': {
          bg: '$ghostActive',
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

  const iconSize = size === 'xl' ? 'lg' : size
  const iconChild = React.cloneElement(children, { color: 'blend', size: iconSize })

  return (
    <UIIconButton size={size} {...props} ref={forwardedRef}>
      {iconChild}
    </UIIconButton>
  )
})
