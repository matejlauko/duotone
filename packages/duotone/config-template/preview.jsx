import * as React from 'react'
import { Button, createTheme } from './components'

/**
 * @type {import('@duotone/react').ComponentsConfig}
 */
export default {
  Button: {
    render: (props) => <Button {...props}>Button</Button>,
    variants: {
      Size: { prop: 'size', options: ['sm', 'md', 'lg'] },
    },
  },
  Button2: {
    render: (props) => <Button {...props}>Button</Button>,
    variants: {
      Size: { prop: 'size', options: ['sm', 'md', 'lg'] },
    },
  },
  Button3: {
    render: (props) => <Button {...props}>Button</Button>,
    variants: {
      Size: { prop: 'size', options: ['sm', 'md', 'lg'] },
    },
  },
  Button4: {
    render: (props) => <Button {...props}>Button</Button>,
    variants: {
      Size: { prop: 'size', options: ['sm', 'md', 'lg'] },
    },
  },
}

export { createTheme }
