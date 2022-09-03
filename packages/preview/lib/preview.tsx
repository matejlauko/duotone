import * as React from 'react'
import PreviewComponents from './components'
import { generateComponentsListFromConfig } from './generate-components'
import Outline from './outline/outline'
import {
  createTheme,
  generateThemeFromPreviewStyles,
  layoutCss,
  prepareSharedStyles,
  styled,
  textBaseCss,
} from './styles'
import { ComponentsConfig, StylesConfig } from './types'

type Props = {
  components: ComponentsConfig
  kitName?: string
  previewStyles?: StylesConfig
}

prepareSharedStyles()

const Preview: React.FC<Props> = ({ kitName, components, previewStyles }) => {
  const componentsList = generateComponentsListFromConfig(components)

  const previewTheme = React.useMemo(
    () => previewStyles && createTheme(generateThemeFromPreviewStyles(previewStyles)),
    [previewStyles]
  )

  return (
    <>
      <UIPreview className={previewTheme}>
        <UISidebar>
          {kitName && <UIKitName>{kitName}</UIKitName>}

          <Outline components={componentsList} />
        </UISidebar>

        <UIComponents>
          <PreviewComponents components={componentsList} />
        </UIComponents>
      </UIPreview>
    </>
  )
}

export default Preview

const UIPreview = styled('section', layoutCss, {
  minHeight: '100%',
  display: 'flex',
  background: '$root$background',
})

const UISidebar = styled('aside', layoutCss, {
  position: 'relative',
  flexDirection: 'column',
  width: '$outline$width',
  flexGrow: 0,
  flexShrink: 0,
  borderRight: '$outline$border',
  background: '$outline$background',
})

const UIKitName = styled('h1', textBaseCss, {
  display: 'block',
  fontSize: '$outline$kitName_fontSize',
  fontWeight: '$outline$kitName_fontWeight',
  color: '$outline$kitName_color',
  padding: '0 16px',
  marginTop: '16px',
})

const UIComponents = styled('div', layoutCss, {
  position: 'relative',
  flexGrow: 1,
})
