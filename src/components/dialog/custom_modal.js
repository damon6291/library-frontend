import React from 'react';
import { Modal, Box, Stack, Typography, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: '16px',
  margin: 'auto',
  backgroundColor: 'white',
  maxHeight: '100%',
  width: { xs: '450px', sm: '550px', md: '720px' },
};

const titleStyle = {
  background: 'whitesmoke',
  borderRadius: '16px 16px 0 0',
  borderBottom: '1px solid grey',
  padding: '0.5rem 1rem',
};

const footerStyle = {
  borderRadius: '0 0 16px 16px',
  background: 'whitesmoke',
  borderTop: '1px solid grey',
  padding: '0.5rem 1rem',
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '10px',
};

const CustomModal = ({ isOpen, onClose, title, content, primaryAction, secondaryAction, sx }) => {
  const hasFooter = !primaryAction && !secondaryAction;
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      disableEnforceFocus
    >
      <Box sx={{ ...modalStyle, ...sx }}>
        <Box sx={titleStyle}>
          <Stack
            direction={'row'}
            display="flex"
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Typography variant="heading_sm">{title}</Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </Box>
        <Box sx={{ padding: '1rem' }}>{content}</Box>
        {!hasFooter && (
          <Box sx={footerStyle}>
            {secondaryAction && (
              <Button
                variant="outlined"
                onClick={secondaryAction.onAction}
                loading={secondaryAction.loading}
              >
                {secondaryAction.content}
              </Button>
            )}
            {primaryAction && (
              <Button
                submit={primaryAction.isSubmit}
                variant="contained"
                onClick={primaryAction.onAction}
                loading={primaryAction.loading}
                disabled={primaryAction.disabled || false}
              >
                {primaryAction.content}
              </Button>
            )}
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default CustomModal;
