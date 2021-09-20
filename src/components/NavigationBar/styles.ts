import styled, { css } from "styled-components";

export const Container = styled.footer`
  position: fixed;

  bottom: 0;
  left: 0;
  right: 0;

  padding: 0.5rem;

  background: ${ctx => ctx.theme.colors.shape};
  border-top: 2px solid ${ctx => ctx.theme.colors.background};

  nav {
    display: grid;
    grid-template-columns: 1fr 0.65fr 1fr;
    gap: 0.5rem;

    margin: 0 auto;
    width: 100%;
    max-width: 1120px;
  }

  button {
    padding: 0.25rem;

    background: none;
    border: none;
    border-radius: 0.25rem;

    color: ${ctx => ctx.theme.colors.textTitle};
    font-weight: bold;
    font-size: 1.05rem;

    transition: filter 0.2s;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    svg {
      color: ${ctx => ctx.theme.colors.textTitle};
    }

    &:hover {
      filter: brightness(0.8);
    }
  }

  .new-btn {
    background: ${ctx => ctx.theme.colors.green};

    color: #fff;
    font-size: 1.75rem;
  }

  .selected-btn {
    ${ctx => ctx.theme.title === 'light' && css`
      color: ${ctx => ctx.theme.colors.primary};  

      svg {
        color: ${ctx => ctx.theme.colors.primaryLight};
      }
    `};

    ${ctx => ctx.theme.title === 'dark' && css`
      &, svg {
        color: #fff;
      }
    `}; 
  }
`