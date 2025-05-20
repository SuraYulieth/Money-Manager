// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoxgAZ0AVcjq6VfZvyXzemNrK_t7Q5Z-w",
  authDomain: "moneymanager-582d0.firebaseapp.com",
  projectId: "moneymanager-582d0",
  storageBucket: "moneymanager-582d0.firebasestorage.app",
  messagingSenderId: "840689541996",
  appId: "1:840689541996:web:e77b90ebdbba7fc4594949",
  measurementId: "G-QW7WY0P2RT"
};

const appFirebase = initializeApp(firebaseConfig);
const db = getFirestore(appFirebase);
const auth = getAuth(appFirebase);
const providerGoogle = new GoogleAuthProvider();

// ✅ exportación correcta
export { appFirebase, db, auth, providerGoogle };