import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../config/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { Container, Typography, Box, Paper, Grid, Modal } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';

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
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalImage: {
    maxWidth: '90%',
    maxHeight: '90%',
    borderRadius: '4px',
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

  const handleImageChange = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

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
        <Typography variant="h5">{t('loadingProductDetails')}</Typography>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        className={classes.modal}
      >
        <img
          src={selectedImage || product?.imagenPortada}
          alt={product?.nombre}
          className={classes.modalImage}
        />
      </Modal>

    </Container>
  );
};

export default ProductDetails;
