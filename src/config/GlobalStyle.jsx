import { Global, css } from '@emotion/react';
import React from 'react';

export const GlobalStyle = () => (
  <Global
    styles={css`
      :root {
        font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
        line-height: 1.5;
        font-weight: 400;
        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        -webkit-text-size-adjust: 100%;
      }

      body {
        margin: 0;
      }

      a {
        font-weight: 500;
        color: #646cff;
        text-decoration: inherit;
      }
      a:hover {
        color: #535bf2;
      }

      img {
        width: 100%;
        max-width: 100%;
      }
    `}
  />
);