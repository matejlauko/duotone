import { useAtom } from 'jotai'
import * as React from 'react'
import { THEMES } from '../config'
import { currentThemeAtom } from '../theming-state'
import { styled, Tabs, TabsContent, TabsList, TabsTrigger } from '../ui'
import Theme from './theme'

const Ide: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useAtom(currentThemeAtom)

  const handleTabChange = React.useCallback((tab: string) => {
    setCurrentTheme(THEMES.find((t) => t.name === tab)!)
  }, [])

  return (
    <Tabs value={currentTheme?.name} onValueChange={handleTabChange} css={{ height: '100%' }}>
      <UIThemesTabsList>
        {THEMES.map((theme) => (
          <UIThemeTabsTrigger value={theme.name} key={theme.name}>
            {theme.name}
          </UIThemeTabsTrigger>
        ))}
      </UIThemesTabsList>

      {THEMES.map((theme) => (
        <TabsContent value={theme.name} key={theme.name} css={{ height: '100%' }}>
          <Theme theme={theme} />
        </TabsContent>
      ))}
    </Tabs>
  )
}

export default Ide

const UIThemesTabsList = styled(TabsList, {
  bg: '$uiBg4',
})

const UIThemeTabsTrigger = styled(TabsTrigger, {
  height: '$control_lg',
  px: '$9',
  fontSize: '$base',
  fontWeight: '$bold',

  '&[aria-selected="false"]': {
    color: '$textMuted',
    bg: '$uiBg5',
  },

  '&[aria-selected="true"]': {
    color: '$textAccent',
    bg: '$uiBg',
    boxShadow: 'inset 0 -2px 0 0 $colors$borderAccentActive',
  },
})
