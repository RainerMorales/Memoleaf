// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getFirestore}from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBw3MKKZLn4QcHHudgwICnckhlFmUnntP0",
  authDomain: "task-manager-9a5eb.firebaseapp.com",
  projectId: "task-manager-9a5eb",
  storageBucket: "task-manager-9a5eb.firebasestorage.app",
  messagingSenderId: "158912950977",
  appId: "1:158912950977:web:713c7579aeed848b419a40",
  measurementId: "G-BJEQPWJT2D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app)
