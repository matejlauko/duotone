import { css, styled } from '../config'

export const panelCss = css({
  bg: '$panelBg',
  backdropFilter: 'blur(20px)',
  borderRadius: '$radii$lg',
  boxShadow: '$shadows$5',
  borderWidth: 1,
  borderColor: '$line',
})

export const Panel = styled('div', panelCss)
