import { Helmet } from 'react-helmet-async';
import BorrowedBooksView from 'src/sections/book/view/borrowed_book_view';

export default function UserBooksPage() {
  return (
    <>
      <Helmet>
        <title>User Books</title>
      </Helmet>
      <BorrowedBooksView />
    </>
  );
}
