import * as React from 'react'
import PreviewOption from './option'
import { styled } from './styles'
import { Component, Variant } from './types'

type Props = {
  component: Component
}

const PreviewComponent: React.FC<Props> = ({ component }) => {
  const headerWrapRef = React.useRef<React.ElementRef<typeof UIHeaderWrap>>(null)

  return (
    <UIComponentContainer data-component={component.name} key={component.name}>
      <UIHeaderWrap ref={headerWrapRef}>
        <UIComponentHeading>{component.name}</UIComponentHeading>
      </UIHeaderWrap>
      <UIHeaderShadow />

      <UIVariants>
        {component.render && (
          <UIPanel data-variant="default">
            <PreviewOption component={component} />
          </UIPanel>
        )}

        {component.variants?.map((variant) => (
          <PreviewVariant key={variant.name} variant={variant} component={component} />
        ))}
      </UIVariants>
    </UIComponentContainer>
  )
}

export default PreviewComponent

const PreviewVariant: React.FC<{
  component: Component
  variant: Variant
}> = ({ component, variant }) => {
  return (
    <div data-variant={variant.name} key={variant.name}>
      <UIVariantHeading>{variant.name}</UIVariantHeading>

      <UIPanel key={variant.name}>
        {variant.options.map((option, idx) => (
          <div key={idx}>
            <PreviewOption component={component} variant={variant} option={option} />
          </div>
        ))}
      </UIPanel>
    </div>
  )
}

const UIComponentContainer = styled('div', {})

const UIHeaderWrap = styled('div', {
  boxSizing: 'border-box',
  background: '$component$heading_background',
  position: 'sticky',
  top: 0,
  zIndex: 1,
  display: 'flex',
  alignItems: 'center',
  height: '$component$heading_height',
  paddingLeft: '24px',
  paddingRight: '24px',
})

const UIHeaderShadow = styled('div', {
  position: 'sticky',
  top: '10px',
  height: 'calc($component$heading_height - 10px)',
  marginTop: 'calc($component$heading_height * -1)',
  boxShadow: '0 5px 10px -5px $component$heading_shadow',
})

const UIComponentHeading = styled('h2', {
  all: 'unset',
  display: 'block',
  color: '$root$color',
  fontFamily: '$root$fontFamily',
  lineHeight: '$root$lineHeight',
  margin: 0,
  textRendering: 'optimizeLegibility',
  fontSize: '$component$heading_fontSize',
  fontWeight: '$component$heading_fontWeight',
})

const UIVariants = styled('div', {
  boxSizing: 'border-box',
  display: 'grid',
  rowGap: '$variant$gap',
  paddingLeft: '24px',
  paddingRight: '24px',
  paddingTop: '16px',
})

const UIVariantHeading = styled('h3', {
  all: 'unset',
  display: 'block',
  fontFamily: '$root$fontFamily',
  lineHeight: '$root$lineHeight',
  margin: 0,
  fontSize: '$variant$heading_fontSize',
  fontWeight: '$variant$heading_fontWeight',
  color: '$variant$heading_color',
  marginBottom: '8px',
})

const UIPanel = styled('div', {
  boxSizing: 'border-box',
  background: '$renderPanel$background',
  border: '$renderPanel$border',
  borderRadius: '$renderPanel$borderRadius',
  padding: '16px',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  gap: '16px',
})
