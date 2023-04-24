import React from 'react';
import { ButtonBase } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProductoEnlace = ({ children, to }) => {
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.stopPropagation();
    navigate(to);
  };

  return (
    <ButtonBase onClick={handleClick} focusRipple>
      {children}
    </ButtonBase>
  );
};

export default ProductoEnlace;
