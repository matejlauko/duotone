import { atom, useAtom, useAtomValue } from 'jotai'
import merge from 'lodash.merge'
import * as React from 'react'
import { downloadCode } from '../../utils/download'
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  ExportIcon,
  HStack,
  Label,
  Switch,
  Text,
  TextArea,
  VStack,
} from '../../ui'
import { currentThemeAtom } from '../../theming-state'
import { changedTokensInCurrentThemeAtom } from '../../tokens-state'
import { CONFIG } from '../../config'

const onlyChangedTokensAtom = atom<boolean>(false)

const ExportControls: React.FC<React.PropsWithChildren> = ({ children }) => {
  const changedTokens = useAtomValue(changedTokensInCurrentThemeAtom)
  const currentTheme = useAtomValue(currentThemeAtom)

  const [onlyChangedTokens, setOnlyChangedTokens] = useAtom(onlyChangedTokensAtom)

  const tokensText = React.useMemo((): string => {
    let tokens = changedTokens

    if (!onlyChangedTokens) {
      tokens = merge({}, currentTheme?.tokens, tokens)
    }

    return tokens ? JSON.stringify(tokens, null, 2) : ''
  }, [onlyChangedTokens, changedTokens, currentTheme])

  const handleSubmit = () => {
    const fileName = CONFIG.name
      ? `${CONFIG.name}-${currentTheme.name}.json`
      : `${currentTheme.name}.json`

    downloadCode(fileName, tokensText)
  }

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>

      <DialogContent>
        <DialogTitle>Export theme</DialogTitle>

        <Box css={{ py: '$4' }}>
          <form onSubmit={handleSubmit}>
            <VStack>
              <HStack css={{ mb: '$2' }}>
                <Label htmlFor="export-fulltokens">Only changed tokens</Label>
                <Switch
                  id="export-fulltokens"
                  checked={onlyChangedTokens}
                  onCheckedChange={setOnlyChangedTokens}
                />
              </HStack>

              <VStack gap="xs">
                <Label htmlFor="export-content">
                  Tokens JSON <Text color="muted">(click to select all)</Text>
                </Label>
                <TextArea
                  id="export-content"
                  value={tokensText}
                  readOnly={true}
                  onClick={(event) => (event.target as HTMLTextAreaElement).select()}
                  minRows={10}
                  maxRows={10}
                />
              </VStack>

              <Box css={{ display: 'flex', justifyContent: 'end' }}>
                <Button variant="solid" tone="accent" type="submit" iconBefore={<ExportIcon />}>
                  Export
                </Button>
              </Box>
            </VStack>
          </form>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default ExportControls
