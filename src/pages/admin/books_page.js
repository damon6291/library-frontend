import { Helmet } from 'react-helmet-async';
import AdminBooksView from 'src/sections/admin/book/view/admin_book_view';

export default function BooksPage() {
  return (
    <>
      <Helmet>
        <title>Books</title>
      </Helmet>
      <AdminBooksView />
    </>
  );
}
