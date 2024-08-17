import { Stack, Typography } from '@mui/material';

export default function SearchNotFound({ query, sx }) {
  return query ? (
    <Stack>
      <Typography
        variant="heading_sm"
        gutterBottom
      >
        There are no results for <strong>&quot;{query}&quot;</strong>
      </Typography>

      <Typography variant="body_md">Please try again</Typography>
    </Stack>
  ) : (
    <Typography
      variant="body_md"
      sx={sx}
    >
      Search
    </Typography>
  );
}
