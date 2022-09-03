import * as React from 'react'
import { buttonBaseCss, layoutCss, linkBaseCss, styled, textBaseCss } from '../styles'
import { Component } from '../types'
import { AccordionChevron, AccordionContent, AccordionHeader, AccordionTrigger } from './accordion'
import VariantItem from './variant'

type Props = {
  component: Component
  onSelect: () => void
}

const OutlineComponent: React.FC<Props> = ({ component, onSelect }) => {
  const componentHash = `#${encodeURIComponent(component.name)}`

  const handleComponentClick = () => {
    location.hash = componentHash

    onSelect()
  }

  return (
    <div role="listitem">
      <UIComponent onClick={handleComponentClick}>
        <UIComponentLink href={componentHash}>
          <UIComponentName>{component.name}</UIComponentName>
        </UIComponentLink>

        {component.variants && (
          <AccordionTrigger
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
          <div role="list">
            {component.variants.map((variant) => (
              <UIItem key={variant.name} role="listitem">
                <VariantItem variant={variant} component={component} />
              </UIItem>
            ))}
          </div>
        </AccordionContent>
      )}
    </div>
  )
}

export default OutlineComponent

export const UIItem = styled('div', layoutCss, {
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
    color: '$outline$button_hover_color',
  },
  '&:active': {
    background: '$outline$button_active_background',
    color: '$outline$button_active_color',
  },
})

const UIComponentLink = styled('a', linkBaseCss)

const UIComponentName = styled(AccordionHeader, textBaseCss, {
  fontSize: '$outline$component_fontSize',
  color: 'inherit',
  fontWeight: 'inherit',
})

const UIComponent = styled(UIItem, {
  paddingLeft: '16px',
  alignItems: 'center',
})

const UIExpandButton = styled('button', buttonBaseCss, {
  width: '28px',
  height: '28px',
  background: '$outline$expand_background',
  color: '$outline$expand_color',
  borderRadius: '$outline$expand_borderRadius',
  fontWeight: '$outline$expand_fontWeight',

  '&:hover, &:focus-visible': {
    background: '$outline$button_hover_background',
    color: '$outline$button_hover_color',
  },
  '&:active': {
    background: '$outline$button_active_background',
    color: '$outline$button_active_color',
  },
  '&[data-state="open"]:not(:hover)': {
    background: 'transparent',
  },
})
