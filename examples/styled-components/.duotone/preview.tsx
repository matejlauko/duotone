import { ComponentConfig, ComponentsConfig, Provider as ProviderT } from '@duotone/react'
import * as React from 'react'
import { Button, Input, List, ThemeProvider } from '../index'

const components: ComponentsConfig = {
  Button: {
    render: (props: any) => <Button {...props}>Button</Button>,
    variants: {
      Variant: { prop: 'variant', options: ['solid', 'outline'] },
    },
  },
  Input: {
    render: (props) => <Input {...props} defaultValue="defauuuult" />,
  },
  List: {
    render: (props) => <List {...props} items={['one', 'two']} />,
  },
}

export const Paragraph: ComponentConfig = {
  render: (props) => <p {...props}>Textoooo</p>,
}

export default components

export const Provider: ProviderT = (props) => <ThemeProvider {...props} />
