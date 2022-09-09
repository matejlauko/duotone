import * as React from 'react'
import { ColorPicker as ColorPickerPrimitive, useColor } from 'react-color-palette'
import { CSS, styled } from '../../ui'
import { getColorFormat, setColorFormat } from '../../utils/color'
import { useDebouncedValue, useFirstRender } from '../../utils/hooks'

type Props = {
  currentValue: string
  onUpdate: (val: string) => void
}

const ColorMixer: React.FC<Props> = ({ onUpdate, currentValue }) => {
  const isFirstRender = useFirstRender()

  const colorFormat = React.useMemo(() => getColorFormat(currentValue), [])
  const [pickerColor, setPickerColor] = useColor('hex', setColorFormat(currentValue, 'hex8'))
  const deferredColor = useDebouncedValue(pickerColor, 50)

  React.useEffect(() => {
    if (isFirstRender || !colorFormat) return

    onUpdate(setColorFormat(deferredColor.hex, colorFormat))
  }, [deferredColor])

  return (
    <UIColorMixer>
      <ColorPickerPrimitive
        width={300}
        height={160}
        color={pickerColor}
        onChange={setPickerColor}
        alpha={true}
        hideHSV={true}
        hideHEX={true}
        hideRGB={true}
      />
    </UIColorMixer>
  )
}

export default ColorMixer

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

const UIColorMixer = styled('div', {
  '.rcp': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  '.rcp-body': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: '$3',
    py: '$3',
    px: '$3',
  },

  '.rcp-saturation': {
    position: 'relative',
    width: '100%',
    backgroundImage:
      'linear-gradient(transparent, black), linear-gradient(to right, white, transparent)',
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
