import { useAtomValue, useSetAtom } from 'jotai'
import * as React from 'react'
import { useInView } from 'react-intersection-observer'
import {
  addChangedTokenAtom,
  highlightedTokenAtom,
  resetTokenChangeInCurrentThemeAndPath,
  searchTermAtom,
  useChangedTokenValue,
} from '../tokens-state'
import { styled } from '../ui'
import { useComposedRefs } from '../utils/hooks'
import { THEME_CONTAINER_ID } from './theme'
import TokenValue from './value'

export const TOKEN_ROW_HEIGHT = 28
const SCROLL_TO_HIGHLIGHT_Y_BUFFER = 40

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

  const ideScrollableRootEl =
    typeof window !== 'undefined' ? document.getElementById(THEME_CONTAINER_ID) : null
  const { ref, inView } = useInView({ root: ideScrollableRootEl })
  const tokenRef = React.useRef<React.ElementRef<typeof UIToken>>(null)
  const combinedRef = useComposedRefs<React.ElementRef<typeof UIToken>>(ref, tokenRef)

  const isTokenHlighlighted = useAtomValue(highlightedTokenAtom) === path

  /**
   * Scroll to token if it's not in the view when it gets highlighted
   */
  React.useEffect(() => {
    if (isTokenHlighlighted && !inView && ideScrollableRootEl && tokenRef.current) {
      ideScrollableRootEl.scrollTo(
        ideScrollableRootEl.scrollLeft,
        tokenRef.current.offsetTop - SCROLL_TO_HIGHLIGHT_Y_BUFFER
      )
    }
  }, [isTokenHlighlighted])

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
      highlighted={isTokenHlighlighted}
      ref={combinedRef}
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
          path={path}
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
  transition: 'background-color $appear_fast',

  '&:hover': {
    borderColor: '$lineUltraLight',
    zIndex: 2,
  },

  variants: {
    highlighted: {
      true: {
        bg: '$ghostAccentBgHover',
        borderColor: '$lineLight',
      },
    },
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
        color: '$solidAccent',
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
