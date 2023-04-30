import React from 'react';
import { Select, MenuItem } from '@mui/material';

const WarrantyMonthsPicker = ({ selectedWarrantyMonths, setSelectedWarrantyMonths }) => {
  const handleChange = (event) => {
    setSelectedWarrantyMonths(event.target.value);
  };

  return (
    <Select
      value={selectedWarrantyMonths}
      onChange={handleChange}
      fullWidth
      label="Meses de Garantía"
    >
      {[...Array(12).keys()].map((i) => (
        <MenuItem key={i} value={i + 1}>
          {i + 1} Mes{(i + 1) > 1 ? 'es' : ''}
        </MenuItem>
      ))}
    </Select>
  );
};

export default WarrantyMonthsPicker;
