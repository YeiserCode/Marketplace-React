import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../../../config/firebaseConfig';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import QuestionForm from './QuestionForm';
import QuestionItem from './QuestionItem';
import { useTranslation } from 'react-i18next';

const Questions = () => {
    const { t } = useTranslation();
    const { productId } = useParams();
    const [questions, setQuestions] = useState([]);
    const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchQuestions = async () => {
      const q = query(
        collection(db, 'questions'),
        where('productId', '==', productId),
        orderBy('timestamp', 'desc')
      );
      const querySnapshot = await getDocs(q);

      const questionsData = [];
      querySnapshot.forEach((doc) => {
        questionsData.push({ id: doc.id, ...doc.data() });
      });

      setQuestions(questionsData);
    };

    fetchQuestions();
  }, [productId]);

  return (
    <Box mt={3}>
      <Typography variant="h5" gutterBottom>
        {t('Questions')}
      </Typography>
      <QuestionForm productId={productId} user={user} />
      {questions.map((question) => (
        <Box key={question.id} mb={2}>
          <QuestionItem question={question} />
        </Box>
      ))}
    </Box>
  );
};

export default Questions;
