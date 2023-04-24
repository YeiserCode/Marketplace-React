import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { Container, Typography, Box, Paper, Dialog, DialogContent, IconButton, Grid } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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

  const handleClickOpen = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="sm">
      {product ? (
        <Box mt={3}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <img
              src={product.imagenPortada}
              alt={product.nombre}
              style={{ width: '100%', height: 'auto', objectFit: 'contain', cursor: 'pointer' }}
              onClick={() => handleClickOpen(product.imagenPortada)}
            />
            <Typography variant="h4">{product.nombre}</Typography>
            <Typography variant="body1">Precio: ${product.precio}</Typography>
            <Typography variant="body1">Descripción: {product.descripcion}</Typography>
            {product.imagenes && (
              <Grid container spacing={1} justifyContent="center">
                {product.imagenes.map((imagen, index) => (
                  <Grid item key={index} xs={4}>
                    <img
                      src={imagen}
                      alt={`Imagen ${index + 1}`}
                      style={{ width: '100%', height: '100px', objectFit: 'cover', cursor: 'pointer' }}
                      onClick={() => handleClickOpen(imagen)}
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

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogContent>
          <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close" sx={{ position: 'absolute', top: 8, right: 8 }}>
            <CloseIcon />
          </IconButton>
          <img src={selectedImage} alt="Selected" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default ProductDetails;
