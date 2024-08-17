import { Suspense, lazy } from 'react';
import { Outlet } from 'react-router-dom';
import GuestGuard from 'src/layouts/guard/guest_guard';
import AuthLayout from 'src/layouts/auth/auth_layout';

const LoginPage = lazy(() => import('src/pages/auth/login_page'));
const RegisterPage = lazy(() => import('src/pages/auth/register_page'));

export const authRoutes = [
  {
    path: 'auth',
    element: (
      <GuestGuard>
        <Suspense>
          <AuthLayout>
            <Outlet />
          </AuthLayout>
        </Suspense>
      </GuestGuard>
    ),
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
    ],
  },
];
