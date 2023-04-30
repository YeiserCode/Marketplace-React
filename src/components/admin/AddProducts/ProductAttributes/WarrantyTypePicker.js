import React from 'react';
import { Select, MenuItem } from '@mui/material';

const WarrantyTypePicker = ({ selectedWarrantyType, setSelectedWarrantyType }) => {
  const handleChange = (event) => {
    setSelectedWarrantyType(event.target.value);
  };

  return (
    <Select
      value={selectedWarrantyType}
      onChange={handleChange}
      fullWidth
      label="Tipo de Garantía"
    >
      <MenuItem value="Sin Garantía">Sin Garantía</MenuItem>
      <MenuItem value="Garantía De Fábrica">Garantía De Fábrica</MenuItem>
      <MenuItem value="Garantía De La Tienda">Garantía De La Tienda</MenuItem>
    </Select>
  );
};

export default WarrantyTypePicker;
