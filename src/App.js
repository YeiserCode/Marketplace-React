import './App.css';
import Header from './components/Header';
import Productos from './components/Productos';
import Carrito from './components/Carrito';
import Footer from './components/Footer';
import Admin from './components/admin/Admin';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import ProductDetails from './components/ProductDetails';
import CarritoItemAgregado from './components/CarritoItemAgregado';
import Categoria from './components/Categoria';
import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';

const AppContent = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerProductos = async () => {
      const productosSnapshot = await getDocs(collection(db, 'productos'));
      const productosArray = productosSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProductos(productosArray);
    };

    obtenerProductos();
  }, []);

  useEffect(() => {
    const obtenerCategorias = async () => {
      const categoriasSnapshot = await getDocs(collection(db, 'categorias'));
      const categoriasArray = categoriasSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCategorias(categoriasArray);
    };

    obtenerCategorias();
  }, []);

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, { ...producto }]);
    navigate(`/carrito/agregado/${producto.id}`);
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
      <Routes>
        <Route
          path="/"
          element={<Productos productos={productos} agregarAlCarrito={agregarAlCarrito} search={search} />}
        />
        <Route
          path="/productos"
          element={<Productos productos={productos} agregarAlCarrito={agregarAlCarrito} search={search} />}
        />
        <Route
          path="/carrito/agregado/:productId"
          element={<CarritoItemAgregado findProductById={(productId) => productos.find((producto) => producto.id === productId)} />}
        />
        <Route path="/carrito" element={<Carrito carrito={carrito} eliminarDelCarrito={eliminarDelCarrito} />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:productId" element={<ProductDetails productos={productos} />} />
        <Route path="/categorias/:categoriaId" element={<Categoria productos={productos} agregarAlCarrito={agregarAlCarrito} />} />
      </Routes>
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </div>
  );
};

export default App;
