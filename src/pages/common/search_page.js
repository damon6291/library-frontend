import { Helmet } from 'react-helmet-async';
import SerachView from 'src/sections/search/view/search_view';

export default function SearchPage() {
  return (
    <>
      <Helmet>
        <title>Search</title>
      </Helmet>
      <SerachView />
    </>
  );
}
