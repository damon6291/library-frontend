import { Box, ListItemButton, Typography, useTheme } from '@mui/material';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import Link from 'src/components/link/link';
import { useHover } from 'src/hooks/use_hover';
import { isEmpty } from 'lodash';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Loading from 'src/components/progress/loading';
import { useGetMe } from 'src/api/user_api';

// ----------------------------------------------------------------------

export default function NavItem({ item, open, depth, active, onClick, ...other }) {
  const { name, path, selectedIcon, defaultIcon, children, permission } = item;
  const { role, searchLoading } = useGetMe();
  const [ref, isHover] = useHover();
  const theme = useTheme();
  const subItem = depth !== 0;
  const renderContent = (
    <ListItemButton
      ref={ref}
      disableGutters
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={() => {
        onClick();
      }}
      {...other}
    >
      <Box
        display="flex"
        justifyContent={'space-between'}
        alignContent={'center'}
        width={'100%'}
        mx={3}
        height={'1.5rem'}
        sx={{ borderRadius: 2, py: 2, px: 3, bgcolor: active ? theme.palette.primary.dark : null }}
      >
        <Box
          display="flex"
          alignItems={'center'}
        >
          {defaultIcon && !subItem && active ? selectedIcon : defaultIcon}

          {subItem && (
            <Box sx={{ width: '20px', pl: 1 }}>
              <SubdirectoryArrowRightIcon
                sx={{
                  fontSize: '1rem',
                  display: active ? 'box' : isHover ? 'box' : 'none',
                }}
              />
            </Box>
          )}
          <Typography
            sx={{
              ml: 1,
            }}
            variant={active && !children ? 'body_md_semibold' : 'body_md'}
            color={!active && subItem ? theme.palette.common.white : theme.palette.common.white}
          >
            {name}
          </Typography>
        </Box>
        {!isEmpty(children) && (
          <Box
            display={'flex'}
            flexDirection={'row'}
            justifyContent={'flex-end'}
          >
            {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
          </Box>
        )}
      </Box>
    </ListItemButton>
  );

  if (searchLoading) {
    return <Loading />;
  }

  if (!isEmpty(role) && !permission.includes(role)) {
    return null;
  }

  // Has child
  if (!isEmpty(children)) {
    return renderContent;
  }

  // Default
  return <Link href={path}>{renderContent}</Link>;
}
