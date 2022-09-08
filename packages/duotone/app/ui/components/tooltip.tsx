import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import * as React from 'react'
import { styled } from '../config'

const TooltipRoot = TooltipPrimitive.Root
const TooltipPortal = TooltipPrimitive.Portal
const TooltipTrigger = TooltipPrimitive.Trigger
const TooltipArrow = styled(TooltipPrimitive.Arrow, { fill: '$tooltipBg' })
const TooltipContent = styled(TooltipPrimitive.Content, {
  bg: '$tooltipBg',
  borderRadius: '$lg',
  boxShadow: '$3',
  color: '$textContrast',
  fontSize: '$1',
  fontWeight: '$medium',
  p: '$1 $2',
  zIndex: '$tooltip',

  variants: {
    multiline: {
      true: {
        lineHeight: '$lg',
        maxWidth: 250,
        pb: '$2',
      },
    },
  },
})

/** ======================================================================== **/

export const TooltipProvider = TooltipPrimitive.Provider

type ContentProps = React.ComponentProps<typeof TooltipContent>

type TooltipProps = React.ComponentProps<typeof TooltipRoot> &
  React.ComponentProps<typeof TooltipContent> & {
    children: React.ReactElement
    content: ContentProps['children']
    multiline?: boolean
    hasArrow?: boolean
  }

export const Tooltip: React.FC<React.PropsWithChildren<TooltipProps>> = ({
  content,
  multiline,
  children,
  css,
  side = 'top',
  sideOffset = 2,
  align = 'center',
  alignOffset,
  hasArrow = true,
  ...rootProps
}) => {
  if (!content) {
    return children
  }

  return (
    <TooltipRoot {...rootProps}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>

      <TooltipPortal>
        <TooltipContent
          side={side}
          sideOffset={sideOffset}
          align={align}
          alignOffset={alignOffset}
          multiline={multiline}
          css={css as any}
        >
          {content}

          {hasArrow && <TooltipArrow offset={5} width={11} height={5} />}
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  )
}
