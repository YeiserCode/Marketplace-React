# Plataforma de Comercio Personalizada

Este proyecto es una aplicación web de comercio electrónico personalizada, construida con React y Firebase. La aplicación permite a los usuarios ver y comprar productos y a los administradores agregar nuevos productos.

## Características

- Visualización de productos
- Ver Datalles del Producto
- Agregar productos al carrito de compras
- Eliminar productos del carrito de compras
- Interfaz de administración para agregar nuevos productos a la tienda

## Requisitos previos

- Node.js instalado en tu máquina (https://nodejs.org/)
- Cuenta de Firebase con un proyecto configurado (https://firebase.google.com/)

## Configuración del proyecto

1. Clona este repositorio en tu máquina local.
2. Ejecuta `npm install` en la terminal para instalar las dependencias del proyecto.
3. Crea un archivo llamado `firebaseConfig.js` en la carpeta `src`.
4. Copia la configuración de tu proyecto de Firebase en `firebaseConfig.js`. Asegúrate de que se vea así:

```javascript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  // Añade aquí la configuración de tu proyecto de Firebase
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
