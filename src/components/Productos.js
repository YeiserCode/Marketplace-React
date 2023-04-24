import React, { useMemo } from 'react';
import Fuse from 'fuse.js';
import Producto from './Producto';
import { useNavigate } from 'react-router-dom';

const Productos = ({ productos, agregarAlCarrito, search }) => {
  const navigate = useNavigate();

  const agregarProductoAlCarrito = (producto) => {
    agregarAlCarrito(producto);
    navigate(`/carrito/agregado/${producto.id}`);
  };

  const handleClick = (productoId) => {
    navigate(`/product/${productoId}`);
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
        <Producto
          key={producto.id}
          producto={producto}
          agregarAlCarrito={(producto) => agregarProductoAlCarrito(producto)}
          handleClick={() => handleClick(producto.id)}
        />
      ))}
    </div>
  );
};

export default Productos;
