import { useState, useEffect, useCallback } from 'react';
import Collapse from '@mui/material/Collapse';
import NavItem from './nav_item';
import { usePathname } from 'src/hooks/router/use_pathname';
import { useActiveLink } from 'src/hooks/router/use_active_link';
import { isEmpty } from 'src/utils/type_check';

export default function NavList({ data, depth, hasChild }) {
  const pathname = usePathname();
  let active = useActiveLink(data.path, true);

  const [open, setOpen] = useState(active);
  useEffect(() => {
    if (!active) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, active]);

  const handleToggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleClick = () => {
    if (!isEmpty(data.children)) {
      handleToggle();
    }
  };

  return (
    <>
      <NavItem
        item={data}
        depth={depth}
        open={open}
        active={active}
        onClick={handleClick}
      />
      {hasChild && (
        <Collapse
          in={open}
          unmountOnExit
        >
          <NavSubList
            data={data.children}
            depth={depth}
          />
        </Collapse>
      )}
    </>
  );
}

function NavSubList({ data, depth }) {
  return (
    <>
      {data.map((list, index) => (
        <NavList
          key={index}
          data={list}
          depth={depth + 1}
          hasChild={!!list.children}
        />
      ))}
    </>
  );
}
