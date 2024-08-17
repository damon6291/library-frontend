import { Box, Button, Chip, Divider, Grid, Rating, Stack, Typography } from '@mui/material';
import { Fragment, useState } from 'react';
import { toast } from 'react-toastify';
import { rentBook, useGetBook, useGetBookReviews } from 'src/api/book_api';
import { ROLES } from 'src/api/common_code/roles';
import { useGetMe } from 'src/api/user_api';
import { confirmConfirm } from 'src/components/dialog/confirmation';
import Image from 'src/components/image/image';
import Loading from 'src/components/progress/loading';
import { fDate, fDateTime } from 'src/utils/format_time';

const BookView = ({ bookId }) => {
  const { searchResults: book, searchLoading } = useGetBook(bookId);
  const [reviewParams, setReviewParams] = useState({
    pageNumber: 1,
    pageSize: 1000,
  });
  const { searchResults: bookReviews } = useGetBookReviews(bookId, reviewParams);
  const { role } = useGetMe();
  const renderReview = (review) => {
    return (
      <Stack
        display="flex"
        direction={'row'}
        alignItems={'center'}
        spacing={2}
        sx={{ pb: 1, borderBottom: '1px solid grey' }}
      >
        <Stack>
          <Rating
            defaultValue={review.rating}
            value={review.rating}
            precision={0.1}
            disabled
            sx={{ py: 0.5, pr: 2 }}
          />
          <Typography
            variant="body_md"
            sx={{ pl: 0.5 }}
          >
            {fDateTime(review.createdDateTime)}
          </Typography>
        </Stack>
        <Typography>{review.review}</Typography>
      </Stack>
    );
  };
  if (searchLoading) {
    return <Loading />;
  }
  return (
    <Grid container>
      <Grid
        item
        xs={3}
        display={'flex'}
        justifyContent={'center'}
      >
        <Stack spacing={2}>
          <Image
            src={book.image}
            sx={{ width: 200, height: 200 }}
          />
          {book.isAvailable && role === ROLES.customer && (
            <Button
              variant={'contained'}
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
      </Grid>
      <Grid
        item
        xs={9}
      >
        <Stack spacing={1}>
          <Stack
            direction={'row'}
            display="flex"
            alignItems={'center'}
          >
            <Typography
              sx={{ pr: 2 }}
              variant="heading_lg"
            >
              {book.title}
            </Typography>
            <Chip label={book.category} />
          </Stack>

          <Typography variant="body_lg">by {book.author}</Typography>
          <Typography variant={'body_lg'}>
            Published by {book.publisher} in {fDate(book.publicationDate)}
          </Typography>
          <Stack
            direction={'row'}
            display="flex"
            alignItems={'center'}
          >
            <Rating
              defaultValue={book.rating}
              value={book.rating}
              precision={0.1}
              disabled
              sx={{ py: 0.5, pr: 2 }}
            />
            <Typography>{book.rating}</Typography>
          </Stack>
          <Typography variant="body_md">{book.description}</Typography>
          <Box height={'2rem'} />
          <Typography>Book Details</Typography>
          <Divider />
          <Typography variant={'body_md'}>Published by {book.publisher}</Typography>
          <Typography variant={'body_md'}>Published date {fDate(book.publicationDate)}</Typography>
          <Typography variant={'body_md'}>ISBN {book.isbn}</Typography>
          <Typography variant={'body_md'}>Page count {book.pageCount}</Typography>
          <Box height={'2rem'} />
          <Typography>Book Reviews</Typography>
          <Divider />
          {bookReviews.map((review, idx) => (
            <Fragment key={idx}>{renderReview(review)}</Fragment>
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default BookView;
