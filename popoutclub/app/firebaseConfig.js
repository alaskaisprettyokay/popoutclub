import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAhjophs9GBiwInPN3u332JFHGAB0RSQ-w",
    authDomain: "popoutclub.firebaseapp.com",
    projectId: "popoutclub",
    storageBucket: "popoutclub.firebasestorage.app",
    messagingSenderId: "779145383025",
    appId: "1:779145383025:web:a257b718750b3fca535fd0",
    measurementId: "G-3K3EK7DQBX"
  };
  

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);
export { auth, googleProvider, db, storage };
