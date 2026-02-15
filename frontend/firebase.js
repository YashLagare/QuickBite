// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTSD9jDLPalPtUCrjQqmuOs5D74QbjmW8",
  authDomain: "quickbite-cadbc.firebaseapp.com",
  projectId: "quickbite-cadbc",
  storageBucket: "quickbite-cadbc.firebasestorage.app",
  messagingSenderId: "853853228087",
  appId: "1:853853228087:web:3e6b70555bf1cd725143b2",
  measurementId: "G-EZ46XL552M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
export { app, auth };

