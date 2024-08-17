import React from 'react';
import Search from '../search';
import { Box } from '@mui/material';

const SearchView = () => {
  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      alignItems="center"
      width={'100%'}
      height={'50vh'}
    >
      <Search
        initialParams={{
          pageNumber: 1,
          pageSize: 5,
          orderColumn: '',
          isAscending: true,
          title: '',
          author: '',
          availability: null,
        }}
        searchName="Title"
        showFilter
      />
    </Box>
  );
};

export default SearchView;
