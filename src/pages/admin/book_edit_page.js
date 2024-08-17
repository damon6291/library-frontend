import { Helmet } from 'react-helmet-async';
import { useGetBook } from 'src/api/book_api';
import { useParams } from 'src/hooks/router/use_params';
import AdminBookEditView from 'src/sections/admin/book/view/admin_book_edit_view';

export default function BookEditPage() {
  const { id } = useParams();
  const { searchResults } = useGetBook(id);
  return (
    <>
      <Helmet>
        <title>Book Edit</title>
      </Helmet>
      <AdminBookEditView currentData={searchResults} />
    </>
  );
}
