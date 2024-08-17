import { alpha, darken } from '@mui/material/styles';

// ----------------------------------------------------------------------

// SETUP COLORS

const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
};

const primary = '#345995';
const secondary = '#03CEA4';
const info = '#00B8D9';
const success = '#a7e92f';
const error = '#e13f61';
const warning = '#f9d22a';

const PRIMARY = {
  lighter: alpha(primary, 0.5),
  light: alpha(primary, 0.7),
  main: primary,
  dark: darken(primary, 0.3),
  darker: darken(primary, 0.5),
};

const SECONDARY = {
  lighter: alpha(secondary, 0.5),
  light: alpha(secondary, 0.7),
  main: secondary,
  dark: darken(secondary, 0.3),
  darker: darken(secondary, 0.5),
};

const INFO = {
  lighter: alpha(info, 0.5),
  light: alpha(info, 0.7),
  main: info,
  dark: darken(info, 0.3),
  darker: darken(info, 0.5),
  contrastText: '#FFFFFF',
};

const SUCCESS = {
  lighter: alpha(success, 0.5),
  light: alpha(success, 0.7),
  main: success,
  dark: darken(success, 0.3),
  darker: darken(success, 0.5),
  contrastText: '#ffffff',
};

const ERROR = {
  lighter: alpha(error, 0.5),
  light: alpha(error, 0.7),
  main: error,
  dark: darken(error, 0.3),
  darker: darken(error, 0.5),
  contrastText: GREY[800],
};

const WARNING = {
  lighter: alpha(warning, 0.5),
  light: alpha(warning, 0.7),
  main: warning,
  dark: darken(warning, 0.3),
  darker: darken(warning, 0.5),
  contrastText: '#FFFFFF',
};

const COMMON = {
  common: {
    black: '#000000',
    white: '#FFFFFF',
  },
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  grey: GREY,
  divider: alpha(GREY[500], 0.2),
  action: {
    hover: alpha(GREY[500], 0.08),
    selected: alpha(GREY[500], 0.16),
    disabled: alpha(GREY[500], 0.8),
    disabledBackground: alpha(GREY[500], 0.24),
    focus: alpha(GREY[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

export function palette() {
  const light = {
    ...COMMON,
    action: {
      ...COMMON.action,
      active: GREY[600],
    },
  };

  return light;
}
