import React from 'react';
import { Box, Typography, Button, Card, CardContent, CardMedia } from '@mui/material';

const Cart = ({ carrito, eliminarDelCarrito }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={3}>
      <Typography variant="h4">Carrito de compras</Typography>
      {carrito.map((producto) => (
        <Card key={producto.id} sx={{ maxWidth: 600, minWidth: 300, mt: 2, p: 1, boxShadow: 3 }}>
          <Box display="flex" flexDirection="row">
            <CardMedia
              component="img"
              sx={{ width: 100, height: 100, objectFit: 'cover' }}
              image={producto.imagenes?.[0] || ''}
              alt={producto.nombre}
            />
            <CardContent>
              <Typography variant="h6">{producto.nombre}</Typography>
              <Box mt={2} display="flex" justifyContent="flex-end">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => eliminarDelCarrito(producto)}
                  sx={{ transition: 'all 0.3s' }}
                >
                  Eliminar
                </Button>
              </Box>
            </CardContent>
          </Box>
        </Card>
      ))}
    </Box>
  );
};

export default Cart;
