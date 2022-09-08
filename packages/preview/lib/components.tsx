import * as React from 'react'
import PreviewComponent from './component'
import { usePreviewContext } from './context'
import { useHashChange } from './hooks'
import { styled } from './styles'
import { Component } from './types'

type Props = {
  components: Component[]
}

const PreviewComponents = React.memo<Props>(function PreviewComponents({ components }) {
  const { scrollToComponent } = usePreviewContext()

  const scrollToItemByHash = React.useCallback(
    (hash: string) => {
      const hashState = Object.fromEntries(
        decodeURIComponent(hash)
          .replace(/^#/, '')
          .split('&')
          .map((part) => part.split('='))
      )
      const { component, variant } = hashState

      if (!component) return

      scrollToComponent(component, variant)
    },
    [scrollToComponent]
  )

  useHashChange(scrollToItemByHash, { runImmediately: true })

  return (
    <UIContainer className="dtp-components-container">
      <UIComponents className="dtp-components-grid">
        {components.map((component) => (
          <PreviewComponent key={component.name} component={component} />
        ))}
      </UIComponents>
    </UIContainer>
  )
})

export default PreviewComponents

const UIContainer = styled('div', {
  boxSizing: 'border-box',
  paddingTop: '8px',
  paddingBottom: '32px',
  minHeight: '100%',
})

const UIComponents = styled('div', {
  boxSizing: 'border-box',
  display: 'grid',
  rowGap: '$component$gap',
})
