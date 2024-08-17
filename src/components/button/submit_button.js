import { LoadingButton } from '@mui/lab';
import { Typography } from '@mui/material';

export const SubmitButton = ({ disabled = false, isSubmitting, text }) => {
  return (
    <LoadingButton
      fullWidth
      size="large"
      type="submit"
      variant="contained"
      disabled={disabled}
      loading={isSubmitting}
    >
      <Typography variant={'body_sm_semibold'}>{text}</Typography>
    </LoadingButton>
  );
};
