import * as React from 'react'
import { css, styled } from '../config'

export const resetInputCss = css({
  appearance: 'none',
  WebkitTapHighlightColor: 'transparent',
  background: 'transparent',
  margin: 0,
  padding: 0,
  fontFamily: 'inherit',
  minWidth: 0,
  display: 'block',

  [`&[type="search"]::-webkit-search-decoration,
  &[type="search"]::-webkit-search-cancel-button,
  &[type="search"]::-webkit-search-results-button,
  &[type="search"]::-webkit-search-results-decoration`]: {
    '-webkit-appearance': 'none',
  },
})

export const baseTextInputCss = css(resetInputCss, {
  lineHeight: 1,
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  transition: 'background-color $appear_fast, border-color $appear_fast',

  '&:disabled': {
    cursor: 'default',
    resize: 'none',
    opacity: 0.7,
  },
})

export const BaseInput = styled('input', baseTextInputCss)

export const UITextInput = styled(BaseInput, {
  borderWidth: '2px',
  borderRadius: '$radii$md',
  color: '$text',
  bg: '$controlBg',
  borderColor: '$border',
  height: '$control_md',
  px: '$space$3',
  fontSize: '$fontSizes$base',
  width: '100%',
  outline: 'none',

  '&:hover': {
    bg: '$controlBgHover',
    borderColor: '$borderHover',
  },
  '&:focus': {
    bg: '$controlBgActive',
    borderColor: '$focus',
    outline: 'none',
  },

  '&::placeholder': {
    color: '$textPlaceholder',
  },
})

type TextInputProps = {
  isRequired?: boolean
  label?: string
  value?: string
  onChangeVal?: (value: string) => void
} & React.ComponentProps<typeof UITextInput>

export const TextInput = React.forwardRef<React.ElementRef<typeof UITextInput>, TextInputProps>(
  function TextInput(
    { isRequired, label, type = 'text', value, onChangeVal, onChange, css, ...restProps },
    forwardedRef
  ) {
    return (
      <UITextInput
        type={type}
        aria-required={isRequired}
        aria-label={label}
        value={value}
        onChange={(event) => {
          onChange?.(event)
          onChangeVal?.(event.target.value)
        }}
        css={css as any}
        {...restProps}
        ref={forwardedRef}
      />
    )
  }
)
