import React from 'react';
import { Typography, Box, Card, CardContent } from '@mui/material';
import Rating from '@mui/material/Rating';

const FeaturedReviews = ({ reviews }) => {
  const maxFeaturedReviews = 3;

  const featuredReviews = reviews
    .sort((a, b) => b.votosUtiles - a.votosUtiles)
    .slice(0, maxFeaturedReviews);

  return (
    <Box>
      {featuredReviews.map((review, index) => (
        <Box key={index} mb={2}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="h6">{review.titulo}</Typography>
                <Rating value={review.calificacion} readOnly />
              </Box>
              <Typography variant="subtitle1">{review.user}</Typography>
              <Typography variant="body1">{review.comentario}</Typography>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  );
};

export default FeaturedReviews;
