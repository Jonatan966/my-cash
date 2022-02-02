import styled from 'styled-components'

export const Header = styled.header`
  background: ${ctx => ctx.theme.colors.primary};

  padding: 1rem;
  text-align: center;

  color: #fff;

  z-index: 1;
  position: sticky;
  top: 0;
`

export const MainContainer = styled.main`
  padding: 1.75rem 0.75rem 1rem;

  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: 1rem;

  > section, .emptyTransactions {
    max-width: 1120px;
    width: 100%;

    margin: 0 auto;
  }

  .pie-summary {
    max-width: 25rem;
  }

  .emptyTransactions {
    text-align: center;
    margin-top: 4rem;
  }

  @media (max-width: 380px) {
    .pie-summary {
      max-width: 20rem;
    }
  }

  .pie-labels-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;

    margin-top: 1rem;
    padding-bottom: 5rem;
  }

  @media (max-width: 768px) {
    .pie-labels-list {
      grid-template-columns: repeat(2, 1fr);
    } 
  }

  @media (max-width: 425px) {
    .pie-labels-list {
      grid-template-columns: 1fr;
      
    }
  }
`

export const MonthSwitcher = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    font-size: 0;

    background: none;
    border: none;
  }

  svg {
    zoom: 1.5;
  }
  
  &, svg {
    color: ${ctx => ctx.theme.colors.text};
  }
`

export const PieLabel = styled.div`
  background: ${ctx => ctx.theme.colors.shape};
  color: ${ctx => ctx.theme.colors.textTitle};

  padding: 0.75rem;
  border-radius: 0.25rem;

  display: flex;
  justify-content: space-between;

  border-left: 0.25rem solid ${ctx => ctx.color || ctx.theme.colors.primaryLight};
`
