import React from 'react';

const Carrito = ({ carrito, eliminarDelCarrito }) => {
  return (
    <div className="carrito">
      <h2>Carrito de compras</h2>
      {carrito.map((producto) => (
        <div key={producto.id}>
          {/* Mostrar la cantidad de productos junto al nombre del producto */}
          <p>
            {producto.nombre} - Cantidad: {producto.cantidad}
          </p>
          <button onClick={() => eliminarDelCarrito(producto)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
};

export default Carrito;
