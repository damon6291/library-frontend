import { Link as ReactLink } from 'react-router-dom';
import { Link as MLink, Typography } from '@mui/material';
import { forwardRef } from 'react';

// ----------------------------------------------------------------------

const RouterLink = forwardRef(({ href, ...other }, ref) => (
  <ReactLink
    ref={ref}
    to={href}
    {...other}
  />
));

const Link = ({ href, sx, children, ...other }) => (
  <MLink
    component={RouterLink}
    href={href}
    sx={{ textDecoration: 'none', ...sx }}
    {...other}
  >
    {children}
  </MLink>
);

export const TextLink = ({ href, sx, text, ...other }) => (
  <MLink
    component={RouterLink}
    href={href}
    sx={{ textDecoration: 'none', ...sx }}
    {...other}
  >
    <Typography variant="body_md">{text}</Typography>
  </MLink>
);

export default Link;
