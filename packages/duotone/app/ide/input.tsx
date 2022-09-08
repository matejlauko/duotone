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
    if (type === 'number') return [value]
    if (type !== 'size') return []

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

    if (type === 'number' || type === 'size') {
      let newNumVal = null

      if (event.key === 'ArrowUp') {
        newNumVal = Number(numVal) + 1
      } else if (event.key === 'ArrowDown') {
        newNumVal = Number(numVal) - 1
      }

      if (newNumVal !== null) {
        event.preventDefault()

        onUpdate(type === 'size' ? `${newNumVal}${unit}` : String(newNumVal))
      }
    }
  }

  return (
    <UIEditorInput
      id={id}
      defaultValue={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      valType={type}
      ref={inputRef}
    />
  )
}

export default ValueInput

export const UIEditorInput = styled('input', baseTextInputCss, {
  bg: '$editorInputBg',
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

  '&:focus': {
    outlineColor: '$focus',
  },

  '&:focus, &:hover': {
    bg: '$editorInputActive',
  },

  minWidth: '3ch',

  variants: {
    valType: {
      size: {
        width: '13ch',
      },
      color: {
        width: '100%',
        maxWidth: 300,
      },
      number: {
        width: '13ch',
      },
      discrete: {
        width: '100%',
        maxWidth: 300,
      },
      text: {
        width: '100%',
      },
    },
  },
})
