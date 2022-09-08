import { useAtom } from 'jotai'
import * as React from 'react'
import { THEMES } from '../config'
import { currentThemeAtom } from '../theming-state'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui'
import Theme from './theme'

const Ide: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useAtom(currentThemeAtom)

  const handleTabChange = React.useCallback((tab: string) => {
    setCurrentTheme(THEMES.find((t) => t.name === tab)!)
  }, [])

  return (
    <Tabs value={currentTheme?.name} onValueChange={handleTabChange} css={{ height: '100%' }}>
      <TabsList>
        {THEMES.map((theme) => (
          <TabsTrigger value={theme.name} key={theme.name}>
            {theme.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {THEMES.map((theme) => (
        <TabsContent value={theme.name} key={theme.name} css={{ height: '100%' }}>
          <Theme theme={theme} />
        </TabsContent>
      ))}
    </Tabs>
  )
}

export default Ide
