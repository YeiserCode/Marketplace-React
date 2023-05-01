import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAddresses, saveAddress, editAddress, removeAddress } from '../../../store/addressSlice';
import AddressItem from './AddressItem';
import AddEditAddress from './AddEditAddress';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const AddressBook = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.uid);
  const addresses = useSelector((state) => state.address.addresses);

  const [isEditing, setIsEditing] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const handleAddAddress = (newAddress) => {
    dispatch(saveAddress({ userId, ...newAddress }));
  };

  const handleEditAddress = (addressToEdit) => {
    setIsEditing(true);
    setEditingAddress(addressToEdit);
  };

  const handleUpdateAddress = (updatedAddress) => {
    dispatch(editAddress(updatedAddress));
    setIsEditing(false);
    setEditingAddress(null);
  };

  const handleDeleteAddress = (addressId) => {
    dispatch(removeAddress(addressId));
  };

  const handleCloseModal = () => {
    setIsEditing(false);
    setEditingAddress(null);
  };

  useEffect(() => {
    if (userId) {
      dispatch(fetchAddresses(userId));
    }
  }, [dispatch, userId]);

  const uniqueAddresses = addresses.reduce((acc, curr) => {
    if (curr.id && !acc.find((item) => item.id === curr.id)) {
      acc.push(curr);
    }
    return acc;
  }, []);

  return (
    <div>
      <h2>Libreta de direcciones</h2>
      {uniqueAddresses.map((address) => (
        <AddressItem
          key={address.id}
          address={address}
          onEditAddress={handleEditAddress}
          onDeleteAddress={handleDeleteAddress}
        />
      ))}
      <AddEditAddress onSubmit={handleAddAddress} />
      <Modal
        open={isEditing}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            minWidth: '80%',
          }}
        >
          {editingAddress && (
            <AddEditAddress
              address={editingAddress}
              onSubmit={handleUpdateAddress}
            />
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default AddressBook;
