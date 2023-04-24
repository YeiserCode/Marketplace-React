import React from 'react';

const Producto = ({ producto, agregarAlCarrito }) => {
  console.log('Producto:', producto);
  const handleAgregarAlCarrito = (event) => {
    event.stopPropagation();
    agregarAlCarrito(producto);
  };

  console.log('Imagen de portada URL:', producto.portada);

  return (
    <div className="producto" style={{ padding: '1rem', borderRadius: '4px', border: '1px solid #ccc', margin: '1rem' }}>
      <img src={producto.imagenPortada} alt={producto.nombre} style={{ width: '100%', height: '200px', objectFit: 'contain', borderRadius: '4px' }} />
      <h3>{producto.nombre}</h3>
      <p>{producto.descripcion}</p>
      <p>Precio: ${producto.precio}</p>
      <button onClick={handleAgregarAlCarrito}>Agregar al carrito</button>
    </div>
  );
};

export default Producto;
