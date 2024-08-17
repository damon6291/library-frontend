import { Box, Typography } from '@mui/material';
import AccountPopover from './account_popover';
import { bgGradient } from 'src/theme/css';
import { useTheme } from '@emotion/react';
import { useRouter } from 'src/hooks/router/use_router';
import { PATHS } from 'src/routes/paths';

export default function CommonLayout({ children }) {
  const theme = useTheme();
  const router = useRouter();
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          padding: 2,
          ...bgGradient({
            type: 'ellipse',
            startColor: theme.palette.primary.lighter,
            endColor: theme.palette.secondary.lighter,
          }),
        }}
      >
        <div
          onClick={() => router.push(PATHS.common.search)}
          style={{ cursor: 'pointer' }}
        >
          <Typography>Library Logo</Typography>
        </div>

        <AccountPopover />
      </Box>
      <Box
        component={'main'}
        sx={{ p: 2 }}
      >
        {children}
      </Box>
    </>
  );
}
