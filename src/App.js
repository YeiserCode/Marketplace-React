import './App.css';
import Header from './components/Header';
import Productos from './components/Productos';
import Carrito from './components/Carrito';
import Footer from './components/Footer';
import Admin from './components/Admin';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import ProductDetails from './components/ProductDetails';
import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const obtenerProductos = async () => {
      const productosSnapshot = await getDocs(collection(db, 'productos'));
      const productosArray = productosSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProductos(productosArray);
    };

    obtenerProductos();
  }, []);

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  const eliminarDelCarrito = (productoAEliminar) => {
    const nuevoCarrito = carrito.filter((producto) => producto.id !== productoAEliminar.id);
    setCarrito(nuevoCarrito);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={<Productos productos={productos} agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/productos" element={<Productos productos={productos} agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
        </Routes>
        <Carrito carrito={carrito} eliminarDelCarrito={eliminarDelCarrito} />
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
