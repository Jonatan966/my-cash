import styled from "styled-components";

export const Header = styled.header`
  background: ${props => props.theme.colors.primaryLight};

  min-height: 65vh;
  padding: 2rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;

  color: #fff;
  text-align: center;

  h1, > span {
    max-width: 25rem;
  }

  svg {
    zoom: 1.25;
    margin-top: auto;
  }

  span {
    margin-top: auto;
    margin-bottom: 2rem;
  }
`

export const ActionsContainer = styled.main`
  background: ${props => props.theme.colors.green};
  min-height: 35vh;

  position: relative;

  button {
    height: 3.5rem;

    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    font-size: 14px;

    flex-direction: row;

    svg {
      width: 2rem;
      margin: 0.75rem;
      position: relative;
    }

    span {
      flex: 1;
    }

    hr {
      border: 1px solid ${props => props.theme.colors.inputBorder};
      height: 100%;
    }
  }

  .actions {
    position: absolute;
    top: -1.75rem;
    left: 0;
    width: 100%;

    padding: 0 2rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;

    > * {
      width: 100%;
      max-width: 1120px;
    }
  }

  .separator {
    position: relative;
    text-align: center;

    border: 0;
    border-top: 2px solid ${props => props.theme.colors.text};
    
    height: 1px;
    padding: 0;
    margin: 0.75rem 0;
    overflow: visible;

    color: ${props => props.theme.colors.text};
    font-size: 1.4em;
    font-weight: bolder;

    &::after {
      content: attr(data-content);

      display: inline-block;
      position: relative;
      transform: translateY(-50%);
      padding: 0 0.3em;
      
      background: ${props => props.theme.colors.green};
    }
  }

  .without-login-btn {
    background: ${props => props.theme.colors.text};
    color: ${props => props.theme.colors.background};
  }
`
