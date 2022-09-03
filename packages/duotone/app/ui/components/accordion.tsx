import * as React from 'react'
import { styled, keyframes } from '../config'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDownIcon } from './icon'
import { resetButtonCss } from './button'

const UIItem = styled(AccordionPrimitive.Item, {
  overflow: 'hidden',

  '&:focus-within': {
    position: 'relative',
    zIndex: 1,
  },
})

const UIHeader = styled(AccordionPrimitive.Header, {
  all: 'unset',
  display: 'flex',
})

const UITrigger = styled(AccordionPrimitive.Trigger, resetButtonCss, {
  display: 'flex',
  alignItems: 'center',
})

const slideDown = keyframes({
  from: { height: 0 },
  to: { height: 'var(--radix-accordion-content-height)' },
})

const slideUp = keyframes({
  from: { height: 'var(--radix-accordion-content-height)' },
  to: { height: 0 },
})

const UIContent = styled(AccordionPrimitive.Content, {
  overflow: 'hidden',

  variants: {
    animated: {
      true: {
        '@motion': {
          '&[data-state="open"]': {
            animation: `${slideDown} 300ms cubic-bezier(0.87, 0, 0.13, 1) forwards`,
          },
          '&[data-state="closed"]': {
            animation: `${slideUp} 300ms cubic-bezier(0.87, 0, 0.13, 1) forwards`,
          },
        },
      },
    },
  },
})

const UIChevron = styled(ChevronDownIcon, {
  '@motion': {
    transition: 'transform 300ms cubic-bezier(0.87, 0, 0.13, 1)',
  },

  '[data-state=open] &': { transform: 'rotate(180deg)' },
})

export const Accordion = styled(AccordionPrimitive.Root)
export const AccordionItem = UIItem
export const AccordionContent = UIContent

export const AccordionHeader = UIHeader
export const AccordionTrigger = UITrigger

export const AccordionChevron = React.forwardRef<React.ElementRef<typeof UIChevron>>(
  function AccordionChevron(props, forwardedRef) {
    return <UIChevron aria-hidden {...props} ref={forwardedRef} />
  }
)
