import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAryroydHV8V0lBiSn0KLrmmX3YV8YdYE",
  authDomain: "fir-auth-service-ce2b5.firebaseapp.com",
  projectId: "fir-auth-service-ce2b5",
  storageBucket: "fir-auth-service-ce2b5.firebasestorage.app",
  messagingSenderId: "597381978941",
  appId: "1:597381978941:web:d215e0ae9680491c538354",
  measurementId: "G-KXQG3XLP3N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
