import React from 'react';
import Producto from './Producto';

const Productos = ({ productos, agregarAlCarrito }) => {
  return (
    <div className="productos">
      {productos.map((producto) => (
        <Producto key={producto.id} producto={producto} agregarAlCarrito={agregarAlCarrito} />
      ))}
    </div>
  );
};

export default Productos;
