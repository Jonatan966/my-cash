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
      height: 4rem;

      padding: 0 1.5rem;

      background: ${ctx => ctx.theme.colors.trashBg};

      color: #fff;
      font-size: 1rem;

      border-radius: 0.25rem;
      border: 0;

      transition: filter 0.2s;

      &:hover {
        filter: brightness(0.9);
      }

      &[type=button] {
        background: ${ctx => ctx.theme.colors.green};
      }
    }
  }
`
