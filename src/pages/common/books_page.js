import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'src/hooks/router/use_search_params';
import BooksView from 'src/sections/book/view/books_view';

export default function BooksPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  return (
    <>
      <Helmet>
        <title>Books</title>
      </Helmet>
      <BooksView initialQuery={query} />
    </>
  );
}
