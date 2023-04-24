import React from 'react';
import Producto from './Producto';
import ProductoEnlace from './ProductoEnlace';

const Productos = ({ productos, agregarAlCarrito }) => {
  return (
    <div className="productos">
      {productos.map((producto) => (
        <ProductoEnlace to={`/product/${producto.id}`} key={producto.id}>
          <Producto producto={producto} agregarAlCarrito={agregarAlCarrito} />
        </ProductoEnlace>
      ))}
    </div>
  );
};

export default Productos;
