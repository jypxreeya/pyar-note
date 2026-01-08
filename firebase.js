
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoxonbRlXGAkIj78S1hpxz00PYiswiHAg",
  authDomain: "pyar-note.firebaseapp.com",
  projectId: "pyar-note",
  storageBucket: "pyar-note.firebasestorage.app",
  messagingSenderId: "241060572422",
  appId: "1:241060572422:web:825fcfb7f02fdabfd1c287",
  measurementId: "G-HKZLF379VG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app)
export const db = getFirestore(app)