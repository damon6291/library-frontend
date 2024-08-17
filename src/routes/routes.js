import { Navigate, useRoutes } from 'react-router-dom';
import { PATHS } from './paths';
import { authRoutes } from './auth_routes';
import { commonRoutes } from './common_routes';
import { adminRoutes } from './admin_routes';

export default function Router() {
  return useRoutes([
    {
      path: PATHS.home,
      element: (
        <Navigate
          to={PATHS.auth.login}
          replace
        />
      ),
    },

    ...authRoutes,
    ...commonRoutes,
    ...adminRoutes,

    {
      path: '*',
      element: (
        <Navigate
          to={PATHS.home}
          replace
        />
      ),
    },
  ]);
}
