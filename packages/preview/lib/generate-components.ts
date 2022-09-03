import { Component, ComponentsConfig } from './types'

export const generateComponentsListFromConfig = (comps: ComponentsConfig): Component[] => {
  return Object.entries(comps).map(([name, { variants, ...component }]) => ({
    ...component,
    name,
    variants: variants
      ? Object.entries(variants).map(([name, variant]) => ({
          ...variant,
          name,
        }))
      : undefined,
  }))
}
