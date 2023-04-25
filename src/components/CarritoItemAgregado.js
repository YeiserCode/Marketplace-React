import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Box, Typography, Button, Card, CardContent, CardMedia } from '@mui/material';

const CarritoItemAgregado = ({ findProductById }) => {
  const { productId } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const product = findProductById(productId);
    setProducto(product);
  }, [productId, findProductById]);

  if (!producto) {
    return <div>Cargando...</div>;
  }

  const imageUrl = producto.imagenes?.[0] || '';

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="calc(100vh - 64px - 120px)">
      <Card sx={{ maxWidth: 600, minWidth: 300, p: 2, boxShadow: 3 }}>
        <CardMedia
          component="img"
          sx={{ aspectRatio: '16/9' }}
          image={imageUrl}
          alt={producto.nombre}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Producto agregado al carrito
          </Typography>
          <Typography variant="h6" component="div" sx={{ mt: 1 }}>
            {producto.nombre}
          </Typography>
          <Typography variant="body1" sx={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3, overflow: 'hidden', mt: 1 }}>
            {producto.descripcion}
          </Typography>
        </CardContent>
        <Box mt={2} display="flex" justifyContent="center">
          <Button variant="contained" color="primary" component={Link} to="/carrito" sx={{ transition: 'all 0.3s' }}>
            Ver carrito
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default CarritoItemAgregado;
