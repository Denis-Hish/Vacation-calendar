// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const API_KEY = import.meta.env.VITE_API_KEY;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: 'vacation-calendar-af2cd.firebaseapp.com',
  projectId: 'vacation-calendar-af2cd',
  storageBucket: 'vacation-calendar-af2cd.firebasestorage.app',
  messagingSenderId: '815296214562',
  appId: '1:815296214562:web:038b8256c0e8b49d557c7b',
  measurementId: 'G-9WJC9B6Q7G',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const googleAuthProvider = new GoogleAuthProvider();
