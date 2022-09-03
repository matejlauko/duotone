import * as React from 'react'
import { styled, textBaseCss } from './styles'
import { Component, Variant, VariantOption } from './types'

type Props = {
  component: Component
  variant?: Variant
  option?: VariantOption
}

const PreviewOption: React.FC<Props> = ({ component, variant, option }) => {
  const optionElRef = React.useRef<HTMLDivElement>(null)

  if ((typeof option !== 'object' || !option.render) && !component.render) return null

  return (
    <>
      {option !== undefined && (
        <UIOptionHeading>
          {typeof option === 'object' ? option.name : String(option)}
        </UIOptionHeading>
      )}

      <div ref={optionElRef}>
        {variant
          ? typeof option === 'object'
            ? option.render()
            : component.render!({ [variant.prop!]: option })
          : component.render!()}
      </div>
    </>
  )
}

export default PreviewOption

const UIOptionHeading = styled('h4', textBaseCss, {
  fontSize: '$variant$option_fontSize',
  fontWeight: '$variant$option_fontWeight',
  color: '$variant$option_color',
  marginBottom: '$variant$option_marginBottom',
})
