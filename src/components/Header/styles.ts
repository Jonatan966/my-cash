import styled from "styled-components";

export const Container = styled.header`
  background: ${ctx => ctx.theme.colors.primary};
`

export const Content = styled.div`
  max-width: 1120px;
  margin: 0 auto;

  padding: 2rem 1rem 12rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    font-size: 1rem;
    color: #fff;
    background: ${ctx => ctx.theme.colors.primaryLight};
    border: 0;
    padding: 0 2rem;
    border-radius: 0.25rem;
    height: 3rem;

    grid-area: btnTransaction;
    
    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }

  .switcher {
    grid-area: btnSwitcher;
  }

  > img {
    grid-area: logo;
  }

  @media (max-width: 375px) {
    > img {
      zoom: 0.8;
    }
  }

  @media (max-width: 820px) {
    display: grid;
    grid-template-areas:
        "logo btnSwitcher"
        "btnTransaction btnTransaction";
    gap: 1.5rem;
  }
`