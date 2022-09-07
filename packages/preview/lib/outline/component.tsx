import * as React from 'react'
import { styled } from '../styles'
import { Component } from '../types'
import { AccordionChevron, AccordionContent, AccordionHeader, AccordionTrigger } from './accordion'
import VariantItem from './variant'

type Props = {
  component: Component
  onSelect: () => void
}

const OutlineComponent: React.FC<Props> = ({ component, onSelect }) => {
  const componentHash = `#component=${encodeURIComponent(component.name)}`

  const handleComponentClick = () => {
    location.hash = componentHash

    onSelect()
  }

  return (
    <>
      <UIComponent className="dtp-outline-component" onClick={handleComponentClick}>
        <UIComponentLink href={componentHash}>
          <UIComponentName>{component.name}</UIComponentName>
        </UIComponentLink>

        {component.variants && (
          <AccordionTrigger
            className="dtp-outline-expand"
            aria-label="Toggle variants list"
            asChild={true}
            onClick={(event) => event.stopPropagation()}
          >
            <UIExpandButton>
              <AccordionChevron />
            </UIExpandButton>
          </AccordionTrigger>
        )}
      </UIComponent>

      {component.variants && (
        <AccordionContent>
          <div role="list" className="dtp-outline-variants">
            {component.variants.map((variant) => (
              <UIItem key={variant.name} role="listitem">
                <VariantItem variant={variant} component={component} />
              </UIItem>
            ))}
          </div>
        </AccordionContent>
      )}
    </>
  )
}

export default OutlineComponent

export const UIItem = styled('div', {
  boxSizing: 'border-box',
  height: '34px',
  display: 'flex',
  justifyContent: 'space-between',
  paddingRight: '8px',
  cursor: 'pointer',
  color: '$outline$item_color',
  fontWeight: '$outline$item_fontWeight',
  userSelect: 'none',

  '&:hover': {
    background: '$outline$button_hover_background',
  },
  '&:active': {
    background: '$outline$button_active_background',
  },
})

const UIComponentLink = styled('a', {
  all: 'unset',
  color: 'inherit',

  '&:hover, &:focus-visible': {
    color: '$outline$button_hover_color',
  },
})

const UIComponentName = styled(AccordionHeader, {
  all: 'unset',
  display: 'block',
  fontFamily: '$root$fontFamily',
  lineHeight: '$root$lineHeight',
  fontSize: '$outline$component_fontSize',
  color: 'inherit',
  fontWeight: 'inherit',
})

const UIComponent = styled(UIItem, {
  paddingLeft: '16px',
  alignItems: 'center',
})

const UIExpandButton = styled('button', {
  all: 'unset',
  userSelect: 'none',
  lineHeight: '1',
  cursor: 'pointer',
  WebkitTapHighlightColor: 'transparent',
  fontFamily: 'inherit',
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '28px',
  height: '28px',
  background: '$outline$expand_background',
  color: '$outline$expand_color',
  borderRadius: '$outline$expand_borderRadius',

  '&:hover, &:focus-visible': {
    background: '$outline$expand_hover_background',
    color: '$outline$expand_hover_color',
  },
  '&:active': {
    background: '$outline$expand_active_background',
    color: '$outline$expand_active_color',
  },
  '&[data-state="open"]:not(:hover)': {
    background: 'transparent',
  },
  '&:focus': {
    border: 'none',
    outline: 'none',
  },
})
