import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductoEnlace = ({ children, to }) => {
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.stopPropagation();
    navigate(to);
  };

  return <div onClick={handleClick}>{children}</div>;
};

export default ProductoEnlace;
