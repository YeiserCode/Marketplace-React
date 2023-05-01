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
import withAdminAuth from './withAdminAuth';
import Wishlist from '../components/wishlist/Wishlist';

const AppRoutes = ({ productos, carrito, search, agregarAlCarrito, eliminarDelCarrito, handleSearchChange, categorias, wishlist, addToWishlist }) => {
  const AdminWithAuth = withAdminAuth(Admin);
  return (
    <Routes>
      <Route
        path="/"
        element={<Productos productos={productos} agregarAlCarrito={agregarAlCarrito} search={search} carrito={carrito}  wishlist={wishlist} addToWishlist={addToWishlist} />}
      />
      <Route
        path="/productos"
        element={<Productos productos={productos} agregarAlCarrito={agregarAlCarrito} search={search} carrito={carrito} wishlist={wishlist} addToWishlist={addToWishlist} />}
      />
      <Route
        path="/carrito/agregado/:productId"
        element={<CarritoItemAgregado findProductById={(productId) => productos.find((producto) => producto.id === productId)} />}
      />
      <Route path="/carrito" element={<Carrito carrito={carrito} eliminarDelCarrito={eliminarDelCarrito} />} />
      <Route path="/admin" element={<AdminWithAuth productos={productos} categorias={categorias} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/wishlist" element={<Wishlist wishlist={wishlist} addToWishlist={addToWishlist} />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/register" element={<Register />} />
      <Route path="/product/:productId" element={<ProductDetails productos={productos} />} />
      <Route path="/categorias/:categoriaId" element={<Categoria productos={productos} agregarAlCarrito={agregarAlCarrito} carrito={carrito} wishlist={wishlist} addToWishlist={addToWishlist} />} />
    </Routes>
  );
};

export default AppRoutes;
