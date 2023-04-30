import React from 'react';
import { Box, Chip } from '@mui/material';

const ColorPicker = ({ selectedColors, setSelectedColors }) => {
  const commonColors = [
    '#000000',
    '#FFFFFF',
    '#FF0000',
    '#FFA500',
    '#FFFF00',
    '#008000',
    '#0000FF',
    '#800080',
    '#FFC0CB',
    '#808080',
    '#00FFFF',
    '#A52A2A',
  ];

  const handleColorSelection = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  return (
    <Box>
      {commonColors.map((color) => (
        <Chip
          key={color}
          style={{
            backgroundColor: color,
            margin: 2,
            border: selectedColors.includes(color)
              ? '2px solid #000'
              : 'none',
          }}
          onClick={() => handleColorSelection(color)}
        />
      ))}
    </Box>
  );
};

export default ColorPicker;
