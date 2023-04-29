import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../../config/firebaseConfig';
import ReviewItem from './ReviewItem';
import ReviewForm from './ReviewForm';
import ReviewStats from './ReviewStats';
import { useTranslation } from 'react-i18next';

const Reviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchReviews = async () => {
      const reviewsRef = collection(db, 'reviews');
      const q = query(reviewsRef, where('productId', '==', productId));
      const querySnapshot = await getDocs(q);

      const fetchedReviews = [];
      querySnapshot.forEach((doc) => {
        fetchedReviews.push({ id: doc.id, ...doc.data() });
      });

      setReviews(fetchedReviews);
    };

    fetchReviews();
  }, [productId]);

  return (
    <Box mt={3}>
      <Typography variant="h6" mb={2}>
        {t('Reviews')}
      </Typography>
      <ReviewStats reviews={reviews} />
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))
      ) : (
        <Typography variant="body1">
          {t('noReviews')}
        </Typography>
      )}
      <ReviewForm productId={productId} />
    </Box>
  );
};

export default Reviews;
