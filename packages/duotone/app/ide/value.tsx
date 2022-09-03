import { styled } from '../ui'
import * as React from 'react'
import { getTokenType } from '../utils/tokens'
import ColorPicker from './color-picker'
import ValueInput from './input'

type Props = {
  tokenId: string
  value: string
  onUpdate: (val: string) => void
  onReset: () => void
}

const TokenValue = React.memo<Props>(function TokenValue({
  value: outerValue,
  onUpdate,
  onReset,
  tokenId,
}) {
  // Set just at first. Can't change later
  const tokenType = React.useMemo(() => getTokenType(outerValue), [])

  const valueInput = (
    <ValueInput
      id={`${tokenId}_val`}
      value={outerValue}
      onUpdate={onUpdate}
      onReset={onReset}
      type={tokenType}
    />
  )

  switch (tokenType) {
    case 'color': {
      return (
        <UIColorValue>
          <ColorPicker tokenId={tokenId} value={outerValue} onUpdate={onUpdate} />

          {valueInput}
        </UIColorValue>
      )
    }

    case 'size': {
      return valueInput
    }

    case 'number': {
      return valueInput
    }

    case 'discrete':
      return valueInput

    case 'text':
      return valueInput
  }

  return null
})

export default TokenValue

const UIColorValue = styled('div', {
  display: 'grid',
  gap: '$2',
  alignItems: 'center',
  gridTemplateColumns: 'max-content 1fr',
})
