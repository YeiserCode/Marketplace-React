import React, { useState, useEffect } from 'react';
import { db, storage } from '../../config/firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  CircularProgress,
  Checkbox,
} from '@mui/material';

const AddProducts = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [urlsImagenes, setUrlsImagenes] = useState([]);
  const [indicePortada, setIndicePortada] = useState(0);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [enOferta, setEnOferta] = useState(false);

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

  useEffect(() => {
    let timer;
    if (message) {
      timer = setTimeout(() => {
        setMessage('');
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [message]);

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
    setLoading(true);
    setMessage('');

    if (
      !nombre.trim() ||
      !descripcion.trim() ||
      !precio.trim() ||
      !categoriaSeleccionada ||
      urlsImagenes.length === 0
    ) {
      setMessage('Por favor, complete todos los campos.');
      setLoading(false);
      return;
    }

    try {
      await addDoc(collection(db, 'productos'), {
        nombre,
        descripcion,
        precio: parseFloat(precio),
        imagenPortada: urlsImagenes[indicePortada],
        imagenes: urlsImagenes,
        categoria: categoriaSeleccionada,
        oferta: enOferta,
      });

      setMessage('Producto agregado correctamente.');
      setNombre('');
      setDescripcion('');
      setPrecio('');
      setUrlsImagenes([]);
      setIndicePortada(0);
      setCategoriaSeleccionada('');
    } catch (error) {
      setMessage('Error al agregar el producto. Por favor, inténtalo de nuevo.');
      console.error('Error al agregar el producto:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Agregar Producto
      </Typography>
      <form onSubmit={agregarProducto}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nombre"
              variant="outlined"
              fullWidth
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Descripción"
              variant="outlined"
              fullWidth
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Precio"
              variant="outlined"
              fullWidth
              type="number"
              inputProps={{ step: 0.01 }}
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel htmlFor="categoria">Categoría</InputLabel>
            <Select
              labelId="categoria-label"
              id="categoria"
              fullWidth
              value={categoriaSeleccionada}
              onChange={(e) => setCategoriaSeleccionada(e.target.value)}
            >
              <MenuItem value="">
                <em>-- Seleccione una categoría --</em>
              </MenuItem>
              {categorias.map((categoria) => (
                <MenuItem key={categoria.id} value={categoria.id}>
                  {categoria.nombre}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
          <FormControlLabel
             control={
              <Checkbox
              checked={enOferta}
              onChange={(e) => setEnOferta(e.target.checked)}
              name="enOferta"
              color="primary"
              />
            }
            label="En oferta"
            />
          </Grid>  
          <Grid item xs={12}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="contained-button-file"
              multiple
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" color="primary" component="span">
                Subir imágenes
              </Button>
            </label>
          </Grid>
          {urlsImagenes.length > 0 && (
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  Selecciona una imagen de portada:
                </FormLabel>
                <RadioGroup
                  aria-label="portada"
                  name="portada"
                  value={indicePortada}
                  onChange={handlePortadaChange}
                  row
                >
                  {urlsImagenes.map((url, index) => (
                    <FormControlLabel
                      key={index}
                      value={index}
                      control={<Radio />}
                      label={
                        <img
                          src={url}
                          alt={`Imagen ${index + 1}`}
                          width="100"
                          height="100"
                          style={{ objectFit: 'cover', margin: '0 8px' }}
                        />
                      }
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
          )}
          <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Agregar'}
            </Button>
          </Grid>
        </Grid>
        </form>
      {message && (
        <Typography
          variant="subtitle1"
          color={message.startsWith('Error') ? 'error' : 'success'}
          style={{ marginTop: '1rem' }}
        >
          {message}
        </Typography>
      )}
    </Container>
  );
};

export default AddProducts;
