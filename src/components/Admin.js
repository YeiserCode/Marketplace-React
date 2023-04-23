import React, { useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const Admin = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');

  const agregarProducto = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, 'productos'), {
      nombre,
      descripcion,
      precio: parseFloat(precio),
    });

    setNombre('');
    setDescripcion('');
    setPrecio('');
  };

  return (
    <div>
      <h2>Agregar Producto</h2>
      <form onSubmit={agregarProducto}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <input
          type="number"
          step="0.01"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
};

export default Admin;
