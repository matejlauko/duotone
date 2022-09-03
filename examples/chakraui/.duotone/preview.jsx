import { ArrowForwardIcon, EmailIcon } from '@chakra-ui/icons'
import { Button, ChakraProvider, Container, extendTheme } from '@chakra-ui/react'
import Slider from '../Slider'

/**
 * @type {import('@duotone/react').ComponentsConfig}
 */
const components = {
  Button: {
    render: (props) => <Button {...props}>Button</Button>,
    variants: {
      Size: {
        prop: 'size',
        options: ['xs', 'sm', 'md', 'lg'],
      },
      Variant: {
        prop: 'variant',
        options: ['solid', 'outline', 'ghost', 'link'],
      },
      ['Color scheme']: {
        prop: 'colorScheme',
        options: [
          'gray',
          'red',
          'orange',
          'yellow',
          'green',
          'teal',
          'blue',
          'cyan',
          'purple',
          'pink',
          'linkedin',
          'facebook',
          'messenger',
          'whatsapp',
          'twitter',
          'telegram',
        ],
      },
      Icon: {
        options: [
          {
            name: 'Left',
            render: () => (
              <Button leftIcon={<EmailIcon />} colorScheme="teal" variant="solid">
                Email
              </Button>
            ),
          },
          {
            name: 'Right',
            render: () => (
              <Button rightIcon={<ArrowForwardIcon />} colorScheme="teal" variant="outline">
                Call us
              </Button>
            ),
          },
        ],
      },

      Loading: {
        options: [
          {
            name: 'true',
            render: () => (
              <Button isLoading colorScheme="teal" variant="solid">
                Email
              </Button>
            ),
          },
          {
            name: 'true with text',
            render: () => (
              <Button isLoading loadingText="Submitting" colorScheme="teal" variant="outline">
                Submit
              </Button>
            ),
          },
          {
            name: 'true with spinner',
            render: () => (
              <Button
                isLoading
                colorScheme="blue"
                spinner={
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <div style={{ width: '4px', height: '4px', background: 'white' }} />
                    <div style={{ width: '4px', height: '4px', background: 'white' }} />
                    <div style={{ width: '4px', height: '4px', background: 'white' }} />
                  </div>
                }
              >
                Click me
              </Button>
            ),
          },
          {
            name: 'spinner start',
            render: () => (
              <Button
                isLoading
                loadingText="Loading"
                colorScheme="teal"
                variant="outline"
                spinnerPlacement="start"
              >
                Submit
              </Button>
            ),
          },
          {
            name: 'spinner end',
            render: () => (
              <Button
                isLoading
                loadingText="Loading"
                colorScheme="teal"
                variant="outline"
                spinnerPlacement="end"
              >
                Continue
              </Button>
            ),
          },
        ],
      },
    },
  },
  Container: {
    render: (props) => (
      <Container>
        There are many benefits to a joint design and development system. Not only does it bring
        benefits to the design team, but it also brings benefits to engineering teams. It makes sure
        that our experiences have a consistent look and feel, not just in our design specs, but in
        production
      </Container>
    ),
    variants: {
      Size: {
        prop: 'maxW',
        options: ['container.sm', 'container.md', 'container.lg', 'container.xl'],
      },
    },
  },
  Slider: {
    render: (props) => (
      <div style={{ width: '300px' }}>
        <Slider />
      </div>
    ),
  },
}

export default components

/**
 * @type {import('@duotone/react').Provider}
 */
export const Provider = ({ children, theme }) => (
  <ChakraProvider theme={theme}>{children}</ChakraProvider>
)

/**
 * @type {import('@duotone/react').CreateTheme}
 */
export const createTheme = (customTokens) => extendTheme(customTokens)
