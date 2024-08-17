import { useFormContext, Controller } from 'react-hook-form';
import {
  Box,
  Chip,
  MenuItem,
  Checkbox,
  InputLabel,
  FormControl,
  OutlinedInput,
  FormHelperText,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useMemo } from 'react';
import Loading from '../progress/loading';

// ----------------------------------------------------------------------

export function RHFAPISelect({ name, displayName, useOptions, params, toOption, ...other }) {
  const { searchResult, searchLoading } = useOptions(params ?? {});
  const options = useMemo(() => {
    return searchResult.map((r) => toOption(r));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchResult]);

  if (searchLoading) {
    return <Loading />;
  }

  return (
    <RHFSelect
      name={name}
      native
      displayName={displayName}
      {...other}
    >
      {options.map((c) => (
        <option
          key={c.key}
          value={c.key}
        >
          {c.value}
        </option>
      ))}
    </RHFSelect>
  );
}

export function RHFSelect({
  name,
  displayName,
  native,
  maxHeight = 220,
  helperText,
  children,
  PaperPropsSx,
  sx,
  disabled = false,
  ...other
}) {
  const { control } = useFormContext();

  const selectStyles = {
    root: {
      '& .MuiSelect-select': {
        padding: '8.5px 14px',
      },
    },
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Box sx={{ width: '100%' }}>
          <InputLabel>
            <Typography variant="body_md">{displayName}</Typography>
          </InputLabel>
          <TextField
            {...field}
            select
            fullWidth
            SelectProps={{
              native,
              MenuProps: {
                PaperProps: {
                  sx: {
                    ...(!native && {
                      maxHeight: typeof maxHeight === 'number' ? maxHeight : 'unset',
                    }),
                    ...PaperPropsSx,
                  },
                },
              },
              sx: { textTransform: 'capitalize' },
            }}
            variant={disabled ? 'filled' : 'outlined'}
            error={!!error}
            helperText={error ? error?.message : helperText}
            sx={{ ...selectStyles.root, ...sx }}
            disabled={disabled}
            {...other}
          >
            {children}
          </TextField>
        </Box>
      )}
    />
  );
}

// ----------------------------------------------------------------------

export function RHFMultiSelect({ name, chip, label, options, checkbox, placeholder, helperText, sx, ...other }) {
  const { control } = useFormContext();

  const renderValues = (selectedIds) => {
    const selectedItems = options.filter((item) => selectedIds.includes(item.value));

    if (!selectedItems.length && placeholder) {
      return (
        <Box
          component="em"
          sx={{ color: 'text.disabled' }}
        >
          {placeholder}
        </Box>
      );
    }

    if (chip) {
      return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {selectedItems.map((item) => (
            <Chip
              key={item.value}
              size="small"
              label={item.label}
            />
          ))}
        </Box>
      );
    }

    return selectedItems.map((item) => item.label).join(', ');
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl sx={sx}>
          {label && <InputLabel id={name}> {label} </InputLabel>}

          <Select
            {...field}
            multiple
            displayEmpty={!!placeholder}
            labelId={name}
            input={
              <OutlinedInput
                fullWidth
                label={label}
                error={!!error}
              />
            }
            renderValue={renderValues}
            {...other}
          >
            {placeholder && (
              <MenuItem
                disabled
                value=""
              >
                <em> {placeholder} </em>
              </MenuItem>
            )}

            {options.map((option) => {
              const selected = field.value.includes(option.value);

              return (
                <MenuItem
                  key={option.value}
                  value={option.value}
                >
                  {checkbox && (
                    <Checkbox
                      size="small"
                      disableRipple
                      checked={selected}
                    />
                  )}

                  {option.label}
                </MenuItem>
              );
            })}
          </Select>

          {(!!error || helperText) && (
            <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
