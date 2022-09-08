import * as DialogPrimitive from '@radix-ui/react-dialog'
import * as React from 'react'
import { CSS, keyframes, styled } from '../config'
import { IconButton } from './icon-button'
import { CloseIcon } from './icon'
import { overlayCss } from './overlay'
import { panelCss } from './panel'

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
})

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -2%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, 0) scale(1)' },
})

const DialogOverlay = styled(DialogPrimitive.Overlay, overlayCss, {
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: '$dialogOverlay',

  '@motion': {
    willChange: 'transform, opacity',
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
})

const DialogRoot = DialogPrimitive.Root
const DialogPortal = DialogPrimitive.Portal

const UIDialogContent = styled(DialogPrimitive.Content, panelCss, {
  position: 'fixed',
  top: '10vh',
  left: '50%',
  transform: 'translateX(-50%)',
  minWidth: 'min(100%, 360px)',
  maxHeight: '90vh',
  maxWidth: 800,
  width: 'calc(100% - 24px)',
  zIndex: '$dialog',
  display: 'flex',
  bg: '$uiBg',

  '@motion': {
    willChange: 'transform, opacity',
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },

  '&:focus': {
    outline: 'none',
  },
})

const UIDialogContentInner = styled('div', {
  py: '$4',
  px: '$5',
  overflowY: 'auto',
  maxHeight: '100%',
  flex: 1,
  overscrollBehavior: 'none',
})

const UIDialogClose = styled(DialogPrimitive.Close, {
  position: 'absolute',
  top: '$2',
  right: '$4',
})

const DialogClose = React.forwardRef<React.ElementRef<typeof UIDialogClose>>(function DialogClose(
  _props,
  forwardedRef
) {
  return (
    <UIDialogClose asChild ref={forwardedRef} aria-label="Close dialog">
      <IconButton variant="ghost">
        <CloseIcon />
      </IconButton>
    </UIDialogClose>
  )
})

const UIDialogTitle = styled(DialogPrimitive.Title, {
  mb: '$4',
  fontSize: '$7',
  fontWeight: '$semibold',
})

// Exports

type DialogProps = React.ComponentProps<typeof DialogRoot> & {
  children: React.ReactNode
}

export const Dialog: React.FC<React.PropsWithChildren<DialogProps>> = ({ children, ...props }) => {
  return <DialogRoot {...props}>{children}</DialogRoot>
}

type DialogContentProps = React.ComponentProps<typeof DialogPrimitive.Content> & {
  css?: CSS
  hasOverlay?: boolean
}

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof UIDialogContent>,
  DialogContentProps
>(function DialogContent({ children, hasOverlay = true, ...props }, forwardedRef) {
  return (
    <DialogPortal>
      {hasOverlay && <DialogOverlay />}

      <UIDialogContent {...props} ref={forwardedRef}>
        <UIDialogContentInner>{children}</UIDialogContentInner>

        <DialogClose />
      </UIDialogContent>
    </DialogPortal>
  )
})

type DialogTriggerProps = React.ComponentProps<typeof DialogPrimitive.Trigger> & {
  css?: CSS
  hasOverlay?: boolean
}

export const DialogTrigger = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Trigger>,
  DialogTriggerProps
>(function DialogTrigger({ children, ...props }, forwardedRef) {
  return (
    <DialogPrimitive.Trigger asChild={true} {...props} ref={forwardedRef}>
      {children}
    </DialogPrimitive.Trigger>
  )
})

export const DialogTitle = UIDialogTitle
