import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Box, Button, MenuItem, Stack } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { deleteBook, upsertBook } from 'src/api/book_api';
import { BOOKCATEGORY } from 'src/api/common_code/category';
import { SubmitButton } from 'src/components/button/submit_button';
import FormProvider from 'src/components/hook_form/form_provider';
import RHFDatePicker from 'src/components/hook_form/rhf_date_picker';
import { RHFSelect } from 'src/components/hook_form/rhf_select';
import RHFTextField from 'src/components/hook_form/rhf_text_field';
import { useRouter } from 'src/hooks/router/use_router';
import { useSearchParams } from 'src/hooks/router/use_search_params';
import { PATHS } from 'src/routes/paths';
import { getURL } from 'src/utils/url';
import * as Yup from 'yup';

export default function BookAddEditForm({ currentData }) {
  const isEdit = (currentData?.bookId ?? 0) > 0;
  const router = useRouter();
  const searchParams = useSearchParams();

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState(searchParams.get('successMsg'));

  const schema = Yup.object().shape({
    bookId: Yup.number(),
    title: Yup.string().required('Title is required'),
    description: Yup.string(),
    author: Yup.string().required('Author is required'),
    publisher: Yup.string().required('Publisher is required'),
    publicationDate: Yup.mixed().nullable(),
    category: Yup.string().required('Category is required'),
    isbn: Yup.string().required('ISBN is required'),
    image: Yup.mixed(),
    pageCount: Yup.number(),
    isArchived: Yup.bool(),
  });

  const defaultValues = useMemo(
    () => ({
      bookId: currentData?.bookId || 0,
      title: currentData?.title || '',
      description: currentData?.description || '',
      author: currentData?.author || '',
      publisher: currentData?.publisher || '',
      publicationDate: currentData?.publicationDate ? new Date(currentData.publicationDate) : null,
      category: currentData?.category || '',
      isbn: currentData?.isbn || '',
      image: currentData?.image || '',
      pageCount: currentData?.pageCount || 0,
      isArchived: currentData?.isArchived || false,
    }),
    [currentData],
  );

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = methods;

  useEffect(() => {
    reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues]);

  const onSubmit = handleSubmit(async (data) => {
    var res = await upsertBook(data);

    if (isEdit) {
      setSuccessMsg(`Book has been edited`);
    } else {
      router.push(getURL(PATHS.admin.book_edit(res.result), { successMsg: 'Book has been added' }));
    }
  });

  return (
    <>
      <FormProvider
        methods={methods}
        onSubmit={onSubmit}
      >
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
        <Stack spacing={2}>
          <RHFTextField
            name="title"
            displayName={'*Title'}
          />
          <RHFTextField
            name="description"
            multiline={true}
            rows={3}
            displayName={'Description'}
            inputProps={{
              style: {
                padding: 0,
              },
            }}
          />
          <RHFTextField
            name="author"
            displayName={'*Author'}
          />
          <RHFTextField
            name="publisher"
            displayName={'*Publisher'}
          />
          <RHFDatePicker
            name="publicationDate"
            displayName={'Publication date'}
          />
          <RHFSelect
            displayName={'*Category'}
            name="category"
          >
            {Object.keys(BOOKCATEGORY).map((key, idx) => (
              <MenuItem
                key={idx}
                value={BOOKCATEGORY[key]}
              >
                {BOOKCATEGORY[key]}
              </MenuItem>
            ))}
          </RHFSelect>
          <RHFTextField
            name="isbn"
            displayName={'*ISBN'}
          />
          <RHFTextField
            name="pageCount"
            type="number"
            displayName={'Page Count'}
          />
        </Stack>
        <Box sx={{ height: '1rem' }} />
        <Stack
          direction={'row'}
          spacing={1}
          display={'flex'}
          sx={{ justifyContent: 'flex-end' }}
        >
          <SubmitButton
            disabled={!isDirty}
            isSubmitting={isSubmitting}
            text={isEdit ? 'Edit' : 'Add'}
          />
          {isEdit && (
            <Button
              variant="contained"
              onClick={async () => {
                var res = await deleteBook(currentData.bookId);
                if (res.isSuccess) {
                  router.push(PATHS.admin.book_table);
                }
              }}
            >
              Delete
            </Button>
          )}
        </Stack>
        <Box sx={{ height: '3rem' }} />
      </FormProvider>
    </>
  );
}
