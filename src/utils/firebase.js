// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6IEexqLaVEGp337M09eM7hZ7YbRjdXlE",
  authDomain: "netflixgpt-639cf.firebaseapp.com",
  projectId: "netflixgpt-639cf",
  storageBucket: "netflixgpt-639cf.appspot.com",
  messagingSenderId: "564610749490",
  appId: "1:564610749490:web:fbd4fe6ce1fcc3d5f4d82b",
  measurementId: "G-60T1YBZN27"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();