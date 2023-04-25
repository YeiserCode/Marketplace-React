import React, { useState, useMemo } from 'react';
import Fuse from 'fuse.js';
import Producto from './Producto';
import { useNavigate } from 'react-router-dom';
import { Pagination } from '@mui/material';

const Productos = ({ productos, agregarAlCarrito, search, carrito }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 2; // Numero de Productos Por Pagina

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

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="productos">
      {currentProducts.map((producto) => (
        <Producto
          key={producto.id}
          producto={producto}
          agregarAlCarrito={(producto) => agregarProductoAlCarrito(producto)}
          handleClick={() => handleClick(producto.id)}
          carrito={carrito}
        />
      ))}
      <Pagination
        count={Math.ceil(filteredProducts.length / productsPerPage)}
        page={currentPage}
        onChange={(event, value) => handlePageChange(value)}
        color="primary"
      />
    </div>
  );
};

export default Productos;
