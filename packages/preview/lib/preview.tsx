import * as React from 'react'
import PreviewComponents from './components'
import { PreviewProvider } from './context'
import { generateComponentsListFromConfig } from './generate-components'
import Outline from './outline/outline'
import { createTheme, generateThemeFromPreviewStyles, styled, theme } from './styles'
import { Component, ComponentsConfig, StylesConfig, Variant } from './types'

type Props = {
  components: ComponentsConfig
  kitName?: string
  previewStyles?: StylesConfig
}

const Preview: React.FC<Props> = ({ kitName, components, previewStyles }) => {
  const componentsRef = React.useRef<React.ElementRef<typeof UIComponents>>(null)

  const componentsList = React.useMemo(
    () => generateComponentsListFromConfig(components),
    [components]
  )

  const previewTheme = React.useMemo(
    () => previewStyles && createTheme(generateThemeFromPreviewStyles(previewStyles)),
    [previewStyles]
  )

  const scrollToComponent = React.useCallback(
    (component: Component['name'], variant?: Variant['name']) => {
      const componentsContainerEl = componentsRef.current
      const componentEl = document.querySelector(`[data-component="${component}"]`)

      if (!componentEl || !componentsContainerEl) return

      let offset = 8
      let targetEl: Element | null = componentEl

      if (variant) {
        targetEl = componentEl.querySelector(`[data-variant="${variant}"]`)
        offset += parseInt(theme.component.heading_height.value, 10)
      }

      if (targetEl) {
        componentsContainerEl.scrollTo({
          top: targetEl.getBoundingClientRect().top + componentsContainerEl.scrollTop - offset,
          behavior: 'smooth',
        })
      }
    },
    []
  )

  const contextVal = React.useMemo(
    () => ({
      scrollToComponent,
    }),
    [scrollToComponent]
  )

  return (
    <PreviewProvider value={contextVal}>
      <UIPreview className={`dt-preview ${previewTheme ?? ''}`}>
        <UISidebar className="dtp-sidebar">
          {kitName && <UIKitName className="dtp-sidebar-kitname">{kitName}</UIKitName>}

          <Outline components={componentsList} />
        </UISidebar>

        <UIComponents className="dtp-components" ref={componentsRef}>
          <PreviewComponents components={componentsList} />
        </UIComponents>
      </UIPreview>
    </PreviewProvider>
  )
}

export default Preview

const UIPreview = styled('section', {
  boxSizing: 'border-box',
  minHeight: '100%',
  maxHeight: '100%',
  display: 'flex',
  background: '$root$background',
})

const UISidebar = styled('aside', {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  boxSizing: 'border-box',
  width: '$outline$width',
  flexGrow: 0,
  flexShrink: 0,
  borderRight: '$outline$border',
  background: '$outline$background',
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
})

const UIKitName = styled('h1', {
  all: 'unset',
  display: 'block',
  fontFamily: '$root$fontFamily',
  lineHeight: '$root$lineHeight',
  textRendering: 'optimizeLegibility',
  fontSize: '$outline$kitName_fontSize',
  fontWeight: '$outline$kitName_fontWeight',
  color: '$outline$kitName_color',
  padding: '0 16px',
  margin: '16px 0 0 0',
  flex: 0,
})

const UIComponents = styled('div', {
  boxSizing: 'border-box',
  position: 'relative',
  flexGrow: 1,
  zIndex: 1,
  marginLeft: '$outline$width',
  maxHeight: '100%',
  overflowY: 'auto',
})
