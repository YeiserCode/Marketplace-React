import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCPIdjPIgyIlB37FDAIyXjz7I9cBeMjkGg",
  authDomain: "prueba-d3101.firebaseapp.com",
  projectId: "prueba-d3101",
  storageBucket: "prueba-d3101.appspot.com",
  messagingSenderId: "247670592569",
  appId: "1:247670592569:web:f6c7024478dda91aa469e8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };