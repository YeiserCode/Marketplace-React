import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, TextField, Box, Typography } from '@mui/material';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../../config/firebaseConfig';

const QuestionForm = ({ productId }) => {
  const [question, setQuestion] = useState('');
  const userState = useSelector((state) => state.user);
  const [error, setError] = useState('');

  const isLoggedIn = !userState.loading && userState.uid && userState.name;

  console.log("isLoggedIn:", isLoggedIn);
  console.log("userState:", userState);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      setError('Debes iniciar sesión para realizar una pregunta.');
      return;
    }

    try {
      const newQuestion = {
        productId,
        userId: userState.uid,
        userName: userState.name,
        questionText: question,
        timestamp: new Date(),
      };
      await addDoc(collection(db, 'questions'), newQuestion);
      setQuestion('');
      setError('');
    } catch (error) {
      console.error('Error al enviar la pregunta:', error);
      setError('Error al enviar la pregunta. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <>
      {isLoggedIn && (
        <Box component="form" onSubmit={handleSubmit}>
          <Typography variant="h6">Haz una pregunta:</Typography>
          <TextField
            fullWidth
            required
            multiline
            rows={3}
            margin="normal"
            label="Escribe tu pregunta"
            variant="outlined"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary">
            Enviar pregunta
          </Button>
          {error && <Typography color="error">{error}</Typography>}
        </Box>
      )}
      {!isLoggedIn && !userState.loading && (
        <Typography color="error">
          Debes iniciar sesión para realizar una pregunta.
        </Typography>
      )}
    </>
  );
};

export default QuestionForm;
