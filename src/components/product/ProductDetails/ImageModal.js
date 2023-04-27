import React from 'react';
import { Modal } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalImage: {
    maxWidth: '90%',
    maxHeight: '90%',
    borderRadius: '4px',
  },
});

const ImageModal = ({ open, onClose, selectedImage, productName }) => {
  const classes = useStyles();

  return (
    <Modal
      open={open}
      onClose={onClose}
      className={classes.modal}
    >
      <img
        src={selectedImage}
        alt={productName}
        className={classes.modalImage}
      />
    </Modal>
  );
};

export default ImageModal;
