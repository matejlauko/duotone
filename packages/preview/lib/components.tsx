import * as React from 'react'
import PreviewComponent from './component'
import { useHashChange } from './hooks'
import { layoutCss, styled, theme } from './styles'
import { Component } from './types'

type Props = {
  components: Component[]
}

const PreviewComponents = React.memo<Props>(function PreviewComponents({ components }) {
  const scrollToItemByHash = React.useCallback((hash: string) => {
    const splitHash = hash.split('#')

    const componentName = decodeURIComponent(splitHash[1])
    const variantName = splitHash[2] ? decodeURIComponent(splitHash[2]) : undefined

    const componentEl = document.querySelector(`[data-component="${componentName}"]`)

    if (!componentEl) return

    let offset = 0
    let targetEl: Element | null = componentEl

    if (variantName) {
      targetEl = componentEl.querySelector(`[data-variant="${variantName}"]`)
      offset = parseInt(theme.component.heading_height.value, 10)
    }

    if (targetEl) {
      window.scrollTo({
        top: targetEl.getBoundingClientRect().top + window.scrollY - offset,
        behavior: 'smooth',
      })
    }
  }, [])

  useHashChange(scrollToItemByHash)

  return (
    <UIContainer>
      <UIComponents>
        {components.map((component) => (
          <PreviewComponent key={component.name} component={component} />
        ))}
      </UIComponents>
    </UIContainer>
  )
})

export default PreviewComponents

const UIContainer = styled('div', layoutCss, {
  paddingTop: '8px',
  paddingBottom: '32px',
  minHeight: '100%',
})

const UIComponents = styled('div', layoutCss, {
  display: 'grid',
  rowGap: '$component$gap',
})
