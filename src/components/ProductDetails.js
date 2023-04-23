import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { Container, Typography, Box, Paper } from '@mui/material';

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

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

  return (
    <Container maxWidth="sm">
      {product ? (
        <Box mt={3}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h4">{product.nombre}</Typography>
            <Typography variant="body1">Precio: ${product.precio}</Typography>
            <Typography variant="body1">Descripción: {product.descripcion}</Typography>
          </Paper>
        </Box>
      ) : (
        <Typography variant="h5">Cargando detalles del producto...</Typography>
      )}
    </Container>
  );
};

export default ProductDetails;
