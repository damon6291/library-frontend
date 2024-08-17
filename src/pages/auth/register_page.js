import { Helmet } from 'react-helmet-async';
import RegisterView from 'src/sections/auth/view/register_view';

export default function RegisterPage() {
  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <RegisterView />
    </>
  );
}
