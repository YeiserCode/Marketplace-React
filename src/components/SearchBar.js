import React, { useState, useEffect, useRef } from 'react';
import { TextField, Box, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';

const SearchBar = ({ onChange }) => {
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
        label="Buscar productos"
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
