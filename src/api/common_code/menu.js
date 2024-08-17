import { PATHS } from 'src/routes/paths';
import { ROLES } from './roles';
import BookIcon from '@mui/icons-material/Book';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import BookmarkAddedOutlinedIcon from '@mui/icons-material/BookmarkAddedOutlined';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';

export const menu = [
  {
    name: 'Books',
    selectedIcon: <BookOutlinedIcon sx={{ color: 'white' }} />,
    defaultIcon: <BookIcon sx={{ color: 'white' }} />,
    path: PATHS.admin.book_table,
    permission: [ROLES.librarian],
    children: [],
  },
  {
    name: 'Return',
    selectedIcon: <BookmarkAddedOutlinedIcon sx={{ color: 'white' }} />,
    defaultIcon: <BookmarkAddedIcon sx={{ color: 'white' }} />,
    path: PATHS.admin.return,
    permission: [ROLES.librarian],
    children: [],
  },
];
