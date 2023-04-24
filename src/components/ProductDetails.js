import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { Container, Typography, Box, Paper, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ReactImageMagnify from 'react-image-magnify';

const useStyles = makeStyles({
  mainImage: {
    width: '100%',
    height: '300px',
    objectFit: 'contain',
    cursor: 'pointer',
    borderRadius: '4px',
  },
  magnifierContainer: {
    position: 'relative',
    width: '100%',
    paddingBottom: '100%',
    overflow: 'visible',
  },
  imageThumbnail: {
    width: '100%',
    height: '100px',
    objectFit: 'cover',
    cursor: 'pointer',
    borderRadius: '4px',
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  paper: {
    padding: 3,
    borderRadius: '4px',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
  },
  productInfo: {
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  price: {
    color: '#F15A24',
  },
  descriptionTitle: {
    fontWeight: 'bold',
  },
});

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    const getProductDetails = async () => {
      const productRef = doc(db, 'productos', productId);
      const productSnapshot = await getDoc(productRef);

      if (productSnapshot.exists()) {
        setProduct({ id: productSnapshot.id, ...productSnapshot.data() });
      } else {
        console.error('No se encontró el producto');
      }
    };

    getProductDetails();
  }, [productId]);

  const handleImageChange = (imageUrl) => {
    setSelectedImage(imageUrl);
  }; 

  return (
    <Container maxWidth="md">
      {product ? (
        <Box mt={3}>
          <Paper elevation={3} className={classes.paper}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
              <div className={classes.magnifierContainer}>
                <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: product.nombre,
                      isFluidWidth: true,
                      src: selectedImage || product.imagenPortada,
                    },
                    largeImage: {
                      src: selectedImage || product.imagenPortada,
                      width: 900,
                      height: 1150,
                    },
                    enlargedImagePosition: 'beside',
                    enlargedImageContainerDimensions: {
                      width: '105%',
                      height: '100%',
                    },
                    lensStyle: { backgroundColor: 'rgba(0,0,0,.6)' },
                  }}
                  className={classes.mainImage}
                />
                  </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box className={classes.productInfo}>
                  <Typography variant="h4" gutterBottom>{product.nombre}</Typography>
                  <Typography variant="h6" gutterBottom className={classes.price}>Precio: ${product.precio}</Typography>
                  <Typography variant="body1" gutterBottom className={classes.descriptionTitle}>Descripción:</Typography>
                  <Typography variant="body1" gutterBottom>{product.descripcion}</Typography>
                </Box>
              </Grid>
            </Grid>
            {product.imagenes && (
              <Grid container spacing={1} justifyContent="center">
                {product.imagenes.map((imagen, index) => (
                  <Grid item key={index} xs={6} sm={3}>
                    <img
                      src={imagen}
                      alt={`Imagen ${index + 1}`}
                      className={classes.imageThumbnail}
                      onClick={() => handleImageChange(imagen)}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </Paper>
        </Box>
      ) : (
        <Typography variant="h5">Cargando detalles del producto...</Typography>
      )}

    </Container>
  );
};

export default ProductDetails;
