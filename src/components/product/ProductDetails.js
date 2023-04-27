import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../config/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { Container, Box, Paper, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import ProductImages from './ProductDetails/ProductImages';
import ProductInfo from './ProductDetails/ProductInfo';
import ImageModal from './ProductDetails/ImageModal';

const useStyles = makeStyles({
  mainImage: {
    width: '100%',
    maxHeight: '300px',
    objectFit: 'contain',
    cursor: 'pointer',
    borderRadius: '4px',
  },
  magnifierContainer: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
  },
  paper: {
    padding: 3,
    borderRadius: '4px',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
  },
});

const ProductDetails = () => {
  const { t } = useTranslation();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [open, setOpen] = useState(false);
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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="md">
      {product ? (
        <Box mt={3}>
          <Paper elevation={3} className={classes.paper}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <div className={classes.magnifierContainer}>
                  <img
                    src={selectedImage || product.imagenPortada}
                    alt={product.nombre}
                    className={classes.mainImage}
                    onClick={handleOpen}
                  />
                </div>
                <ProductImages
                  images={product.imagenes}
                  onImageChange={setSelectedImage}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <ProductInfo product={product} />
              </Grid>
            </Grid>
          </Paper>
        </Box>
      ) : (
        <Typography variant="h5">{t('loadingProductDetails')}</Typography>
      )}

      <ImageModal
        open={open}
        onClose={handleClose}
        selectedImage={selectedImage || product?.imagenPortada}
        productName={product?.nombre}
      />
    </Container>
  );
};

export default ProductDetails;
