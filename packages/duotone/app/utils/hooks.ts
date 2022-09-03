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

/**
 * Tracks previous value
 */
export const usePrevious = <T>(value: T): T | undefined => {
  const ref = React.useRef<T>()

  React.useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

/**
 * Tracks first render of a component
 */
export const useFirstRender = (): boolean => {
  const isFirst = React.useRef(true)

  if (isFirst.current) {
    isFirst.current = false

    return true
  }

  return isFirst.current
}

/**
 * Debounces value with a delay
 */
export const useDebouncedValue = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value)

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

/**
 * Compose more refs to use with single Element
 */
export function useComposedRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
  function setRef(ref: React.Ref<T> | undefined, value: T) {
    if (typeof ref === 'function') {
      ref(value)
    } else if (ref !== null && ref !== undefined) {
      ;(ref as React.MutableRefObject<T>).current = value
    }
  }

  return React.useCallback((node: T) => refs.forEach((ref) => setRef(ref, node)), refs)
}
