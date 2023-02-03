import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

import createCache from "@emotion/cache";

// Create a theme instance.
const theme = createTheme({
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
  return createCache({ key: 'css' });
}

export default theme;