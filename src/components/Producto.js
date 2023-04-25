import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Button } from '@mui/material';
import { styled } from '@mui/system';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '4px',
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
  margin: '1rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
  position: 'relative',
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 250,
  objectFit: 'contain',
  boxShadow: '0px 2px 6px rgba(0,0,0,0.3)',
  borderRadius: '4px',
  opacity: 0.8,
  marginBottom: 2,
  position: 'relative',
  transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
  '&:hover': {
    opacity: 1,
    transform: 'scale(1.05)',
  },
}));

const OfferBadge = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '10px',
  left: '10px',
  background: 'red',
  color: 'white',
  padding: '3px 5px',
  borderRadius: '4px',
  fontSize: '12px',
  fontWeight: 'bold',
  zIndex: 2,
  animation: 'pulse 1.5s infinite',
  '@keyframes pulse': {
    '0%': {
      boxShadow: `0 0 0 0 #8B0000`,
    },
    '70%': {
      boxShadow: `0 0 0 10px rgba(255, 62, 62, 0)`,
    },
    '100%': {
      boxShadow: `0 0 0 0 rgba(255, 62, 62, 0)`,
    },
  },
}));

const Producto = ({ producto, agregarAlCarrito, handleClick, carrito }) => {
  const handleAgregarAlCarrito = (event) => {
    console.log('Producto:', producto);
    event.stopPropagation();
    agregarAlCarrito(producto, 1);
  };

  const handleCardClick = (event) => {
    if (handleClick) {
      handleClick();
    }
  };

  const estaEnCarrito = carrito.some((item) => item.id === producto.id);

  const truncateDescription = (description, maxLength = 100) => {
    return description.length > maxLength ? description.slice(0, maxLength) + '...' : description;
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <StyledCard onClick={handleCardClick}>
        {producto.oferta && <OfferBadge>OFERTA</OfferBadge>}
        <StyledCardMedia
          component="img"
          alt={producto.nombre}
          image={producto.imagenPortada}
          title={producto.nombre}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2" noWrap>
            {producto.nombre}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {truncateDescription(producto.descripcion)}
          </Typography>
          <Typography variant="h6" component="h3" sx={{ marginTop: 'auto' }}>
            ${producto.precio}
          </Typography>
        </CardContent>
        <Grid container alignItems="center" justifyContent="center" sx={{ padding: '1rem' }}>
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
