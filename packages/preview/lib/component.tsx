import * as React from 'react'
import PreviewOption from './option'
import { layoutCss, styled, textBaseCss } from './styles'
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

const UIHeaderWrap = styled('div', layoutCss, {
  background: '$component$heading_background',
  position: 'sticky',
  top: 0,
  zIndex: 1,
  marginBottom: '$component$heading_marginBottom',
  display: 'flex',
  alignItems: 'center',
  height: '$component$heading_height',
  paddingLeft: '24px',
  paddingRight: '24px',
})

const UIComponentHeading = styled('h2', textBaseCss, {
  fontSize: '$component$heading_fontSize',
  fontWeight: '$component$heading_fontWeight',
  color: '$component$heading_color',
})

const UIVariants = styled('div', layoutCss, {
  display: 'grid',
  rowGap: '$variant$gap',
  paddingLeft: '24px',
  paddingRight: '24px',
})

const UIVariantHeading = styled('h3', textBaseCss, {
  fontSize: '$variant$heading_fontSize',
  fontWeight: '$variant$heading_fontWeight',
  color: '$variant$heading_color',
  marginBottom: '$variant$heading_marginBottom',
})

const UIPanel = styled('div', layoutCss, {
  background: '$variant$background',
  border: '$variant$border',
  borderRadius: '$variant$borderRadius',
  padding: '16px',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  gap: '16px',
})
