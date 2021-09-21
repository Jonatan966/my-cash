import styled from 'styled-components'
import { darken, transparentize } from 'polished'

export const Container = styled.form`
  h2 {
    color: ${ctx => ctx.theme.colors.textTitle};
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  input {
    width: 100%;
    height: 4rem;

    padding: 0 1.5rem;

    border-radius: 0.25rem;
    border: 1px solid ${ctx => ctx.theme.colors.inputBorder};
    background: ${ctx => ctx.theme.colors.inputBg};
    color: ${ctx => ctx.theme.colors.text};

    font-weight: 400;
    font-size: 1rem;

    &::placeholder {
      color: ${ctx => ctx.theme.colors.textBody};
    }

    & + input {
      margin-top: 1rem;
    }
  }

  button[type=submit] {
    width: 100%;
    height: 4rem;

    padding: 0 1.5rem;
    margin-top: 1.5rem;

    background: ${ctx => ctx.theme.colors.green};

    color: #fff;
    font-size: 1rem;

    border-radius: 0.25rem;
    border: 0;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }
`

export const TransactionTypeContainer = styled.div`
  margin: 1rem 0;
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
  height: 4rem;
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
