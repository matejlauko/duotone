import React from 'react'
import { ThemeProvider as SCProvider } from 'styled-components'

export const ThemeProvider = ({ theme, children }: React.PropsWithChildren<{ theme: any }>) => (
  <SCProvider theme={theme}>{children}</SCProvider>
)
