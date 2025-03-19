// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCju-9NEdNsWbFErYeozU95rvnCzBTBuEU",
  authDomain: "ai-travel-planner-app-c9882.firebaseapp.com",
  projectId: "ai-travel-planner-app-c9882",
  storageBucket: "ai-travel-planner-app-c9882.firebasestorage.app",
  messagingSenderId: "686384246066",
  appId: "1:686384246066:web:cf28e1421ac878d7f27b2b",
  measurementId: "G-1P4ZBREJ9K"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
