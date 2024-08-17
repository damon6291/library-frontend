import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useGetBooks } from 'src/api/book_api';
import { useRouter } from 'src/hooks/router/use_router';
import { useDebounce } from 'src/hooks/use_debounce';
import { PATHS } from 'src/routes/paths';
import { capitalize } from 'src/utils/change_case';
import { fDate } from 'src/utils/format_time';
import { isEmpty } from 'src/utils/type_check';
import { cleanParams } from 'src/utils/url';

const columns = [
  { field: 'title', headerName: 'Title', flex: 1 },
  { field: 'author', headerName: 'Author', flex: 1 },
  { field: 'category', headerName: 'Category', flex: 1 },
  {
    field: 'publicationDate',
    headerName: 'Published Date',
    flex: 1,
    valueGetter: (value, row) => fDate(row.publicationDate),
  },
  {
    field: 'isbn',
    headerName: 'ISBN',
    flex: 1,
  },
  {
    field: 'isAvailable',
    headerName: 'Availability',
    flex: 1,
    valueGetter: (value, row) => (row.isAvailable ? 'Yes' : 'No'),
  },
];

const AdminBooksView = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const debounceTitle = useDebounce(title);
  const debounceAuthor = useDebounce(author);
  const router = useRouter();
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  const [params, setParams] = useState({
    pageNumber: 1,
    pageSize: 10,
    orderColumn: '',
    isAscending: true,
    title: '',
    author: '',
    availability: null,
  });

  useEffect(() => {
    setParams((prev) => ({
      ...prev,
      title: debounceTitle,
      author: debounceAuthor,
    }));
  }, [debounceTitle, debounceAuthor]);

  const { searchResults, searchCount, searchLoading } = useGetBooks(cleanParams(params));
  const handleRowClick = (params) => {
    router.push(PATHS.admin.book_edit(params.id));
  };
  return (
    <Box sx={{ maxWidth: '99%', width: '99%', pb: 5, px: 1 }}>
      <Stack
        direction={'row'}
        spacing={1}
        sx={{ pb: 1, width: '100%' }}
      >
        <TextField
          label="Title"
          size="small"
          onChange={(e) => setTitle(e.target.value)}
        />
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
            value={isEmpty(params.availability) ? 'all' : params.availability}
            onChange={(e) =>
              setParams((prev) => ({ ...prev, availability: e.target.value === 'all' ? null : e.target.value }))
            }
          >
            <MenuItem value={'all'}>All</MenuItem>
            <MenuItem value={true}>True</MenuItem>
            <MenuItem value={false}>False</MenuItem>
          </Select>
        </FormControl>
        <Box
          display="flex"
          flexDirection={'row-reverse'}
          width={'100%'}
        >
          <Button
            onClick={() => router.push(PATHS.admin.book_add)}
            variant={'contained'}
          >
            Add Book
          </Button>
        </Box>
      </Stack>

      <DataGrid
        loading={searchLoading}
        rows={searchResults}
        columns={columns}
        onRowClick={handleRowClick}
        disableColumnMenu
        getRowId={(a) => a.bookId}
        rowCount={searchCount}
        paginationMode="server"
        onSortModelChange={(m, d) => {
          if (isEmpty(m)) return;
          setParams((prev) => ({ ...prev, orderColumn: capitalize(m[0].field), isAscending: m[0].sort === 'asc' }));
        }}
        paginationModel={paginationModel}
        pageSizeOptions={[10, 20]}
        onPaginationModelChange={(m, d) => {
          if (m.page === 0 && paginationModel.page > 1) return;
          setParams((prev) => ({ ...prev, pageNumber: m.page + 1, pageSize: m.pageSize }));
          setPaginationModel({
            pageSize: m.pageSize,
            page: m.page,
          });
        }}
      />
    </Box>
  );
};

export default AdminBooksView;
