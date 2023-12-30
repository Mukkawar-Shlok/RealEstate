// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realestate-3172b.firebaseapp.com",
  projectId: "realestate-3172b",
  storageBucket: "realestate-3172b.appspot.com",
  messagingSenderId: "708587837433",
  appId: "1:708587837433:web:2a9f473ce57dc099ec0f28"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);