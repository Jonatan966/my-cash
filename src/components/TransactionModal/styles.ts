import styled from 'styled-components'
import { darken, transparentize } from 'polished'

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  h2 {
    color: ${(ctx) => ctx.theme.colors.textTitle};
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  button[type='submit'] {
    width: 100%;

    padding: 0 1.5rem;
    margin-top: 1.5rem;
  }
`

export const TransactionTypeContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
`

interface RadioBoxProps {
  isActive: boolean
  activeColor: 'green' | 'red'
}

export const RadioBox = styled.button<RadioBoxProps>`
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
    border-color: ${(ctx) => darken(0.2, ctx.theme.colors[ctx.activeColor])};
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
