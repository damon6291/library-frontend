import { Helmet } from 'react-helmet-async';
import AdminBookAddView from 'src/sections/admin/book/view/admin_book_add_view';

export default function BookAddPage() {
  return (
    <>
      <Helmet>
        <title>Book Add</title>
      </Helmet>
      <AdminBookAddView />
    </>
  );
}
