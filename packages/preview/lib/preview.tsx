import * as React from 'react'
import PreviewComponents from './components'
import { generateComponentsListFromConfig } from './generate-components'
import Outline from './outline/outline'
import { createTheme, generateThemeFromPreviewStyles, styled } from './styles'
import { ComponentsConfig, StylesConfig } from './types'

type Props = {
  components: ComponentsConfig
  kitName?: string
  previewStyles?: StylesConfig
}

const Preview: React.FC<Props> = ({ kitName, components, previewStyles }) => {
  const componentsList = generateComponentsListFromConfig(components)

  const previewTheme = React.useMemo(
    () => previewStyles && createTheme(generateThemeFromPreviewStyles(previewStyles)),
    [previewStyles]
  )

  return (
    <>
      <UIPreview className={`dt-preview ${previewTheme}`}>
        <UISidebar className="dtp-sidebar">
          {kitName && <UIKitName className="dtp-sidebar-kitname">{kitName}</UIKitName>}

          <Outline components={componentsList} />
        </UISidebar>

        <UIComponents className="dtp-components">
          <PreviewComponents components={componentsList} />
        </UIComponents>
      </UIPreview>
    </>
  )
}

export default Preview

const UIPreview = styled('section', {
  boxSizing: 'border-box',
  minHeight: '100%',
  display: 'flex',
  background: '$root$background',
})

const UISidebar = styled('aside', {
  boxSizing: 'border-box',
  position: 'relative',
  flexDirection: 'column',
  width: '$outline$width',
  flexGrow: 0,
  flexShrink: 0,
  borderRight: '$outline$border',
  background: '$outline$background',
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
})

const UIComponents = styled('div', {
  boxSizing: 'border-box',
  position: 'relative',
  flexGrow: 1,
  // marginLeft: '$outline$width',
})
