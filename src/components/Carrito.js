import React from 'react';

const Carrito = ({ carrito, eliminarDelCarrito }) => {
  return (
    <div className="carrito">
      <h2>Carrito de compras</h2>
      {carrito.map((producto) => (
        <div key={producto.id}>
          <p>{producto.nombre}</p>
          <button onClick={() => eliminarDelCarrito(producto)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
};

export default Carrito;
