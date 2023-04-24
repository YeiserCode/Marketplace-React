import React from 'react';
import Producto from './Producto';
import ProductoEnlace from './ProductoEnlace';

const Productos = ({ productos, agregarAlCarrito }) => {
  const handleProductClick = (producto) => {
    // Implementa aquí la lógica para manejar el clic en el producto, por ejemplo, navegando a la página de detalles del producto
  };

  return (
    <div className="productos">
      {productos.map((producto) => (
        <ProductoEnlace to={`/product/${producto.id}`} key={producto.id}>
          <Producto
            producto={producto}
            agregarAlCarrito={agregarAlCarrito}
            onProductClick={handleProductClick}
          />
        </ProductoEnlace>
      ))}
    </div>
  );
};

export default Productos;
