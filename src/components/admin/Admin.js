import React, { useState } from 'react';
import AgregarProductos from './AgregarProductos';
import AgregarCategoria from './AgregarCategoria';

const Admin = () => {
  const [selectedMenu, setSelectedMenu] = useState('agregarProducto');

  return (
    <div>
      <h2>Dashboard Administrativo</h2>
      <nav>
        <button onClick={() => setSelectedMenu('agregarProducto')}>
          Agregar Producto
        </button>
        <button onClick={() => setSelectedMenu('agregarCategoria')}>
          Agregar Categoría
        </button>
      </nav>
      {selectedMenu === 'agregarProducto' && <AgregarProductos />}
      {selectedMenu === 'agregarCategoria' && <AgregarCategoria />}
    </div>
  );
};

export default Admin;
