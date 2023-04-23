import React from 'react';

const Producto = ({ producto, agregarAlCarrito }) => {
  return (
    <div className="producto">
      <h2>{producto.nombre}</h2>
      <p>{producto.descripcion}</p>
      <button onClick={() => agregarAlCarrito(producto)}>Agregar al carrito</button>
    </div>
  );
};

export default Producto;
