import * as React from 'react'
import { styled } from '../config'
import { Text, textVariants } from './text'

export const linkVariants = {
  ...textVariants,
  tone: {
    accent: {
      color: '$textAccent',
      fontWeight: '$medium',

      '&:hover': {
        color: '$textAccent2',
      },
    },
  },
}

export const UILink = styled(Text, {
  display: 'inline-block',
  transition: 'color $appear_fast',
  textDecoration: 'none',

  '&:hover': {
    textDecoration: 'underline',
  },

  variants: linkVariants,

  defaultVariants: {
    tone: 'accent',
  },
})

export type LinkProps = React.ComponentProps<typeof UILink> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType
    external?: boolean
    dummy?: boolean
  }

export const Link = React.forwardRef<React.ElementRef<typeof UILink>, LinkProps>(
  ({ external, href, dummy, ...otherProps }, ref) => {
    return (
      <UILink
        as="a"
        href={href}
        ref={ref as any}
        rel={external ? 'noopener noreferrer' : undefined}
        target={external ? '_blank' : undefined}
        onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
          if (href === '#' || dummy) {
            event.preventDefault()
          }
        }}
        {...otherProps}
      />
    )
  }
)

Link.displayName = 'Link'

export const LinkBox = styled('div', { position: 'relative' })

export const LinkOverlay = styled(Link, {
  '&::after': {
    content: '',
    cursor: 'inherit',
    display: 'block',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: '$under',
    width: '100%',
    height: '100%',
  },
})
