import React from 'react';
import { storage } from '../../../config/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Button, Grid } from '@mui/material';

const ImageUploader = ({ setUrlsImagenes, setIndicePortada }) => {
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

  return (
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
  );
};

export default ImageUploader;
