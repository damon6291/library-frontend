import { Button } from '@mui/material';
import { useGetMe } from 'src/api/user_api';
import Loading from 'src/components/progress/loading';
import { useRouter } from 'src/hooks/router/use_router';
import { PATHS } from 'src/routes/paths';

export default function RoleGuard({ allowedRole, children, returnPage }) {
  const { role, searchLoading } = useGetMe();

  const goBackPage = returnPage || PATHS.common.search;

  const router = useRouter();

  if (searchLoading ?? true) {
    return <Loading />;
  }

  if (allowedRole.length > 0 && !allowedRole.includes(role)) {
    return (
      <div>
        Not Authorized
        <Button onClick={() => router.push(goBackPage)}>Go to Home</Button>
      </div>
    );
  }

  return <> {children} </>;
}
