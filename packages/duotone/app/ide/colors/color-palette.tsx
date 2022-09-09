import * as React from 'react'
import { BaseButton, Scrollable, styled, Text, Tooltip, VStack } from '../../ui'
import { COLOR_PALETTE } from '../../config'

type Props = {
  currentValue: string
  onUpdate: (val: string) => void
}

const ColorPalette: React.FC<Props> = ({ currentValue, onUpdate }) => {
  if (!COLOR_PALETTE) return null

  const handleColorClick = (_val: string) => {
    onUpdate(_val)
  }

  return (
    <Scrollable css={{ maxHeight: '300px' }}>
      <UIPalette>
        <VStack role="list">
          {COLOR_PALETTE.colors && (
            <UIColorGrid role="listitem">
              {Object.entries(COLOR_PALETTE.colors).map(([colKey, colVal]) => (
                <Tooltip content={colVal} delayDuration={200} key={colKey}>
                  <UIColor
                    style={{ backgroundColor: colVal }}
                    selected={colVal === currentValue}
                    onClick={() => handleColorClick(colVal)}
                  />
                </Tooltip>
              ))}
            </UIColorGrid>
          )}

          {Object.entries(COLOR_PALETTE.scales).map(([scaleName, scale]) => (
            <div role="listitem" key={scaleName}>
              <Text weight="bold">{scaleName}</Text>

              <UIColorGrid>
                {Object.entries(scale).map(([colKey, colVal]) => (
                  <Tooltip content={colKey} delayDuration={200} key={colKey}>
                    <UIColor
                      style={{ backgroundColor: colVal }}
                      selected={colVal === currentValue}
                      onClick={() => handleColorClick(colVal)}
                    />
                  </Tooltip>
                ))}
              </UIColorGrid>
            </div>
          ))}
        </VStack>
      </UIPalette>
    </Scrollable>
  )
}

export default ColorPalette

const UIPalette = styled('div', {
  pl: '$3',
  pr: '$2',
  pt: '$2',
  pb: '$3',
})

const UIColorGrid = styled('div', {
  display: 'grid',
  gap: '$1_5',
  gridTemplateColumns: 'repeat(9, $sizes$control_xs)',
  mt: '$1_5',
})

const UIColor = styled(BaseButton, {
  size: '$control_xs',
  borderRadius: '$sm',
  border: '1px solid $border',
  mr: '$1',

  '&:hover': {
    boxShadow: '$outline',
    transform: 'scale(1.1)',
  },

  variants: {
    selected: {
      true: {
        boxShadow: '$outline',
      },
    },
  },
})
