import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAcXAP8cnKRNBi63nPfIljJM52xbYDKD1I",
  authDomain: "budgetwise-final.firebaseapp.com",
  projectId: "budgetwise-final",
  storageBucket: "budgetwise-final.firebasestorage.app",
  messagingSenderId: "692188293990",
  appId: "1:692188293990:web:b5315b62a37972ef5076a7",
  measurementId: "G-57SJ2WM22Q"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
