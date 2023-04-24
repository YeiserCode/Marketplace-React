import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const useStyles = makeStyles({
  card: {
    maxWidth: 750,
    borderRadius: '4px',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
    margin: '1rem',
  },
  media: {
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
  },
  title: {
    fontSize: '1rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  price: {
    fontWeight: 500,
    marginRight: '1rem',
  },
  button: {
    backgroundColor: '#3483FA',
    color: 'white',
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: '#2866c7',
    },
    ml: 1,
  },
  gridContainer: {
    display: 'flex',
  },
  cardContent: {
    padding: '1rem',
  },
});

const Producto = ({ producto, agregarAlCarrito }) => {
  const classes = useStyles();

  const handleAgregarAlCarrito = (event) => {
    event.stopPropagation();
    agregarAlCarrito(producto);
  };

  return (
    <Grid item xs={12} sm={6} md={4} className={classes.gridContainer}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          component="img"
          alt={producto.nombre}
          image={producto.imagenPortada}
          title={producto.nombre}
        />
        <CardContent className={classes.cardContent}>
          <Typography className={classes.title} variant="h5" component="h2">
            {producto.nombre}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {producto.descripcion}
          </Typography>
        </CardContent>
        <Grid container alignItems="center" justifyContent="space-between" sx={{ padding: '1rem' }}>
          <Typography className={classes.price} variant="h6" component="h3">
            ${producto.precio}
          </Typography>
          <Button
            className={classes.button}
            size="small"
            onClick={handleAgregarAlCarrito}
            startIcon={<ShoppingCartIcon />}
          >
            Agregar al carrito
          </Button>
        </Grid>
      </Card>
    </Grid>
  );
};

export default Producto;
