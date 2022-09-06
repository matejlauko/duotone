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
  fontFamily?: string
  fontSize?: string
  fontColor?: string
  background?: string
  primaryColor?: string

  renderPanel?: {
    background?: string
    fontColor?: string
  }
}
