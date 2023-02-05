import { Oswald, VT323, Black_Ops_One } from "@next/font/google";

import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

import createCache from "@emotion/cache";

declare module '@mui/material/styles' {
  interface TypographyVariants {
    pokemonID: React.CSSProperties;
    pokemonName: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    pokemonID?: React.CSSProperties;
    pokemonName?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    pokemonID: true;
    pokemonName: true;
  }
}

const oswald = Oswald({
  weight: "500"
});

const _VT323 = VT323({
  weight: "400",
});

const blackOpsOne = Black_Ops_One({
  weight: "400",
});

// Create a theme instance.
const theme = createTheme({
  typography: {
    pokemonName: {
      fontSize: "16px",
      textTransform: "uppercase",
      fontFamily: blackOpsOne.style.fontFamily,
      fontWeight: "bold"
    },
    pokemonID: {
      fontSize: "20px",
      fontFamily: oswald.style.fontFamily,
      fontWeight: 500
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