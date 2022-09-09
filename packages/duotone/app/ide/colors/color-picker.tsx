import * as React from 'react'
import { BaseButton, Button, Popover, PopoverContent, PopoverTrigger, styled, Text } from '../../ui'
import ColorMixer from './color-mixer'
import ColorPalette from './color-palette'
import { COLOR_PALETTE } from '../../config'

type Props = {
  currentValue: string
  onUpdate: (val: string) => void
  tokenId?: string
}

const ColorPicker: React.FC<Props> = ({ onUpdate, currentValue, tokenId }) => {
  const [isColorPaletteOpen, setColorPaletteOpen] = React.useState(!!COLOR_PALETTE)

  const handleSwitchClick = () => {
    setColorPaletteOpen(!isColorPaletteOpen)
  }

  return (
    <Popover>
      <PopoverTrigger asChild={true}>
        <UIColorPreview
          aria-describedby={tokenId && `${tokenId}_label`}
          style={{ backgroundColor: currentValue }}
        />
      </PopoverTrigger>

      <PopoverContent css={{ width: '300px' }}>
        <UITop>
          <Text weight="medium">Pick color</Text>

          {!!COLOR_PALETTE && (
            <Button variant="ghost" size="sm" onClick={handleSwitchClick}>
              {isColorPaletteOpen ? 'Select custom' : 'Pick from palette'}&nbsp;🎨
            </Button>
          )}
        </UITop>
        {isColorPaletteOpen ? (
          <ColorPalette currentValue={currentValue} onUpdate={onUpdate} />
        ) : (
          <ColorMixer currentValue={currentValue} onUpdate={onUpdate} />
        )}
      </PopoverContent>
    </Popover>
  )
}

export default ColorPicker

const UIColorPreview = styled(BaseButton, {
  size: '$control_2xs',
  borderRadius: '$sm',
  border: '1px solid $border',

  '&:hover': {
    boxShadow: '$outline',
  },
})

const UITop = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  py: '$2',
  pl: '$3',
  pr: '$1',
  borderBottom: '1px solid $colors$line',
})
