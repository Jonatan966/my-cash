import styled from 'styled-components'

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
