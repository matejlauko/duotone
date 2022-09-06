import PreviewComponents from '@duotone/preview'
import { Provider as StateProvider, useAtom } from 'jotai'
import merge from 'lodash.merge'
import * as React from 'react'
import ReactDOM from 'react-dom/client'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { ThemeTokens } from '../../shared/types'
import { COMPONENTS, CONFIG, CREATE_THEME, HEAD, PREVIEW_STYLES, PROVIDER, THEMES } from '../config'
import { currentThemeAtom, createdThemeAtom } from '../theming-state'
import { useHashChange } from '../utils/hooks'

const PreviewApp = () => {
  const previousThemeClass = React.useRef<string>()
  const [currentTheme, setCurrentTheme] = useAtom(currentThemeAtom)
  const [generatedTheme, setGeneratedTheme] = useAtom(createdThemeAtom)

  // Listen for hash changes and set custom theme state.
  const handleHashChange = React.useCallback(
    (hash: string) => {
      if (!hash) return

      const hashState = Object.fromEntries(
        decodeURIComponent(hash)
          .replace(/^#/, '')
          .split('&')
          .map((part) => part.split('='))
      )

      const { theme: themeName } = hashState
      let { tokens: tokensJson } = hashState

      // Get selected kit & theme from config
      const theme = THEMES.find((theme) => theme.name === themeName)

      if (!theme) return

      setCurrentTheme(theme)

      // Fix empty tokensJson vs empty object
      if (!tokensJson) tokensJson = '{}'

      // Parse tokens and create theme
      const parsedTokens = JSON.parse(tokensJson) as ThemeTokens
      const createdTheme = CREATE_THEME(parsedTokens, theme)

      if (previousThemeClass.current) {
        document.body.classList.remove(previousThemeClass.current)
      }

      if (!createdTheme) return

      const themeClass =
        typeof createdTheme === 'string'
          ? createdTheme
          : 'className' in createdTheme
          ? createdTheme['className']
          : null

      if (themeClass) {
        document.body.classList.add(themeClass)

        previousThemeClass.current = themeClass
      }

      setGeneratedTheme(createdTheme)
    },
    [setGeneratedTheme, currentTheme]
  )

  useHashChange(handleHashChange, true)

  const previewStyles = React.useMemo(() => {
    if (!currentTheme) return

    return merge({}, PREVIEW_STYLES, currentTheme.previewStyles)
  }, [currentTheme])

  if (!currentTheme) return null

  return (
    <>
      <Helmet>{HEAD}</Helmet>

      <PROVIDER theme={typeof generatedTheme === 'object' ? generatedTheme : currentTheme.theme}>
        <PreviewComponents
          kitName={CONFIG.name}
          components={COMPONENTS}
          previewStyles={previewStyles}
        />
      </PROVIDER>

      {/* Area to test default element styles */}
      <div
        id="defaults-area"
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
          left: '-9999rem',
          top: '-9999rem',
        }}
      />
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <StateProvider>
        <PreviewApp />
      </StateProvider>
    </HelmetProvider>
  </React.StrictMode>
)
