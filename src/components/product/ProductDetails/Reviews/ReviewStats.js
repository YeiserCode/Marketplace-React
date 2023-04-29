import React from 'react';
import { Typography, Box, LinearProgress } from '@mui/material';

const ReviewStats = ({ reviews }) => {
  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? (reviews.reduce((acc, review) => acc + review.calificacion, 0) /
          totalReviews).toFixed(2)
      : 0;

  const reviewCountByRating = Array(5)
    .fill(0)
    .map((_, index) => {
      const rating = 5 - index;
      const count = reviews.filter((review) => review.calificacion === rating)
        .length;
      const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
      return { rating, count, percentage };
    });

  return (
    <Box>
      <Typography variant="h6">Valoración media</Typography>
      <Typography variant="body1">{averageRating}</Typography>
      <Box my={2}>
        {reviewCountByRating.map(({ rating, percentage }) => (
          <Box key={rating}>
            <Typography>
              {rating} Estrellas
            </Typography>
            <LinearProgress value={percentage} variant="determinate" />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ReviewStats;
