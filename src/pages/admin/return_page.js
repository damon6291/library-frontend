import { Helmet } from 'react-helmet-async';
import BookReturnView from 'src/sections/admin/book/view/admin_book_return_view';

export default function ReturnPage() {
  return (
    <>
      <Helmet>
        <title>Return</title>
      </Helmet>
      <BookReturnView />
    </>
  );
}
