import { BaseButton, CSS, Popover, PopoverContent, PopoverTrigger, styled } from '../ui'
import * as React from 'react'
import { ColorPicker as ReactColorPrimitive, useColor } from 'react-color-palette'
import { getColorFormat, setColorFormat } from '../utils/color'
import { useDebouncedValue, useFirstRender } from '../utils/hooks'

type Props = {
  value: string
  onUpdate: (val: string) => void
  tokenId?: string
}

const ColorPicker: React.FC<Props> = ({ onUpdate, value, tokenId }) => {
  const isFirstRender = useFirstRender()

  const colorFormat = React.useMemo(() => getColorFormat(value), [])
  const [pickerColor, setPickerColor] = useColor('hex', setColorFormat(value, 'hex8'))
  const deferredColor = useDebouncedValue(pickerColor, 50)

  React.useEffect(() => {
    if (isFirstRender || !colorFormat) return

    onUpdate(setColorFormat(deferredColor.hex, colorFormat))
  }, [deferredColor])

  return (
    <Popover>
      <PopoverTrigger asChild={true}>
        <UIColorPreview
          aria-describedby={tokenId && `${tokenId}_label`}
          style={{ backgroundColor: value }}
        />
      </PopoverTrigger>

      <PopoverContent css={{ p: 0 }}>
        <UIColorPicker>
          <ReactColorPrimitive
            width={284}
            height={160}
            color={pickerColor}
            onChange={setPickerColor}
            alpha={true}
            hideHSV={true}
            hideHEX={true}
            hideRGB={true}
          />
        </UIColorPicker>
      </PopoverContent>
    </Popover>
  )
}

export default ColorPicker

const UIColorPreview = styled(BaseButton, {
  size: '$control_3xs',
  borderRadius: '$sm',
  border: '1px solid $border',

  '&:hover': {
    boxShadow: '$shadows$outline',
  },
})

const cursorStyles: CSS = {
  $$size: '20px',

  position: 'absolute',
  size: '$$size',
  border: '2px solid $colors$uiBg',
  borderRadius: '$round',
  cursor: 'move',
}

const sliderStyles: CSS = {
  position: 'relative',
  width: '100%',
  height: 12,
  borderRadius: '$sm',
  userSelect: 'none',
  cursor: 'crosshair',
}

const UIColorPicker = styled('div', {
  '.rcp': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    bg: '$uiBg',
    borderRadius: '$lg',
  },

  '.rcp-body': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: '$4',
    py: '$4',
    px: '$5',
  },

  '.rcp-saturation': {
    position: 'relative',
    width: '100%',
    backgroundImage:
      'linear-gradient(transparent, black), linear-gradient(to right, white, transparent)',
    borderTopLeftRadius: '$lg',
    borderTopRightRadius: '$lg',
    userSelect: 'none',
    cursor: 'crosshair',
  },

  '.rcp-saturation-cursor': {
    ...cursorStyles,

    boxShadow: '0 0 15px 0 rgba(0, 0, 0, 0.15)',
    transform: 'translate(calc(($$size / 2) *-1), calc(($$size / 2) *-1))',
  },

  '.rcp-hue': {
    ...sliderStyles,

    backgroundImage: `linear-gradient(
      to right,
      rgb(255, 0, 0),
      rgb(255, 255, 0),
      rgb(0, 255, 0),
      rgb(0, 255, 255),
      rgb(0, 0, 255),
      rgb(255, 0, 255),
      rgb(255, 0, 0)
    )`,
  },

  '.rcp-hue-cursor': {
    ...cursorStyles,

    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 0.5px',
    transform: 'translate(calc(($$size / 2) *-1), -4px)',
  },

  '.rcp-alpha': sliderStyles,

  '.rcp-alpha-cursor': {
    ...cursorStyles,

    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 0.5px',
    transform: 'translate(calc(($$size / 2) *-1), -4px)',
  },
})
