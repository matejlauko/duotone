export type VariantOption =
  | string
  | number
  | boolean
  | { name: string; render: () => React.ReactNode }

export type Variant = {
  name: string
  prop?: string
  options: VariantOption[]
}

export type Component = {
  name: string
  variants?: Variant[]
  render?: (props?: Record<string, any>) => React.ReactNode
}

export type ComponentConfig = {
  render?: (props?: Record<string, any>) => React.ReactNode
  variants?: Record<string, Omit<Variant, 'name'>>
}
export type ComponentsConfig = Record<string, ComponentConfig>

export type StylesConfig = {
  primaryColor?: string
  fontFamily?: string
  textColor?: string
  outline?: {
    background?: string
    baseFontSize?: string
    width?: string
  }
  preview?: {
    background?: string
    baseFontSize?: string
    componentsGap?: string
    variantsGap?: string
  }
  renderPanel?: {
    textColor?: string
    background?: string
  }
}

export type StylesTheme = {
  root: {
    background: string
    fontFamily: string
    fontWeight: string | number
    lineHeight: string | number
    color: string
  }
  outline: {
    background: string
    border: string
    width: string

    kitName_color: string
    kitName_fontSize: string
    kitName_fontWeight: string | number

    item_color: string
    item_fontWeight: string | number

    component_fontSize: string
    variant_fontSize: string

    button_hover_background: string
    button_hover_color: string
    button_active_background: string
    button_active_color: string

    expand_color: string
    expand_background: string
    expand_borderRadius: string
  }
  component: {
    heading_background: string
    heading_fontSize: string
    heading_color: string
    gap: string
    heading_height: string
    heading_fontWeight: string | number
    heading_marginBottom: string
  }
  variant: {
    background: string
    border: string
    borderRadius: string

    gap: string

    heading_fontSize: string
    heading_color: string
    heading_fontWeight: string | number
    heading_marginBottom: string

    option_fontSize: string
    option_color: string
    option_fontWeight: string | number
    option_marginBottom: string
  }
}
