import Head from "next/head";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "react-query";

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
const queryClient = new QueryClient();

export default function App({ Component, pageProps, emotionCache = clientSideEmotionCache }: MyAppProps) {
  const router = useRouter();

  return (
      <QueryClientProvider client={queryClient}>
        <CacheProvider value={emotionCache}>
          <Head>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
          </Head>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} key={router.asPath} />
          </ThemeProvider>
        </CacheProvider>
      </QueryClientProvider>
  );
}
