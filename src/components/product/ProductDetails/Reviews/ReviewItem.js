import React from 'react';
import { Box, Typography, Rating } from '@mui/material';

const ReviewItem = ({ review }) => {
    const { calificacion, comentario } = review;

  return (
    <Box mb={2}>
      <Box display="flex" alignItems="center">
        <Rating name="review-rating" value={calificacion} precision={0.5} readOnly />
        <Typography variant="body2" ml={1}>
          {new Date(review.fecha).toLocaleDateString()}
        </Typography>
      </Box>
      <Typography variant="body1">{comentario}</Typography>
    </Box>
  );
};

export default ReviewItem;
