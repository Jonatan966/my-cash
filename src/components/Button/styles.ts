import styled from 'styled-components'
import { ButtonProps, ThemeColors } from './types'

export const Container = styled.button<ButtonProps>`
  padding: 0.25rem;

  background: ${ctx => 
    ctx.theme.colors[ctx.backgroundColor as ThemeColors] || ctx.backgroundColor
  };
  border: none;
  border-radius: 0.25rem;

  text-decoration: none;
  font-weight: bold;
  font-size: ${ctx => ctx.fontSize};

  transition: filter 0.2s;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: ${ctx => ctx.height};
  min-width: ${ctx => ctx.minWidth};

  &, svg {
    color: ${ctx => 
      ctx.theme.colors[ctx.textColor as ThemeColors] || ctx.textColor
    };
  }

  &:hover:not(:disabled) {
    filter: brightness(${ctx => ctx.hoverMagnitude});
  }
`
