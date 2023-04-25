import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  CircularProgress,
  Box,
} from '@mui/material';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (!email || !password) {
      setMessage('Por favor, completa todos los campos.');
      setLoading(false);
      return;
    }

    const auth = getAuth();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage('Registro exitoso');
      setEmail('');
      setPassword('');
    } catch (error) {
      if (error.code === 'auth/invalid-email') {
        setMessage('Correo electrónico inválido.');
      } else if (error.code === 'auth/weak-password') {
        setMessage('La contraseña debe tener al menos 6 caracteres.');
      } else {
        setMessage('Error al registrarse. Por favor, inténtalo de nuevo.');
      }
      console.error('Error al registrarse:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Registrarse
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={8} md={6}>
            <TextField
              label="Correo electrónico"
              variant="outlined"
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={8} md={6}>
            <TextField
              label="Contraseña"
              variant="outlined"
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Registrarse'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
      {message && (
        <Typography
          variant="subtitle1"
          color={message.startsWith('Error') ? 'error' : 'success'}
          style={{ marginTop: '1rem', textAlign: 'center' }}
        >
          {message}
        </Typography>
      )}
    </Container>
  );
};

export default Register;
