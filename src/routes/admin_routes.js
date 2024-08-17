import { Suspense, lazy } from 'react';
import { Outlet } from 'react-router-dom';
import { ROLES } from 'src/api/common_code/roles';
import AdminLayout from 'src/layouts/admin/admin_layout';
import RoleGuard from 'src/layouts/guard/role_guard';

const BooksPage = lazy(() => import('src/pages/admin/books_page'));
const BookAddPage = lazy(() => import('src/pages/admin/book_add_page'));
const BookEditPage = lazy(() => import('src/pages/admin/book_edit_page'));
const ReturnPage = lazy(() => import('src/pages/admin/return_page'));

export const adminRoutes = [
  {
    path: 'admin',
    element: (
      <RoleGuard allowedRole={[ROLES.librarian]}>
        <Suspense>
          <AdminLayout>
            <Outlet />
          </AdminLayout>
        </Suspense>
      </RoleGuard>
    ),
    children: [
      {
        path: 'books',
        children: [
          { element: <BooksPage />, index: true },
          { path: 'new', element: <BookAddPage /> },
          { path: 'edit/:id', element: <BookEditPage /> },
        ],
      },
      { path: 'return', element: <ReturnPage /> },
    ],
  },
];
