import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';



// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCblXpG1h5KoGXzsPtgSy-TCIZYHgsaozw",
    authDomain: "todoapp-c0bf9.firebaseapp.com",
    projectId: "todoapp-c0bf9",
    storageBucket: "todoapp-c0bf9.appspot.com",
    messagingSenderId: "467620982206",
    appId: "1:467620982206:web:89c11af454baa64d565def",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
// export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
