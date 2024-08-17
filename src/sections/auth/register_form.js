import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'src/hooks/router/use_router';
import { useBoolean } from 'src/hooks/use_boolean';
import { PATHS } from 'src/routes/paths';
import { Alert, Box, IconButton, InputAdornment, MenuItem, Stack, Typography } from '@mui/material';
import RHFTextField from 'src/components/hook_form/rhf_text_field';
import FormProvider from 'src/components/hook_form/form_provider';
import { emailSchema, passwordSchema } from 'src/utils/schema';
import { register } from 'src/api/auth_api';
import { SubmitButton } from 'src/components/button/submit_button';
import { TextLink } from 'src/components/link/link';
import VisibilityIcon from '@mui/icons-material/Visibility';
import * as Yup from 'yup';
import { RHFSelect } from 'src/components/hook_form/rhf_select';
import { ROLES } from 'src/api/common_code/roles';
import { getURL } from 'src/utils/url';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const password = useBoolean();

  const defaultValues = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: ROLES.customer,
  };

  const schema = Yup.object().shape({
    email: emailSchema,
    password: passwordSchema,
    firstName: Yup.string(),
    lastName: Yup.string(),
    role: Yup.string().required('Role is required'),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      var res = await register(data);
      if (res.isSuccess) {
        router.push(getURL(PATHS.auth.login, { successMsg: 'Account created. Please log in' }));
      } else {
        throw Error(res.errorMessages[0]);
      }
    } catch (error) {
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const renderHead = (
    <Stack
      sx={{ my: 3 }}
      spacing={0.5}
    >
      <Typography variant="heading_lg">Register</Typography>
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
      <Box height={'0.1rem'} />

      <RHFTextField
        name="email"
        displayName="*Email"
      />
      <RHFTextField
        name="firstName"
        displayName="*First Name"
      />
      <RHFTextField
        name="lastName"
        displayName="*Last Name"
      />
      <RHFSelect
        displayName={'*Role'}
        name="role"
      >
        <MenuItem value={ROLES.customer}>Customer</MenuItem>
        <MenuItem value={ROLES.librarian}>Librarian</MenuItem>
      </RHFSelect>
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
      <Box height={'1rem'} />
      <SubmitButton
        isSubmitting={isSubmitting}
        text="Register"
      />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <TextLink
          href={PATHS.auth.login}
          text="Go back to login"
        />
      </Box>
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
