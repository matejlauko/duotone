import * as React from 'react'
import { Component, Variant } from './types'

export type PreviewContextVal = {
  scrollToComponent: (component: Component['name'], variant?: Variant['name']) => void
}

export const PreviewContext = React.createContext<PreviewContextVal>(undefined as any)

export const PreviewProvider = PreviewContext.Provider

export const usePreviewContext = () => React.useContext(PreviewContext)
