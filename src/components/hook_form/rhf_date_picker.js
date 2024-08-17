import { useFormContext, Controller } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers';
import { Box, InputLabel, Typography } from '@mui/material';

export default function RHFDatePicker({ name, displayName, placeholder, helperText, disabled, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Box sx={{ width: '100%' }}>
          <InputLabel>
            <Typography variant="body_md">{displayName}</Typography>
          </InputLabel>
          <DatePicker
            {...field}
            format="yyyy-MM-dd"
            slotProps={{
              textField: {
                fullWidth: true,
                error: !!error,
                helperText: error?.message,
                size: 'small',
                variant: disabled ? 'filled' : 'outlined',
              },
            }}
            disabled={disabled}
            {...other}
          />
        </Box>
      )}
    />
  );
}
