import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Producto from './Producto';
import { useNavigate } from 'react-router-dom';

const Categoria = ({ agregarAlCarrito }) => {
  const { categoriaId } = useParams();
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const obtenerProductosPorCategoria = async () => {
      const q = query(
        collection(db, 'productos'),
        where('categoria', '==', categoriaId)
      );
      const productosSnapshot = await getDocs(q);
      const productosLista = productosSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setProductos(productosLista);
    };

    obtenerProductosPorCategoria();
  }, [categoriaId]);

  const agregarProductoAlCarrito = (producto) => {
    agregarAlCarrito(producto);
    navigate(`/carrito/agregado/${producto.id}`);
  };

  const handleClick = (productoId) => {
    navigate(`/product/${productoId}`);
  };

  return (
    <div className="productos">
      {productos.map((producto) => (
        <Producto
          key={producto.id}
          producto={producto}
          agregarAlCarrito={(producto) => agregarProductoAlCarrito(producto)}
          handleClick={() => handleClick(producto.id)}
        />
      ))}
    </div>
  );
};

export default Categoria;
