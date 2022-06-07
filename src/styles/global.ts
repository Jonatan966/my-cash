import { createGlobalStyle, keyframes } from 'styled-components'

const modalEnterAnimation = keyframes`
  from {
    transform: translateY(100vh);
  }
  to {
    transform: translateY(0vh);
  }
`

const modalOutAnimation = keyframes`
  from {
    transform: translateY(0vh);
  }
  to {
    transform: translateY(100vh);
  }
`

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

  .react-modal-overlay {
    background: rgba(0,0,0,0.5);

    z-index: 2;
    
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 820px) {
      align-items: flex-end;
    }
  }

  .react-modal-content {
    width: 100%;
    max-width: 576px;
    background: ${(ctx) => ctx.theme.colors.background};
    padding: 3rem;
    position: relative;
    border-radius: 0.25rem;
    margin: 0 1rem;

    @media (max-width: 820px) {
      margin: 0;
      border-radius: 1rem 1rem 0 0;
      padding: 1.75rem;
    }
  }

  .react-modal-closing {
    animation: ${modalOutAnimation} 0.5s 1 ease-in-out;
  }

  .react-modal-opening {
    animation: ${modalEnterAnimation} 0.5s 1 ease-in-out;
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
