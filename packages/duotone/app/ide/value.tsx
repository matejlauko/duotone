import * as React from 'react'
import { COLOR_PALETTE } from '../config'
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
  // Token type can't change at this moment
  const tokenType = React.useMemo(() => getTokenType(outerValue), [])

  let _displayValue = outerValue
  let _onUpdate = onUpdate

  const tokenAction = (() => {
    switch (tokenType) {
      case TokenType.Color: {
        if (COLOR_PALETTE) {
          // Change dispalyed value for the color palette key
          _displayValue = COLOR_PALETTE.valKeyMap.get(outerValue) || outerValue

          // Make it possible to change color palette key directly in input
          _onUpdate = (_val: string) => {
            onUpdate(COLOR_PALETTE!.keyValMap.get(_val) || _val)
          }
        }

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

  const valueInput = (
    <ValueInput
      id={`${path}_val`}
      key={`${path}_val`}
      value={_displayValue}
      onUpdate={_onUpdate}
      onReset={onReset}
      type={tokenType}
    />
  )

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
