import React, { useMemo } from 'react';
import Fuse from 'fuse.js';
import Producto from './Producto';
import ProductoEnlace from './ProductoEnlace';

const Productos = ({ productos, agregarAlCarrito, search }) => {
  const handleProductClick = (producto) => {
  };

  const fuse = useMemo(() => {
    const fuseOptions = {
      keys: ['nombre', 'descripcion'],
      includeScore: true,
      threshold: 0.3,
    };

    return new Fuse(productos, fuseOptions);
  }, [productos]);

  const searchResults = search ? fuse.search(search) : productos.map((producto) => ({ item: producto }));

  const filteredProducts = searchResults.map((result) => result.item);

  return (
    <div className="productos">
      {filteredProducts.map((producto) => (
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
