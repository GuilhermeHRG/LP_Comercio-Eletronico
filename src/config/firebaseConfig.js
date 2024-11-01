// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; 
import { getAuth } from "firebase/auth"; // Importa getAuth do Firebase

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWcR7uSpxyqMjdoHWQaXkXbyhegu8ZcZA",
  authDomain: "landing-page-30f5b.firebaseapp.com",
  projectId: "landing-page-30f5b",
  storageBucket: "landing-page-30f5b.appspot.com",
  messagingSenderId: "948571044388",
  appId: "1:948571044388:web:ce234c68966c012ebcb6b1",
  measurementId: "G-5JL0B82GTV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Inicializa o Firestore
const auth = getAuth(app); // Inicializa o Auth

// Exporta as variáveis que você precisa
export { db, analytics, auth }; // Exporte db, analytics e auth
