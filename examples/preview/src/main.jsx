import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Preview from '@duotone/preview'

/** @type {import('@duotone/preview').ComponentsConfig} **/
const components = {
  Button: {
    render: (props) => <button>Button</button>,
    variants: {
      Size: {
        options: ['small', 'medium', 'large'],
      },
    },
  },
  Button1: {
    render: (props) => <button>Button</button>,
    variants: {
      Size: {
        options: ['small', 'medium', 'large'],
      },
    },
  },
  Button2: {
    render: (props) => <button>Button</button>,
    variants: {
      Size: {
        options: ['small', 'medium', 'large'],
      },
    },
  },
  Button3: {
    render: (props) => <button>Button</button>,
    variants: {
      Size: {
        options: ['small', 'medium', 'large'],
      },
    },
  },
  Button4: {
    render: (props) => <button>Button</button>,
    variants: {
      Size: {
        options: ['small', 'medium', 'large'],
      },
    },
  },
  Button5: {
    render: (props) => <button>Button</button>,
    variants: {
      Size: {
        options: ['small', 'medium', 'large'],
      },
    },
  },
}

/** @type {import('@duotone/preview').UserPreviewStyles} **/
// const styles = {
//   colors: {
//     background: 'red',
//     panelBackground: 'blue',
//     panelBorder: 'green',
//     text: 'yellow',
//   },
//   fonts: {
//     body: 'serif',
//   },
//   fontSizes: {
//     body: '20px',
//   },
// };

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Preview components={components} kitName="Preview test" />
  </React.StrictMode>
)
