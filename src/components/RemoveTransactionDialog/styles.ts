import styled from 'styled-components'

export const Container = styled.form`
  h2 {
    color: ${ctx => ctx.theme.colors.textTitle};
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  p {
    color: ${ctx => ctx.theme.colors.text}
  }

  .actions {
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;

    button {
      flex: 1;
      padding: 0 1.5rem;
    }
  }
`
