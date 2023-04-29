import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { db } from '../../../../config/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { Box, Button, TextField, Rating, Typography } from '@mui/material';

const ReviewForm = () => {
  const user = useSelector((state) => state.user);
  const { productId } = useParams();
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('Debes iniciar sesión para dejar una reseña');
      return;
    }

    const newReview = {
      userId: user.uid,
      productId,
      rating,
      calificacion: rating, // Cambiar 'rating' a 'calificacion'
      comentario: reviewText, // Cambiar 'text' a 'comentario'
      fecha: new Date().toISOString(), // Almacena la fecha actual en formato ISO
    };

    try {
      await addDoc(collection(db, 'reviews'), newReview);
      setRating(0);
      setReviewText('');
      alert('Reseña enviada con éxito');
    } catch (error) {
      console.error('Error al enviar la reseña:', error);
      alert('Ocurrió un error al enviar la reseña. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <Box mt={3}>
      <Typography variant="h6" gutterBottom>
        Dejar una reseña
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box>
          <Rating
            name="rating"
            value={rating}
            onChange={(e, newValue) => setRating(newValue)}
            precision={0.5}
          />
        </Box>
        <Box mt={1}>
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            label="Reseña"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
        </Box>
        <Box mt={1} textAlign="right">
          <Button variant="contained" color="primary" type="submit">
            Enviar reseña
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ReviewForm;
