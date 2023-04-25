import React, { useState, useEffect } from 'react';
import { db, storage } from '../../firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const AgregarProductos = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [urlsImagenes, setUrlsImagenes] = useState([]);
  const [indicePortada, setIndicePortada] = useState(0);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');

  useEffect(() => {
    const obtenerCategorias = async () => {
      const querySnapshot = await getDocs(collection(db, 'categorias'));
      const categoriasArray = [];
      querySnapshot.forEach((doc) => {
        categoriasArray.push({ id: doc.id, ...doc.data() });
      });
      setCategorias(categoriasArray);
    };

    obtenerCategorias();
  }, []);

  const handleFileChange = async (e) => {
    const files = e.target.files;
    const imagesPromises = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const storageRef = ref(storage, `productos/${file.name}`);
      const uploadTask = uploadBytes(storageRef, file);
      imagesPromises.push(uploadTask);
    }

    try {
      const uploadedImages = await Promise.all(imagesPromises);
      const downloadURLs = await Promise.all(
        uploadedImages.map((img) => getDownloadURL(img.ref))
      );
      setUrlsImagenes(downloadURLs);
      setIndicePortada(0);
    } catch (error) {
      console.error('Error al cargar imágenes:', error);
    }
  };

  const handlePortadaChange = (e) => {
    setIndicePortada(Number(e.target.value));
  };

  const agregarProducto = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, 'productos'), {
      nombre,
      descripcion,
      precio: parseFloat(precio),
      imagenPortada: urlsImagenes[indicePortada],
      imagenes: urlsImagenes,
      categoria: categoriaSeleccionada,
    });

    setNombre('');
    setDescripcion('');
    setPrecio('');
    setUrlsImagenes([]);
    setIndicePortada(0);
    setCategoriaSeleccionada('');
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
        <input type="file" multiple onChange={handleFileChange} />
        {urlsImagenes.length > 0 && (
          <div>
            <p>Selecciona una imagen de portada:</p>
            {urlsImagenes.map((url, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <img src={url} alt={`Imagen ${index + 1}`} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
              <input
                type="radio"
                name="portada"
                value={index}
                checked={indicePortada === index}
                onChange={handlePortadaChange}
              />
            </div>
          ))}
        </div>
      )}
      <div>
        <label htmlFor="categoria">Categoría:</label>
        <select
          name="categoria"
          value={categoriaSeleccionada}
          onChange={(e) => setCategoriaSeleccionada(e.target.value)}
        >
          <option value="">-- Seleccione una categoría --</option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nombre}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Agregar</button>
    </form>
  </div>
);
};

export default AgregarProductos;
