import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Rating,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { rentBook, useGetBooks } from 'src/api/book_api';
import Image from 'src/components/image/image';
import { useRouter } from 'src/hooks/router/use_router';
import { useDebounce } from 'src/hooks/use_debounce';
import { PATHS } from 'src/routes/paths';
import { fDate } from 'src/utils/format_time';
import { cleanParams } from 'src/utils/url';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useGetMe } from 'src/api/user_api';
import { ROLES } from 'src/api/common_code/roles';
import { confirmConfirm } from 'src/components/dialog/confirmation';
import { toast } from 'react-toastify';

const BooksView = ({ initialQuery }) => {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const debounceQuery = useDebounce(query);
  const [author, setAuthor] = useState('');
  const debounceAuthor = useDebounce(author);
  const [available, setAvailable] = useState('all');
  const [orderColumn, setOrderColumn] = useState('');
  const [orderDirection, setOrderDirection] = useState(null);
  const { role } = useGetMe();
  const [params, setParams] = useState({
    pageNumber: 1,
    pageSize: 20,
    orderColumn: orderColumn,
    isAscending: orderDirection === null ? true : orderDirection,
    title: debounceQuery,
    author: debounceAuthor,
    availability: available === 'all' ? null : available,
  });

  useEffect(() => {
    setParams((prev) => ({
      ...prev,
      title: debounceQuery,
      author: debounceAuthor,
      availability: available === 'all' ? null : available,
      orderColumn: orderColumn,
      isAscending: orderDirection === null ? true : orderDirection,
    }));
  }, [debounceQuery, debounceAuthor, available, orderColumn, orderDirection]);

  const { searchResults } = useGetBooks(cleanParams(params));

  const handleClick = (bookId) => {
    router.push(PATHS.common.book(bookId));
  };

  const renderBook = (book) => {
    return (
      <Paper sx={{ width: '50%' }}>
        <Stack
          direction={'row'}
          display="flex"
          alignItems={'center'}
        >
          <div
            onClick={() => handleClick(book.bookId)}
            style={{ paddingRight: 2, cursor: 'pointer' }}
          >
            <Image
              src={book.image}
              sx={{ width: 100, height: 100 }}
            />
          </div>
          <Stack
            display="flex"
            textAlign={'left'}
          >
            <div
              onClick={() => handleClick(book.bookId)}
              style={{ cursor: 'pointer' }}
            >
              <Typography variant={'heading_sm'}>{book.title}</Typography>
            </div>

            <Typography variant={'body_lg'}>by {book.author}</Typography>

            <Typography variant={'body_md'}>Published in {fDate(book.publicationDate)}</Typography>
            <Rating
              defaultValue={book.rating}
              value={book.rating}
              precision={0.1}
              disabled
              sx={{ py: 0.5 }}
            />
          </Stack>
          {book.isAvailable && role === ROLES.customer && (
            <Button
              variant={'contained'}
              sx={{ ml: 'auto', mr: 2 }}
              onClick={async () => {
                var confirm = await confirmConfirm();
                if (confirm) {
                  var res = await rentBook(book.bookId);
                  if (res.isSuccess) {
                    toast.success('Success');
                  } else {
                    toast.error('Error');
                  }
                }
              }}
            >
              Borrow
            </Button>
          )}
        </Stack>
      </Paper>
    );
  };
  const renderBooks = searchResults.map((book, idx) => <Fragment key={idx}>{renderBook(book)}</Fragment>);

  const renderFilters = (
    <Stack
      direction={'row'}
      spacing={1}
    >
      <TextField
        label="Author"
        size="small"
        onChange={(e) => setAuthor(e.target.value)}
      />
      <FormControl
        sx={{ minWidth: 222.4 }}
        size="small"
      >
        <InputLabel id="avail_label">Availability</InputLabel>
        <Select
          labelId="avail_label"
          label="Availability"
          size="small"
          value={available}
          onChange={(event) => setAvailable(event.target.value)}
        >
          <MenuItem value={'all'}>All</MenuItem>
          <MenuItem value={true}>True</MenuItem>
          <MenuItem value={false}>False</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        sx={{ minWidth: 222.4 }}
        size="small"
      >
        <InputLabel id="orderby_label">Order by</InputLabel>
        <Select
          labelId="orderby_label"
          label="Order By"
          size="small"
          value={orderColumn}
          onChange={(event) => setOrderColumn(event.target.value)}
        >
          <MenuItem value={'Title'}>Title</MenuItem>
          <MenuItem value={'Author'}>Author</MenuItem>
          <MenuItem value={'PublicationDate'}>Publised Date</MenuItem>
          <MenuItem value={'IsAvailable'}>Availability</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        sx={{ minWidth: 222.4 }}
        size="small"
      >
        <InputLabel id="order_label">Order Direction</InputLabel>
        <Select
          labelId="order_label"
          label="Order Direction"
          size="small"
          value={orderDirection == null ? true : orderDirection}
          onChange={(event) => setOrderDirection(event.target.value)}
        >
          <MenuItem value={true}>Ascending</MenuItem>
          <MenuItem value={false}>Descending</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );

  return (
    <Stack
      display={'flex'}
      justifyContent={'center'}
      alignItems="center"
      width={'100%'}
      spacing={2}
    >
      <TextField
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Searching book..."
        sx={{ width: '600px', pr: 2 }}
        InputProps={{
          endAdornment: <SearchOutlinedIcon />,
        }}
      />

      {renderFilters}

      {renderBooks}
    </Stack>
  );
};

export default BooksView;
