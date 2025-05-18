// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optionalmk
const firebaseConfig = {
  apiKey: "AIzaSyAMyskPXguh94JTYe4jR6W5KvhUY0jCHuQ",
  authDomain: "todo-app-6ef4a.firebaseapp.com",
  projectId: "todo-app-6ef4a",
  storageBucket: "todo-app-6ef4a.firebasestorage.app",
  messagingSenderId: "130405544373",
  appId: "1:130405544373:web:f06027b1aea4a7251129fc",
  measurementId: "G-E1K3ZRL7B7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db =getFirestore(app)
