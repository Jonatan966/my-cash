import styled, { DefaultTheme } from 'styled-components'
import { LiteralUnion } from 'prettier'

type ThemeColors = keyof DefaultTheme["colors"]

interface ButtonProps {
  height?: string,
  fontSize?: string,
  minWidth?: string,
  hoverMagnitude?: number,
  backgroundColor?: LiteralUnion<ThemeColors, string>,
  textColor?: LiteralUnion<ThemeColors, string>,
}

export const Button = styled.button<ButtonProps>`
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

  &:hover {
    filter: brightness(${ctx => ctx.hoverMagnitude});
  }
`

Button.defaultProps = {
  textColor: 'textTitle',
  backgroundColor: 'green',
  fontSize: '1.05rem',
  height: 'initial',
  minWidth: 'initial',
  hoverMagnitude: 0.85,
}
