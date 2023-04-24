import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const CarritoItemAgregado = ({ findProductById }) => {
  const { productId } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    setProducto(findProductById(productId));
  }, [productId, findProductById]);

  if (!producto) {
    return <div>Cargando...</div>;
  }

  return (
    <Box>
      <Typography variant="h5">Producto agregado al carrito</Typography>
      <Typography variant="h6">{producto.nombre}</Typography>
      <Typography variant="body1">{producto.descripcion}</Typography>
      <Box mt={2}>
        <Button variant="contained" color="primary" component={Link} to="/carrito">
          Ver carrito
        </Button>
      </Box>
    </Box>
  );
};

export default CarritoItemAgregado;