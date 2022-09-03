import styled from 'styled-components'

export const Button = styled.button<{ variant: 'solid' | 'outline' }>`
  font-size: 1em;
  margin: 1em;
  padding: 0 1em;
  border-radius: 3px;

  /* Color the border and text with theme.main */
  color: ${(props) => props.theme.colors.main};
  border: 2px solid ${(props) => props.theme.colors.main};

  ${({ variant, theme }) =>
    variant === 'solid'
      ? `
    height: ${theme.sizes.l};
    `
      : `
    height: ${theme.sizes.m};
    border-color ${theme.brand};
    `}
`
