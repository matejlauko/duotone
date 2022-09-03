import * as React from 'react'

export const Button = ({ size = 'md', children }) => {
  const styles = {
    all: 'unset',
    height: '20px',
    background: 'var(--colors-primary)',
    color: 'var(--colors-text)',
    fontSize: '16px',
    lineHeight: '1',
    paddingLeft:
      size === 'sm' ? 'var(--sizes-1)' : size === 'md' ? 'var(--sizes-2)' : 'var(--sizes-3)',
    paddingRight:
      size === 'sm' ? 'var(--sizes-1)' : size === 'md' ? 'var(--sizes-2)' : 'var(--sizes-3)',
  }

  return <button style={styles}>{children}</button>
}

export const createTheme = (tokens, themeStore) => {
  const rootEl = document.querySelector(':root')

  for (const cat in themeStore.theme) {
    for (const tokenName in themeStore.theme[cat]) {
      const val = tokens[cat]?.[tokenName] ?? themeStore.theme[cat][tokenName]

      rootEl.style.setProperty(`--${cat}-${tokenName}`, val)
    }
  }
}
