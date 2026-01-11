import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "budgetwise-4b846.firebaseapp.com",
  projectId: "budgetwise-4b846",
  storageBucket: "budgetwise-4b846.firebasestorage.app",
  messagingSenderId: "53911067852",
  appId: "1:53911067852:web:42220acba811a675aff669",
  measurementId: "G-N5CLP2T5WP"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
