import emotionReset from 'emotion-reset';
import { Global, css } from '@emotion/react';

export const GlobalStyles = (
  <Global
    styles={css`
      ${emotionReset}
      html {
        font-size: 10px;
      }
      body {
        margin: 0 auto;
        width: 100%;
        min-height: 100%;
      }
      html,
      body {
        height: 100vh;
        width: 100%;
      }
      #__next {
        height: 100%;
      }
    `}
  />
);
