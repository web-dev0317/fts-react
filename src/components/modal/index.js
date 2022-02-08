import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AppModal(props) {
  return (
    <Modal open={props.open} onClose={props.onClose}>
      <Box sx={style}>{props.children}</Box>
    </Modal>
  );
}
