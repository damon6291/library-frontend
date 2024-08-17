import { linearProgressClasses } from '@mui/material';

const COLORS = ['primary', 'secondary', 'info', 'success', 'warning', 'error'];

// ----------------------------------------------------------------------

export default function Progress(theme) {
  const rootStyles = (ownerState) => {
    const defaultStyle = {
      height: '16px',
      borderRadius: '0.25rem',
      backgroundColor: '#E3E3E3',
    };

    const colorStyle = COLORS.map((color) => ({
      ...(ownerState.color === color && {
        [`& .${linearProgressClasses.bar}`]: {
          backgroundColor: theme.palette[color].main,
        },
      }),
    }));

    return [defaultStyle, ...colorStyle];
  };

  return {
    MuiLinearProgress: {
      styleOverrides: {
        root: ({ ownerState }) => rootStyles(ownerState),
      },
    },
  };
}
