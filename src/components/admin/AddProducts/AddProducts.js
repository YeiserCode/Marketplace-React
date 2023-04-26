import React, { useState } from 'react';
import { db } from '../../../config/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { Container, Typography } from '@mui/material';
import AddProductForm from './AddProductForm';

const AddProducts = () => {
  const [message, setMessage] = useState('');

  const agregarProducto = async (data) => {
    setMessage('');

    try {
      await addDoc(collection(db, 'productos'), data);
      setMessage('Producto agregado correctamente.');
    } catch (error) {
      setMessage('Error al agregar el producto. Por favor, inténtalo de nuevo.');
      console.error('Error al agregar el producto:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Agregar Producto
      </Typography>
      <AddProductForm onSubmit={agregarProducto} setMessage={setMessage} message={message} />
    </Container>
  );
};

export default AddProducts;
