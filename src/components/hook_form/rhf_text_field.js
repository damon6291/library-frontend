import { useFormContext, Controller } from 'react-hook-form';
import { Box, InputLabel, TextField, Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function RHFTextField({ styles, name, helperText, type, displayName, sx, disabled = false, ...other }) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Box sx={{ width: '100%', ...styles }}>
          <InputLabel>
            <Typography variant="body_md">{displayName}</Typography>
          </InputLabel>
          <TextField
            {...field}
            sx={{ ...sx }}
            fullWidth
            type={type}
            value={type === 'number' && field.value === 0 ? '' : field.value}
            onChange={(event) => {
              if (type === 'number') {
                field.onChange(Number(event.target.value));
              } else {
                field.onChange(event.target.value);
              }
            }}
            error={!!error}
            helperText={error ? error?.message : helperText}
            size={'small'}
            variant={disabled ? 'filled' : 'outlined'}
            disabled={disabled}
            {...other}
          />
        </Box>
      )}
    />
  );
}
