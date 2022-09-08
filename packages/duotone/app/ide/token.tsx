import { styled } from '../ui'
import { useAtomValue, useSetAtom } from 'jotai'
import * as React from 'react'
import {
  addChangedTokenAtom,
  resetTokenChangeInCurrentThemeAndPath,
  useChangedTokenValue,
  searchTermAtom,
} from '../tokens-state'
import TokenValue from './value'

export const TOKEN_ROW_HEIGHT = 28

type Props = {
  path: string
  value: string | number
  name: string
  level: number
}

const Token: React.FC<Props> = React.memo(function Token({ path, value: origValue, name, level }) {
  const addThemeChange = useSetAtom(addChangedTokenAtom)
  const resetToken = useSetAtom(resetTokenChangeInCurrentThemeAndPath)
  const searchTerm = useAtomValue(searchTermAtom)

  const changedValue = useChangedTokenValue(path)
  const currentValue = changedValue || origValue

  const handleUpdate = React.useCallback(
    (_val: string) => {
      addThemeChange({ path, value: _val })
    },
    [addThemeChange]
  )

  const handleReset = React.useCallback(() => {
    resetToken(path)
  }, [])

  const highlightedName = searchTerm
    ? name.replace(new RegExp(searchTerm, 'i'), '<mark>$&</mark>')
    : name

  return (
    <UIToken
      css={{
        pl: (level * 3 + 6) * 4,
      }}
    >
      <UITokenName
        id={`${path}_label`}
        htmlFor={`${path}_val`}
        smaller={name.length > 13}
        title={name.length > 13 ? name : undefined}
        changed={changedValue !== undefined}
        dangerouslySetInnerHTML={{ __html: highlightedName }}
      />

      <UITokenValWrap>
        <TokenValue
          tokenId={path}
          value={String(currentValue)}
          onUpdate={handleUpdate}
          onReset={handleReset}
        />
      </UITokenValWrap>
    </UIToken>
  )
})

export default Token

const UIToken = styled('div', {
  height: TOKEN_ROW_HEIGHT,
  display: 'flex',
  alignItems: 'center',
  gap: '$2',
  pr: '$4',
  borderWidth: '1px 0 1px',
  borderStyle: 'solid',
  borderColor: 'transparent',

  '&:hover': {
    borderColor: '$lineUltraLight',
    zIndex: 2,
  },
})

const UITokenName = styled('label', {
  flex: '0',
  flexBasis: 140,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',

  variants: {
    smaller: {
      true: {
        fontSize: '$1',
      },
    },
    changed: {
      true: {
        weight: '$bold',
        color: '$solidAccentBg',
      },
    },
  },

  '& > mark': {
    background: '$resultBg',
  },
})

const UITokenValWrap = styled('div', {
  flex: '1',
})
