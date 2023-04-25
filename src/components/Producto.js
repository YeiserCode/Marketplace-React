import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Button } from '@mui/material';
import { styled } from '@mui/system';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 750,
  borderRadius: '4px',
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
  margin: '1rem',
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 250,
  objectFit: 'contain',
  boxShadow: '0px 2px 6px rgba(0,0,0,0.3)',
  borderRadius: '4px',
  opacity: 0.8,
  transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
  '&:hover': {
    opacity: 1,
    transform: 'scale(1.05)',
  },
}));

const Producto = ({ producto, agregarAlCarrito, handleClick, carrito }) => {
  const handleAgregarAlCarrito = (event) => {
    event.stopPropagation();
    agregarAlCarrito(producto, 1);
  };

  const handleCardClick = (event) => {
    if (handleClick) {
      handleClick();
    }
  };

  const estaEnCarrito = carrito.some((item) => item.id === producto.id);

  return (
    <Grid item xs={12} sm={6} md={4}>
      <StyledCard onClick={handleCardClick}>
        <StyledCardMedia
          component="img"
          alt={producto.nombre}
          image={producto.imagenPortada}
          title={producto.nombre}
        />
        <CardContent>
          <Typography variant="h5" component="h2">
            {producto.nombre}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {producto.descripcion}
          </Typography>
        </CardContent>
        <Grid container alignItems="center" justifyContent="space-between" sx={{ padding: '1rem' }}>
          <Typography variant="h6" component="h3">
            ${producto.precio}
          </Typography>
          <Button
            size="small"
            onClick={handleAgregarAlCarrito}
            startIcon={<ShoppingCartIcon />}
            disabled={estaEnCarrito}
            sx={{
              backgroundColor: estaEnCarrito ? 'green' : '#3483FA',
              color: 'white',
              borderRadius: '4px',
              '&:hover': {
                backgroundColor: estaEnCarrito ? 'green' : '#2866c7',
              },
            }}
          >
            {estaEnCarrito ? 'Agregado al carrito' : 'Agregar al carrito'}
          </Button>
        </Grid>
      </StyledCard>
    </Grid>
  );
};

export default Producto;
