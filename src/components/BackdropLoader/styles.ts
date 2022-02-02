import styled, { css } from "styled-components";

interface ContainerProps {
  fullScreen?: boolean,
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  ${ctx => ctx.fullScreen && css`
    height: 100vh;
    width: 100vw;

    position: absolute;
  `}

  h2 {
    margin-top: 1rem;
    color: ${ctx => ctx.theme.colors.textTitle};
  }
`
