import * as React from 'react'
import { linkBaseCss, styled, textBaseCss } from '../styles'
import { Component, Variant } from '../types'

type Props = { component: Component; variant: Variant }

const VariantItem: React.FC<Props> = ({ component, variant }) => {
  const variantHash = `#${encodeURIComponent(component.name)}#${encodeURIComponent(variant.name)}`

  return <UIVariant href={variantHash}>{variant.name}</UIVariant>
}

export default VariantItem

const UIVariant = styled('a', textBaseCss, linkBaseCss, {
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  paddingLeft: '28px',
  fontSize: '$outline$variant_fontSize',
})
