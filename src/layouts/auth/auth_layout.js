import { Box, Stack, useTheme } from '@mui/material';
import { bgGradient } from 'src/theme/css';

export default function AuthLayout({ children }) {
  const theme = useTheme();
  return (
    <Stack
      component="main"
      direction="row"
      sx={{
        minHeight: '100vh',
      }}
    >
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        width={'100%'}
        sx={{
          ...bgGradient({
            type: 'ellipse',
            startColor: theme.palette.primary.lighter,
            endColor: theme.palette.secondary.lighter,
          }),
        }}
      >
        <Box
          sx={{
            bgcolor: theme.palette.common.white,
            p: '3rem',
            borderRadius: '1rem',
            width: '40rem',
          }}
        >
          {children}
        </Box>
      </Box>
    </Stack>
  );
}
