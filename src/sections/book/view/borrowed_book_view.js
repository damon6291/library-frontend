import { Button, Paper, Rating, Stack, Typography } from '@mui/material';
import { Fragment, useState } from 'react';
import { useGetBorrowedBooks } from 'src/api/book_api';
import Image from 'src/components/image/image';
import { useRouter } from 'src/hooks/router/use_router';
import { PATHS } from 'src/routes/paths';
import { fDate } from 'src/utils/format_time';
import { cleanParams } from 'src/utils/url';
import { isEmpty } from 'src/utils/type_check';
import { reviewConfirm } from '../review_modal';
import Loading from 'src/components/progress/loading';

const BorrowedBooksView = () => {
  const router = useRouter();
  const [params, setParams] = useState({
    pageNumber: 1,
    pageSize: 20,
  });

  const { searchResults, searchLoading } = useGetBorrowedBooks(cleanParams(params));

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

            <Typography variant={'body_md'}>Return by {fDate(book.expectedReturnDate)}</Typography>
            <Rating
              defaultValue={book.rating}
              value={book.rating}
              precision={0.1}
              disabled
              sx={{ py: 0.5 }}
            />
          </Stack>
          {!book.isReviewed && (
            <Button
              variant={'contained'}
              sx={{ ml: 'auto', mr: 2 }}
              onClick={async () => {
                await reviewConfirm({ userBookId: book.userBookId });
              }}
            >
              Write Review
            </Button>
          )}
        </Stack>
      </Paper>
    );
  };
  const renderBooks = searchResults.map((book, idx) => <Fragment key={idx}>{renderBook(book)}</Fragment>);

  if (searchLoading) {
    return <Loading />;
  }

  if (!searchLoading && isEmpty(searchResults)) {
    return <Typography textAlign={'center'}>You don't have any rented books</Typography>;
  }
  return (
    <Stack
      display={'flex'}
      justifyContent={'center'}
      alignItems="center"
      width={'100%'}
      spacing={2}
    >
      {renderBooks}
    </Stack>
  );
};

export default BorrowedBooksView;
