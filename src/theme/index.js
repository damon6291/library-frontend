import { useMemo } from 'react';
// @mui
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

// system
import { palette } from './palette';
import { typography } from './typography';
import { componentsOverrides } from './overrides';
import { merge } from 'lodash';

// ----------------------------------------------------------------------

export default function ThemeProvider({ children }) {
  const baseOption = useMemo(
    () => ({
      palette: palette('light'),
      typography,
    }),
    [],
  );

  const memoizedValue = useMemo(() => baseOption, [baseOption]);

  const theme = createTheme(memoizedValue);

  theme.components = merge(componentsOverrides(theme));

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
