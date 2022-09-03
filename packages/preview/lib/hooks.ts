import * as React from 'react'

export const useHashChange = (onChange: (hash: string) => void, runImmediately = false): void => {
  const isFirst = React.useRef(true)

  React.useEffect(() => {
    if (typeof window === 'undefined') return

    function handleHashChange() {
      onChange(window.location.hash)
    }

    if (runImmediately && isFirst.current) {
      handleHashChange()
    }
    isFirst.current = false

    window.addEventListener('hashchange', handleHashChange, false)

    return () => {
      window.removeEventListener('hashchange', handleHashChange, false)
    }
  }, [onChange])
}
