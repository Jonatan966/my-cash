import styled from 'styled-components'

export const Container = styled.div`
  position: relative;

  span {
    font-size: 0.95rem;
    line-height: 1.75rem;
  }
`

export const Input = styled.input`
  width: 100%;
  height: 3rem;

  padding: 0 1rem;

  border-radius: 0.25rem;
  border: 1px solid ${ctx => ctx.theme.colors.inputBorder};
  background: ${ctx => ctx.theme.colors.inputBg};
  color: ${ctx => ctx.theme.colors.text};

  font-weight: 400;
  font-size: 1.25rem;

  &::placeholder {
    color: ${ctx => ctx.theme.colors.textBody};
  }

  &:after {
    content: attr(data-mds);
  }

  &:focus {
    /* background: green; */
  }
`
