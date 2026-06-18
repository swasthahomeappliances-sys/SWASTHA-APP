
import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDK0PsV4uTnHN35ZJtvCEF6-DOe66zTgBA",
  authDomain: "swastha-8a059.firebaseapp.com",
  projectId: "swastha-8a059",
  storageBucket: "swastha-8a059.firebasestorage.app",
  messagingSenderId: "357594417646",
  appId: "1:357594417646:web:d76b32e391f74c53ade6ff",
  measurementId: "G-ZE2RJPG65B",
};

const app = initializeApp(
  firebaseConfig
);

export const auth =
  getAuth(app);

export const googleProvider =
  new GoogleAuthProvider();

export default app;