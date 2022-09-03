import * as React from 'react'
import Header from './header/header'
import Ide from './ide/ide'
import Preview from './preview/frame'
import { styled } from './ui'

const App = () => {
  return (
    <UIContainer>
      <UIHeader>
        <Header />
      </UIHeader>

      <UIContent>
        <UIMain>
          <UIPreviewContainer>
            <Preview />
          </UIPreviewContainer>

          <UIIde>
            <Ide />
          </UIIde>
        </UIMain>
      </UIContent>
    </UIContainer>
  )
}

export default App

const UIContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
})

const UIHeader = styled('div', {
  flex: '0 0 auto',
})

const UIContent = styled('div', {
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
})

const UIMain = styled('main', {
  display: 'flex',
  height: '100%',
  flex: '1',
})

const UIPreviewContainer = styled('div', {
  position: 'relative',
  bg: '$uiBg',
  flex: '1',
})

const UIIde = styled('div', {
  width: 'min(50%, 650px)',
  flex: '0 0 auto',
  borderLeft: '1px solid $colors$line',
})
