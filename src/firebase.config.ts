// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7LEGmtIFsrVd73f0gHuK-Mf75gd2Cph0",
  authDomain: "dash-apartment.firebaseapp.com",
  projectId: "dash-apartment",
  storageBucket: "dash-apartment.appspot.com",
  messagingSenderId: "938995189755",
  appId: "1:938995189755:web:cb4f22ec5064dee45d6d5e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// const auth = getAuth();

export { db, auth };