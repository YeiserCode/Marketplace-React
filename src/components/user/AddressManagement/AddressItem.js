import React from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';

const AddressItem = ({ address, onEditAddress, onDeleteAddress }) => {
  const {
    id,
    street,
    city,
    state,
    country,
    postalCode,
    phoneNumber,
    additionalInfo,
  } = address;

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h6" component="h2">
          {street}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {city}, {state}, {country} {postalCode}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Phone: {phoneNumber}
        </Typography>
        {additionalInfo && (
          <Typography variant="body2" color="textSecondary" component="p">
            Additional Info: {additionalInfo}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={() => onEditAddress(address)}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => onDeleteAddress(id)}
        >
          Delete
        </Button>
      </CardContent>
    </Card>
  );
};

export default AddressItem;
