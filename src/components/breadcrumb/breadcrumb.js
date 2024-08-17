import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// ----------------------------------------------------------------------

export default function Breadcrumb({ links, sx, ...other }) {
  const lastLink = links[links.length - 1].name;

  return (
    <Box sx={{ ...sx }}>
      {!!links.length && (
        <Breadcrumbs
          separator={<ChevronRightIcon />}
          {...other}
        >
          {links.map((link) => (
            <LinkItem
              key={link.name || ''}
              link={link}
              disabled={link.name === lastLink}
            />
          ))}
        </Breadcrumbs>
      )}
    </Box>
  );
}

const LinkItem = ({ link, disabled }) => {
  const { name, href } = link;
  const styles = {
    typography: 'body_md_medium',
    alignItems: 'center',
    color: 'text.secondary',
    display: 'inline-flex',
    ...(disabled && {
      typography: 'body_md',
      cursor: 'default',
      pointerEvents: 'none',
    }),
  };
  if (href) {
    return (
      <Link
        href={href}
        sx={styles}
        underline="none"
      >
        {name}
      </Link>
    );
  }

  return <Box sx={styles}> {name} </Box>;
};
