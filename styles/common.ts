import { css } from '@emotion/react';

export const Common = {
  colors: {
    black: '#282828',
    white: '#ffffff',
    lightBlack: '#404040',
    blue: '',
    blue01: '',
    gray: '#8C8C8C',
  },
  fontSize: {
    logo: '',
    title: '',
    fs22: '2.2rem',
    fs20: '2rem',
    fs18: '1.8rem',
    fs16: '1.6rem',
    fs14: '1.4rem',
  },
  maxWidth: '45rem',
};

export const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const button = css`
  width: 100%;
  font-size: 1.8rem;
  color: white;
  background-color: ${Common.colors.black};
  border: 0;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-top: 2rem;
  cursor: pointer;
`;
