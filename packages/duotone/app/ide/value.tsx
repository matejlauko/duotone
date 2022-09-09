import * as React from 'react'
import { styled } from '../ui'
import { useDebouncedValue } from '../utils/hooks'
import { getTokenType, TokenType } from '../utils/tokens'
import ColorPicker from './colors/color-picker'
import ValueInput from './input'
import StitchesReference from './reference'

type Props = {
  path: string
  value: string
  onUpdate: (val: string) => void
  onReset: () => void
}

const TokenValue = React.memo<Props>(function TokenValue({
  value: outerValue,
  onUpdate,
  onReset,
  path,
}) {
  // Debounce changing token type by 500ms
  const debouncedOuterValue = useDebouncedValue(outerValue, 500)
  const tokenType = React.useMemo(() => getTokenType(debouncedOuterValue), [debouncedOuterValue])

  const valueInput = (
    <ValueInput
      id={`${path}_val`}
      key={`${path}_val`}
      value={outerValue}
      onUpdate={onUpdate}
      onReset={onReset}
      type={tokenType}
    />
  )

  const tokenAction = (() => {
    switch (tokenType) {
      case TokenType.Color: {
        return <ColorPicker tokenId={path} currentValue={outerValue} onUpdate={onUpdate} />
      }

      // Special Stitches variable reference case
      case TokenType.StitchesVariable: {
        return <StitchesReference path={path} value={outerValue} />
      }

      default:
        return null
    }
  })()

  return (
    <UIWrap>
      <UIAction>{tokenAction}</UIAction>

      {valueInput}
    </UIWrap>
  )
})

export default TokenValue

const UIWrap = styled('div', {
  display: 'flex',
  alignItems: 'center',
})

const UIAction = styled('div', {
  flexGrow: 0,
  flexShrink: 0,
  flexBasis: '$sizes$control_2xs',
  mr: '$2',
})
