import React from 'react';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  imageThumbnail: {
    width: '100%',
    height: '100px',
    objectFit: 'cover',
    cursor: 'pointer',
    borderRadius: '4px',
  },
});

const ProductImages = ({ images, onImageChange }) => {
  const classes = useStyles();

  const handleImageClick = (imageUrl) => {
    onImageChange(imageUrl);
  };

  return (
    <Grid container spacing={1} justifyContent="center">
      {images.map((image, index) => (
        <Grid item key={index} xs={6} sm={3}>
          <img
            src={image}
            alt={`Imagen ${index + 1}`}
            className={classes.imageThumbnail}
            onClick={() => handleImageClick(image)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductImages;
