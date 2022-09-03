<div align="center">
<h1>duotone</h1>
<br/>

<hr/>

</div>

<br/>

### UI theme editor for React component libraries

Craft perfect themes that fit your brand.<br/>
Design and prototype quicker by getting an overview of all the UI components you use.<br/>

<br/>

#### With duotone you can:

- Preview how all the components and their variants look side-by-side on one organized page
- Edit theme tokens and see changes live
  <br/>

---

#### Table of contents

- [Get started](#get-started)
  - [Install](#install)
  - [Add script](#add-script)
  - [Run](#run)
  - [Open](#open)
- [Architecture](#architecture)
  - [CLI & Server](#cli--server)
  - [App](#app)
- [Configure](#configure)
  - [Config file](#config-file)
    - [Themes](#themes)
  - [Preview file](#preview-file)
    - [Components list](#components-list)
    - [CreateTheme function](#createtheme-function)
    - [Provider decorator](#provider-decorator)
    - [Styling](#styling)
- [API](#api)
  - [CLI](#cli)
  - [Preview](#preview)
    - [ComponentConfig](#componentconfig)
    - [PreviewStyles](#previewstyles)
    - [Provider](#provider)
    - [CreateTheme](#createtheme)
    - [ThemeStore](#themestore)
- [Author](#author)
- [License](#license)

## Get started

#### Install

Add package into your project.<br/>
Install as dev dependency:

```bash
npm install -D @duotone/react
or
yarn add -D @duotone/react
or
pnpm add -D @duotone/react
```

This will also create an **example configuration for you in `.duotone` folder** at the root of your project.

#### Add script

Add serve script to your `package.json` scripts:

```json
{
  "scripts": {
    "duotone": "duotone serve",
    "duotone:build": "duotone build"
  }
}
```

#### Run

```bash
npm run duotone
or
yarn duotone
or
pnpm duotone
```

#### Open

Open the duotone app in your browser. By default:

```
http://localhost:7890
```

You'll see an example setup of duotone.

_Now let's add your own…_

---

## Architecture

#### CLI & Server

The bulding and dev server are powered by [Vite](https://vitejs.dev/) and [esbuild](https://esbuild.github.io/).
These are much faster than Webpack and babel, giving superior DX.

Building Typescript and importing static files is handled automatically.
Supports only ES-modules.

The code is heavily based on [Ladle](https://ladle.dev/) which is a great alternative to Storybook.

#### App

Powered by React and [jotai](https://jotai.org/) for state management.

---

## Configure

Config directory gets created at the root of your project: `.duotone`

In it are two main config files:

- `config.mjs` - main config file for setup
- `preview.jsx` - components and preview

You can safely remove example template files: `components.jsx` and `theme.js`.

### Config file

Exports default configuration object

```js
// config.mjs

/**
 * @type {import('@duotone/react').UserConfig}
 */
export default {
  /**
   * Object with theme setup (required)
   */
  themes: {
    lightTheme: '../theme.js',
  },

  /**
   * Component library branding, all optional
   */
  name: 'Our UI kit',
  description: 'React component library for our apps',
  // Uri or path to library logo
  logo: '../assets/logo.svg',
  // Url of the components librray documentation
  url: 'https://ui.example.com',

  /**
   * Dev config, optional
   */
  // Port of the duotone server
  port: 7890,
  // File with Vite configuration
  viteConfig: '../vite.config.js',
}
```

#### Themes

Object where keys are the theme names and value is a path to the theme module. Path is relative to the config file.

_If just one theme is set to be exported from a given file it's assumed it's **exported as default**._<br/>
_If multiple themes come form the file it's assumed, they are named exports. The theme object keys must match the named exports!_

Examples:

Different theme paths

```js
// config.mjs

{
  themes: {
    light: '../light-theme.ts',
    dark: '../dark-theme.ts'
  }
}
```

mean this theme structure:

```ts
// light-theme.ts

export default {
  text: '#000',
}

// dark-theme.ts

export default {
  text: '#FFF',
}
```

<br/>

Same theme path

```js
// config.mjs

{
  themes: {
    light: '../theme.ts',
    dark: '../theme.ts'
  }
}
```

means this theme structure:

```ts
// theme.ts

export const light = {
  text: '#000',
}

export const dark = {
  text: '#FFF',
}
```

<br/>

If you want to name themes different to named exports<br/>
or add specific [preview styles](#PreviewStyles) for a theme, use this config format:

```js
// config.mjs

{
  themes: {
    lightTheme: {
      name: 'light',
      path: '../theme.ts',
      previewStyles: {
        background: '#ccc',
        color: '#000',
        panelBackground: '#FFF',
      }
    }
  }
}
```

### Preview file

_Should be named `preview` with either `.jsx` or `.tsx` extension_

#### Components list

Export as `default` or as a named export `components`

Object with keys as component names and values as [ComponentConfig](#ComponentConfig).

Example:

```tsx
// preview.jsx

export const components = {
  Button: {
    render: props => <Button>Button</Button>
    variants: {
      Size: {
        prop: 'size',
        options: ['sm', 'md', 'lg']
      }
    }
  }
}
```

#### CreateTheme function

[CreateTheme](#CreateTheme)

Define and export a `createTheme` function to customize how the updated theme will get generated.

By default it merges (deep) all updated tokens into original theme.

The funciton accepts two arguments:

- `tokens` - object with updated tokens
- `themeStore` - currently selected theme information (use `themeStore.theme` [ThemeStore](#ThemeStore)

```ts
export const createTheme = (tokens: ThemeTokens, themeStore: ThemeStore) =>
  merge({}, themeStore.tokens, tokens)
```

#### Provider decorator

[Provider](#Provider)

Export a provider that wraps around the whole preview tree.
Use it to pass theme context, add internalization or run code that add global styling.

Provider receives the updated theme object as prop. Pass it e.g. to theme provider to style the components.

```jsx
// preview.jsx

export const Provider = ({theme, children}) => (
  <ThemeProvider theme={theme}>
    {children}
  </Theme>
)
```

#### Styling

You can custom style the preview

For all themes, export `previewStyles` from preview file.<br/>
[PreviewStyles](#PreviewStyles)

```js
// preview.jsx

export const previewStyles = {
  background: '#ccc',
  color: '#000',
  panelBackground: '#FFF',
}
```

To style each theme preview individually, add `previewStyles` to theme config object

```js
// config.mjs

{
  themes: {
    lightTheme: {
      name: 'light',
      path: '../theme.ts',
      previewStyles: {
        background: '#ccc',
        color: '#000',
        panelBackground: '#FFF',
      }
    }
  }
}
```

## API

### CLI

You can use params to configure main server:

```bash
Usage
  $ duotone serve

Options
  -p, --port      port of the duotone server [default: 7890]
  -config         config directory [default: .duotone]
  -viteConfig     file with Vite configuration
```

### Preview

##### ComponentConfig

```ts
type ComponentConfig = {
  /**
   * Render function of the component.
   * Pass props to the element that expects variant props.
   */
  render?: (props?: Record<string, any>) => React.ReactNode
  /**
   * List of variants to render in preview
   */
  variants?: {
    // Name of the variant
    name: string
    // Prop that controls the variant on the component
    prop?: string
    /**
     * List of variant options
     * Pass the option value or an object that let's you control
     * the option name and how it renders individually.
     */
    options: (string | number | boolean | { name: string; render: () => React.ReactNode })[]
  }[]
}
```

##### PreviewStyles

```ts
type PreviewStyles = {
  // Preview background color
  background?: string
  // Text color
  color?: string
  // Background color of component rendering panels
  panelBackground?: string
}
```

#### Provider

```ts
type Provider = (
  props: React.PropsWithChildren<{ theme: ThemeTokens }>
) => React.ComponentElement<any, any>
```

#### CreateTheme

```ts
type CreateTheme = (tokens: ThemeTokens, themeStore: ThemeStore) => {} | string
```

#### ThemeStore

```ts
type ThemeStore<T = {}> = {
  name: string
  theme: T
  tokens: ThemeTokens
  previewStyles?: PreviewStyles
}
```

## Author

Matt Lauko (@matejlauko)

## License

MIT
