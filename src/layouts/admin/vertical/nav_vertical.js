import { memo } from 'react';
import Stack from '@mui/material/Stack';
import NavList from './nav_list';
import { menu } from 'src/api/common_code/menu';
import { Box, useTheme } from '@mui/material';

function NavSectionVertical() {
  const theme = useTheme();
  const renderContent = menu.map((list, index) => (
    <NavList
      key={index}
      data={list}
      depth={0}
      hasChild={!!list.children}
    />
  ));

  return (
    <Box
      component="nav"
      sx={{
        bgcolor: theme.palette.primary.light,
      }}
    >
      <Stack
        justifyContent={'space-between'}
        display={'flex'}
        height={'100%'}
        sx={{ minHeight: '100vh' }}
      >
        <Stack
          display={'flex'}
          alignContent={'center'}
        >
          {renderContent}
        </Stack>
      </Stack>
    </Box>
  );
}

export default memo(NavSectionVertical);
