import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, TextField, Box, Typography } from '@mui/material';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../../config/firebaseConfig';
import { useTranslation } from 'react-i18next';

const QuestionForm = ({ productId }) => {
  const { t } = useTranslation();
  const [question, setQuestion] = useState('');
  const userState = useSelector((state) => state.user);
  const [error, setError] = useState('');

  const isLoggedIn = !userState.loading && userState.uid && userState.name;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      setError(t('loginToAsk'));
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
      setError(t('submitError'));
    }
  };

  return (
    <>
      {isLoggedIn && (
        <Box component="form" onSubmit={handleSubmit}>
          <Typography variant="h6">{t('askQuestion')}</Typography>
          <TextField
            fullWidth
            required
            multiline
            rows={3}
            margin="normal"
            label={t('writeQuestion')}
            variant="outlined"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary">
            {t('submitQuestion')}
          </Button>
          {error && <Typography color="error">{error}</Typography>}
        </Box>
      )}
      {!isLoggedIn && !userState.loading && (
        <Box>
          <Typography color="error">
            {t('loginToAsk')}
          </Typography>
        </Box>
      )}
    </>
  );
};

export default QuestionForm;
