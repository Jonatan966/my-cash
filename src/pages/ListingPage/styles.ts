import styled from 'styled-components'
import { Container as TransactionsTableContainer } from 'domain/TransactionsTable/styles'

export const Container = styled.main`
  max-width: 1120px;
  margin: 0 auto;
  padding: 2.5rem 1rem;

  @media (max-width: 820px) {
    padding: 2.5rem 0;

    ${TransactionsTableContainer} {
      padding: 1rem;
    }
  }
`

export const HeaderContainer = styled.header`
  background: ${(ctx) => ctx.theme.colors.primary};
`

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;

  padding: 2rem 1rem 10rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  button {
    grid-area: btnSignOut;
  }

  .switcher {
    grid-area: btnSwitcher;
    margin: auto;
  }

  > img {
    grid-area: logo;
  }

  @media (max-width: 425px) {
    > img {
      zoom: 0.8;
    }
  }
`
