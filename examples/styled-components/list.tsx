import * as React from 'react'
import styled from 'styled-components'

export const List: React.FC<{ items: string[] }> = ({ items }) => {
  return (
    <UIList>
      {items.map((item, index) => (
        <UIItem key={index}>{item}</UIItem>
      ))}
    </UIList>
  )
}

const UIList = styled.ul`
  list-style: none;
  padding-left: ${({ theme }) => theme.sizes.m};
`

const UIItem = styled.li`
  color: ${({ theme }) => theme.colors.main};
`
