import { useAtom } from 'jotai'
import * as React from 'react'
import { ClearIcon, IconButton, SearchIcon, SlashIcon, styled, TextInput } from '../ui'
import { searchTermAtom } from '../tokens-state'

const Search = () => {
  const [value, setValue] = useAtom(searchTermAtom)
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (
        document.activeElement &&
        (document.activeElement.tagName === 'INPUT' ||
          document.activeElement.tagName === 'TEXTAREA')
      )
        return

      if (event.key === '/') {
        event.preventDefault()
        inputRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyPress)

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  const handleFocusClick = () => {
    inputRef.current?.focus()
  }

  const handleClearClick = () => {
    setValue('')
  }

  return (
    <UISearch hasValue={!!value}>
      <SearchIcon
        size="sm"
        color="blend"
        css={{
          position: 'absolute',
          left: '$1',
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      />

      <TextInput
        aria-label="Search theme tokens"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="search"
        ref={inputRef}
        css={{ borderWidth: 1, borderColor: value ? '$border' : '$lineLight', pl: '$6', pr: '$8' }}
      />

      <UIRightControl>
        {value ? (
          <IconButton
            aria-label={'Clear search'}
            size="sm"
            variant="ghost"
            onClick={handleClearClick}
          >
            {<ClearIcon />}
          </IconButton>
        ) : (
          <IconButton
            aria-label={`Search tokens using "/"`}
            size="sm"
            css={{
              borderWidth: 1,
              borderColor: '$lineLight',
            }}
            variant="ghost"
            onClick={handleFocusClick}
          >
            <SlashIcon />
          </IconButton>
        )}
      </UIRightControl>
    </UISearch>
  )
}

export default Search

const UISearch = styled('div', {
  position: 'relative',
  color: '$icon',

  '&:focus-within': {
    color: '$iconActive',
  },

  variants: {
    hasValue: {
      false: {
        '&:focus-within button:not(:active)': {
          opacity: 0,
          visibility: 'hidden',
        },
      },
    },
  },
})

const UIRightControl = styled('div', {
  position: 'absolute',
  right: '$1',
  top: '50%',
  transform: 'translateY(-50%)',
})
