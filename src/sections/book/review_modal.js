import { yupResolver } from '@hookform/resolvers/yup';
import { Rating, Stack } from '@mui/material';
import { confirmable } from 'react-confirm';
import { useForm } from 'react-hook-form';
import { writeReview } from 'src/api/book_api';
import { createConfirmation } from 'src/components/dialog/confirmation';
import CustomModal from 'src/components/dialog/custom_modal';
import FormProvider from 'src/components/hook_form/form_provider';
import RHFTextField from 'src/components/hook_form/rhf_text_field';
import * as Yup from 'yup';

export const reviewConfirm = createConfirmation(confirmable(ReviewModal));

function ReviewModal({ show, proceed, userBookId }) {
  const defaultValues = {
    userBookId: userBookId,
    review: '',
    rating: 5,
  };

  const schema = Yup.object().shape({
    userBookId: Yup.number(),
    review: Yup.string().required('Review is required'),
    rating: Yup.number().required('Rating is required'),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = methods;

  var rating = watch('rating');

  const onSubmit = handleSubmit(async (data) => {
    try {
      var res = await writeReview(data);
      if (res.isSuccess) {
        proceed(true);
      } else {
        throw Error(res.errorMessages[0]);
      }
    } catch (error) {}
  });

  const renderForm = (
    <Stack spacing={1}>
      <Rating
        defaultValue={rating}
        onChange={(e, v) => setValue('rating', v)}
        precision={1}
        sx={{ py: 0.5, pr: 2 }}
      />
      <RHFTextField
        name="review"
        displayName={'*Review'}
        multiline={true}
        rows={3}
        inputProps={{
          style: {
            padding: 0,
          },
        }}
      />
    </Stack>
  );

  const renderContent = (
    <FormProvider
      methods={methods}
      onSubmit={onSubmit}
    >
      {renderForm}
    </FormProvider>
  );
  return (
    <CustomModal
      isOpen={show}
      title={'Write Review'}
      content={renderContent}
      primaryAction={{
        submit: true,
        loading: isSubmitting,
        disabled: !isDirty,
        content: 'Confirm',
        onAction: onSubmit,
      }}
      secondaryAction={{
        content: 'Cancel',
        onAction: () => {
          proceed(false);
        },
      }}
      onClose={() => {
        proceed(false);
      }}
    />
  );
}
