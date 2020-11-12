import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    color: black;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  body {
    width: 100vw;
    height: 100vh;
    background: linear-gradient(135deg, rgba(143,84,224,1) 0%, rgba(254,151,106,1) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
  }

 
`;
