import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { db } from '../../../../config/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { Box, Button, TextField, Rating, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const ReviewForm = () => {
  const { t } = useTranslation();
  const userState = useSelector((state) => state.user);
  const { productId } = useParams();
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [setError] = useState('');

  const isLoggedIn = !userState.loading && userState.uid && userState.name;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      setError(t('loginToReview'));
      return;
    }

    const newReview = {
      userId: userState.uid,
      productId,
      rating,
      calificacion: rating,
      comentario: reviewText,
      fecha: new Date().toISOString(),
    };

    try {
      await addDoc(collection(db, 'reviews'), newReview);
      setRating(0);
      setReviewText('');
      setError('');
    } catch (error) {
      setError(t('reviewErrorAlert'));
    }
  };

  return (
    <Box mt={3}>
      <Typography variant="h6" gutterBottom>
        {t('leaveReview')}
      </Typography>
      {isLoggedIn && (
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
              label={t('review')}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
          </Box>
          <Box mt={1} textAlign="right">
            <Button variant="contained" color="primary" type="submit">
              {t('submitReview')}
            </Button>
          </Box>
        </form>
      )}
      {!isLoggedIn && !userState.loading && (
        <Typography color="error">
          {t('loginToReview')}
        </Typography>
      )}
    </Box>
  );
};

export default ReviewForm;
