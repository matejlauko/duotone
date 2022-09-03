import { useAtomValue } from 'jotai'
import * as React from 'react'
import { ThemeTokens } from '../../shared/types'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, styled } from '../ui'
import { searchTermAtom } from '../tokens-state'
import Token, { TOKEN_ROW_HEIGHT } from './token'

type Props = {
  tokens: ThemeTokens
  path?: string
}

const Tokens: React.FC<Props> = ({ tokens, path = '' }) => {
  const searchTerm = useAtomValue(searchTermAtom)

  const level = path.split('.').length - 1

  const defaultOpenValues = React.useMemo(() => (level === 0 ? Object.keys(tokens) : []), [])

  if (!tokens) return null

  return (
    <Accordion type="multiple" defaultValue={defaultOpenValues}>
      {Object.entries(tokens).map(([category, catTokens]) => {
        if (!catTokens) return null

        const highlightedCategory = searchTerm
          ? category.replace(new RegExp(searchTerm, 'i'), '<mark>$&</mark>')
          : category

        return typeof catTokens === 'object' ? (
          <AccordionItem key={category} value={category}>
            <UICategory
              css={{
                pl: (level * 3 + 6) * 4,
                '&::before': {
                  left: (level * 3 + 2) * 4,
                },
              }}
              dangerouslySetInnerHTML={{ __html: highlightedCategory }}
            />

            <AccordionContent>
              {Object.entries(catTokens).map(([tokenName, value]) => {
                const _path = path ? `${path}.${tokenName}` : `${category}.${tokenName}`

                return typeof value === 'object' ? (
                  <Tokens key={tokenName} tokens={{ [tokenName]: value }} path={_path} />
                ) : (
                  <Token
                    key={tokenName}
                    path={_path}
                    level={level + 1}
                    name={tokenName}
                    value={value}
                  />
                )
              })}
            </AccordionContent>
          </AccordionItem>
        ) : (
          <Token key={category} path={category} level={level} name={category} value={catTokens} />
        )
      })}
    </Accordion>
  )
}

export default Tokens

const UICategory = styled(AccordionTrigger, {
  height: TOKEN_ROW_HEIGHT,

  width: '100%',
  pr: '$4',
  weight: '$bold',
  cursor: 'default',
  position: 'relative',
  borderWidth: '1px 0 1px',
  borderStyle: 'solid',
  borderColor: 'transparent',

  '&:hover': {
    borderColor: '$lineUltraLight',
    zIndex: 2,
  },

  '&::before': {
    content: '+',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '$3',
    color: '$icon',
  },
  '&[data-state="open"]::before': {
    content: '-',
  },

  '& > mark': {
    background: '$resultBg',
  },
})
