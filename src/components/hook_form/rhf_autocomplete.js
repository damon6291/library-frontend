import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Autocomplete, Box, InputLabel, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useDebounce } from 'src/hooks/use_debounce';
import { isObject } from 'src/utils/type_check';
import { cleanParams } from 'src/utils/url';
import { inputStyles } from 'src/utils/style';

export function RHFAutocomplete({ name, displayName, placeholder, helperText, ...other }) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Box sx={{ width: '100%' }}>
          {displayName ?? (
            <InputLabel>
              <Typography
                fontWeight={450}
                fontSize={'13px'}
                sx={{ color: 'text.primary' }}
              >
                {displayName}
              </Typography>
            </InputLabel>
          )}
          <Autocomplete
            {...field}
            onChange={(event, newValue) => setValue(name, newValue, { shouldValidate: true })}
            size="small"
            renderInput={(params) => (
              <TextField
                sx={inputStyles}
                label={displayName}
                placeholder={placeholder}
                error={!!error}
                helperText={error ? error?.message : helperText}
                {...params}
              />
            )}
            {...other}
          />
        </Box>
      )}
    />
  );
}

export function RHFAPIAutocomplete({
  name,
  displayName,
  params,
  helperText,
  searchParamName,
  useOptions,
  toOption,
  onClick,
  onChange = () => {},
  disabled,
  sx,
  ...others
}) {
  const { control, getValues } = useFormContext();

  const [text, setText] = useState('');
  const debounceText = useDebounce(text);

  const debounceParams = useMemo(
    () => ({
      ...params,
      [searchParamName]: debounceText,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [debounceText, params],
  );

  const { searchResult } = useOptions(cleanParams(debounceParams));

  const options = useMemo(() => {
    return searchResult.map((r) => toOption(r));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchResult]);

  const value = getValues(name);
  useEffect(() => {
    if (value === '') {
      setText('');
    }
  }, [value]);

  useEffect(() => {
    if (value !== '' && text === '') {
      const label = options.find((x) => x.value === value)?.label || '';
      setText(label);
    }
  }, [options, text, value]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Box sx={{ width: '100%' }}>
          {displayName && (
            <InputLabel>
              <Typography
                fontWeight={450}
                fontSize={'13px'}
                sx={{ color: 'text.primary' }}
              >
                {displayName}
              </Typography>
            </InputLabel>
          )}
          <Autocomplete
            {...field}
            value={field.value === '' ? null : field.value}
            inputValue={text}
            size="small"
            clearOnBlur={false}
            onInputChange={(e, val, reason) => (e ? setText(val) : null)}
            onChange={(e, val) => {
              if (!val || field.value !== val.value) {
                onChange();
              }
              if (!val) {
                setText('');
                field.onChange('');
              } else {
                setText(val.label);
                field.onChange(val.value);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{ ...sx }}
                error={!!error}
                placeholder={'Searching...'}
                helperText={error ? error?.message : helperText}
                InputProps={{
                  ...params.InputProps,
                  // startAdornment: <Icon source={SearchIcon} />,
                }}
                variant={disabled ? 'filled' : 'outlined'}
                onClick={onClick}
              />
            )}
            options={options}
            isOptionEqualToValue={(option, value) => option.value === value}
            getOptionLabel={(option) => (isObject(option) ? option.label : '')}
            renderOption={(props, option, { inputValue }) => (
              <Box
                component="li"
                {...props}
                //  onClick={() => handleClick(product.id, product.type)}
                key={props.id}
              >
                <Typography fontWeight={option.value === field.value ? '700' : '400'}>{option.label}</Typography>
              </Box>
            )}
            disabled={disabled}
            {...others}
          />
        </Box>
      )}
    />
  );
}
