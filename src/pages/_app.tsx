import '@/styles/globals.css';
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import theme from "@/theme";

import type { AppProps } from 'next/app';


function createEmotionCache() {
  return createCache({ key: 'css' });
}

const cache = createEmotionCache();

export default function App({ Component, pageProps }: AppProps) {
  return (
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
        </ThemeProvider>
        <CssBaseline />
        <Component {...pageProps} />
      </CacheProvider>

  );
}
