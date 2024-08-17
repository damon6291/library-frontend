import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'src/hooks/router/use_router';
import { useSearchParams } from 'src/hooks/router/use_search_params';
import { useBoolean } from 'src/hooks/use_boolean';
import { PATHS } from 'src/routes/paths';
import { Alert, Box, IconButton, InputAdornment, Stack, Typography } from '@mui/material';
import RHFTextField from 'src/components/hook_form/rhf_text_field';
import FormProvider from 'src/components/hook_form/form_provider';
import { emailSchema, passwordSchema } from 'src/utils/schema';
import { login } from 'src/api/auth_api';
import { setToken } from 'src/utils/token';
import { SubmitButton } from 'src/components/button/submit_button';
import { TextLink } from 'src/components/link/link';
import VisibilityIcon from '@mui/icons-material/Visibility';
import * as Yup from 'yup';
import { ROLES } from 'src/api/common_code/roles';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const [successMsg, setSuccessMsg] = useState(searchParams.get('successMsg'));

  const password = useBoolean();

  const defaultValues = {
    email: '',
    password: '',
  };

  const schema = Yup.object().shape({
    email: emailSchema,
    password: passwordSchema,
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      var res = await login(data.email, data.password);
      if (res.isSuccess) {
        await setToken(res.result.token);
        if (res.result.role === ROLES.customer) {
          router.push(returnTo || PATHS.common.search);
        } else {
          router.push(returnTo || PATHS.admin.book_table);
        }
      } else {
        throw Error(res.errorMessages[0]);
      }
    } catch (error) {
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const renderHead = (
    <Stack
      sx={{ my: 3 }}
      spacing={0.5}
    >
      <Typography variant="heading_lg">Login</Typography>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={1}>
      {!!errorMsg && (
        <Alert
          severity="error"
          onClose={() => setErrorMsg('')}
        >
          {errorMsg}
        </Alert>
      )}
      {!!successMsg && (
        <Alert
          severity="success"
          onClose={() => setSuccessMsg('')}
        >
          {successMsg}
        </Alert>
      )}
      <Box height={'0.1rem'} />

      <RHFTextField
        name="email"
        displayName="Email"
      />

      <Box sx={{ pb: 2 }}>
        <RHFTextField
          name="password"
          displayName="Password"
          type={password.value ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={password.onToggle}
                  edge="end"
                >
                  <VisibilityIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextLink
          href={PATHS.auth.register}
          text="Register"
        />
      </Box>
      <SubmitButton
        isSubmitting={isSubmitting}
        text="Login"
      />
    </Stack>
  );

  return (
    <FormProvider
      methods={methods}
      onSubmit={onSubmit}
    >
      {renderHead}

      {renderForm}
    </FormProvider>
  );
}
