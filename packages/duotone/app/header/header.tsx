import { Box, darkTheme, styled } from '../ui'
import * as React from 'react'
import logoImage from '../assets/logo.svg'
import Controls from './controls/controls'

export const HEADER_HEIGHT = 48

const Header: React.FC = () => {
  return (
    <UIHeader className={darkTheme}>
      <Box css={{ display: 'flex' }}>
        <Box as="a" href="/">
          <img src={logoImage} alt="duotone logo" width="100px" aria-label="Refresh app" />
        </Box>
      </Box>

      <Box css={{ justifySelf: 'end' }}>
        <Controls />
      </Box>
    </UIHeader>
  )
}

export default Header

const UIHeader = styled('header', {
  height: HEADER_HEIGHT,
  display: 'grid',
  gridTemplateColumns: `max-content 1fr`,
  alignItems: 'center',
  px: '$4',
  bg: '$uiBg',
  borderBottomWidth: 1,
  borderBottomColor: '$line',
})
