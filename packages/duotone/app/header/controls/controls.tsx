import { Box, Button, ExportIcon, HStack, ResetIcon, Tooltip } from '../../ui'
import { useAtomValue, useSetAtom } from 'jotai'
import * as React from 'react'
import { hasChangedTokensAtom, resetTokenChangesInCurrentTheme } from '../../tokens-state'
import Export from './export'

const Controls: React.FC = () => {
  const resetTokens = useSetAtom(resetTokenChangesInCurrentTheme)
  const hasChanges = useAtomValue(hasChangedTokensAtom)

  return (
    <HStack gap="xs">
      <Tooltip content="Reset changed tokens">
        <Button
          iconBefore={<ResetIcon />}
          variant="ghost"
          tone="destroy"
          onClick={() => resetTokens()}
          disabled={!hasChanges}
        >
          Reset
        </Button>
      </Tooltip>

      <Tooltip content="Export theme tokens">
        <Box>
          <Export>
            <Button
              iconBefore={<ExportIcon />}
              variant="ghost"
              tone="accent"
              disabled={!hasChanges}
            >
              Export
            </Button>
          </Export>
        </Box>
      </Tooltip>
    </HStack>
  )
}

export default Controls
