import * as React from 'react'
import { css, styled } from '../config'

export const resetButtonCss = css({
  appearance: 'none',
  background: 'transparent',
  userSelect: 'none',
  lineHeight: '1',
  cursor: 'pointer',
  WebkitTapHighlightColor: 'transparent',
  fontFamily: 'inherit',
  border: 'none',
})

export const baseButtonCss = css(resetButtonCss, {
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  transition:
    'background-color $appear_fast, color $appear_fast, border-color $appear_fast, box-shadow $appear_fast, transform $appear_fast',

  '&:focus-visible': {
    outline: '$colors$focus solid 2px',
  },

  '&[href]:hover': {
    textDecoration: 'none',
  },

  '&:disabled': {
    cursor: 'default',
    opacity: 0.7,
  },
})

export const BaseButton = styled('button', baseButtonCss)

export const UIButton = styled(BaseButton, {
  justifyContent: 'center',
  borderRadius: '$radii$md',
  fontWeight: '$fontWeights$medium',

  variants: {
    variant: {
      solid: {
        color: '$solidText',
      },
      ghost: {
        color: '$text',
        borderWidth: 2,
        borderColor: 'transparent',
      },
    },
    tone: {
      accent: {},
      destroy: {},
    },
    size: {
      sm: {
        fontSize: '$2',
        height: '$control_sm',
        px: '$2',
      },
      md: {
        fontSize: '$base',
        height: '$control_md',
        px: '$3',
      },
    },
  },
  compoundVariants: [
    // Solid
    {
      variant: 'solid',
      tone: 'accent',
      css: {
        backgroundColor: '$solidAccentBg',

        '&:hover:not(:disabled)': {
          bg: '$solidAccentBgHover',
        },
        '&:active:not(:disabled), &[data-state="open"]': {
          bg: '$solidAccentBgActive',
        },
      },
    },

    // Ghost
    {
      variant: 'ghost',
      tone: 'destroy',
      css: {
        '&:hover:not(:disabled)': {
          bg: '$ghostDestroyBgHover',
          borderColor: '$borderDestroy',
          color: '$ghostDestroyTextHover',
        },
        '&:active:not(:disabled), &[data-state="open"]': {
          bg: '$ghostDestroyBgActive',
        },
      },
    },
    {
      variant: 'ghost',
      tone: 'accent',
      css: {
        '&:hover:not(:disabled)': {
          bg: '$ghostAccentBgHover',
          borderColor: '$borderAccent',
          color: '$ghostAccentTextHover',
        },
        '&:active:not(:disabled), &[data-state="open"]': {
          bg: '$ghostAccentBgActive',
        },
      },
    },
  ],
  defaultVariants: {
    variant: 'solid',
    tone: 'accent',
    size: 'md',
  },
})

type ButtonProps = {
  iconBefore?: React.ReactElement
} & React.ComponentProps<typeof UIButton>

export const Button = React.forwardRef<
  React.ElementRef<typeof UIButton>,
  React.PropsWithChildren<ButtonProps>
>(function Button({ iconBefore, children, css, ...restProps }, forwardedRef) {
  let content = <>{children}</>

  if (iconBefore) {
    content = (
      <>
        <UIIcon position="before">
          {React.cloneElement(iconBefore, {
            size: 'text',
            color: 'inherit',
          })}
        </UIIcon>
        {children}
      </>
    )
  }

  return (
    <UIButton {...restProps} css={css as any} ref={forwardedRef}>
      {content}
    </UIButton>
  )
})

const UIIcon = styled('span', {
  display: 'inline-flex',
  alignSelf: 'center',
  flexShrink: 0,
  variants: {
    position: {
      before: {
        mr: '$2',
      },
      after: {
        ml: '$2',
      },
    },
  },
})
