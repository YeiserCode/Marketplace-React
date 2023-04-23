import React from 'react';
import Producto from './Producto';
import { Link } from 'react-router-dom';

const Productos = ({ productos, agregarAlCarrito }) => {
  return (
    <div className="productos">
      {productos.map((producto) => (
        <Link to={`/product/${producto.id}`} key={producto.id} style={{ textDecoration: 'none' }}>
          <Producto producto={producto} agregarAlCarrito={agregarAlCarrito} />
        </Link>
      ))}
    </div>
  );
};

export default Productos;
