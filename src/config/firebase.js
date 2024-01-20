// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQA23Sgre2708mFqf9uowhoPLklabG_1c",
  authDomain: "chat-application-24e1b.firebaseapp.com",
  projectId: "chat-application-24e1b",
  storageBucket: "chat-application-24e1b.appspot.com",
  messagingSenderId: "67639732985",
  appId: "1:67639732985:web:4d143d52ae2f6bdbbf1028",
  measurementId: "G-0D35Y059F6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);