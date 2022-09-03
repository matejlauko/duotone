import { Provider as StateProvider } from 'jotai'
import * as React from 'react'
import { render } from 'react-dom'
import * as ReactDOMClient from 'react-dom/client'
import App from './app'
import { globalCss, globalStyles, UIProvider } from './ui'

const applyGlobalCss = globalCss(globalStyles)

const Main: React.FC = () => {
  applyGlobalCss()

  return (
    <React.StrictMode>
      <StateProvider>
        <UIProvider>
          <App />
        </UIProvider>
      </StateProvider>
    </React.StrictMode>
  )
}

const container = document.getElementById('root') as HTMLElement

if (ReactDOMClient && ReactDOMClient.createRoot) {
  // React 18+
  const root = ReactDOMClient.createRoot(container)

  root.render(<Main />)
} else {
  // React <18
  render(<Main />, container)
}
