import * as React from 'react'
import { styled } from './styles'
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
        <UIOptionHeading className="dtp-option-heading">
          {typeof option === 'object' ? option.name : String(option)}
        </UIOptionHeading>
      )}

      <div ref={optionElRef} className="dtp-option-render">
        {variant
          ? typeof option === 'object'
            ? option.render()
            : component.render!({ [variant.prop!]: option })
          : component.render!({})}
      </div>
    </>
  )
}

export default PreviewOption

const UIOptionHeading = styled('h4', {
  all: 'unset',
  display: 'block',
  fontFamily: '$root$fontFamily',
  lineHeight: '$root$lineHeight',
  margin: 0,
  fontSize: '$renderPanel$option_fontSize',
  fontWeight: '$renderPanel$option_fontWeight',
  color: '$renderPanel$option_color',
  marginBottom: '4px',
})
