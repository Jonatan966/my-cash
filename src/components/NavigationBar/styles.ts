import styled, { css } from 'styled-components'

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
