import { styled, css } from '../config'

export const overlayCss = css({
  bg: '$overlayBg',
  backdropFilter: 'blur(2px)',
})

export const Overlay = styled('div', overlayCss)
