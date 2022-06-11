import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }

  html {
    @media (max-width: 1080px) {
      font-size: 93.75%;
    }

    @media (max-width: 720px) {
      font-size: 87.5%;
    }
  }

  body {
    background: ${(ctx) => ctx.theme.colors.background};
    --webkit-font-smoothing: antialiased;
    overflow-y: ${(ctx) => (ctx.theme.isScrollbarVisible ? 'auto' : 'hidden')};

    overflow-x: hidden;
  }

  button {
    cursor: pointer;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }

  hr {
    border-width: 0;
    background: ${(ctx) => ctx.theme.colors.inputBorder};
    height: 1px;
  }
  
  input::-webkit-calendar-picker-indicator {
    opacity: 100;
    transform: translateY(-15%);
  }
`
