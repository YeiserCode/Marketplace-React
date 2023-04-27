import React from 'react';
import { Box, Typography } from '@mui/material';

const ProductInfo = ({ product }) => {
  const { nombre, precio, descripcion } = product;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>{nombre}</Typography>
      <Typography variant="h6" gutterBottom style={{ color: '#F15A24' }}>Precio: ${precio}</Typography>
      <Typography variant="body1" gutterBottom style={{ fontWeight: 'bold' }}>Descripción:</Typography>
      <Typography variant="body1" gutterBottom>{descripcion}</Typography>
    </Box>
  );
};

export default ProductInfo;
