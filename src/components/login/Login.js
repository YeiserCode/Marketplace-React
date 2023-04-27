import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  CircularProgress,
  Box,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (!email || !password) {
      setMessage(t('allFieldsRequired'));
      setLoading(false);
      return;
    }
  
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage(t('successfulSignIn'));
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setMessage(t('emailNotRegistered'));
      } else if (error.code === 'auth/wrong-password') {
        setMessage(t('incorrectPassword'));
      } else {
        setMessage(t('signInError'));
      }
      console.error('Error al iniciar sesión:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {t('signIn')}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={8} md={6}>
            <TextField
              label={t('email')}
              variant="outlined"
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={8} md={6}>
            <TextField
              label={t('password')}
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
                {loading ? <CircularProgress size={24} /> : t('signIn')}
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

export default Login;
