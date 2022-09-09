import * as React from 'react'
import { styled } from '../ui'
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
  // Set just at first. Can't change later
  const tokenType = React.useMemo(() => getTokenType(outerValue), [])

  const valueInput = (
    <ValueInput
      id={`${path}_val`}
      value={outerValue}
      onUpdate={onUpdate}
      onReset={onReset}
      type={tokenType}
    />
  )

  switch (tokenType) {
    case TokenType.Color: {
      return (
        <UIWrap>
          <ColorPicker tokenId={path} currentValue={outerValue} onUpdate={onUpdate} />

          {valueInput}
        </UIWrap>
      )
    }

    case TokenType.Size:
    case TokenType.Number:
    case TokenType.Discrete:
    case TokenType.Text:
      return valueInput

    // Special Stitches variable reference case
    case TokenType.StitchesVariable: {
      return (
        <UIWrap>
          <StitchesReference path={path} value={outerValue} />

          {valueInput}
        </UIWrap>
      )
    }
  }

  return null
})

export default TokenValue

const UIWrap = styled('div', {
  display: 'grid',
  gap: '$2',
  alignItems: 'center',
  gridTemplateColumns: 'max-content 1fr',
})
