import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';

const AddEditAddress = ({ address = null, onSubmit }) => {
  const [formData, setFormData] = useState(address || {
    street: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    phoneNumber: '',
    additionalInfo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6" component="h2">
        {address ? 'Edit Address' : 'Add Address'}
      </Typography>
      <TextField
        label="Street"
        name="street"
        value={formData.street}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="City"
        name="city"
        value={formData.city}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="State"
        name="state"
        value={formData.state}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Country"
        name="country"
        value={formData.country}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Postal Code"
        name="postalCode"
        value={formData.postalCode}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Phone Number"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Additional Info"
        name="additionalInfo"
        value={formData.additionalInfo}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" type="submit">
        {address ? 'Update Address' : 'Add Address'}
      </Button>
    </form>
  );
};

export default AddEditAddress;
