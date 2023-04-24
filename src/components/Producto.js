import React from 'react';

const Producto = ({ producto, agregarAlCarrito }) => {
  const handleAgregarAlCarrito = (event) => {
    event.stopPropagation();
    agregarAlCarrito(producto);
  };

  return (
    <div className="producto">
      <img src={producto.imagen} alt={producto.nombre} />
      <h3>{producto.nombre}</h3>
      <p>{producto.precio}€</p>
      <button onClick={handleAgregarAlCarrito}>Agregar al carrito</button>
    </div>
  );
};

export default Producto;
