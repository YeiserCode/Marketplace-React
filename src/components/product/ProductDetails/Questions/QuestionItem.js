import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const QuestionItem = ({ question }) => {
  const { userName, questionText, timestamp } = question;

  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle1" gutterBottom>
          {userName} preguntó:
        </Typography>
        <Typography variant="body1">{questionText}</Typography>
        <Box mt={1}>
          <Typography variant="caption">
            {timestamp.toDate().toLocaleString()}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default QuestionItem;
