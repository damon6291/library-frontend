import { Suspense, lazy } from 'react';
import { Outlet } from 'react-router-dom';
import CommonLayout from 'src/layouts/common/common_layout';
import AuthGuard from 'src/layouts/guard/auth_guard';

const SearchPage = lazy(() => import('src/pages/common/search_page'));
const BookPage = lazy(() => import('src/pages/common/book_page'));
const BooksPage = lazy(() => import('src/pages/common/books_page'));
const UserBooksPage = lazy(() => import('src/pages/common/user_book_page'));

export const commonRoutes = [
  {
    path: 'common',
    element: (
      <AuthGuard>
        <Suspense>
          <CommonLayout>
            <Outlet />
          </CommonLayout>
        </Suspense>
      </AuthGuard>
    ),
    children: [
      {
        path: 'search',
        element: <SearchPage />,
      },
      {
        path: 'book/:id',
        element: <BookPage />,
      },
      {
        path: 'books',
        element: <BooksPage />,
      },
      {
        path: 'borrowed-books',
        element: <UserBooksPage />,
      },
    ],
  },
];
