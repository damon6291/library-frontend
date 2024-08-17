import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { PATHS } from 'src/routes/paths';
import { deleteToken } from 'src/utils/token';
import { Popover, Typography } from '@mui/material';
import Loading from 'src/components/progress/loading';
import { useRouter } from 'src/hooks/router/use_router';
import usePopover from 'src/hooks/use_popover';
import { useGetMe } from 'src/api/user_api';
import { ROLES } from 'src/api/common_code/roles';
import { isEmpty } from 'src/utils/type_check';

// ----------------------------------------------------------------------

const OPTIONS = [
  {
    label: 'Search',
    linkTo: PATHS.common.search,
  },
  {
    label: 'My Books',
    role: ROLES.customer,
    linkTo: PATHS.common.userBook,
  },
  {
    label: 'Dashboard',
    role: ROLES.librarian,
    linkTo: PATHS.admin.book_table,
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover({ sx }) {
  const router = useRouter();
  const { searchResult, searchLoading, role } = useGetMe();

  const popover = usePopover();

  const handleLogout = async () => {
    try {
      deleteToken();
      popover.onClose();
    } catch (error) {}
  };

  const handleClickItem = (path) => {
    popover.onClose();
    router.push(path);
  };

  if (searchLoading) {
    return <Loading />;
  }

  return (
    <>
      <IconButton
        onClick={popover.onOpen}
        sx={{
          width: 40,
          height: 40,
          ...sx,
        }}
      >
        <Avatar
          src={'test'}
          alt={searchResult?.firstName}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.primary.main}`,
          }}
        />
      </IconButton>

      <Popover
        open={Boolean(popover.open)}
        onClose={popover.onClose}
        anchorEl={popover.open}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ width: 200, p: 0, ml: 1 }}
      >
        <Stack sx={{ p: 2, pb: 1.5 }}>
          <Typography
            variant="body_sm"
            noWrap
          >
            {searchResult?.firstName}
          </Typography>

          <Typography
            variant="body_sm"
            sx={{ color: 'text.secondary' }}
            noWrap
          >
            {searchResult?.email}
          </Typography>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {OPTIONS.filter((x) => isEmpty(x.role) || x.role === role).map((option) => (
            <MenuItem
              key={option.label}
              onClick={() => handleClickItem(option.linkTo)}
            >
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          onClick={handleLogout}
          sx={{ m: 1, fontWeight: 'fontWeightBold', color: 'error.main' }}
        >
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
