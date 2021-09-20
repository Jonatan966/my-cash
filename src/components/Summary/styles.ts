import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: -10rem;

  div {
    background: ${ctx => ctx.theme.colors.shape};
    padding: 1.5rem 2rem;
    border-radius: 0.25rem;
    color: ${ctx => ctx.theme.colors.textTitle};

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    strong {
      display: block;
      margin-top: 1rem;
      font-size: 2rem;
      font-weight: 500;
      line-height: 3rem;
    }

    &.highlight-background {
      background: ${ctx => ctx.theme.colors.green};
      color: #fff;
    }
  }

  @media (max-width: 820px) {
    overflow-x: hidden;
    min-width: 100vw;
    transform: translateX(-1rem);
    padding: 0 1rem;


    div {
      min-width: 70vw;
    }
  }
`;
