// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwIvZUepecodmVgordg4y9bi3Yfn6kgjU",
  authDomain: "devlinks-b68ec.firebaseapp.com",
  projectId: "devlinks-b68ec",
  storageBucket: "devlinks-b68ec.appspot.com",
  messagingSenderId: "564603963487",
  appId: "1:564603963487:web:188b65769ae0fa6dfe73ea",
  measurementId: "G-3G6LDZBYZE"
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig)

const db = getFirestore(firebaseapp)
const auth = getAuth(firebaseapp)

export { db, auth }