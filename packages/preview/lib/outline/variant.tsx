import * as React from 'react'
import { usePreviewContext } from '../context'
import { styled } from '../styles'
import { Component, Variant } from '../types'

type Props = { component: Component; variant: Variant }

const VariantItem: React.FC<Props> = ({ component, variant }) => {
  const { scrollToComponent } = usePreviewContext()

  const variantHash = `#component=${encodeURIComponent(
    component.name
  )}&variant=${encodeURIComponent(variant.name)}`

  const handleClick = () => {
    scrollToComponent(component.name, variant.name)
  }

  return (
    <UIVariant className="dtp-outline-variant" href={variantHash} onClick={handleClick}>
      <UIVariantName>{variant.name}</UIVariantName>
    </UIVariant>
  )
}

export default VariantItem

const UIVariant = styled('a', {
  all: 'unset',
  fontFamily: '$root$fontFamily',
  lineHeight: '$root$lineHeight',
  fontWeight: 'inherit',
  color: 'inherit',
  display: 'inline-flex',
  alignItems: 'center',
  flex: 1,
  paddingLeft: '28px',
  fontSize: '$outline$variant_fontSize',
  overflow: 'hidden',

  '&:hover, &:focus-visible': {
    color: '$outline$link_hover_color',
  },
})

const UIVariantName = styled('span', {
  all: 'unset',
  fontFamily: '$root$fontFamily',
  lineHeight: '$root$lineHeight',
  fontSize: '$outline$variant_fontSize',
  color: 'inherit',
  fontWeight: 'inherit',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '100%',
})
