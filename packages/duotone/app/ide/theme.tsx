import { useAtomValue } from 'jotai'
import * as React from 'react'
import { ThemePack as ThemeT } from '../../shared/types'
import { Scrollable, styled } from '../ui'
import { searchTermAtom } from '../tokens-state'
import { filterDeepByKey } from '../utils/object'
import Search from './search'
import Tokens from './tokens'

export const THEME_CONTAINER_ID = 'theme-container'

type Props = {
  theme: ThemeT
}

const Theme: React.FC<Props> = ({ theme }) => {
  const searchTerm = useAtomValue(searchTermAtom)

  const filteredTokens = React.useMemo(() => {
    if (!searchTerm) {
      return theme.tokens
    }

    const searchRegex = new RegExp(searchTerm, 'i')

    return filterDeepByKey(theme.tokens, (key) => searchRegex.test(key))
  }, [searchTerm])

  return (
    <UIContainer>
      <Scrollable id={THEME_CONTAINER_ID}>
        <UISearch>
          <Search />
        </UISearch>

        <UITokens>
          <Tokens tokens={filteredTokens} />
        </UITokens>
      </Scrollable>
    </UIContainer>
  )
}

export default Theme

const UIContainer = styled('div', {
  position: 'relative',
  bg: '$uiBg',
  height: '100%',
})

const UITokens = styled('div', {
  fontSize: '$1',
  pt: '$4',
  pb: '$8',
  fontFamily: '$mono',
})

const UISearch = styled('div', {
  position: 'absolute',
  top: '$1',
  right: '$4',
  marginLeft: 'auto',
  width: 140,
  zIndex: '$search',
})
