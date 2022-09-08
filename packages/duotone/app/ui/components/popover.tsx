import * as PopoverPrimitive from '@radix-ui/react-popover'
import * as React from 'react'
import { CSS, keyframes, styled } from '../config'

export const PopoverRoot = PopoverPrimitive.Root
export const PopoverPortal = PopoverPrimitive.Portal

const slideUpAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
})

const slideRightAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(-2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
})

const slideDownAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
})

const slideLeftAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
})

const UIContent = styled(PopoverPrimitive.Content, {
  borderRadius: '$lg',
  padding: '$3',
  minWidth: 260,
  backgroundColor: '$uiBg',
  boxShadow: '$4',
  borderWidth: 1,
  borderColor: '$line',
  zIndex: '$popover',

  '@motion': {
    animationDuration: '400ms',
    animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    animationFillMode: 'forwards',
    willChange: 'transform, opacity',

    '&[data-state="open"]': {
      '&[data-side="top"]': { animationName: slideDownAndFade },
      '&[data-side="right"]': { animationName: slideLeftAndFade },
      '&[data-side="bottom"]': { animationName: slideUpAndFade },
      '&[data-side="left"]': { animationName: slideRightAndFade },
    },
  },
})

/* ========= */

export const Popover = PopoverRoot
export const PopoverTrigger = PopoverPrimitive.Trigger

type PopoverContentProps = React.PropsWithChildren<PopoverPrimitive.PopoverContentProps> & {
  css?: CSS
}

export const PopoverContent: React.FC<PopoverContentProps> = ({
  children,
  sideOffset = 5,
  ...props
}) => {
  return (
    <PopoverPortal>
      <UIContent sideOffset={sideOffset} {...props}>
        {children}
      </UIContent>
    </PopoverPortal>
  )
}
