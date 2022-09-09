import * as React from 'react'
import { baseTextInputCss, styled } from '../ui'
import { getValueAndUnit, TokenType } from '../utils/tokens'

type Props = {
  id: string
  value: string
  onUpdate: (val: string) => void
  onReset: () => void
  type: TokenType
}

const ValueInput: React.FC<Props> = ({ id, value, onUpdate, onReset, type }) => {
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = value
    }
  }, [value])

  const [numVal, unit] = React.useMemo(() => {
    if (type === TokenType.Number) return [value]
    if (type !== TokenType.Size) return []

    return getValueAndUnit(value)
  }, [value])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value

    if (val) {
      onUpdate(val)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      onReset()
      inputRef.current?.blur()

      return
    }

    if (type === TokenType.Number || type === TokenType.Size) {
      let newNumVal = null

      if (event.key === 'ArrowUp') {
        newNumVal = Number(numVal) + 1
      } else if (event.key === 'ArrowDown') {
        newNumVal = Number(numVal) - 1
      }

      if (newNumVal !== null) {
        event.preventDefault()

        onUpdate(type === TokenType.Size ? `${newNumVal}${unit}` : String(newNumVal))
      }
    }
  }

  return (
    <UIEditorInput
      id={id}
      defaultValue={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      ref={inputRef}
    />
  )
}

export default ValueInput

export const UIEditorInput = styled('input', baseTextInputCss, {
  borderRadius: '$sm',
  fontFamily: '$mono',
  height: '$control_xs',
  lineHeight: 1,
  borderWidth: 1,
  px: '$2',
  fontSize: '$1',
  fontWeight: '$semibold',
  color: '$text',
  display: 'flex',
  alignItems: 'center',
  border: 'none',
  transition: 'background-color $appear_fast, border-color $appear_fast',
  outlineWidth: '1px',
  outlineStyle: 'solid',
  outlineColor: 'transparent',

  '&:hover': {
    bg: '$editorInputActive',
  },
  '&:focus': {
    outlineColor: '$focus',
    bg: '$editorInputActive',
  },

  width: '100%',
})
