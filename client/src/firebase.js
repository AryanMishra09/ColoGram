// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "mern-blog-c3f59.firebaseapp.com",
  projectId: "mern-blog-c3f59",
  storageBucket: "mern-blog-c3f59.appspot.com",
  messagingSenderId: "773984033779",
  appId: "1:773984033779:web:0b9f92a4f5295b805ed086"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
