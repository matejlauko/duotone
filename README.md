<p align="center">
<img width="256px" src="https://duotone.lauko.io/assets/logo.svg" alt="duotone logo" />
</p>

<p align="center">
<a href="https://www.npmjs.com/package/@duotone/react" target="_blank"><img src="https://img.shields.io/npm/v/@duotone/react?color=blue" alt="npm version" /></a>
</p>

<h1>duotone - visual theme editor + live component preview</h1>

Craft perfect themes that fit your brand.

Design and prototype quicker by getting an overview of all the UI components you use.

#### With duotone you can:

- 🖼 Preview how all the components and their variants look side-by-side on one organized page
- 🎨 Edit design tokens and see changes live

<br/>

## Contents

- [Contents](#contents)
- [Get started](#get-started)
    - [Install](#install)
    - [Add script](#add-script)
    - [Run](#run)
    - [Open](#open)
- [Configure](#configure)
  - [Config file](#config-file)
    - [Themes](#themes)
  - [Preview file](#preview-file)
    - [Components list](#components-list)
    - [CreateTheme function](#createtheme-function)
    - [Provider decorator](#provider-decorator)
    - [Styling](#styling)
- [Architecture](#architecture)
    - [CLI & Server](#cli--server)
    - [App](#app)
    - [Preview](#preview)
- [API](#api)
  - [CLI](#cli)
  - [Preview](#preview-1)
      - [ComponentConfig](#componentconfig)
      - [ComponentsConfig](#componentsconfig)
      - [StylesConfig](#stylesconfig)
    - [Provider](#provider)
    - [CreateTheme](#createtheme)
    - [ThemePack](#themepack)
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

Next, create default config using:

```bash
npx duotone init
```

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

Open the duotone app in your browser. By default it's at

```
http://localhost:7890
```

You'll see the example setup of duotone!

_Now let's add your own 👇👇👇_

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
   * Name of the UI kit (optional)
   */
  name: 'Our UI',

  /**
   * Dev config (optional)
   */
  // Port of the duotone server
  port: 7890,
  // Folder with publishable duotone after running "duotone build"
  outDir: 'duotone-dist',
  // Public path of published duotone
  base: '/',
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
or add specific [preview styles](#previewstyles) for a theme, use this config format:

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

Object with keys as component names and values as [ComponentsConfig](#componentsconfig).

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

[CreateTheme](#createtheme)

Define and export a `createTheme` function to customize how the updated theme will get generated.

By default it merges (deep) all updated tokens into original theme.

The funciton accepts two arguments:

- `tokens` - object with updated tokens
- `themePack` - currently selected theme information (use `themePack.theme` [ThemePack](#themepack)

```ts
export const createTheme = (tokens: ThemeTokens, themePack: ThemePack) =>
  merge({}, themePack.tokens, tokens)
```

#### Provider decorator

[Provider](#provider)

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

You can customize the preview styling

To do so for all themes, export `previewStyles` from preview file.<br/>
[StylesConfig](#stylesconfig)

```js
// preview.jsx

export const previewStyles = {
  background: '#f8f9fa',
  fontSize: '16px',
  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  fontColor: '#151718',
  primaryColor: '#3e63dd',

  renderPanel: {
    background: '#fff',
    fontColor: '#151718',
  },
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
        background: '#f8f9fa',
        fontSize: '16px',
        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        fontColor: '#151718',
        primaryColor: '#3e63dd',
        renderPanel: {
          background: '#fff',
          fontColor: '#151718',
        },
      }
    }
  }
}
```

---

## Architecture

#### CLI & Server

The bulding and dev server are powered by [Vite](https://vitejs.dev/) and [esbuild](https://esbuild.github.io/).
These are much faster than Webpack and babel, giving superior DX.

Building Typescript and importing static files is handled automatically.
Supports only ES-modules.

The code is heavily based on [Ladle](https://ladle.dev/), which is a great alternative to Storybook.

#### App

Powered by [React](https://reactjs.org), [jotai](https://jotai.org/) for state management.

#### Preview

Components preview lives in it's own pacakge [@duotone/preview](./packages/preview/).

You can install and use it on it's own as a React component!

**Install**

```bash
npm install @duotone/preview
or
yarn add @duotone/preview
or
pnpm add @duotone/preview
```

**Use**

```jsx
import DuotonePreview from '@duotone/preview'

export default () => (
  <DuotonePreview kitName="My UI" components={components} previewStyles={previewStyles} />
)
```

See API for [components - ComponentsConfig](#componentsconfig) and [previewStyles - StylesConfig](#stylesconfig)

---

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

A component preview config

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

##### ComponentsConfig

Components preview config object

```ts
type ComponentConfig = {
  [ComponentName: string]: ComponentConfig
}
```

##### StylesConfig

Style the preview

```ts
type StylesConfig = {
  fontFamily?: string // Preview font family
  fontSize?: string // Base preview font size
  fontColor?: string // Text color
  background?: string // Preview background color
  primaryColor?: string // Primary color for highlights

  // Panel that renders the component options
  renderPanel?: {
    background?: string // Background of the render panel
    fontColor?: string // Text colors inside the render panel
  }
}
```

#### Provider

Provider that wraps previewed components

```ts
type Provider = (
  props: React.PropsWithChildren<{ theme: ThemeTokens }>
) => React.ComponentElement<any, any>
```

#### CreateTheme

Fn to create dervied themes

```ts
type CreateTheme = (tokens: ThemeTokens, themePack: ThemePack) => {} | string
```

#### ThemePack

Theme store object

```ts
type ThemePack<T = {}> = {
  name: string
  theme: T
  tokens: ThemeTokens
  previewStyles?: StylesConfig
}
```

## Author

Matej Lauko ([@matejlauko](https://twitter.com/matejlauko))

## License

MIT
