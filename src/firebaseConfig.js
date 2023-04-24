import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';

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
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
