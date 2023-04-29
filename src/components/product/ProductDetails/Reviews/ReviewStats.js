import React from 'react';
import { Typography, Box, LinearProgress, Grid, Rating, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import FeaturedReviews from './FeaturedReviews';

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

  const progressBarVariants = (startValue, endValue) => ({
    hidden: { width: `${startValue}%` },
    visible: {
      width: `${endValue}%`,
      transition: {
        duration: 1,
        ease: 'easeInOut',
      },
    },
  });

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
            Valoración media
          </Typography>
          <Stack spacing={1}>
            <Box display="flex" alignItems="center">
              <Rating
                name="average-rating"
                value={parseFloat(averageRating)}
                precision={0.1}
                readOnly
              />
              <Typography variant="h6" ml={1}>
                {averageRating}
              </Typography>
            </Box>
            <Typography variant="subtitle1">
              {totalReviews} Reseña{totalReviews === 1 ? '' : 's'}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
            Distribución de calificaciones
          </Typography>
          {reviewCountByRating.map(({ rating, count, percentage }) => (
            <Box key={rating} mb={1}>
              <Grid container alignItems="center">
                <Grid item xs={3}>
                  <Typography>{rating} Estrellas</Typography>
                </Grid>
                <Grid item xs={7}>
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={progressBarVariants(0, percentage)}
                  >
                    <LinearProgress value={100} variant="determinate" />
                  </motion.div>
                </Grid>
                <Grid item xs={2}>
                  <Typography align="right">{count}</Typography>
                </Grid>
              </Grid>
            </Box>
          ))}
        </Grid>
      </Grid>
      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Reseñas destacadas
        </Typography>
        <FeaturedReviews reviews={reviews} />
      </Box>
    </Box>
  );
};

export default ReviewStats;
