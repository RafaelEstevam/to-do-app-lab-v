import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

  *{
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
  }

  html{
    font-size: 100%;
  }

  body{
    // font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    
  }

  ::-webkit-scrollbar-track {
    background-color: #f5f5f5;
  }
  ::-webkit-scrollbar {
    width: 5px;
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #aaa;
    border: 2px solid transparent;
  }

`;