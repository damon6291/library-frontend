import React from 'react';
import { Box, Typography } from '@mui/material';
import NavSectionVertical from './vertical/nav_vertical';
import AccountPopover from '../common/account_popover';

export default function AdminLayout({ children }) {
  return (
    <Box
      sx={{
        minHeight: 1,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      <NavSectionVertical />
      <main style={{ width: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 2, px: 3 }}>
          <Typography>Library Logo</Typography>
          <AccountPopover />
        </Box>
        <Box sx={{ px: 3 }}>{children}</Box>
      </main>
    </Box>
  );
}
