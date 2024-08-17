import { useEffect, useCallback, useState } from 'react';
import { useGetMe } from 'src/api/user_api';
import Loading from 'src/components/progress/loading';
import { useRouter } from 'src/hooks/router/use_router';
import { PATHS } from 'src/routes/paths';
import { isEmpty } from 'src/utils/type_check';
import { getURL } from 'src/utils/url';

export default function AuthGuard({ children }) {
  const router = useRouter();

  const { searchResult, searchLoading } = useGetMe();

  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    if (isEmpty(searchResult)) {
      const href = getURL(PATHS.auth.login, { returnTo: window.location.pathname });
      router.replace(href);
    } else {
      setChecked(true);
    }
  }, [searchResult, router]);

  useEffect(() => {
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (searchLoading) {
    return <Loading />;
  }

  if (!checked) {
    return null;
  }

  return <>{children}</>;
}
