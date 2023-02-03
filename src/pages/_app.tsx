import Head from "next/head";

import '@/styles/globals.css';
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme, { createEmotionCache } from "@/theme";

import type { AppProps } from 'next/app';

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

export default function App({ Component, pageProps, emotionCache = clientSideEmotionCache }: MyAppProps) {
  return (
      <>
        <CacheProvider value={emotionCache}>
          <Head>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
          </Head>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </CacheProvider>
      </>
  );
}
