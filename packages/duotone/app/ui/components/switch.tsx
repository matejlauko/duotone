import * as React from 'react'
import { styled, CSS } from '../config'
import * as SwitchPrimitive from '@radix-ui/react-switch'

const UISwitch = styled(SwitchPrimitive.Root, {
  all: 'unset',
  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
  position: 'relative',
  borderRadius: '$max',
  border: '1px solid $colors$border',
  width: '$sizes$control_xl',
  height: '$sizes$control_sm',
  bg: '$controlBgInactive',
  cursor: 'pointer',

  '&:focus-visible': { outline: '$colors$focus solid 2px' },
  '&[data-state="checked"]': { backgroundColor: '$solidAccentBg' },
})

const UIThumb = styled(SwitchPrimitive.Thumb, {
  $$size: 'calc($sizes$control_sm - 7px)',

  display: 'block',
  borderRadius: '$round',
  transition: 'transform 100ms',
  size: '$$size',
  backgroundColor: '$controlBg',
  boxShadow: '$3',
  transform: 'translateX(2px)',
  willChange: 'transform',
  '&[data-state="checked"]': { transform: `translateX(calc($sizes$control_xl - $$size - 4px))` },
})

//-----//

type SwitchProps = React.ComponentProps<typeof SwitchPrimitive.Root> & {
  css?: CSS
}

export const Switch = React.forwardRef<React.ElementRef<typeof UISwitch>, SwitchProps>(
  function Switch(props, forwardedRef) {
    return (
      <UISwitch {...props} ref={forwardedRef}>
        <UIThumb />
      </UISwitch>
    )
  }
)
