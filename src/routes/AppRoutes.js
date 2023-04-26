import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Productos from '../components/product/Products';
import Carrito from '../components/cart/Cart';
import Admin from '../components/admin/Dashboard/Dashboard';
import Login from '../components/login/Login';
import Profile from '../components/user/UserProfile';
import Register from '../components/register/Register';
import ProductDetails from '../components/product/ProductDetails';
import CarritoItemAgregado from '../components/cart/AddedCartProduct';
import Categoria from '../components/category/Category';

const AppRoutes = ({ productos, carrito, search, agregarAlCarrito, eliminarDelCarrito, handleSearchChange, categorias }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Productos productos={productos} agregarAlCarrito={agregarAlCarrito} search={search} carrito={carrito} />}
      />
      <Route
        path="/productos"
        element={<Productos productos={productos} agregarAlCarrito={agregarAlCarrito} search={search} carrito={carrito} />}
      />
      <Route
        path="/carrito/agregado/:productId"
        element={<CarritoItemAgregado findProductById={(productId) => productos.find((producto) => producto.id === productId)} />}
      />
      <Route path="/carrito" element={<Carrito carrito={carrito} eliminarDelCarrito={eliminarDelCarrito} />} />
      <Route path="/admin" element={<Admin productos={productos} categorias={categorias} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/register" element={<Register />} />
      <Route path="/product/:productId" element={<ProductDetails productos={productos} />} />
      <Route path="/categorias/:categoriaId" element={<Categoria productos={productos} agregarAlCarrito={agregarAlCarrito} carrito={carrito} />} />
    </Routes>
  );
};

export default AppRoutes;
