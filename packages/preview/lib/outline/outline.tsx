import * as React from 'react'
import OutlineComponent from './component'
import { Component } from '../types'
import { styled } from '../styles'
import { Accordion, AccordionItem } from './accordion'
import { usePreviewContext } from '../context'

type Props = {
  components: Component[]
}

const Outline: React.FC<Props> = ({ components }) => {
  const { scrollToComponent } = usePreviewContext()
  const [openComponents, setOpenComponents] = React.useState<string[]>([])

  const handleSelectComponent = (component: Component['name']) => {
    setOpenComponents([...new Set([...openComponents, component])])

    scrollToComponent(component)
  }

  return (
    <UINav className="dtp-outline">
      <Accordion
        type="multiple"
        value={openComponents}
        onValueChange={(openComponents: string[]) => setOpenComponents(openComponents)}
        asChild={true}
      >
        <UIList role="list">
          {components.map((component) => (
            <AccordionItem key={component.name} value={component.name} role="listitem">
              <OutlineComponent
                component={component}
                onSelect={() => handleSelectComponent(component.name)}
              />
            </AccordionItem>
          ))}
        </UIList>
      </Accordion>
    </UINav>
  )
}

export default Outline

const UINav = styled('nav', {
  boxSizing: 'border-box',
  padding: '16px 0',
  flex: 1,
  overflow: 'hidden',
})

const UIList = styled('div', {
  boxSizing: 'border-box',
  overflowY: 'auto',
  maxHeight: '100%',
})
