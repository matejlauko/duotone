import { useSetAtom } from 'jotai'
import * as React from 'react'
import { useCurrentThemeTokenValue } from '../theming-state'
import { setHighlightedTokenWithResetAtom, useChangedTokenValue } from '../tokens-state'
import { ExternalIcon, IconButton, Tooltip } from '../ui'

type Props = {
  path: string
  value: string
}

// Special Stitches variable reference
const StitchesReference: React.FC<Props> = ({ path, value }) => {
  const highlightToken = useSetAtom(setHighlightedTokenWithResetAtom)
  const relativeRefTokenPathSplit = value
    .split('$')
    .filter((v) => v)
    .reverse()

  const absoluteRefTokenPath = [...path.split('.')]
    .reverse()
    .map((v, i) => relativeRefTokenPathSplit[i] || v)
    .reverse()
    .join('.')

  const changedRefValue = useChangedTokenValue(absoluteRefTokenPath)
  const currentRefValue = useCurrentThemeTokenValue(absoluteRefTokenPath)
  const refValue = changedRefValue ?? currentRefValue

  const handleClick = () => {
    highlightToken(absoluteRefTokenPath)
  }

  return (
    <Tooltip content={refValue}>
      <IconButton
        size="2xs"
        variant="ghost"
        onMouseUp={handleClick /* onClick was flaky for some reason */}
      >
        <ExternalIcon />
      </IconButton>
    </Tooltip>
  )
}

export default StitchesReference
