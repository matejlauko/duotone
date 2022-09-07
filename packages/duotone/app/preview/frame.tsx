import { atom, useAtomValue, useSetAtom } from 'jotai'
import * as React from 'react'
import { currentThemeNameAtom } from '../theming-state'
import { changedTokensInCurrentThemeAtom } from '../tokens-state'
import { styled } from '../ui'

export const previewFrameElementAtom = atom<HTMLIFrameElement | null>(null)

const PreviewFrame: React.FC = () => {
  const currentThemeName = useAtomValue(currentThemeNameAtom)
  const changedTokens = useAtomValue(changedTokensInCurrentThemeAtom)
  const setPreviewFrameElement = useSetAtom(previewFrameElementAtom)

  const customThemeConf = encodeURIComponent(JSON.stringify(changedTokens))
  const frameUrl = `${
    import.meta.env.BASE_URL
  }preview/index.html#theme=${currentThemeName}&tokens=${customThemeConf}`

  return (
    <UIFrame
      id="preview-frame"
      ref={(el: HTMLIFrameElement) => setPreviewFrameElement(el)}
      src={frameUrl}
      sandbox="allow-same-origin allow-scripts"
    />
  )
}

export default PreviewFrame

const UIFrame = styled('iframe', {
  position: 'absolute',
  display: 'block',
  height: '100%',
  width: '100%',
  border: '0 none',
  bg: '$uiBg',
})
