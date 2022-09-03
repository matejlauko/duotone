import * as React from 'react'
import OutlineComponent from './component'
import { Component } from '../types'
import { layoutCss, styled } from '../styles'
import { Accordion, AccordionItem } from './accordion'

type Props = {
  components: Component[]
}

const Outline: React.FC<Props> = ({ components }) => {
  const [openComponents, setOpenComponents] = React.useState<string[]>([])

  const handleSelectComponent = (componentName: Component['name']) => {
    setOpenComponents([...new Set([...openComponents, componentName])])
  }

  return (
    <UINav>
      <Accordion
        type="multiple"
        value={openComponents}
        onValueChange={(openComponents: string[]) => setOpenComponents(openComponents)}
        role="list"
      >
        {components.map((component) => (
          <AccordionItem key={component.name} value={component.name}>
            <OutlineComponent
              component={component}
              onSelect={() => handleSelectComponent(component.name)}
            />
          </AccordionItem>
        ))}
      </Accordion>
    </UINav>
  )
}

export default Outline

export const UINav = styled('nav', layoutCss, {
  position: 'sticky',
  top: 0,
  padding: '16px 0',
})