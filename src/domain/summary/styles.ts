import styled from 'styled-components'
import { Swiper } from 'swiper/react'

export const Container = styled(Swiper)`
  margin-top: -10rem;

  .swiper-slide {
    background: ${ctx => ctx.theme.colors.shape};
    padding: 1.5rem 2rem;
    border-radius: 0.25rem;
    color: ${ctx => ctx.theme.colors.textTitle};

    user-select: none;

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
`
