import React from 'react';
import { Link } from 'react-router-dom';
import { CardContent, CardActions, Typography, IconButton, Card } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  card: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
    width: '100%',
    '&:hover': {
      transform: 'scale(1.02)',
      transition: 'transform 0.3s',
    },
  },
  imageContainer: {
    height: 100,
    width: 100,
    marginRight: 20,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardMedia: {
    maxHeight: '100%',
    maxWidth: '100%',
    objectFit: 'contain',
  },
  cardContent: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  cardActions: {
    display: 'flex',
    alignItems: 'center',
  },
  titleLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
});

const WishlistItem = ({ producto, onRemoveFromWishlist }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card} elevation={3}>
      <div className={classes.imageContainer}>
        <img
          src={producto.imagenes?.[0] || ''}
          alt={producto.nombre}
          className={classes.cardMedia}
        />
      </div>
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h6" component="h2">
          <Link to={`/product/${producto.id}`} className={classes.titleLink}>
            {producto.nombre}
          </Link>
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions} disableSpacing>
        <IconButton
          onClick={() => onRemoveFromWishlist(producto.id)}
          aria-label="Eliminar de la lista de deseos"
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default WishlistItem;
