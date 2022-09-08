import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Preview from '@duotone/preview'
import { Button, Text, Link, TextInput } from './components'

/** @type {import('@duotone/preview').ComponentsConfig} **/
const components = {
  Button: {
    render: (props) => <Button {...props}>Button</Button>,
    variants: {
      Size: {
        prop: 'size',
        options: ['small', 'medium', 'large'],
      },
      Color: {
        prop: 'color',
        options: ['black', 'green', 'red'],
      },
    },
  },
  Text: {
    render: (props) => <Text {...props}>design+code=💙</Text>,
    variants: {
      Size: {
        prop: 'size',
        options: ['small', 'medium', 'large'],
      },
      Color: {
        prop: 'color',
        options: ['black', 'mint', 'red', 'indigo'],
      },
    },
  },
  Link: {
    render: (props) => (
      <Link href="https://github.com/matejlauko/duotone/" target="_blank" {...props}>
        https://github.com/matejlauko/duotone/
      </Link>
    ),
    variants: {
      Size: {
        prop: 'size',
        options: ['small', 'medium', 'large'],
      },
      Color: {
        prop: 'color',
        options: ['indigo', 'black', 'mint', 'red'],
      },
    },
  },
  ['Text Input']: {
    render: (props) => <TextInput {...props} placeholder="make something amazing" />,
    variants: {
      Size: {
        prop: 'size',
        options: ['small', 'medium', 'large'],
      },
      Disabled: {
        prop: 'disabled',
        options: [true, false],
      },
    },
  },
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Preview components={components} kitName="Preview test" />
  </React.StrictMode>
)
