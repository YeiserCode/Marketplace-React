import React, { useState, useMemo } from 'react';
import Fuse from 'fuse.js';
import Producto from './Product';
import { useNavigate } from 'react-router-dom';
import { Pagination, Grid, Container } from '@mui/material';

const Products = ({ productos, agregarAlCarrito, search, carrito, addToWishlist, wishlist }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

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
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Grid container spacing={4}>
        {currentProducts.map((producto) => (
          <Producto
            key={producto.id}
            producto={producto}
            agregarAlCarrito={(producto) => agregarProductoAlCarrito(producto)}
            handleClick={() => handleClick(producto.id)}
            carrito={carrito}
            addToWishlist={addToWishlist}
            wishlist={wishlist}
          />
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(filteredProducts.length / productsPerPage)}
        page={currentPage}
        onChange={(event, value) => handlePageChange(value)}
        color="primary"
        sx={{ marginTop: 4, display: 'flex', justifyContent: 'center' }}
      />
    </Container>
  );
};

export default Products;
