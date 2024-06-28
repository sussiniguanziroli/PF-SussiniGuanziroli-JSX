// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuXowkFD-eq_hl9v6bnNNAKyV_LoS54uk",
  authDomain: "spirit-drinks.firebaseapp.com",
  projectId: "spirit-drinks",
  storageBucket: "spirit-drinks.appspot.com",
  messagingSenderId: "835531366295",
  appId: "1:835531366295:web:aff752aa1fe687721e6ed2",
  measurementId: "G-Y8M18HMXEP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

