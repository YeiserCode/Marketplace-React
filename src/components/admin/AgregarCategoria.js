import React, { useState } from 'react';
import { db } from '../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const AgregarCategoria = () => {
  const [nombreCategoria, setNombreCategoria] = useState('');

  const agregarCategoria = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, 'categorias'), {
      nombre: nombreCategoria,
    });

    setNombreCategoria('');
  };

  return (
    <div>
      <h2>Agregar Categoría</h2>
      <form onSubmit={agregarCategoria}>
        <input
          type="text"
          placeholder="Nombre de la categoría"
          value={nombreCategoria}
          onChange={(e) => setNombreCategoria(e.target.value)}
        />
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
};

export default AgregarCategoria;
