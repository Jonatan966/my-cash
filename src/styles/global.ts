import { createGlobalStyle, keyframes } from "styled-components";

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
  :root {
    --background: #f0f2f5;
    --red: #e52e40;
    --blue: #5429cc;
    --green: #33cc95;

    --blue-light: #6933ff;

    --text-title: #363f5f;
    --text-body: #969cb3;

    --shape: #ffffff;
  }

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
    background: var(--background);
    --webkit-font-smoothing: antialiased;
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
    background: var(--background);
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

  .react-modal-close {
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;
    border: 0;
    background: transparent;
    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.8)
    }
  }
`;