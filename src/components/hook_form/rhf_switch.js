import { useFormContext, Controller } from 'react-hook-form';
import { Switch, FormHelperText, FormControlLabel } from '@mui/material';

export default function RHFSwitch({ name, helperText, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <FormControlLabel
            control={
              <Switch
                {...field}
                checked={field.value}
              />
            }
            {...other}
          />

          {(!!error || helperText) && (
            <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>
          )}
        </div>
      )}
    />
  );
}
