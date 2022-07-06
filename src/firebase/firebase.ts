import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAZgm-2pnaNth82jxVXsB7VsmC6QdKXmYo",
  authDomain: "fir-auth-42445.firebaseapp.com",
  projectId: "fir-auth-42445",
  storageBucket: "fir-auth-42445.appspot.com",
  messagingSenderId: "477748503433",
  appId: "1:477748503433:web:218d6ced6a2641865bf758",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
