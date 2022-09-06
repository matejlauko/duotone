import * as React from 'react'
import { styled } from '../styles'
import { Component, Variant } from '../types'

type Props = { component: Component; variant: Variant }

const VariantItem: React.FC<Props> = ({ component, variant }) => {
  const variantHash = `#${encodeURIComponent(component.name)}#${encodeURIComponent(variant.name)}`

  return <UIVariant href={variantHash}>{variant.name}</UIVariant>
}

export default VariantItem

const UIVariant = styled('a', {
  all: 'unset',
  fontFamily: '$root$fontFamily',
  lineHeight: '$root$lineHeight',
  fontWeight: 'inherit',
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  paddingLeft: '28px',
  fontSize: '$outline$variant_fontSize',

  '&:hover, &:focus-visible': {
    color: '$outline$button_hover_color',
  },
  '&:active': {
    color: '$outline$button_active_color',
  },
})
