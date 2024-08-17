import { useCallback, useEffect } from 'react';
import { ROLES } from 'src/api/common_code/roles';
import { useGetMe } from 'src/api/user_api';
import Loading from 'src/components/progress/loading';
import { useRouter } from 'src/hooks/router/use_router';
import { useSearchParams } from 'src/hooks/router/use_search_params';
import { PATHS } from 'src/routes/paths';
import { isEmpty } from 'src/utils/type_check';

export default function GuestGuard({ children }) {
  const router = useRouter();

  const { searchResult, searchLoading, role } = useGetMe();

  const searchParams = useSearchParams();

  const roleReturn =
    role === ROLES.customer
      ? PATHS.common.search
      : role === ROLES.librarian
      ? PATHS.admin.book_table
      : PATHS.common.searchResult;

  const returnTo = searchParams.get('returnTo') ?? roleReturn;

  const check = useCallback(() => {
    if (!isEmpty(searchResult)) {
      router.replace(returnTo);
    }
  }, [searchResult, returnTo, router]);

  useEffect(() => {
    check();
  }, [check]);

  if (searchLoading) {
    return <Loading />;
  }

  return <>{children}</>;
}
