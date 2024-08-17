import { Helmet } from 'react-helmet-async';
import { useParams } from 'src/hooks/router/use_params';
import BookView from 'src/sections/book/view/book_view';

export default function BookPage() {
  const { id } = useParams();
  return (
    <>
      <Helmet>
        <title>Book</title>
      </Helmet>
      <BookView bookId={id} />
    </>
  );
}
