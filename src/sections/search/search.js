import React, { useEffect, useState } from 'react';
import { Typography, TextField, Stack, useTheme, IconButton } from '@mui/material';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import { PATHS } from 'src/routes/paths';
import { useRouter } from 'src/hooks/router/use_router';
import { useDebounce } from 'src/hooks/use_debounce';
import { useGetBooks } from 'src/api/book_api';
import { cleanParams, getURL } from 'src/utils/url';
import Image from 'src/components/image/image';
import SearchNotFound from './serach_not_found';
import FilterListIcon from '@mui/icons-material/FilterList';

const Search = ({ initialParams, searchName, onClick, showFilter = false }) => {
  const theme = useTheme();
  const [query, setQuery] = useState();
  const [index, setIndex] = useState(0);
  const debounceQuery = useDebounce(query);
  const [params, setParams] = useState(initialParams);

  useEffect(() => {
    setParams((prev) => ({ ...prev, [searchName]: debounceQuery }));
    setIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceQuery]);

  const { searchResults, searchLoading } = useGetBooks(cleanParams(params));

  const onSearch = (val) => {
    setQuery(val);
  };

  const router = useRouter();

  const handleClick = (id) => {
    if (onClick) {
      const selectItem = searchResults.find((x) => x.bookId === id);
      onClick(selectItem);
    } else {
      router.push(PATHS.common.book(id));
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      if (index === 0 && onClick) return;
      if (index === 0) router.push(getURL(PATHS.common.books, { query }));
      else {
        const selectItem = searchResults[index - 1];
        handleClick(selectItem.bookId);
      }
    }

    if (event.key === 'ArrowUp') {
      setIndex((prev) => (prev === 0 ? prev : prev - 1));
    }
    if (event.key === 'ArrowDown') {
      setIndex((prev) => (prev === 5 ? 0 : prev + 1));
    }
  };

  return (
    <>
      <Autocomplete
        sx={{
          width: 600,
        }}
        loading={searchLoading}
        autoHighlight
        clearOnBlur={false}
        popupIcon={null}
        options={searchResults}
        getOptionLabel={(option) => option.title || ''}
        filterOptions={(x) => x}
        onInputChange={(event, newValue) => onSearch(newValue)}
        noOptionsText={
          <SearchNotFound
            query={debounceQuery}
            sx={{ bgcolor: 'unset' }}
          />
        }
        isOptionEqualToValue={(option, value) => option.bookId === value.bookId}
        slotProps={{
          popper: {
            placement: 'bottom-start',
            sx: {
              minWidth: 500,
            },
          },
          paper: {
            sx: {
              [` .${autocompleteClasses.option}`]: {
                pl: 0.75,
              },
            },
          },
        }}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              placeholder="Searching book..."
              onKeyUp={handleKeyUp}
              InputProps={{
                ...params.InputProps,
              }}
            />
          );
        }}
        renderOption={(props, book) => {
          var idx = props['data-option-index'] + 1;
          if (!onClick) props = null;
          return (
            <div
              {...props}
              key={book.bookId}
              onClick={() => handleClick(book.bookId)}
            >
              <Stack
                {...props}
                key={book.bookId}
                direction={'row'}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  background: idx === index ? theme.palette.grey[400] : '',
                  p: 1,
                  cursor: 'pointer',
                }}
              >
                <Image src={book.image} />

                <Typography sx={{ pl: 1 }}>{book.title}</Typography>
              </Stack>
            </div>
          );
        }}
      />
      {showFilter && (
        <IconButton onClick={() => router.push(PATHS.common.books)}>
          <FilterListIcon />
        </IconButton>
      )}
    </>
  );
};

export default Search;
