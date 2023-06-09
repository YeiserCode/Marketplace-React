# Plataforma de Comercio Personalizada

Este proyecto es una aplicación web de comercio electrónico personalizada, construida con React y Firebase. La aplicación permite a los usuarios ver y comprar productos y a los administradores agregar nuevos productos.

## Características

- Visualización de productos
- Ver Datalles del producto
- Ver Imagen del producto
- Reseñas con calificaciones en los productos
. Reseñas destacadas
- Valoración media y Distribución de calificaciones
- Preguntas en los Productos 
- Paginación para los productos
- Agregar productos al carrito de compras
- Producto agregado al carrito
- Barra de búsqueda para buscar productos por nombre o descripción
- Eliminar productos del carrito de compras

## Características Admin
- Agregar nuevos productos a la tienda 
- Agregar categorias
- Visualizar cantidad de productos y categorias 

## Requisitos previos

- Node.js instalado en tu máquina (https://nodejs.org/)
- Cuenta de Firebase con un proyecto configurado (https://firebase.google.com/)
- Requisitos de Firebase Database, Storage, Authentication.

## Configuración del proyecto

1. Clona este repositorio en tu máquina local.
2. Ejecuta `npm install` en la terminal para instalar las dependencias del proyecto.
3. Crea un archivo llamado `firebaseConfig.js` en la carpeta `src`.
4. Copia la configuración de tu proyecto de Firebase en `firebaseConfig.js`. Asegúrate de que se vea así:

```javascript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  // Añade aquí la configuración de tu proyecto de Firebase
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
