import React, { useState, useEffect, useRef } from 'react';
import { TextField, Box, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const SearchBar = ({ onChange }) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      onChange(searchTerm);
    }, 500);

    return () => {
      clearTimeout(typingTimeoutRef.current);
    };
  }, [searchTerm, onChange]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Box mt={3} mb={3}>
      <TextField
        fullWidth
        label={t('searchProducts')}
        variant="outlined"
        onChange={handleSearch}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SearchBar;
