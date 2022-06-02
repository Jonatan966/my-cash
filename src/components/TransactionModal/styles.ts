import styled from 'styled-components'
import { darken, transparentize } from 'polished'

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  h2 {
    color: ${ctx => ctx.theme.colors.textTitle};
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  button[type=submit] {
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
  isActive: boolean;
  activeColor: 'green' | 'red';
}

const colors = {
  red: '#e52e4d',
  green: '#33cc95'
}

export const RadioBox = styled.button<RadioBoxProps>`
  height: 3rem;
  border: 1.5px solid #d7d7d7;
  border-radius: 0.25rem;

  background: ${ctx => ctx.isActive 
    ? transparentize(0.8, colors[ctx.activeColor])
    : 'transparent'
  };

  display: flex;
  align-items: center;
  justify-content: center;

  transition: all 0.2s;
  
  &:hover {
    border-color: ${darken(0.2, '#d7d7d7')};
  }

  img {
    width: 20px;
    height: 20px;
  }

  span {
    display: inline-block;
    margin-left: 1rem;
    font-size: 1rem;
    color: ${ctx => ctx.theme.colors.textTitle};
  }

`
