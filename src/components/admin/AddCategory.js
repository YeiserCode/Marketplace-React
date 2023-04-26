import React, { useState, useEffect } from 'react';
import { db } from '../../config/firebaseConfig';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/system';

const FormContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

const AddCategory = () => {
  const [nombreCategoria, setNombreCategoria] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    let timer;
    if (message) {
      timer = setTimeout(() => {
        setMessage('');
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [message]);

  const agregarCategoria = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage('');

    try {
      const q = query(
        collection(db, 'categorias'),
        where('nombre', '==', nombreCategoria)
      );
      const snapshot = await getDocs(q);

      if (!nombreCategoria.trim()) {
        setMessage('Por favor, ingrese el nombre de la categoría.');
      } else if (!snapshot.empty) {
        setMessage('La categoría ya existe.');
      } else {
        await addDoc(collection(db, 'categorias'), {
          nombre: nombreCategoria,
        });

        setMessage('Categoría creada correctamente.');
        setNombreCategoria('');
      }
    } catch (error) {
      setMessage('Error al crear la categoría.');
      console.error('Error al crear la categoría:', error);
    }

    setLoading(false);
  };

  return (
    <FormContainer>
      <Typography variant="h4" gutterBottom>
        Agregar Categoría
      </Typography>
      <form onSubmit={agregarCategoria}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nombre de la categoría"
              value={nombreCategoria}
              onChange={(e) => setNombreCategoria(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Agregar'}
            </Button>
          </Grid>
          {message && (
            <Grid item xs={12}>
              <Typography variant="body1" color={message.startsWith('Error') ? 'error' : 'success'}>
                {message}
              </Typography>
            </Grid>
          )}
        </Grid>
      </form>
    </FormContainer>
  );
};

export default AddCategory;
