'use client';
import { createContext, useContext } from 'react';

export const defaultProps: any = {};

const MusicContext = createContext({
  ...defaultProps,
  changeBackground: () => {},
});

const useMusic = () => {
  const canvas = useContext(MusicContext);
  return canvas;
};

export { MusicContext, useMusic };
