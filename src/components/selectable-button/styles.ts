import { transparentize } from 'polished'
import styled from 'styled-components'

import { SelectableButtonProps } from './types'

export const Container = styled.button<SelectableButtonProps>`
  height: 3rem;
  border: 1.5px solid ${(ctx) => ctx.theme.colors.inputBorder};
  border-radius: 0.25rem;

  background: ${(ctx) =>
    ctx.isActive
      ? transparentize(0.8, ctx.theme.colors[ctx.activeColor])
      : 'transparent'};

  display: flex;
  align-items: center;
  justify-content: center;

  transition: all 0.2s;

  &:hover {
    border-color: ${(ctx) => ctx.theme.colors[ctx.activeColor]};
  }

  span {
    display: inline-block;
    margin-left: 1rem;
    font-size: 1rem;
    color: ${(ctx) => ctx.theme.colors.textTitle};
  }

  svg {
    color: ${(ctx) => ctx.theme.colors[ctx.activeColor]};
  }
`
