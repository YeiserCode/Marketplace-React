import './App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { setUser } from './store/userSlice';

import theme from './theme/theme';
import useProducts from './hooks/useProducts';
import useCategories from './hooks/useCategories';
import AppRoutes from './routes/AppRoutes';

const AppContent = () => {
  const [productos] = useProducts();
  const [categorias] = useCategories();
  const [carrito, setCarrito] = useState([]);
  const [search, setSearch] = useState('');

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, { ...producto }]);
  };

  const eliminarDelCarrito = (productoAEliminar) => {
    const nuevoCarrito = carrito.filter((producto) => producto.id !== productoAEliminar.id);
    setCarrito(nuevoCarrito);
  };

  const handleSearchChange = (value) => {
    setSearch(value);
  };

  return (
    <>
      <Header />
      <Navbar onSearch={handleSearchChange} categorias={categorias} />
      <main className="main-content">
        <AppRoutes
          productos={productos}
          carrito={carrito}
          search={search}
          agregarAlCarrito={agregarAlCarrito}
          eliminarDelCarrito={eliminarDelCarrito}
          handleSearchChange={handleSearchChange}
          categorias={categorias}
        />
      </main>
      <Footer />
    </>
  );
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUserFromLocalStorage = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        dispatch(setUser(user));
      }
    };

    loadUserFromLocalStorage();
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
};

export default App;
