import * as React from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { styled } from '../config'
import { baseTextInputCss } from './text-input'

export const UITextArea = styled(TextareaAutosize, baseTextInputCss, {
  resize: 'none',
  borderWidth: 2,
  lineHeight: 1.4,
  color: '$text',
  bg: '$controlBg',
  borderColor: '$border',
  minHeight: '$sizes$control_md',
  minWidth: '240px',
  fontSize: '$fontSizes$base',
  px: '$space$3',
  py: '$space$2',
  borderRadius: '$radii$md',

  '&:hover': {
    bg: '$controlBgHover',
    borderColor: '$borderHover',
  },
  '&:focus': {
    bg: '$controlBgHover',
    borderColor: '$focus',
    outline: 'none',
  },

  '&:disabled': {
    cursor: 'default',
    resize: 'none',
    opacity: 0.7,
  },

  '&::placeholder': {
    color: '$textPlaceholder',
  },
})

type TextAreaProps = {
  label?: string
  value?: string
  onChangeVal?: (value: string) => void
  minRows?: number
  maxRows?: number
} & React.ComponentProps<typeof UITextArea>

export const TextArea = React.forwardRef<React.ElementRef<typeof UITextArea>, TextAreaProps>(
  function TextArea(
    { label, value, minRows = 3, maxRows, onChangeVal, onChange, css, ...restProps },
    forwardedRef
  ) {
    const handleChange = React.useCallback(
      (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange?.(event)
        onChangeVal?.(event.target.value)
      },
      [onChange, onChangeVal]
    )

    return (
      <UITextArea
        aria-label={label}
        value={value}
        minRows={minRows}
        maxRows={maxRows}
        onChange={handleChange}
        css={css as any}
        {...restProps}
        ref={forwardedRef}
      />
    )
  }
)
