import React, { useState } from 'react';
import { Typography} from '@mui/material';
import AddCategoryForm from './AddCategoryForm';

const AddCategory = () => {
  const [message, setMessage] = useState('');

  return (
    <div>
      <AddCategoryForm setMessage={setMessage} />
      {message && (
        <Typography
          variant="body1"
          color={message.startsWith('Error') ? 'error' : 'success'}
        >
          {message}
        </Typography>
      )}
    </div>
  );
};

export default AddCategory;
