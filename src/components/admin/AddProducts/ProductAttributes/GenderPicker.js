import React from 'react';
import { RadioGroup, FormControlLabel, Radio } from '@mui/material';

const GenderPicker = ({ selectedGender, setSelectedGender }) => {
  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  return (
    <RadioGroup row value={selectedGender} onChange={handleGenderChange}>
      <FormControlLabel value="Hombre" control={<Radio />} label="Hombre" />
      <FormControlLabel value="Mujer" control={<Radio />} label="Mujer" />
      <FormControlLabel value="Unisex" control={<Radio />} label="Unisex" />
    </RadioGroup>
  );
};

export default GenderPicker;
