// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
 apiKey: "AIzaSyA_4f3RINGgJpfx2RM6v115sXNlNkmOZL4",
  authDomain: "first-project-f6166.firebaseapp.com",
  projectId: "first-project-f6166",
  storageBucket: "first-project-f6166.firebasestorage.app",
  messagingSenderId: "924959831166",
  appId: "1:924959831166:web:cdedd1474d07388045542f",
  measurementId: "G-NXDBPBSQHD"
};

// Initialize Firebase
let firebase_app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebase_app;
