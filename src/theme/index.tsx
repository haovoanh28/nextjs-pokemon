import { Electrolize } from "@next/font/google";

import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

import createCache from "@emotion/cache";

declare module '@mui/material/styles' {
  interface TypographyVariants {
    pokemonName: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    pokemonName?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    pokemonName: true;
  }
}

const electrolize = Electrolize({
  weight: "400",
  subsets: ['latin'],
  preload: false
});

// Create a theme instance.
const theme = createTheme({
  typography: {
    pokemonName: {
      fontSize: "20px",
      textTransform: "uppercase"
    }
  },
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
});

export function createEmotionCache() {
  return createCache({ key: 'css', prepend: true });
}

export default theme;