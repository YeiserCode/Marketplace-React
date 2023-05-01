import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid';
import WishlistItem from './WishlistItem';
import { removeFromWishlist } from '../../store/wishlistSlice';

const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const handleRemoveFromWishlist = (productoId) => {
    dispatch(removeFromWishlist(productoId));
  };

  return (
    <Grid container spacing={2}>
      {wishlist.map((producto) => (
        <WishlistItem
          key={producto.id}
          producto={producto}
          onRemoveFromWishlist={handleRemoveFromWishlist}
        />
      ))}
    </Grid>
  );
};

export default Wishlist;
