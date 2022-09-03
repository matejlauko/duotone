import merge from 'lodash.merge'
import * as React from 'react'
import { CreateTheme, ComponentsConfig } from '@duotone/react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  createTheme as UICreateTheme,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  ExportIcon,
  globalCss,
  globalStyles,
  IconButton,
  Label,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
  TextArea,
  TextInput,
  textVariants,
  Tooltip,
  UIProvider,
} from '../../../packages/duotone/app/ui'

const components: ComponentsConfig = {
  Button: {
    render: (props) => (
      <Button {...props} tone="accent">
        Button
      </Button>
    ),
    variants: {
      Variant: {
        prop: 'variant',
        options: ['solid', 'ghost'],
      },
      ['Solid Tone']: {
        prop: 'tone',
        options: [
          {
            name: 'accent',
            render: () => (
              <Button variant="solid" tone="accent">
                Button
              </Button>
            ),
          },
          {
            name: 'destroy',
            render: () => (
              <Button variant="solid" tone="destroy">
                Button
              </Button>
            ),
          },
        ],
      },
      ['Ghost Tone']: {
        prop: 'tone',
        options: [
          {
            name: 'accent',
            render: () => (
              <Button variant="ghost" tone="accent">
                Button
              </Button>
            ),
          },
          {
            name: 'destroy',
            render: () => (
              <Button variant="ghost" tone="destroy">
                Button
              </Button>
            ),
          },
        ],
      },
    },
  },
  ['Icon Button']: {
    render: (props) => (
      <IconButton {...props}>
        <ExportIcon />
      </IconButton>
    ),
    variants: {
      Variant: {
        prop: 'variant',
        options: ['outline', 'ghost'],
      },
      Size: { prop: 'size', options: ['sm', 'md', 'lg', 'xl'] },
    },
  },
  ['Text Input']: {
    render: (props) => <TextInput {...props} placeholder="Input" />,
  },
  ['Text Area']: {
    render: (props) => <TextArea {...props} placeholder="Text Area" />,
  },
  Switch: {
    render: (props) => <Switch {...props} />,
  },
  Accordion: {
    render: (props) => (
      <Accordion type="multiple">
        <AccordionItem value="1">
          <AccordionTrigger>Trigger</AccordionTrigger>
          <AccordionContent>Content</AccordionContent>
        </AccordionItem>
        <AccordionItem value="2">
          <AccordionTrigger>Trigger 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
  },
  Dialog: {
    render: () => (
      <Dialog>
        <DialogTrigger>
          <Button>Open Dialog</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogTitle>Dialog</DialogTitle>
        </DialogContent>
      </Dialog>
    ),
  },
  Text: {
    render: (props) => <Text {...props}>Text</Text>,
    variants: {
      Color: {
        prop: 'color',
        options: Object.keys(textVariants.color),
      },
      Weight: {
        prop: 'weight',
        options: Object.keys(textVariants.weight),
      },
      Caps: {
        prop: 'caps',
        options: [true],
      },
      Size: {
        prop: 'size',
        options: Object.keys(textVariants.size),
      },
    },
  },
  Label: {
    render: () => <Label>Label</Label>,
  },
  Link: {
    render: (props) => <Link {...props}>Link</Link>,
  },
  Popover: {
    render: () => (
      <Popover>
        <PopoverTrigger asChild>
          <Button>Open Popover</Button>
        </PopoverTrigger>

        <PopoverContent>fds fds fsd fsad fasd fasf sa f</PopoverContent>
      </Popover>
    ),
  },
  Tabs: {
    render: () => (
      <Tabs>
        <TabsList aria-label="Unstyled tabs example">
          <TabsTrigger value="one">One</TabsTrigger>
          <TabsTrigger value="two">Two</TabsTrigger>
        </TabsList>

        <TabsContent value="one">First content</TabsContent>

        <TabsContent value="two">Second content</TabsContent>
      </Tabs>
    ),
  },
  Tooltip: {
    render: () => (
      <Tooltip content="Tooltip content">
        <div>hover me</div>
      </Tooltip>
    ),
  },
}

export default components

export const Provider = ({ children }) => {
  React.useEffect(() => {
    globalCss(globalStyles)()
  }, [])

  return <UIProvider>{children}</UIProvider>
}

export const createTheme: CreateTheme = (_tokens, themeStore) => {
  return UICreateTheme(merge({}, themeStore.tokens, _tokens) as any)
}
