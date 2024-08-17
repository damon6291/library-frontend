import { Button, Paper, Rating, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { returnBook } from 'src/api/book_api';
import { confirmConfirm } from 'src/components/dialog/confirmation';
import Image from 'src/components/image/image';
import Search from 'src/sections/search/search';
import { fDate } from 'src/utils/format_time';
import { isEmpty } from 'src/utils/type_check';

const BookReturnView = () => {
  const [book, setBook] = useState({});
  return (
    <Stack
      display={'flex'}
      justifyContent={'center'}
      alignItems="center"
      width={'100%'}
      spacing={3}
    >
      <Search
        initialParams={{
          pageNumber: 1,
          pageSize: 5,
          title: '',
          availability: false,
        }}
        searchName="Title"
        onClick={(book) => setBook(book)}
      />
      {!isEmpty(book) && (
        <Paper sx={{ width: '50%' }}>
          <Stack
            direction={'row'}
            display="flex"
            alignItems={'center'}
          >
            <div style={{ paddingRight: 2 }}>
              <Image
                src={book.image}
                sx={{ width: 100, height: 100 }}
              />
            </div>
            <Stack
              display="flex"
              textAlign={'left'}
            >
              <Typography variant={'heading_sm'}>{book.title}</Typography>

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
            {!book.isAvailable && (
              <Button
                variant={'contained'}
                sx={{ ml: 'auto', mr: 2 }}
                onClick={async () => {
                  var confirm = await confirmConfirm();
                  if (confirm) {
                    var res = await returnBook(book.bookId);
                    if (res.isSuccess) {
                      toast.success('Success');
                      setBook({});
                    } else {
                      toast.error('Error');
                    }
                  }
                }}
              >
                Return
              </Button>
            )}
          </Stack>
        </Paper>
      )}
    </Stack>
  );
};

export default BookReturnView;
