import './App.css';
import Header from './components/Header';
import Productos from './components/Productos';
import Carrito from './components/Carrito';
import Footer from './components/Footer';
import Admin from './components/Admin';
import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

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
      <Header />
      <Admin />
      <Productos productos={productos} agregarAlCarrito={agregarAlCarrito} />
      <Carrito carrito={carrito} eliminarDelCarrito={eliminarDelCarrito} />
      <Footer />
    </div>
  );
};

export default App;
